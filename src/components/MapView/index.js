import React, { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    LayersControl,
    useMap,
    useMapEvent
} from 'react-leaflet'
import color from 'randomcolor';
import Icon from '../IconMarker';
import 'leaflet/dist/leaflet.css'
import Routes from '../../data/RoutesNames';
import RoutesService from '../../services/busesRoutesUrls';
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
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [colors, setColors] = useState([]);
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
        const colorsArray = [];

        RoutesService.getRoutes(routes).then((response) => {

            for (var i = 0; i < response.length; i++) {
                colorsArray.push(
                    color({ luminosity: 'dark' })
                );
            }
            setColors(colorsArray);
            setRoutes(response);
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
                                        url={route.url}
                                        eventHandlers={{
                                            loading: () => console.log('featurelayer loading'),
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
                </LayersControl>

                {/*<Marker position={[13.6527, -88.8684]} icon={Icon}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>*/}
            </MapContainer>

        </div>
    );
}

export default MapView;