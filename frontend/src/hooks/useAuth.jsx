import React, { useContext } from 'react'
import { AuthContext } from '../utilities/providers/AuthProvider'

function useAuth() {
    const auth = useContext(AuthContext);
  return auth;
}

export default useAuth
