import React from 'react'
import AuthForm from '../UI/AuthForm'
import RecruiterWindow from '../UI/RecruiterWindow'

function Login() {
  return (
    <>
    <RecruiterWindow/>
    <AuthForm type="login" text="Login into your account"/>
    </>
  )
}

export default Login