import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
// import { validateEmail } from '../../../Utils/Validations'
import firebase from '../../../Utils/Firebase';
import 'firebase/auth';

import "./RegisterForm.scss"

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaulValueForm()); 
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const onChange = e => {
    // console.log("Name: " + e.target.name);
    // console.log("Value: " + e.target.value);
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    })
  }
  
  const onSubmit = () => {
    console.log("dsadsa", formData)
    setFormError({});
    let errors = {};
    let formOk = true;
    
    // console.log(validateEmail(formData.email))

    // esto es para tener la validacion por email
    // if(!validateEmail(formData.email)) {
    //   errors.email = true; 
    //   formOk = false; 
    // }
    // end esto es para tener la validacion por email
    if(!formData.email) {
      errors.email = true; 
      formOk = false; 
    }
    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false; 
    }
    if(!formData.username) {
      errors.username = true;
      formOk = false; 
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
        changeUserName();
        sendVerificationEmail(); 
      })
      .catch((error) => {
        toast.error(error, "Ocurrio un error al crear la cuenta")
      })
      .finally(() => {
        setIsLoading(false);
        setSelectedForm(null); 
      })
    }
  }

  const changeUserName = () => {
    firebase.auth().currentUser.updateProfile({
      displayName: formData.username
    }).catch(() => {
      toast.error("Error al asignar nombre del usuario");
    })
  }

  const sendVerificationEmail = () => {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      toast.success("Se ha enviado un email de verificaion");
    }).catch(() => {
      toast.error("Error al enviar correo de verificacion");
    })
  }
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Musicfy Gratis.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Correo Electronico'
            icon='mail outline'
            error={formError.email}
          />
          {formError.email && (
            <span className='error-text'>
              Introduzca un correo Valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Contraseña'
            icon={showPassword ? (<Icon name='eye slash outline' link onClick={handlerShowPassword}/>) : (<Icon name='eye' link onClick={handlerShowPassword}/>)}
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>
              Introduzca un contraseña de mas de 6 digitos.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='Nombre'
            icon='user circle outline'
            error={formError.username}
          />
          {formError.username && (
            <span className='error-text'>
              Introduzca un nombre.
            </span>
          )}
        </Form.Field>
        <Button type='submit' loading = {isLoading}>
          Continuar
        </Button>
      </Form>
      <div className='register-form__options'>
        <p onClick={() => {setSelectedForm(null)}}>Volver</p>
        <p>¿Ya tienes Musicfy? {""}
          <span onClick={() => {setSelectedForm("login")}}>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  )
}

function defaulValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  }
}
