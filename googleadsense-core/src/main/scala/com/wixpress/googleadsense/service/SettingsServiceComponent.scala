package com.wixpress.googleadsense.service

import com.wixpress.googleadsense.domain.{Settings, WidgetId}

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
trait SettingsServiceComponent {

  def settingsService: SettingsService

  trait SettingsService {
    def getSettings(widgetId: WidgetId): Settings
    def store(settings: Settings)
    def availableTypes: List[String]
  }
}
