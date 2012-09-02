package com.wixpress.googleadsense.domain

import net.liftweb.json.JsonAST.JObject
import com.google.appengine.repackaged.com.google.common.util.Base64


/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 02/09/12
 */
object WixSignedInstance {

  def instanceId(signed: String) = {
    import net.liftweb.json.parse

    try {
      val json: String = new String(Base64.decode(signed.split('.')(1))).dropRight(1)
      parse(json).asInstanceOf[JObject].values("instanceId").asInstanceOf[String]
    } catch {
      case e: Exception => signed
    }
  }
}
