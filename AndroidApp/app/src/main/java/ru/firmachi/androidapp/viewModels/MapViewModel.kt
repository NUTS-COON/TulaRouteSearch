package ru.firmachi.androidapp.viewModels

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import ru.firmachi.androidapp.App
import ru.firmachi.androidapp.models.*
import ru.firmachi.androidapp.services.IApiService
import javax.inject.Inject
import okhttp3.ResponseBody
import retrofit2.Response


class MapViewModel : ViewModel() {

    var routeLiveData: MutableLiveData<List<RoutesResponseModel>> = MutableLiveData()
    var coordinateLiveData: MutableLiveData<Location> = MutableLiveData()

    @Inject
    lateinit var apiService: IApiService

    init {
        App.component.inject(this)
    }

    fun ready(addressFrom: SuggestionsAddress, addressTo: SuggestionsAddress){

//        val handler = Dispatchers.IO + CoroutineExceptionHandler { _, exception ->
//            GlobalScope.launch(Dispatchers.Main) {
//                routeLiveData.value = null
//            }
//        }
//
//        GlobalScope.launch(handler) {
//            val fromTask = async {
//                Thread.sleep(4000)
//                if(addressFrom.coordinate != null){
//                    return@async addressFrom.coordinate
//                }
//                val res = apiService.getCoordinateByHereLocation(GetCoordinateRequestModel(addressFrom.hereLocationId)).execute()
//                return@async res.body()
//            }
//            val toTask = async {
//                if(addressTo.coordinate != null){
//                    return@async addressTo.coordinate
//                }
//                val res = apiService.getCoordinateByHereLocation(GetCoordinateRequestModel(addressTo.hereLocationId)).execute()
//                return@async res.body()
//            }
//
//            val from = fromTask.await()
//            val to = toTask.await()
//
//            if(from != null && to != null){
//                addressFrom.coordinate = from
//                addressTo.coordinate = to
//                val res = apiService.getRoutes(RouteRequestModel(null,
//                    Address(addressFrom.coordinate!!, addressFrom.hereLocationId),
//                    Address(addressTo.coordinate!!, addressTo.hereLocationId)))
//                    .execute()
//                withContext(Dispatchers.Main){
//                    routeLiveData.value = res.body()
//                }
//            }else{
//                withContext(Dispatchers.IO){
//                    routeLiveData.value = null
//                }
//            }
//        }

        val coordinateFrom = getLocation(addressFrom)
        val coordinateTo = getLocation(addressTo)

        Observable.zip(coordinateFrom, coordinateTo, BiFunction<Response<Location?>, Response<Location?>, Pair<SuggestionsAddress?, SuggestionsAddress?>>{t1, t2 ->
            val res1 = t1.body()
            val res2 = t2.body()

            if(res1 == null || res2 == null) return@BiFunction Pair(null, null)

            addressFrom.coordinate = res1
            addressTo.coordinate = res2
            return@BiFunction Pair(addressFrom, addressTo)

        })
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .onErrorReturnItem(Pair(null, null))
            .subscribe { pair ->

                if(pair.first == null || pair.second == null){
                    routeLiveData.value = null
                }else{
                    val aFrom = pair.first
                    val aTo = pair.second
                    coordinateLiveData.value = aFrom!!.coordinate

                    val from = Address(aFrom.coordinate!!, aFrom.hereLocationId)
                    val to = Address(aTo?.coordinate!!, aTo.hereLocationId)

                    Observable.fromCallable {
                        return@fromCallable apiService.getRoutes(RouteRequestModel(null, from, to)).execute()
                    }
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe {
                            if(it.isSuccessful){
                                routeLiveData.value = it.body()
                            }else{
                                routeLiveData.value = null
                            }
                        }
                }
            }
    }


    private fun getLocation(address: SuggestionsAddress): Observable<Response<Location?>>{
        if(address.coordinate != null){
            return Observable.just(Response.success(address.coordinate))
        }else{
            val request = apiService
                .getCoordinateByHereLocation(GetCoordinateRequestModel(address.hereLocationId))

            return Observable.fromCallable {
                return@fromCallable request.execute()
            }
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .onErrorReturnItem(Response.error<Location?>(400, ResponseBody.create(null, "")))
        }
    }


    fun getCenterLocation(l1: Location, l2: Location): Location{
        val lat = (l1.latitude + l2.latitude) / 2
        val lon = (l1.longitude + l2.longitude) / 2
        return Location(lon, lat)
    }
}