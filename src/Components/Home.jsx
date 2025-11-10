import React from 'react';
import Banner from './Banner';
import LatestVehicles from './LatestVehicles';
import Categories from './Categories';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestVehicles></LatestVehicles>
            <Categories></Categories>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;