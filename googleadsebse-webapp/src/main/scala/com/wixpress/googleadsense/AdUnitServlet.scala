package com.wixpress.googleadsense

import domain.WidgetId
import org.scalatra.ScalatraServlet
import org.scalatra.scalate.ScalateSupport
import com.wixpress.googleadsense.Environment.application._
import com.wixpress.googleadsense.domain.WixSignedInstance.instanceId

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
class AdUnitServlet extends ScalatraServlet with ScalateSupport {

  before() {
    contentType = "text/html"
  }

  get("/") {
    val settings = settingsService.getSettings(WidgetId(instanceId(params("instance")), params("compId")))
    ssp("adunit.ssp",
      "contextRoot" -> request.getContextPath,
      "settings" -> settings)
  }
}
