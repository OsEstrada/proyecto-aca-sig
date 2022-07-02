const routes = {};

routes.all = [
    // buses
    { name: 'AB-0A', route: 'AB000A0/FeatureServer/0' },
    { name: 'MB-2A', route: 'MB002A0/FeatureServer/0' },
    // TODO: añadir mas rutas del país aqui
];

routes.buses = [
    { name: 'AB-0A', route: 'AB000A0/FeatureServer/0' },
];

routes.microbuses = [
    { name: 'MB-2A', route: 'MB002A0/FeatureServer/0' },
]

routes.default = [
    { name: 'AB-0A', route: 'AB000A0/FeatureServer/0' },
    { name: 'MB-2A', route: 'MB002A0/FeatureServer/0' },
];

export default routes;
