import React, { use } from 'react';
import Banner from './Banner';
import LatestVehicles from './LatestVehicles';
import Categories from './Categories';
import AboutUs from './AboutUs';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';

const Home = () => {
    const { loading } = use(AuthContext)
    if(loading){
        return <Loading></Loading>
    }
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