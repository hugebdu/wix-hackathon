package com.wixpress.googleadsense

import domain.{WixSignedInstance, WidgetId, Settings}
import org.scalatra.ScalatraServlet
import org.scalatra.scalate.ScalateSupport
import com.wixpress.googleadsense.Environment.application._
import net.liftweb.json._
import net.liftweb.json.JsonDSL._
import org.scalatra.liftjson.LiftJsonRequestBody
import WixSignedInstance.instanceId

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
class SettingsServlet extends ScalatraServlet with ScalateSupport with LiftJsonRequestBody {


  get("/:instanceId/:componentId") {
    contentType = "application/json; charset=utf-8"
    val settings = settingsService.getSettings(WidgetId(params("instanceId"), params("componentId")))
    settings.toJson.getBytes("UTF-8")
  }

  post("/:instanceId/:componentId", request.getContentType.split(';').contains("application/json")) {
    parsedBody match {
      case json: JObject => {
        val settings = json.extract[Settings]
        val fixed = Settings(
          WidgetId(instanceId(settings.widgetId.instanceId), settings.widgetId.componentId),
          settings.clientId,
          settings.channel,
          settings.width, settings.height, settings.format, settings.adType, settings.colorBorder, settings.colorBg, settings.colorLink, settings.colorText, settings.uiFeatures, settings.colorUrl
        )
        settingsService.store(fixed)
      }
      case _ => halt(400, "Unknown JSON")
    }
  }

  get("/") {
    contentType = "text/html"

    ssp("settings.ssp",
      "contextRoot" -> request.getContextPath,
      "availableTypes" -> pretty(render(settingsService.availableTypes)),
      "widgetId" -> WidgetId(instanceId(params("instance")), params("origCompId")).toJson)
  }

  override protected def isScalateErrorPageEnabled = false
}


