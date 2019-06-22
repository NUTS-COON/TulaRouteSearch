package ru.firmachi.androidapp.services

import ru.firmachi.androidapp.models.SuggestionsAddress

interface IAddressSearchService {
    fun getAddressSuggestions(startLetter: String): List<SuggestionsAddress>
}