package ru.firmachi.androidapp.screens

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.widget.AdapterView
import kotlinx.android.synthetic.main.activity_main.*
import org.jetbrains.anko.startActivity
import org.jetbrains.anko.toast
import ru.firmachi.androidapp.App
import ru.firmachi.androidapp.models.SuggestionsAddress
import java.util.*


class MainActivity : AppCompatActivity() {

    private val REQUEST_PERMISSIONS_CODE = 1
    private val REQUIRED_SDK_PERMISSIONS =
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)

    private var addressFrom: SuggestionsAddress? = null
    private var addressTo: SuggestionsAddress? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(ru.firmachi.androidapp.R.layout.activity_main)
        main_show_route_btn.setOnClickListener {
            when {
                addressFrom == null -> toast("Выберите адрес отправления")
                addressTo == null -> toast("Выберите адрес назначения")
                else -> checkPermissions()

            }
        }

        setAutoComplete(main_from_autocomplete)
        setAutoComplete(main_to_autocomplete)

        main_from_autocomplete.onItemClickListener =
            AdapterView.OnItemClickListener { adapterView, view, position, id ->
                addressFrom = adapterView.getItemAtPosition(position) as SuggestionsAddress
                main_from_autocomplete.setText(addressFrom?.address)
            }

        main_to_autocomplete.onItemClickListener =
            AdapterView.OnItemClickListener { adapterView, view, position, id ->
                addressTo = adapterView.getItemAtPosition(position) as SuggestionsAddress
                main_to_autocomplete.setText(addressTo?.address)
            }
    }


    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        when (requestCode) {
            REQUEST_PERMISSIONS_CODE -> {
                for (index in permissions.indices.reversed()) {
                    if (grantResults[index] != PackageManager.PERMISSION_GRANTED) {
                        toast("Для поиска маршрута необходимо предоставить разрешения")
                        return
                    }
                }
                showMap()
            }
        }
    }


    private fun setAutoComplete(autoComplete: DelayAutoCompleteTextView){
        autoComplete.threshold = 4
        autoComplete.setAdapter(getAutoCompleteAdapter())
        autoComplete.onItemClickListener =
            AdapterView.OnItemClickListener { adapterView, view, position, id ->
                val address = adapterView.getItemAtPosition(position) as SuggestionsAddress
                autoComplete.setText(address.address)
            }
    }

    private fun getAutoCompleteAdapter(): AutoCompleteAdapter{
        val adapter = AutoCompleteAdapter(this)
        adapter.setAddressSearchService(App.component.getAddressSearchService())

        return adapter
    }


    private fun showMap(){
        startActivity<MapActivity>(
            "addressFrom" to addressFrom!!.serialize(),
            "addressTo" to addressTo!!.serialize()
        )
    }


    private fun checkPermissions() {
        val missingPermissions = ArrayList<String>()
        for (permission in REQUIRED_SDK_PERMISSIONS) {
            val result = ContextCompat.checkSelfPermission(this, permission)
            if (result != PackageManager.PERMISSION_GRANTED) {
                missingPermissions.add(permission)
            }
        }
        if (missingPermissions.isNotEmpty()) {
            val permissions = missingPermissions
                .toTypedArray()
            ActivityCompat.requestPermissions(this, permissions, REQUEST_PERMISSIONS_CODE)
        } else {
            val grantResults = IntArray(REQUIRED_SDK_PERMISSIONS.size)
            Arrays.fill(grantResults, PackageManager.PERMISSION_GRANTED)
            onRequestPermissionsResult(
                REQUEST_PERMISSIONS_CODE, REQUIRED_SDK_PERMISSIONS,
                grantResults
            )
        }
    }
}
