package com.wixpress.googleadsense

import dao.{GAESettingsDaoComponent, MockedSettingsDaoComponent}
import service.DefaultSettingsServiceComponent

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
object Environment extends DefaultSettingsServiceComponent with GAESettingsDaoComponent