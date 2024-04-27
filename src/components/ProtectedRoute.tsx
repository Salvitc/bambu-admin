import { PropsWithChildren } from "react"
import { LoginProps } from "../types/types"
import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ( props: PropsWithChildren<LoginProps>) => {
  const isAuthorized = async (): Promise<boolean> => {
    const role = await fetch('/api/user/role', {
      method: 'GET',
    })
    const roleString = await role.json();

    if(roleString !== props.roleRequired){
      return false
    }

    return true
  }
  
  isAuthorized()
    .then((result) => {
      if(!result) {
        return <Navigate to="/error" replace />
      }
    })
    .catch(() => {
      return <Navigate to="/error" replace />
    })

  return props.children
}
