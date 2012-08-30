package com.wixpress.googleadsense.dao

import com.wixpress.googleadsense.domain.{Settings, WidgetId}
import collection.mutable

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
trait MockedSettingsDaoComponent extends SettingsDaoComponent {

  override val settingsDao = new MockedSettingsDao

  class MockedSettingsDao extends SettingsDao {
    val db = mutable.HashMap.empty[WidgetId, Settings]

    def store(settings: Settings) {
      db += (settings.widgetId -> settings)
    }

    def load(id: WidgetId) = db.get(id)
  }
}
