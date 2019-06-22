package ru.firmachi.androidapp.models

data class RoutesResponseModel (

    val routes: List<Route>
)

data class Route(

    val transport : String,
    val points : List<Point>
)

data class Point (

    val coordinate : Coordinate,
    val description : String,
    val time : String
)

data class Coordinate (

    val longitude : Double,
    val latitude : Double
)