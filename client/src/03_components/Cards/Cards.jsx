import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterCountriesByContinent, filterCountriesByActivity, orderByName, orderByPopulation, getActivities} from "../../02_actions/index";
import { LESS_POPULATION, HIGHER_POPULATION, ALL, ALL_OF_AFRICA, ALL_OF_N_AMERICA, ALL_OF_S_AMERICA, ALL_OF_ANTARCTICA, ALL_OF_ASIA, ALL_OF_EUROPE, ALL_OF_OCEANIA, ASCENDENTE, DESCENDENTE} from "../../04_const/Const";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado"
import "./Cards.css";

export default function Home() {
  const dispatch = useDispatch();   // utilizamos las constantes y vamos despachando las acciones.
  const activities = useSelector((state) => state.activities);  // me traigo todo lo que esta en el estado de actividades y countries.

  
  const countries = useSelector((state) => state.countries);  

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const lastCountry = currentPage * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountry = countries.slice(firstCountry, lastCountry);
  const [, setOrden] = useState("");

  const paginado = (pageNumber) => { // funcion para cambiar de pagina.
    setCurrentPage(pageNumber); // cambio la pagina actual.
  };

  function reloadButton(e){ // funcion para recargar la pagina.
    e.preventDefault()
    dispatch(getCountries())
  }

  function handleFilterContinent(e) { // funcion para filtrar por continente.
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterActivity(e) { // funcion para filtrar por actividad.
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) { // funcion para ordenar por nombre.
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSort2(e) { // funcion para ordenar por poblacion.
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  useEffect(() => {  // cuando se carga la pagina, se cargan los paises.
    dispatch(getCountries());
    dispatch(getActivities()); // carga las actividades.
  }, [dispatch]); // se ejecuta solo una vez. Cuando siempre este el dispatch.

  return ( // se renderiza el componente.
    <div className="cardsContainer">
      <div className="filterContainer">
      <button id='b1' className='filterAndOrder' onClick={(e)=>reloadButton(e)}>Recargar</button>

        <select className='filterAndOrder' // select para filtrar por continente.
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option>Filtrar por Orden Alfabetico</option>
          <option value={ASCENDENTE}> A-Z </option>
          <option value={DESCENDENTE}> Z-A </option>
        </select>

        <select className='filterAndOrder'
          onChange={(e) => {
            handleSort2(e);
          }}
        >
          <option>Filtrar por poblacion</option>
          <option value={HIGHER_POPULATION}>Mayor Poblacion</option>
          <option value={LESS_POPULATION}>Menor Poblacion</option>
        </select>
              
        <select className='filterAndOrder' onChange={(e) => handleFilterActivity(e)}>  
          <option value="todos"> Actividades </option>
          {activities.map((v) => (
            <option value={v.name}>{v.name}</option>
          ))} 
        </select>

        <select className='filterAndOrder' onChange={(e) => handleFilterContinent(e)}>
          <option value="continent">Continentes</option>
          <option value={ALL}>Todos</option>
          <option value={ALL_OF_AFRICA}>Africa</option>
          <option value={ALL_OF_ANTARCTICA}>Antartida</option>
          <option value={ALL_OF_N_AMERICA}>America del Norte</option>
          <option value={ALL_OF_S_AMERICA}>America del Sur</option>
          <option value={ALL_OF_ASIA}>Asia</option>
          <option value={ALL_OF_EUROPE}>Europa</option>
          <option value={ALL_OF_OCEANIA}>Oceania</option>
        </select>
      </div>

      <Paginado
        countriesPerPage={countriesPerPage} // cantidad de paises por pagina.
        countries={countries.length} 
        paginado={paginado}
      />

      <div className='cardsBox'>  
        {currentCountry?.map((country) => { // se renderiza el componente card.
          return (
            <div key={country.id}>
              <Link to={"/home/" + country.id}>
                <Card
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                  capital={country.capital}
                  population={country.population}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
