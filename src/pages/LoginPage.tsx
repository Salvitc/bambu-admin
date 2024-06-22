import { LoginForm } from "../components/LoginForm"
import { Spin } from "antd";
import { useEffect, useState } from "react";
import AlertPopup from "../components/AlertPopup";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)
  const [incorrectPassword, setIncorrectPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLogin = async () => {
      return await fetch("/api/user/role", {
        method: 'GET'
      });
    }

    fetchLogin()
      .then((response) => {
        setIsLoading(false)
        if (response.ok) {
          navigate("/dashboard")
        }
      })

  }, []);
  return (
    <>
      <div className="bg-green-50 w-screen h-screen flex items-center flex-col justify-center font-sans tracking-wide">
        {isLoading ?
          <Spin size="large" /> :
          <LoginForm
            setUnauthorized={setUnauthorized}
            setIncorrectPassword={setIncorrectPassword}
          />
        }
        {
          unauthorized &&
          <AlertPopup
            setProp={setUnauthorized}
            text="No tienes permisos para entrar en este portal"
          />
        }
        {
          incorrectPassword &&
          <AlertPopup
            setProp={setIncorrectPassword}
            text="Contraseña Incorrecta"
          />
        }
      </div>
    </>
  )
}

export default LoginPage
