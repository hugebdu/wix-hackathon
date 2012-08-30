package com.wixpress.googleadsense.dao

import com.wixpress.googleadsense.domain.{WidgetId, Settings}

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
trait SettingsDaoComponent {
  def settingsDao: SettingsDao

  trait SettingsDao {
    def store(settings: Settings)
    def load(id: WidgetId): Option[Settings]
  }
}
