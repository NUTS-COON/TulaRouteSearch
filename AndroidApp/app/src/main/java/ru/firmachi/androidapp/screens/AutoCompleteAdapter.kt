package ru.firmachi.androidapp.screens

import android.content.Context
import android.widget.TextView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Filter
import android.widget.Filterable
import kotlinx.android.synthetic.main.simple_dropdown_item.view.*
import ru.firmachi.androidapp.R
import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.services.IAddressSearchService


class AutoCompleteAdapter(private val mContext: Context):BaseAdapter(), Filterable {

    private var addressSearchService: IAddressSearchService? = null
    private var mResults: List<SuggestionsAddress>? = null

    init{
        mResults = ArrayList()
    }

    override fun getFilter(): Filter {

        return object : Filter() {
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                val filterResults = FilterResults()
                if (constraint != null && constraint.isNotEmpty()) {
                    val address = findAddress(constraint.toString())
                    filterResults.values = address
                    filterResults.count = address.size
                }else{
                    filterResults.values = emptyList<String>()
                    filterResults.count = 0
                }
                return filterResults
            }

            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                if (results != null && results.count > 0) {
                    mResults = results.values as List<SuggestionsAddress>
                    notifyDataSetChanged()
                } else {
                    notifyDataSetInvalidated()
                }
            }
        }
    }

    override fun getCount():Int {
        return mResults!!.size
    }

    override fun getItem(index:Int): SuggestionsAddress {
        return mResults!![index]
    }

    override fun getItemId(position:Int):Long {
        return position.toLong()
    }

    override fun getView(position:Int, convertView: View?, parent:ViewGroup):View {
        var v = convertView
        if (v == null)
        {
            val inflater = LayoutInflater.from(mContext)
            v = inflater.inflate(R.layout.simple_dropdown_item, parent, false)
        }
        val address = getItem(position)
        v!!.dropdown_address.text = address.address

        return v
    }

    fun setAddressSearchService(addressSearchService: IAddressSearchService){
        this.addressSearchService = addressSearchService
    }

    private fun findAddress(startLetters: String): List<SuggestionsAddress> {
        if(addressSearchService != null){
            return addressSearchService!!.getAddressSuggestions(startLetters)
        }

        return emptyList()
    }
}