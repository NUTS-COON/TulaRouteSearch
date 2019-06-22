package ru.firmachi.androidapp.models

import com.google.gson.Gson

class SuggestionsAddress(var coordinate: Location, var town: String, var address: String){
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

data class Location(var longitude: Float, var latitude: Float)