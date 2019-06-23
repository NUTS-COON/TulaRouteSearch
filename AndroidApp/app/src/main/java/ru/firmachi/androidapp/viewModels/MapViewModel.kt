package ru.firmachi.androidapp.viewModels

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import retrofit2.Response
import ru.firmachi.androidapp.App
import ru.firmachi.androidapp.models.*
import ru.firmachi.androidapp.services.IApiService
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject


class MapViewModel : ViewModel() {

    var routeLiveData: MutableLiveData<List<RoutesResponseModel>> = MutableLiveData()
    var coordinateLiveData: MutableLiveData<Location> = MutableLiveData()

    @Inject
    lateinit var apiService: IApiService

    init {
        App.component.inject(this)
    }

    fun ready(addressFrom: SuggestionsAddress, addressTo: SuggestionsAddress){
        val coordinateFrom = apiService
            .getCoordinateByHereLocation(GetCoordinateRequestModel(addressFrom.hereLocationId))
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
        val coordinateTo = apiService
            .getCoordinateByHereLocation(GetCoordinateRequestModel(addressTo.hereLocationId))
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())

        Observable.zip(coordinateFrom, coordinateTo, BiFunction<Response<Location?>?, Response<Location?>?, Pair<SuggestionsAddress?, SuggestionsAddress?>>{t1, t2 ->
                if(t1 == null || t2 == null) return@BiFunction Pair(null, null)
                if(t1.isSuccessful && t2.isSuccessful){
                    addressFrom.coordinate = t1.body()
                    addressTo.coordinate = t2.body()
                    if(addressFrom.coordinate == null || addressTo.coordinate == null){
                        return@BiFunction Pair(null, null)
                    }else{
                        return@BiFunction Pair(addressFrom, addressTo)
                    }
                }else{
                    return@BiFunction Pair(null, null)
                }
            })
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { pair ->
                val tz = TimeZone.getTimeZone("UTC")
                val df = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'") // Quoted "Z" to indicate UTC, no timezone offset
                df.timeZone = tz
                val time = df.format(Date())

                if(pair.first == null || pair.second == null){
                    routeLiveData.value = null
                }else{
                    val aFrom = pair.first
                    val aTo = pair.second
                    coordinateLiveData.value = aFrom!!.coordinate
                    val from = Address(aFrom.coordinate!!, aFrom.hereLocationId)
                    val to = Address(aTo?.coordinate!!, aTo.hereLocationId)

                    apiService.getRoutes(RouteRequestModel(time, from, to))
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

//        val coordinateFrom = apiService
//            .getCoordinateByHereLocation(GetCoordinateRequestModel(addressFrom.hereLocationId))
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe{
//                if(it.isSuccessful){
//                    coordinateLiveData.value = it.body()
//
//
//                    val routes = mutableListOf<Route>()
//
//                    val point1 = Point(Location(54.177927, 37.574292), "","")
//                    val point2 = Point(Location(54.168662, 37.582275), "","")
//                    val point3 = Point(Location(54.176758, 37.628439), "","")
//                    routes.add(Route("111", listOf(point1, point2, point3)))
//
//
//                    val point4 = Point(Location(54.176758, 37.628439), "","")
//                    val point5 = Point(Location(54.184331, 37.605448), "","")
//                    val point6 = Point(Location(54.182408, 37.617036), "","")
//                    routes.add(Route("222", listOf(point4, point5, point6)))
//
//
//                    val point7 = Point(Location(54.182408, 37.617036), "","")
//                    val point8 = Point(Location(54.213483, 37.619265), "","")
//                    val point9 = Point(Location(54.177947, 37.574292), "","")
//                    routes.add(Route("333", listOf(point7, point8, point9)))
//
//                    val respR = RoutesResponseModel(routes)
//                    routeLiveData.value = listOf(respR)
//                }
//            }

    }

    fun getCenterLocation(l1: Location, l2: Location): Location{
        val lat = (l1.latitude + l2.latitude) / 2
        val lon = (l1.longitude + l2.longitude) / 2
        return Location(lon, lat)
    }
}