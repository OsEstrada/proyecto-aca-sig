const axios = require("axios").default;
const service = {}

service.getRoutes = async (names) => {
    console.log(names);
    try {
        const response = [];
        var route;

        for (var i = 0; i < names.length; i++) {
            try {
                let routeData = await axios.get(`https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i].route}/query?where=OBJECTID+>%3D+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=+OBJECTID%2CNAME%2CTIPO_RUTA%2CRECORRIDO%2CH_INIC_LV%2CH_FIN_LV%2CH_INIC_SD%2CH_FIN_SD%2CORIGEN%2CDESTINO%2CTARIFA_AUT%2CKILOMETROS%2CCODIGO_RUTA%2CTARIFA_EXCLU%2CTIPO_UNIDAD+&returnGeometry=false&sqlFormat=none&f=pjson`);

                route = {
                    "name": names[i].name,
                    "url": `https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i].route}`,
                    "data": routeData.data.features
                };

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