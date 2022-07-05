import React, { useEffect, useState } from 'react';
import RoutesUrls from '../../services/busesRoutesUrls';

/**
 *
 * @param routesBuses
 * @param routesMicrobuses
 * @returns {JSX.Element}
 * @constructor
 */

const RoutesList = ({ rutas }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        //aqui va route.route
        routeInfo(rutas);
        
        console.log('ruta seleccionada',selectedRoute );
    }, [rutas])

    const routeInfo = (route) => {
        isLoading(true);
        RoutesUrls.getRoutes(route).then((response) => {
            console.log("PRUEBA",response[0].data)
            //
            setSelectedRoute(response[0].data[0]);
        }).catch((e) => {
            console.log(e, "No se han podido cargar las rutas");
        }).finally(() => {
            isLoading(false);
        })
    }

    return (
        <div className="listab">
            <div class="card">
                <div class="features">
                    <div>
                        <h2 className="title  title2">Nombre: </h2><h2 className="title">Ruta {selectedRoute ? selectedRoute.attributes.NAME : null}</h2>
                    </div>
                    <div>
                        <h2 className="title title2">Origen:</h2><h2 className="title">{selectedRoute ? selectedRoute.attributes.ORIGEN : null}</h2>
                    </div>
                    <div>
                        <h2 className="title title2">Destino: </h2><h2 className="title">{selectedRoute ? selectedRoute.attributes.DESTINO : null}</h2>
                    </div>
                    <div>
                        <h2 className="title title2">Kilometros: </h2><h2 className="title">{selectedRoute ? selectedRoute.attributes.KILOMETROS : null}</h2>
                    </div>
                    <div>
                        <h2 className="title title2">Horario de lunes a viernes: </h2><h2 className="title">{selectedRoute ? selectedRoute.attributes.H_INIC_LV : null}</h2>
                        <h2 className="title">{selectedRoute ? selectedRoute.attributes.H_FIN_LV : null}</h2>
                    </div>
                    <div>
                        <h2 className="title title2">Horario de fin de semana: </h2><h2 className="title">{selectedRoute ? selectedRoute.attributes.H_INIC_SD : null}</h2>
                        <h2 className="title">{selectedRoute ? selectedRoute.attributes.H_FIN_SD : null}</h2>
                    </div>
                </div>
            </div>









        </div>

    );
}

export default RoutesList;