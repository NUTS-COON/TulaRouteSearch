package ru.firmachi.androidapp.services

import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.models.SuggestionsAddressRequestModel

class AddressSearchService(private var apiService: IApiService) : IAddressSearchService {

    override fun getAddressSuggestions(startLetter: String): List<SuggestionsAddress> {
        try {
            val res = apiService.getAddressSuggestions(SuggestionsAddressRequestModel(startLetter))
                .execute()
                .body()

            if(res != null) return res
        }catch (e: Exception){

        }

        return emptyList()
    }

}