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
      val json: String = new String(Base64.decode(signed.split('.')(1)))
      val obj: JObject = parse(json).asInstanceOf[JObject]
      val i: String = obj.values("instanceId").asInstanceOf[String]
      i
    } catch {
      case e: Exception => {
        e.printStackTrace()
        signed
      }
    }
  }
}
