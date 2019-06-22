package ru.firmachi.androidapp

import android.app.Application
import ru.firmachi.androidapp.di.ApplicationComponent
import ru.firmachi.androidapp.di.ApplicationModule
import ru.firmachi.androidapp.di.DaggerApplicationComponent

class App : Application(){

    companion object{
        lateinit var component: ApplicationComponent
    }

    override fun onCreate() {
        super.onCreate()
        initDagger()
    }

    private fun initDagger(){
        component = DaggerApplicationComponent.builder()
            .applicationModule(ApplicationModule(this))
            .build()
    }
}