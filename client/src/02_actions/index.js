import axios from 'axios';
import { RESET, ORDER_BY_POPULATION, FILTER_BY_ACTIVITIES, FILTER_BY_CONTINENT, GET_COUNTRIES, ORDER_BY_NAME, SEARCH_COUNTRIES, GET_ACTIVITIES, POST_ACTIVITIES, DETAIL } from '../04_const/Const'


export function getCountries() {
    return async function (dispatch) { 
        try {
            var json = await axios.get('http://localhost:3001/countries') // se obtiene la lista de paises.
            return dispatch({ 
                type: GET_COUNTRIES,
                payload: json.data // se actualiza el estado con la lista de paises.
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function searchCountries(search) { // se busca un pais en la lista de paises.
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries?name=' + search) // se obtiene la lista de paises.
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: json.data
            });
        } catch (error) {
            alert('El pais no fue encontrado')
            console.log(error)
        }
    }
}

export function filterCountriesByContinent(payload) { 
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterCountriesByActivity(payload) {
    return {
        type: FILTER_BY_ACTIVITIES, 
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload 
    }
}

export function orderByPopulation(payload) {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function getActivities() { // se obtiene la lista de actividades.
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/activity'); 
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        } catch (error) {
            alert('No hay actividades')
            console.log(error)
        }
    }
}

export function postActivities(payload) { // se agrega una actividad.
    return async function (dispatch) {
        await axios.post('http://localhost:3001/activity', payload);
        return dispatch({
            type: POST_ACTIVITIES,
        })
    }
}
 
export function getDetail(id) { // se obtiene el detalle de un pais.
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/countries/' + id); // se obtiene la lista de paises.
            return dispatch({
                type: DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export function restartDetail() { // se resetea el detalle del pais.
    return (dispatch) => {
        dispatch({ type: RESET })
    }
}
