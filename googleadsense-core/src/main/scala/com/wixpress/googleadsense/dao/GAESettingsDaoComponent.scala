package com.wixpress.googleadsense.dao

import com.google.appengine.api.datastore._
import com.wixpress.googleadsense.domain.WidgetId
import com.wixpress.googleadsense.domain.Settings

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 30/08/12
 */
trait GAESettingsDaoComponent extends SettingsDaoComponent {


  override val settingsDao = new GAESettingsDao

  class GAESettingsDao extends SettingsDao {
    val ds = DatastoreServiceFactory.getDatastoreService

    def store(settings: Settings) {
      ds.put(settings)
    }

    def load(id: WidgetId) = {
      try {
        Some(ds.get(id))
      } catch {
        case e: EntityNotFoundException => None
      }
    }

    implicit def widgetIdToKey(widgetId: WidgetId): Key = KeyFactory.createKey("Id", "%s|%s".format(widgetId.componentId, widgetId.instanceId))

    implicit def settingsToEntity(settings: Settings): Entity = {
      val e = new Entity(settings.widgetId)
      e.setProperty("accountId", settings.accountId)
      e.setProperty("widgetType", settings.widgetType)
      e.setProperty("instanceId", settings.widgetId.instanceId)
      e.setProperty("componentId", settings.widgetId.componentId)
      e
    }

    implicit def entityWithHelpers(e: Entity): { def apply(s: String): String } = new {
      def apply(s: String) = e.getProperty(s).asInstanceOf[String]
    }

    implicit def entityToSettings(e: Entity): Settings = {
      Settings(WidgetId(e("instanceId"), e("componentId")), e("accountId"), e("widgetType"))

    }
  }
}
