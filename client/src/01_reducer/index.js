/* eslint-disable array-callback-return */
import { FILTER_BY_ACTIVITIES, FILTER_BY_CONTINENT, GET_COUNTRIES, ORDER_BY_NAME, SEARCH_COUNTRIES, ASCENDENTE, POST_ACTIVITIES, GET_ACTIVITIES, ORDER_BY_POPULATION, HIGHER_POPULATION, DETAIL, RESET } from '../04_const/Const'

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) { // se verifica el tipo de accion.
        case GET_COUNTRIES: // se obtiene la lista de paises.
            return {
                ...state, // se retorna el estado actual.
                countries: action.payload, // se actualiza el estado con la lista de paises.
                allCountries: action.payload // se actualiza el estado con la lista de paises.
            }

        case FILTER_BY_CONTINENT: // se filtra la lista de paises por continente.
            const filtredCountriesByContinent = state.allCountries // se obtiene la lista de paises.
            const continentFilteredBC = action.payload === 'All' ? filtredCountriesByContinent : filtredCountriesByContinent.filter(el => el.continent === action.payload) // se filtra la lista de paises por continente.
            return { 
                ...state, // se retorna el estado actual.
                countries: continentFilteredBC // se actualiza el estado con la lista de paises filtrada.
            }

        case FILTER_BY_ACTIVITIES:
            const filtredCountriesByActivities = state.allCountries
            const continentFilteredBA = filtredCountriesByActivities.filter((c) => { return c.activities.find((c) => { return c.name === action.payload; }); });

            if (action.payload === 'todos') {
                return { ...state, countries: filtredCountriesByActivities }
            } else {
                return {
                    ...state,
                    countries: continentFilteredBA
                }
            }

        case POST_ACTIVITIES: // se agrega una actividad a la lista de actividades.
            return {
                ...state , // se retorna el estado actual.
            }

        case GET_ACTIVITIES: // se obtiene la lista de actividades.
            return {
                ...state,
                activities: action.payload // se actualiza el estado con la lista de actividades.
            }

        case DETAIL: // se obtiene el detalle de un pais.
            return {
                ...state,
                detail: action.payload // se actualiza el estado con el detalle del pais.
            }

        case RESET:
            return {
                ...state,
                detail: []
            }

        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
 
        case ORDER_BY_NAME: // se ordena la lista de paises por nombre.
            let orderCountriesByName = action.payload === ASCENDENTE ? state.countries.sort((a, b) => {  // se ordena la lista de paises por nombre.
                if (a.name < b.name) { 
                    return -1; 
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }) :
                state.countries.sort((a, b) => { 
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })

            return {
                ...state,
                countries: orderCountriesByName
            }

            case ORDER_BY_POPULATION:
                let orderCountriesByPopulation = action.payload === HIGHER_POPULATION ? state.countries.sort((a, b)=> {
                    if (a.population < b.population) {
                        return 1;
                    }
                    if (a.population > b.population) {
                        return -1;
                    }

            }) :
                state.countries.sort((a, b) => {

                    if (a.population < b.population) {
                        return -1;
                    }
                    if (a.population > b.population) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                countries: orderCountriesByPopulation
            }

        default:
            return state;
    }
}
