import React from 'react'
import { Button } from "semantic-ui-react";
import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const {setSelectedForm} = props;
  return (
    <div className='auth-options'>
         {/* la funcion setSelectedForm("lo que queramos") cambia el estado del setSelectedForm el estado de los props que recibimos a login o register para mostrar u ocultar el componente que esta en pantalla */}
        <h2>Millones de canciones, Gratis en Musicfy!</h2>
        <Button className='register' onClick={() => setSelectedForm("register")}>
          Registrate Gratis
        </Button>
        <Button className='login' onClick={() => setSelectedForm("login")}>
          Iniciar Sesion
        </Button>
    </div>
  )
}
