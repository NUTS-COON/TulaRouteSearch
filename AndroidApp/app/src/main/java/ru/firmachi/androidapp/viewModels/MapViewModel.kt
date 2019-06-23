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

        val coordinateFrom = getLocation(addressFrom)
        val coordinateTo = getLocation(addressTo)

        Observable.zip(coordinateFrom, coordinateTo, BiFunction<Location?, Location?, Pair<SuggestionsAddress?, SuggestionsAddress?>>{t1, t2 ->
            if(t1 == null || t2 == null) return@BiFunction Pair(null, null)
            addressFrom.coordinate = t1
            addressTo.coordinate = t2
            if(addressFrom.coordinate == null || addressTo.coordinate == null){
                return@BiFunction Pair(null, null)
            }else{
                return@BiFunction Pair(addressFrom, addressTo)
            }

        })
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe { pair ->

            if(pair.first == null || pair.second == null){
                routeLiveData.value = null
            }else{
                val aFrom = pair.first
                val aTo = pair.second
                coordinateLiveData.value = aFrom!!.coordinate

                val from = Address(aFrom.coordinate!!, aFrom.hereLocationId)
                val to = Address(aTo?.coordinate!!, aTo.hereLocationId)

                apiService.getRoutes(RouteRequestModel(null, from, to))
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


    private fun getLocation(address: SuggestionsAddress): Observable<Location?>{
        if(address.coordinate != null){
            return Observable.fromCallable {
                return@fromCallable address.coordinate
            }
        }else{
            return apiService
                .getCoordinateByHereLocation(GetCoordinateRequestModel(address.hereLocationId))
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .flatMap {
                    return@flatMap Observable.fromCallable { return@fromCallable it.body() }
                }
        }
    }


    fun getCenterLocation(l1: Location, l2: Location): Location{
        val lat = (l1.latitude + l2.latitude) / 2
        val lon = (l1.longitude + l2.longitude) / 2
        return Location(lon, lat)
    }
}