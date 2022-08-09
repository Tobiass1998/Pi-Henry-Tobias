import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getActivities } from "../../02_actions";
import { INVIERNO, VERANO, OTOÑO, PRIMAVERA } from "../../04_const/Const";
import NavBar from "../NavBar/NavBar";
import "./ActivityCreate.css";

function validate(input) { // funcion para validar los campos.
  let errors = {};
  if (!input.name) {
    errors.name = "Debe completar este campo";
  } else if (!input.duration) {
    errors.duration = "Debe completar este campo";
  } else if (!input.difficulty) {
    errors.difficulty = "Debe seleccionar la complejidad";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una estacion";
  } else if (input.countryId === []) {
    errors.countryId = "Debe seleccionar un pais";
  }
  return errors;
}

export default function ActivityCreate() { // esta funcion es la que se renderiza en el componente ActivityCreate
  const dispatch = useDispatch();  // se crea un dispatch para poder usarlo en el componente
  const history = useHistory();
  const countries = useSelector((state) => state.allCountries);  // se crea una variable para poder usarla en el componente
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({ 
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryId: [],
  });

  useEffect(() => { // cuando se carga la pagina, se cargan los paises.
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) { // funcion para cambiar los campos.
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({ // se valida los campos.
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(i) { // funcion para eliminar un pais.
    setInput({
      ...input,
      countryId: input.countryId.filter((el) => el !== i),
    });
  }

  function handleSelect(e) { // funcion para seleccionar un pais.
    setInput({ ...input, countryId: [...input.countryId, e.target.value] });
  }

  function handleSubmit(e) { // funcion para crear una actividad.
    e.preventDefault();
    if (input.name === "" || // si el campo nombre esta vacio, se muestra un error.
    input.duration === "" ||
    input.difficulty === "" ||
    input.season === "" ||
    input.countryId.length === 0) return alert('Debe llenar los campos');
    dispatch(postActivities(input)); // se envia la actividad a la base de datos. 
    alert("Actividad Creada");
    setInput({
      name: "",
      duration: "",
      difficulty: "",
      season: "",
      countryId: [],
    });
    history.push("/home"); // redirecciona a la pagina principal.
  }

  return (
    <div className="">
      <div>
        <NavBar />
      </div>

      <div className="activityCardContainer">
        <div className="activityCard">
          <div className="activityTitle">
          </div>  

          <form className="formActivity" onSubmit={handleSubmit}>
            <span className='titleCreateActivity'> Crea una Actividad </span>
            <div className="inputActivities">
              <label className='labelActivity'></label>
              <input
                className="i"
                type="text"
                placeholder="Coloque la Actividad..."
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="e">{errors.name}</p>}
            </div>
            <div className="inputActivities">
              <label></label>
              <input
                className="i"
                type="text"
                value={input.duration}
                name="duration"
                placeholder="Coloque la Duracion..."
                onChange={handleChange}
              />
              {errors.duration && <p className="e">{errors.duration}</p>}
            </div>
            <div className="inputActivities">
              <label> Dificultad </label>
              <input
                className="i"
                type="range"
                name="difficulty"
                min="1"
                max="5"
                value={input.difficulty}
                onChange={(e) => handleChange(e)}
              />
              {errors.difficulty && <p className="e"> {errors.difficulty}</p>}
            </div>
            <div className="seasonInput">
              <select
                className="i"
                name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}
              >
                <option className='op' > Temporada </option>
                <option className='op' value={INVIERNO}>Invierno</option>
                <option className='op' value={VERANO}>Verano</option>
                <option className='op' value={OTOÑO}>Otoño</option>
                <option className='op' value={PRIMAVERA}>Primavera</option>
              </select>
              {errors.season && <p className="e">{errors.season}</p>}
            </div>
            {errors.countryId && <p className="e">{errors.countryId}</p>}

            <div>
              <select  className="i" onChange={(e) => handleSelect(e)}>
                <option className='op' > Paises </option>
                {countries.map((v) => (
                  <option className='op' value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="textArea">
              {input.countryId.map((country) => (
                <div className='countrieAndButton'>
                  <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(country)}/>
                  <p className='pOfCountry'>{country}</p>
                </div>
              ))}
            </div>
            <div>
              <button className='btnActivity' type="submit">Crear Actividad</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
