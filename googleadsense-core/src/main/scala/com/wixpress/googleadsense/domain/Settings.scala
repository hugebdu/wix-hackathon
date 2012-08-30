package com.wixpress.googleadsense.domain

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */

sealed case class Settings(widgetId: WidgetId,
                    accountId: String,
                    widgetType: String = "120x120") extends JsonSerializable

