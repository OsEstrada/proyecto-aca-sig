import React, { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    LayersControl,
    useMap,
    LayerGroup,
    useMapEvent,
    Marker,
    Popup
} from 'react-leaflet'
//import color from 'randomcolor';
import Icon from '../IconMarker';
import 'leaflet/dist/leaflet.css'
import Routes from '../../data/RoutesNames';
import RoutesService from '../../services/busesRoutesUrls';
import { randomColors } from '../../data/ColorsNames'
import { FeatureLayer } from "react-esri-leaflet";

/**
 *
 * @param rutas
 * @param centerProp
 * @returns {JSX.Element}
 * @constructor
 */

const MapView = ({ rutas, centerProp }) => {
    const [routes, setRoutes] = useState([]);
    const [center, setCenter] = useState([13.7153719325982, -89.19499397277833]);
    const [loading, isLoading] = useState(true);
    const [colors, setColors] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [bounds, setBounds] = useState(null);

    const referenciaRuta = useRef();
    const referenciaMapa = useRef();

    const MapUtil = ({ bounds }) => {
        const map = useMap();

        if (bounds) {
            map.fitBounds(bounds);
        }

        return null;
    }

    const MapEvents = () => {
        const map = useMapEvent({
            click: () => {
                setSelectedRoute(null);
            }
        })

        return null;
    }

    /*const PopUp = (route) => {
        return A pretty CSS3 popup. <br/> Easily customizable.""
    }*/

    useEffect(() => {
        isLoading(true)
        var routes = rutas.length > 0 ? rutas : Routes.default;

        RoutesService.getRoutes(routes).then((response) => {
            setRoutes(response);
            setColors(randomColors());
        }).catch((e) => {
            console.log(e, "No se han podido cargar las rutas");
        }).finally(() => {
            isLoading(false);
        })

        if (rutas.length === 1 && referenciaRuta.current != null) {
            console.log(referenciaMapa.current);
        }

    }, [rutas]);

    useEffect(() => {
        setSelectedRoute(null);
        if (routes.length > 0) {
            setSelectedRoute(routes[0]);
        }

    }, [routes])

    return (
        <div>

            <MapContainer center={centerProp || (center)} zoom={13} scrollWheelZoom={false}>
                {<MapUtil bounds={bounds} />}
                {<MapEvents />}
                <ZoomControl position="bottomright" />
                <LayersControl position="bottomright" collapsed={true}>

                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {routes.map((route, index) => {
                        return (
                            <LayersControl.Overlay

                                name={route.name}
                                checked>
                                {!loading ?
                                    <FeatureLayer
                                        style={colors[index]}
                                        url={route.url}
                                        eventHandlers={{
                                            load: () => console.log("route in map", route)
                                        }} />
                                    :
                                    <div>
                                        <a>Cargando</a>
                                    </div>
                                }
                            </LayersControl.Overlay>
                        )
                    })}

                    {routes.filter(route => route.stops.length > 0).map(route => {
                        return (
                            <LayersControl.Overlay name={`Paradas ${route.name}`}>
                                <LayerGroup>
                                    {!loading ?
                                        <div>
                                            {route.stops.map(e => {
                                                return (
                                                    <Marker position={[e.geometry.coordinates[1], e.geometry.coordinates[0]]} icon={Icon}>
                                                        <Popup>
                                                            {e.properties.NOMBRE}
                                                        </Popup>
                                                    </Marker>
                                                )
                                            })}
                                        </div>
                                        :
                                        <div>
                                            <a>Cargando</a>
                                        </div>
                                    }
                                </LayerGroup>
                            </LayersControl.Overlay>
                        )
                    })}
                </LayersControl>
            </MapContainer>

        </div>
    );
}

export default MapView;