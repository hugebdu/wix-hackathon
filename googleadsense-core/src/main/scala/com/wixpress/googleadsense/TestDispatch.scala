package com.wixpress.googleadsense

/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */
object TestDispatch extends App {
  import net.liftweb.json.JsonDSL._
  import net.liftweb.json._

  val j = ("name" -> "vasya") ~ ("age" -> 25)

  println(compact(render(j)))


}
