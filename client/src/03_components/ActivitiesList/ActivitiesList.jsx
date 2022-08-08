import React from "react";
import { useSelector } from "react-redux";
import Activity from "../Activity/Activity";
import NavBar from "../NavBar/NavBar";
import "./ActivityList.css";

export default function ActivitiesList() { 
  const activities = useSelector((state) => state.activities); // se obtiene la lista de actividades.
  return (
    <div className="activityListContainer">

      <div>
        <NavBar /> 
      </div>

      <div className="activityCardListContainer">{ // se renderiza la lista de actividades.
      activities?.map((acc) => { // se verifica que la lista no este vacia.
          return (
            <div className="activityCardList">
              <Activity 
                name={acc.name} 
                duration={acc.duration}
                season={acc.season}
                difficulty={acc.difficulty}
              />
            </div> 
          )
        })}
      </div>
      
    </div>
  );
}
