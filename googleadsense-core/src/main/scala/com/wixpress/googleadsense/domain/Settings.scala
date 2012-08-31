package com.wixpress.googleadsense.domain

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */

sealed case class Settings(widgetId: WidgetId,
                           clientId: String,
                           channel: String,
                           width: Int = 234,
                           height: Int = 50,
                           format: String = "234x60_as",
                           adType: String = "text",
                           colorBorder: String = "FFFFFF",
                           colorBg: String = "FFFFFF",
                           colorLink: String = "FFFFFF",
                           colorText: String = "FFFFFF",
                           uiFeatures: String = "rc:0",
                           colorUrl: String = "FFFFFF") extends JsonSerializable

