package ru.firmachi.androidapp.services

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import ru.firmachi.androidapp.models.*

interface IApiService {

    @POST("/api/RouteSearcher/GetSuggestions")
    fun getAddressSuggestions(@Body text: SuggestionsAddressRequestModel): Call<List<SuggestionsAddress>?>

    @POST("/api/RouteSearcher/GetRoutes")
    fun getRoutes(@Body routeRequestModel: RouteRequestModel): Call<List<RoutesResponseModel>?>

    @POST("/api/RouteSearcher/GetCoordinateByHereLocation")
    fun getCoordinateByHereLocation(@Body location: GetCoordinateRequestModel): Call<Location?>
}