package ru.firmachi.androidapp.screens

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.AdapterView
import kotlinx.android.synthetic.main.activity_main.*
import org.jetbrains.anko.startActivity
import org.jetbrains.anko.toast
import ru.firmachi.androidapp.App
import ru.firmachi.androidapp.models.SuggestionsAddress


class MainActivity : AppCompatActivity() {

    private var addressFrom: SuggestionsAddress? = null
    private var addressTo: SuggestionsAddress? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(ru.firmachi.androidapp.R.layout.activity_main)
        main_show_route_btn.setOnClickListener {
            when {
                addressFrom == null -> toast("Выберите адрес отправления")
                addressTo == null -> toast("Выберите адрес назначения")
                else -> startActivity<MapActivity>(
                    "addressFrom" to addressFrom!!.serialize(),
                    "addressTo" to addressTo!!.serialize()
                )
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
}
