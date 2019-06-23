package ru.firmachi.androidapp.services

import io.reactivex.Observable
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import ru.firmachi.androidapp.models.*

interface IApiService {

    @POST("/api/RouteSearcher/GetSuggestions")
    fun getAddressSuggestions(@Body text: SuggestionsAddressRequestModel): Call<List<SuggestionsAddress>>

    @POST("/api/RouteSearcher/GetRoutes")
    fun getRoutes(@Body routeRequestModel: RouteRequestModel): Observable<Response<List<RoutesResponseModel>?>>

    @POST("/api/RouteSearcher/GetCoordinateByHereLocation")
    fun getCoordinateByHereLocation(@Body location: GetCoordinateRequestModel): Observable<Response<Location?>>
}