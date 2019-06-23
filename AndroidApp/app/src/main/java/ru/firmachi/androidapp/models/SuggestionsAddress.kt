package ru.firmachi.androidapp.models

import com.google.gson.Gson

class SuggestionsAddress(var address: String, var coordinate: Location?, var hereLocationId: String){
    companion object{
        fun deserialize(json: String?): SuggestionsAddress?{
            if(json == null || json.isEmpty()) return null
            val gson = Gson()
            return gson.fromJson(json, SuggestionsAddress::class.java)
        }
    }

    fun serialize(): String{
        val gson = Gson()
        return gson.toJson(this)
    }
}

data class Location(var longitude: Double, var latitude: Double)