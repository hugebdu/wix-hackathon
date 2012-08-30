package com.wixpress.googleadsense

import dao.{GAESettingsDaoComponent, MockedSettingsDaoComponent}
import service.DefaultSettingsServiceComponent

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
object Environment {

  val application =
    if (isDev)
      new DefaultSettingsServiceComponent with MockedSettingsDaoComponent
    else
      new DefaultSettingsServiceComponent with GAESettingsDaoComponent

  def isDev = sys.props.get("development").isDefined
}