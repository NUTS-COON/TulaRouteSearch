package ru.firmachi.androidapp.screens

import android.Manifest
import android.arch.lifecycle.ViewModelProviders
import android.content.pm.PackageManager
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.widget.Toast
import com.here.android.mpa.common.GeoBoundingBox
import com.here.android.mpa.common.GeoCoordinate
import com.here.android.mpa.common.OnEngineInitListener
import com.here.android.mpa.mapping.Map
import com.here.android.mpa.mapping.MapMarker
import com.here.android.mpa.mapping.MapRoute
import com.here.android.mpa.mapping.SupportMapFragment
import com.here.android.mpa.routing.RouteManager
import com.here.android.mpa.routing.RouteOptions
import com.here.android.mpa.routing.RoutePlan
import com.here.android.mpa.routing.RouteResult
import kotlinx.android.synthetic.main.activity_map.*
import org.jetbrains.anko.toast
import ru.firmachi.androidapp.R
import ru.firmachi.androidapp.models.Location
import ru.firmachi.androidapp.models.Route
import ru.firmachi.androidapp.models.SuggestionsAddress
import ru.firmachi.androidapp.viewModels.MapViewModel
import java.util.*
import kotlin.random.Random

class MapActivity : AppCompatActivity() {

    private lateinit var viewModel: MapViewModel

    private val REQUEST_PERMISSIONS_CODE = 1
    private val REQUIRED_SDK_PERMISSIONS =
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.WRITE_EXTERNAL_STORAGE)

    private var map: Map? = null
    private var mapFragment: SupportMapFragment? = null

    private lateinit var addressFrom: SuggestionsAddress
    private lateinit var addressTo: SuggestionsAddress

    var top = 0.0
    var left = 0.0
    var bottom = 0.0
    var right = 0.0

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setupViewModel()
        checkPermissions()
    }

    override fun onStart() {
        super.onStart()
        viewModel.ready(addressFrom, addressTo)
    }

    private fun getSupportMapFragment(): SupportMapFragment {
        return supportFragmentManager.findFragmentById(R.id.map_mapfragment) as SupportMapFragment
    }

    private fun setupViewModel(){
        viewModel = ViewModelProviders.of(this).get(MapViewModel::class.java)
        viewModel.routeLiveData.observe(this, android.arch.lifecycle.Observer { it ->
            if(it != null){
                it.forEach {
                    drawRoute(it.routes)
                }
            }else{
                map_total_time.text = "Не удалось получить информацию о маршруте"
            }
        })
        viewModel.coordinateLiveData.observe(this, android.arch.lifecycle.Observer {
            if(it != null){
                initBoundingBoxCoordinates(it)
            }
        })
    }


    private fun initialize() {
        setContentView(R.layout.activity_map)
        val addressFromJson = intent.extras.getString("addressFrom")
        val addressToJson = intent.extras.getString("addressTo")
        addressFrom = SuggestionsAddress.deserialize(addressFromJson)!!
        addressTo = SuggestionsAddress.deserialize(addressToJson)!!

        initMap()
    }


    private fun initMap() {
        mapFragment = getSupportMapFragment()
        mapFragment!!.init { error ->
            if (error == OnEngineInitListener.Error.NONE) {
                map = mapFragment!!.map
                map!!.zoomLevel = 16.0
            } else {
                toast("Карты Here В С Ё. Помянем")
                finish()
            }
        }
    }


    private fun drawRoute(route: List<Route>){
        route.forEach{
            val color = getARGBAsNull(
                254,
                Random.nextInt(1, 255),
                Random.nextInt(1, 255),
                Random.nextInt(1, 255))
            drawTransportRoute(it, color)
        }
    }


    private fun drawTransportRoute(transportRoute: Route, color: Int){
        val routeManager = RouteManager()
        val routePlan = RoutePlan()

        val routeOptions = RouteOptions()
        routeOptions.transportMode = RouteOptions.TransportMode.CAR
        routeOptions.routeType = RouteOptions.Type.FASTEST
        routePlan.routeOptions = routeOptions

        transportRoute.points.forEach {
            setBoundingBoxCoordinates(it.coordinate)
            routePlan.addWaypoint(GeoCoordinate(it.coordinate.longitude, it.coordinate.latitude))
        }

        val error = routeManager.calculateRoute(routePlan, object : RouteManager.Listener {
            override fun onCalculateRouteFinished(errorCode: RouteManager.Error, result: List<RouteResult>) {

                if (errorCode == RouteManager.Error.NONE && result[0].route != null) {
                    val mapRoute = MapRoute(result[0].route)
                    map!!.addMapObject(mapRoute)
                    mapRoute.color = color

                    val firstPoint = transportRoute.points[0].coordinate
                    val point = MapMarker(RGBToHUE(color))
                    point.coordinate = GeoCoordinate(firstPoint.latitude, firstPoint.longitude)
                    map!!.addMapObject(point)

                } else {
                    map_total_time.text = "Карты Here В С Ё. Помянем"
                }
                map!!.zoomTo(
                    GeoBoundingBox(GeoCoordinate(top, left), GeoCoordinate(bottom, right)),
                    Map.Animation.NONE,
                    Map.MOVE_PRESERVE_ORIENTATION)
            }

            override fun onProgress(percentage: Int) {
                map_total_time.text = "Строим маршрут. Готово на ${percentage}%"
            }
        })
        if (error != RouteManager.Error.NONE) {
            toast("Произошла ошибка при построении маршрута")
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


    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
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

    private fun initBoundingBoxCoordinates(coordinate: Location){
        top = coordinate.latitude
        bottom = coordinate.latitude
        left = coordinate.longitude
        right = coordinate.longitude

    }

    private fun setBoundingBoxCoordinates(coordinate: Location){
        if(coordinate.longitude > top){
            top = coordinate.longitude
        }else if(coordinate.longitude < bottom){
            bottom = coordinate.longitude
        }
        if(coordinate.latitude > right){
            right = coordinate.latitude
        }else if(coordinate.latitude < left){
            left = coordinate.latitude
        }
    }

    private fun getARGBAsNull(a: Int, r: Int, g: Int, b: Int): Int{
        return (a shl 24) + (r shl 16) + (g shl 8) + b
    }


    private fun RGBToHUE(rgb: Int): Float{
        var r = rgb and (255 shl 16)
        var g = rgb and (255 shl 8)
        var b = rgb and 255

        val R = r.toFloat() / 255.0
        val G = g.toFloat() / 255.0
        val B = b.toFloat() / 255.0

        if(R > G && R > B){
            return ((G - B) / (R - Math.min(G, B))).toFloat()
        }else if(G > R && G > B){
            return (2.0 + ((B - R) / G - Math.min(R, B))).toFloat()
        }else{
            return (4.0 + ((R - G) / (B - Math.min(R, G)))).toFloat()
        }
    }
}
