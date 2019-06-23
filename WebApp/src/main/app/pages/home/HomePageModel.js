import {createApiData} from '../../redux/ApiDataModel';
import {call, fork, select, takeEvery} from 'redux-saga/effects';
import {getData, isApiDataSuccess} from '../../models/ApiDataModel';
import _map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';

export const HomeAction = {
  GET_ROUTES: 'HomeAction.GET_ROUTES',
  SET_TO: 'HomeAction.SET_TO',
  SET_FROM: 'HomeAction.SET_FROM',
};

let platform;

let map;

let ui;

export function getPlatform() {
  if (!platform) {
    platform = new H.service.Platform({
      app_id: 'nCSzEMs5Mt4xNwpSu67q',
      app_code: 'BKcZWZqhrhY2sMaIlmKh6Q',
      useHTTPS: true
    });
  }
  return platform;
}

export function getMap() {
  if (!map) {
    var maptypes = platform.createDefaultLayers();
    map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.normal.map,
      {
        zoom: 7,
        center: {lng: 37.35, lat: 53.55}
      });
    var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
    map.addEventListener('tap', function (evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer.type);
    });

    ui = H.ui.UI.createDefault(map, maptypes);

// Instantiate the default behavior, providing the mapEvents object:
    var behavior = new H.mapevents.Behavior(mapEvents);
    window.map = map;
  }
  return map;
}

export function setToAction(to) {
  return {type: HomeAction.SET_TO, payload: {to}};
}

export function setFromAction(from) {
  return {type: HomeAction.SET_FROM, payload: {from}};
}

export function getRoutesAction() {
  return {type: HomeAction.GET_ROUTES};
}

const GET_ROUTES_API_DATA_KEY = "Home.GET_ROUTES_API_DATA_KEY";

const DEFAULT_STATE = {};

export function reduceHome(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case HomeAction.SET_TO: {
      state = {...state};
      state.to = payload.to;
      break;
    }
    case HomeAction.SET_FROM: {
      state = {...state};
      state.from = payload.from;
      break;
    }
  }

  return state;
}

export function selectHome(state) {
  return state.home;
}

export function selectFrom(state) {
  return selectHome(state).from;
}

export function selectTo(state) {
  return selectHome(state).to;
}

function* getRoutesSaga() {
  const from = yield select(selectFrom);
  const to = yield select(selectTo);
  const routesApiData = yield call(createApiData, GET_ROUTES_API_DATA_KEY, 'http://routesearcherapi.azurewebsites.net/api/RouteSearcher/GetRoutes', {from, to});

// Get an instance of the routing service:
  var router = getPlatform().getRoutingService();

  if (routesApiData::isApiDataSuccess()) {
    const routes = routesApiData::getData()[0].routes;
    const routingParams = _map(routes, route => ({
      'mode': `fastest;${route.transport === 'Пешком' ? 'pedestrian' : 'car'}`,
      // The start point of the route:
      'waypoint0': `geo!${route.points[0].coordinate.latitude},${route.points[0].coordinate.longitude}`,
      // The end point of the route:
      'waypoint1': `geo!${last(route.points).coordinate.latitude},${last(route.points).coordinate.longitude}`,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display',
      'transport': route.transport
    }));

    const getOnResultCallback = (transport) => {
      return function (result) {
        var route,
          routeShape,
          startPoint,
          endPoint,
          linestring;
        if (result.response.route) {
          // Pick the first route from the response:
          route = result.response.route[0];
          // Pick the route's shape:
          routeShape = route.shape;

          // Create a linestring to use as a point source for the route line
          linestring = new H.geo.LineString();

          // Push all the points in the shape into the linestring:
          routeShape.forEach(function (point) {
            var parts = point.split(',');
            linestring.pushLatLngAlt(parts[0], parts[1]);
          });

          // Retrieve the mapped positions of the requested waypoints:
          startPoint = route.waypoint[0].mappedPosition;
          endPoint = route.waypoint[1].mappedPosition;

          const getRandomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          };


          // Create a polyline to display the route:
          var routeLine = new H.map.Polyline(linestring, {
            style: {strokeColor: getRandomColor(), lineWidth: 10}
          });

          // Create a marker for the start point:
          var startMarker = new H.map.Marker({
            lat: startPoint.latitude,
            lng: startPoint.longitude
          });

          startMarker.addEventListener('tap', function (evt) {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
              // read custom data
              content: evt.target.getData()
            });
            // show info bubble
            ui.addBubble(bubble);
          }, false);

          // Create a marker for the end point:
          var endMarker = new H.map.Marker({
            lat: endPoint.latitude,
            lng: endPoint.longitude
          });
          endMarker.setData(transport);

          endMarker.addEventListener('tap', function (evt) {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
              // read custom data
              content: evt.target.getData()
            });
            // show info bubble
            ui.addBubble(bubble);
          }, false);
          startMarker.setData(transport);

          // Add the route polyline and the two markers to the map:
          getMap().addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          getMap().setViewBounds(routeLine.getBounds());
        }
      }
    };

    // Define a callback function to process the routing response:

    if (!isEmpty(routingParams)) {
      for (let routingParam of routingParams) {
        router.calculateRoute(routingParam, getOnResultCallback(routingParam.transport),
          function (error) {
            alert(error.message);
          });
      }
    }
  }

}

function* watch() {
  yield takeEvery(HomeAction.GET_ROUTES, getRoutesSaga);
}

export function* watchHome() {
  yield fork(watch);
}
