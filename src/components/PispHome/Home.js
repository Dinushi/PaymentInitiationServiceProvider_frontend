import React, {Component} from "react";
import '../../styles/HomeStyles/Home.css';

import CarouselDiv from "./CarouselDiv";
import TaskPanel from "./TaskPanel";
import {getUsername} from '../../data-store/local-storage/index';


class Home extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="home">
                <div>
                    <h5 align="right">Logged-In : {getUsername()}</h5>
                    <div id="Carousel"><CarouselDiv/></div>
                    <TaskPanel />
                </div>

            </div>
        );
    }
}


export default Home;

