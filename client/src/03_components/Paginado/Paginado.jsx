import React from "react";
import './Paginado.css'

export default function Paginado({countriesPerPage, countries, paginado}){
    const pageNumbrers = [] // creo un arreglo para guardar los numeros de paginas.
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) { //calculo en numero de paginas 
        pageNumbrers.push(i)   // guardo los numeros de paginas en el arreglo.
    }
    return(
        <nav className='paginadoContainer'>
            <ul className ='ul'>
                {pageNumbrers &&  // si el arreglo no esta vacio, se renderiza el componente.
                pageNumbrers.map(number =>( 
                    // se renderiza el componente con los numeros de paginas.
                    <li key={number}> 
                    <a className ='numeroPaginado' href onClick={()=>paginado(number)}> {number} </a>     
                    </li> 
                ))}
            </ul>
        </nav>
    )
}


// 1. se crea un arreglo para guardar los numeros de paginas.
// 2. se calcula en numero de paginas
// 3. se guardan los numeros de paginas en el arreglo.
// 4. se renderiza el componente con los numeros de paginas.
// 5. se le asigna una clase al componente.
// 6. se le asigna una funcion al componente.
