package com.wixpress.googleadsense.domain

import net.liftweb.json.DefaultFormats

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
trait JsonSerializable {
  import net.liftweb.json.Serialization
  import Serialization._

  @transient implicit val formats = DefaultFormats

  def toJson = write(this)
}
