package ru.firmachi.androidapp.screens

import android.Manifest
import android.arch.lifecycle.ViewModelProviders
import android.content.pm.PackageManager
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.here.android.mpa.common.GeoCoordinate
import com.here.android.mpa.common.OnEngineInitListener
import com.here.android.mpa.mapping.Map
import com.here.android.mpa.mapping.MapRoute
import com.here.android.mpa.mapping.SupportMapFragment
import com.here.android.mpa.routing.*
import kotlinx.android.synthetic.main.activity_map.*
import org.jetbrains.anko.toast
import ru.firmachi.androidapp.R
import ru.firmachi.androidapp.models.Location
import ru.firmachi.androidapp.models.RoutesResponseModel
import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.viewModels.MapViewModel
import java.util.*

class MapActivity : AppCompatActivity() {

    private lateinit var viewModel: MapViewModel

    private val LOG_TAG = "FIRMACHI_APP"

    private val REQUEST_PERMISSIONS_CODE = 1
    private val REQUIRED_SDK_PERMISSIONS =
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.WRITE_EXTERNAL_STORAGE)

    private var map: Map? = null
    private var mapFragment: SupportMapFragment? = null

    private var textViewResult: TextView? = null

    private var mapRoute: MapRoute? = null

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setupViewModel()
        checkPermissions()
    }

    private fun getSupportMapFragment(): SupportMapFragment {
        return supportFragmentManager.findFragmentById(R.id.map_mapfragment) as SupportMapFragment
    }

    private fun setupViewModel(){
        viewModel = ViewModelProviders.of(this).get(MapViewModel::class.java)
        viewModel.routeLiveData.observe(this, android.arch.lifecycle.Observer {
            if(it != null){
                drawRoute(it)
            }
        })
    }


    private fun drawRoute(routes: List<RoutesResponseModel>) {
    }


    private fun initialize() {
        setContentView(R.layout.activity_map)
        val addressFromJson = intent.extras.getString("addressFrom")
        val addressToJson = intent.extras.getString("addressTo")
        val addressFrom = SuggestionsAddress.deserialize(addressFromJson)
        val addressTo = SuggestionsAddress.deserialize(addressToJson)
        viewModel.ready(addressFrom!!, addressTo!!)

        initMap(viewModel.getCenterLocation(addressFrom.coordinate, addressTo.coordinate))
    }

    private fun initMap(centerLocation: Location) {
        mapFragment = getSupportMapFragment()
        mapFragment!!.init { error ->
            if (error == OnEngineInitListener.Error.NONE) {
                map = mapFragment!!.map
                map!!.setCenter(
                    GeoCoordinate(49.196261, -123.004773, 0.0),
                    Map.Animation.NONE
                )
                // Set the map zoom level to the average between min and max (no animation)
                map!!.zoomLevel = (map!!.maxZoomLevel + map!!.minZoomLevel) / 2
            } else {
                toast("Карты Here В С Е. Помянем")
                finish()
            }
        }

        textViewResult = map_total_time
        textViewResult!!.setText(R.string.textview_routecoordinates_2waypoints)

    }

    // Functionality for taps of the "Get Directions" button
    fun getDirections(view: View) {
        // 1. clear previous results
        textViewResult!!.text = ""
        if (map != null && mapRoute != null) {
            map!!.removeMapObject(mapRoute)
            mapRoute = null
        }

        // 2. Initialize RouteManager
        val routeManager = RouteManager()

        // 3. Select routing options
        val routePlan = RoutePlan()

        val routeOptions = RouteOptions()
        routeOptions.transportMode = RouteOptions.TransportMode.CAR
        routeOptions.routeType = RouteOptions.Type.FASTEST
        routePlan.routeOptions = routeOptions

        // 4. Select Waypoints for your routes
        // START: Nokia, Burnaby
        routePlan.addWaypoint(GeoCoordinate(49.1966286, -123.0053635))

        // END: Airport, YVR
        routePlan.addWaypoint(GeoCoordinate(49.1947289, -123.1762924))

        // 5. Retrieve Routing information via RouteManagerEventListener
        val error = routeManager.calculateRoute(routePlan, routeManagerListener)
        if (error != RouteManager.Error.NONE) {
            Toast.makeText(
                applicationContext,
                "Route calculation failed with: $error", Toast.LENGTH_SHORT
            )
                .show()
        }
    }

    private val routeManagerListener = object : RouteManager.Listener {
        override fun onCalculateRouteFinished(
            errorCode: RouteManager.Error,
            result: List<RouteResult>
        ) {

            if (errorCode == RouteManager.Error.NONE && result[0].route != null) {
                // create a map route object and place it on the map
                mapRoute = MapRoute(result[0].route)
                map!!.addMapObject(mapRoute)

                // Get the bounding box containing the route and zoom in (no animation)
                val gbb = result[0].route.boundingBox
                map!!.zoomTo(gbb, Map.Animation.NONE, Map.MOVE_PRESERVE_ORIENTATION)

                textViewResult!!.text = String.format(
                    "Route calculated with %d maneuvers.",
                    result[0].route.maneuvers.size
                )
            } else {
                textViewResult!!.text = String.format("Route calculation failed: %s", errorCode.toString())
            }
        }

        override fun onProgress(percentage: Int) {
            textViewResult!!.text = String.format("... %d percent done ...", percentage)
        }
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

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<String>,
        grantResults: IntArray
    ) {
        when (requestCode) {
            REQUEST_PERMISSIONS_CODE -> {
                for (index in permissions.indices.reversed()) {
                    if (grantResults[index] != PackageManager.PERMISSION_GRANTED) {
                        Toast.makeText(
                            this, "Required permission '" + permissions[index]
                                    + "' not granted, exiting", Toast.LENGTH_LONG
                        ).show()
                        finish()
                        return
                    }
                }
                initialize()
            }
        }
    }
}
