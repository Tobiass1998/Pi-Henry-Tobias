import React from "react";
import{Link} from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return(
        <div className ="landingPage">
            <h1 className = 'landingTitle'> Bienvenidos </h1>
            <Link to ='/home'>
                <button className='landingButton'>Comenzar </button>
            </Link>
        </div>
    )
}