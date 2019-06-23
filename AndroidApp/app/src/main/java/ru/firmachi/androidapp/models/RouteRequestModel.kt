package ru.firmachi.androidapp.models

data class RouteRequestModel(val time: String, var from: Address, var to: Address)

data class Address(val coordinate: Location, val hereLocationId: String)