package com.wixpress.googleadsense.domain

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
sealed case class WidgetId(instanceId: String, componentId: String) extends JsonSerializable
