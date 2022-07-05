import MapView from './MapView';
import '../index.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/default.css';
import bus from '../assets/img/bus4.png';
import RoutesLists from './RoutesList';
import { Search } from './Search';
import { useState } from 'react';

const SEL = 'custom-section';
const SECTION_SEL = `.${SEL}`;

const FullPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [routeSelected, setRouteSelected] = useState([]);

    const handleSearch = (newSearch) => {
        setSearchQuery(newSearch);
    };

    const handleClickItem = (item) => {
        console.log("SELECTED ITEM", item);
        setRouteSelected([item]);
    };

    return (
        <div >
            <div className="section 2">
                        <div className="home">
                            <div className="slider-image">
                                <img src={bus} alt="BusApp Icon" />
                                <h1 className="title">BusApp</h1>
                            </div>
                            <div className="container">
                                <div className="slider-content">
                                    <Search
                                        handleSearch={handleSearch}
                                        filteredRoute={searchQuery}
                                        handleClickItem={handleClickItem}
                                        />
                                </div>       
                            </div>
                            <div>
                                {routeSelected.length > 0 ? 
                                  <div> <RoutesLists rutas={routeSelected} /></div>
                                  : <div></div>
                                 }
                                
                            </div>
                        </div>
                        <div className="map-content">
                            {' '}
                            <MapView rutas={routeSelected} />
                        </div>
            </div>
        </div>
    );
};

export default FullPage;
