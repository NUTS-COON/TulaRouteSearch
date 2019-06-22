package ru.firmachi.androidapp.di

import dagger.Component
import ru.firmachi.androidapp.services.IAddressSearchService
import ru.firmachi.androidapp.services.IApiService
import ru.firmachi.androidapp.viewModels.MapViewModel
import javax.inject.Singleton

@Singleton
@Component(modules = [ApplicationModule::class])
interface ApplicationComponent {
    fun getApiService(): IApiService
    fun getAddressSearchService(): IAddressSearchService
    fun inject(mapViewModel: MapViewModel)
}