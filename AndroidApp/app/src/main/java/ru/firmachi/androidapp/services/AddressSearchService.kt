package ru.firmachi.androidapp.services

import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.models.SuggestionsAddressRequestModel
import java.lang.Exception

class AddressSearchService(private var apiService: IApiService) : IAddressSearchService {

    override fun getAddressSuggestions(startLetter: String): List<SuggestionsAddress> {
        try {
            val request = apiService.getAddressSuggestions(SuggestionsAddressRequestModel(startLetter)).execute()
            if(request.isSuccessful){
                val res = request.body()
                if(res != null) return res
            }
        }catch (e: Exception){
            return emptyList()
        }

        return emptyList()
    }

}