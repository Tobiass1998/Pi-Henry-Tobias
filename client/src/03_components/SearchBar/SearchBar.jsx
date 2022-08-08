import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../02_actions/index';
import './SearchBar.css'

export default function SearchBar() { // se renderiza el buscador.
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    
    function onSubmit(e){ // se ejecuta al presionar el boton buscar.
        e.preventDefault();
        if (search.length === 0) return alert('Debe colocar un Pais'); // se verifica que el campo no este vacio.
        dispatch(searchCountries(search)) // se ejecuta la accion de buscar paises.
    }

    function onInputChange(e){ // se ejecuta al escribir en el campo de busqueda.
        e.preventDefault();
        setSearch(e.target.value) // se actualiza el valor del campo de busqueda.
   
    }

    return (<div className='formSearchBar'> 
        <form  onSubmit={onSubmit}>
            <input className='inputCountry' type="text" placeholder='Colocar pais...' onChange={onInputChange} value={search} />
            <input className='inputButton' type="submit" value="" />
        </form>
    </div>)
}
