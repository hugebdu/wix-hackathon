package com.wixpress.googleadsense

import domain.WidgetId
import org.scalatra.ScalatraServlet
import org.scalatra.scalate.ScalateSupport
import Environment._

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

    val settings = settingsService.getSettings(WidgetId(params("instanceId"), params("componentId")))

    ssp("/WEB-INF/views/adunit.ssp",
      "contextRoot" -> request.getContextPath)

  }
}
