import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
// import { validateEmail } from "../../../Utils/Validations";
import firebase from "../../../Utils/Firebase";
import "firebase/auth";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props
  const [formData, setFormData] = useState(defaulValueForm())
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userActive, setUserActive] = useState(true)
  const [user, setUser] = useState(null)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    setFormError({})
    let errors = {}
    let formOk = true
    if(!formData.email) {
      errors.email = true; 
      formOk = false; 
    }
    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false; 
    }
    setFormError(errors);

    if (formOk) {
      console.log(formData)
      setIsLoading(true)
      firebase.auth( ).signInWithEmailAndPassword(formData.email, formData.password)
      .then(response => {
        console.log(response.user)
        setUserActive(true)
      })
      .catch(err => {
        console.log(err.code)
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  };
  return (
    <div>
    <div className="login-form">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Ingrese su correo"
            icon="mail outline"
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>
              Introduzca un contraseña de mas de 6 digitos.
            </span>
          )}
        </Form.Field>
        
      </Form>
    </div>
    <div className="login-form__button">
      <Button type="submit" onClick ={onSubmit} className="continue-button" loading = {isLoading}>Continuar</Button>
    </div>
      <div className="login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
      </div>
    </div>

  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password": 
      toast.warning("contraseña incorrect")
    break;
    case "auth/too-manu-request":
      toast.warning("has intentado demasiadas veces")
    break;
    case "auth/user-not-found":
      toast.warning("usuario o contraseña incorrectos.")
    break;
    default:
    break;
  }
}
function defaulValueForm() {
  return {
    email: "",
    password: "",
  }
}