package ru.firmachi.androidapp.services

import io.reactivex.Observable
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import ru.firmachi.androidapp.models.RouteRequestModel
import ru.firmachi.androidapp.models.RoutesResponseModel
import ru.firmachi.androidapp.models.SuggestionsAddress

interface IApiService {

    @POST("/api/RouteSearcher/GetSuggestions")
    fun getAddressSuggestions(@Body startLetter: String): Call<List<SuggestionsAddress>>

    @POST("/api/RouteSearcher/GetRoutes")
    fun getRoutes(@Body routeRequestModel: RouteRequestModel): Observable<Response<List<RoutesResponseModel>>>
}