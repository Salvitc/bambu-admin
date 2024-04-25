import { FormEvent } from 'react'
import logo from "../assets/bambu-logo.png"
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface Props{
  setUnauthorized: React.Dispatch<React.SetStateAction<boolean>>
}
  
export const LoginForm = ({setUnauthorized}: Props) => {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const response = await fetch("/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    if(response.ok){
      navigate("/dashboard")
    } else {
      setUnauthorized(true);
    }
  }

  return (
    <>
    <div className="flex flex-row items-center antialiased">
      <h1 className="text-green-700 text-3xl font-bold">Bambú Dashboard</h1>
      <img className="mx-auto w-auto h-14" src={logo} alt="Bambu Logo"/>
    </div>
    <div className="flex flex-col px-14 py-6 bg-white rounded-2xl shadow-md">
    <div>
    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Entra en tu cuenta</h2>
    </div>
    <form className="space-y-6" onSubmit={handleLogin} method="POST">
      <div className=" w-80">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Dirección Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Contraseña
          </label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-green-700 hover:text-green-600">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button className="text-white bg-green-700 hover:bg-green-900	p-3 rounded-lg px-4 block w-full">Login</button>
      </div>
    </form>
  </div>
  </>
  )
}
