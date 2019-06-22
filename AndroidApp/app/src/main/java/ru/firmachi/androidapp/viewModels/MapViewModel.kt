package ru.firmachi.androidapp.viewModels

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import ru.firmachi.androidapp.App
import ru.firmachi.androidapp.models.Location
import ru.firmachi.androidapp.models.RouteRequestModel
import ru.firmachi.androidapp.models.RoutesResponseModel
import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.services.IApiService
import javax.inject.Inject

class MapViewModel : ViewModel() {

    var routeLiveData: MutableLiveData<List<RoutesResponseModel>> = MutableLiveData()

    @Inject
    lateinit var apiService: IApiService

    init {
        App.component.inject(this)
    }

    fun ready(addresFrom: SuggestionsAddress, addresTo: SuggestionsAddress){
        apiService.getRoutes(RouteRequestModel(addresFrom, addresTo))
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .doOnError {
                routeLiveData.value = null
            }
            .subscribe {
                if(it.isSuccessful){
                    routeLiveData.value = it.body()
                }
            }
    }

    fun getCenterLocation(l1: Location, l2: Location): Location{
        val lat = (l1.latitude + l2.latitude) / 2
        val lon = (l1.longitude + l2.longitude) / 2
        return Location(lon, lat)
    }
}