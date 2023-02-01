import React from 'react'
import { Button, Icon } from "semantic-ui-react";
import "./Topbar.scss";
// import LogoNameWhite from '../../../assets/png/logo-white.png'

export default function AuthOptions(props) {
  const {setSelectedForm} = props;
  return (
    <div className='auth-options'>
         {/* la funcion setSelectedForm("lo que queramos") cambia el estado del setSelectedForm el estado de los props que recibimos a login o register para mostrar u ocultar el componente que esta en pantalla */}
        <Button className='login'>
          <Icon name="home" />
        </Button>
        <Button className='login'>
          <Icon name="home" />
        </Button>
        <Button className='login'>
          <Icon name="home" />
        </Button>
        <div className='image-logo'>
          Soko
        </div>
        <Button className='register' onClick={() => setSelectedForm("login")}>
          Admin
        </Button>
    </div>
  )
}
