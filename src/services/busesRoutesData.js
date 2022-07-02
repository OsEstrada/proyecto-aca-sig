const axios = require("axios").default;
const service = {}

service.getRoutes = async (names) => {
    try {
        const response = [];
        var route;

        for (var i = 0; i < names.length; i++) {
            try {
                route = await axios.get(`https://services9.arcgis.com/4ZwMO9wShTnUDuWy/ArcGIS/rest/services/${names[i]}?f=pjson`);
                response.push(route.data);
            } catch (e) {
                console.log(`no se pudo esta ruta: ${names[i]}`);
            }
        }

        return response;
    } catch (e) {
        console.log(e);
    }
}

export default service;