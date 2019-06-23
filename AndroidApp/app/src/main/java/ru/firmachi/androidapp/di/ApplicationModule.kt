package ru.firmachi.androidapp.di

import android.content.Context
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import ru.firmachi.androidapp.services.AddressSearchService
import ru.firmachi.androidapp.services.IAddressSearchService
import ru.firmachi.androidapp.services.IApiService
import javax.inject.Singleton
import okhttp3.ResponseBody
import retrofit2.Converter
import java.io.IOException
import java.lang.reflect.Type


@Module
class ApplicationModule(private val context: Context) {

    @Provides
    @Singleton
    fun getAddressSuggestionService(): IAddressSearchService {
        return AddressSearchService(getApiService())
    }

    @Provides
    @Singleton
    fun getApiService(): IApiService {
        return getRetrofit("http://routesearcherapi.azurewebsites.net")
            .create(IApiService::class.java)
    }


    private fun getRetrofit(url: String): Retrofit {
        return Retrofit.Builder()
            .baseUrl(url)
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}