const axios = require("axios").default;
const service = {}

service.getRoutes = async (names) => {
    try {
        const response = [];
        var route;
        
        for (var i = 0; i < names.length; i++) {
            try {
                let stops;
                // Método que trae toda la info de las rutas de buses
                let routeData = await axios.get(`https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i].route}/query?where=OBJECTID+>%3D+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&sqlFormat=none&f=pjson`);

                if(!routeData.data.features){
                        alert("Esta ruta no existe en la base de datos");
                        throw new Error("error");
                }

                // Función que trae toda la info de las paradas de buses
                if(names[i].stops){
                    stops = await axios.get(`https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i].stops}/query?where=OBJECTID+>%3D0&&geometryType=esriGeometryPoint&outFields=*&returnGeometry=true&f=pgeojson`);
                    stops = stops.data.features;
                }else{
                    stops = [];
                }

                // Definición del objeto de ruta
                route = {
                    "name": names[i].name,
                    "url": `https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i].route}`,
                    "data": routeData.data.features,
                    "municipality": routeData.data.fields[8].domain.codedValues,
                    "stops": stops,
                };
                console.log("Route", route);
                response.push(route);
            } catch (e) {
                console.log(`no se pudo esta ruta: ${names[i].name}`);
            }
        }

        return response;
    } catch (e) {
        console.log(e);
    }
}

export default service;