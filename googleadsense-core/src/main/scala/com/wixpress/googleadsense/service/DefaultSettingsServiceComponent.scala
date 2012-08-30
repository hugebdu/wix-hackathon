package com.wixpress.googleadsense.service

import com.wixpress.googleadsense.dao.SettingsDaoComponent
import com.wixpress.googleadsense.domain.{WidgetId, Settings}

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
trait DefaultSettingsServiceComponent extends SettingsServiceComponent {

  this: SettingsDaoComponent =>

  override val settingsService = new DefaultSettingsService

  class DefaultSettingsService extends SettingsService {

    def getSettings(widgetId: WidgetId) = {
      settingsDao.load(widgetId).getOrElse(defaultSettings(widgetId))
    }


    def availableTypes = "100x100" :: "200x200" :: "150x50" :: Nil

    def store(settings: Settings) {
      settingsDao.store(settings)
    }

    def defaultSettings(widgetId: WidgetId) = Settings(widgetId, "newAccount%s".format(widgetId.componentId))
  }
}
