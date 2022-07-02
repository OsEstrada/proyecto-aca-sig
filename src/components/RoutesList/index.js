import React, { useEffect, useState } from 'react';
import RoutesService from '../../services/busesRoutesData';
import color from "randomcolor";

/**
 *
 * @param routesBuses
 * @param routesMicrobuses
 * @returns {JSX.Element}
 * @constructor
 */

const RoutesList = ({ routesBuses, routesMicrobuses, rutas }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [loading, isLoading] = useState(true);


    useEffect(() => {
        //aqui va route.route
        routeInfo(rutas);

        console.log('ruta seleccionada', selectedRoute);
    }, [rutas])



    const listItemsBuses = routesBuses.map((route) =>
        <li className="list">{route.name}</li>
    );

    const listItemsMicrobuses = routesMicrobuses.map((route) =>
        <li className="list">{route.name}</li>
    );

    const routeInfo = (route) => {
        isLoading(true);
        RoutesService.getRoutes(route).then((response) => {
            setSelectedRoute(response);
        }).catch((e) => {
            console.log(e, "No se han podido cargar las rutas");
        }).finally(() => {
            isLoading(false);
        })
    }

    return (
        <div className="listab">
            <div class="card">


                <h3 className="title3">{selectedRoute ? null : "SELECIONE UNA RUTA EN EL BUSCADOR"}</h3>
                <div class="features">
                    <div className="pareja2">
                    </div>
                    <div className="pareja2">
                    </div>
                    <div className="pareja2">
                    </div>
                    <div className="pareja2">
                    </div>
                    <div className="pareja2">

                    </div>
                    <div className="pareja2">
                    </div>



                </div>

                <a href="#secondPage" class="btn">Ir al mapa</a>

            </div>









        </div>

    );
}

export default RoutesList;