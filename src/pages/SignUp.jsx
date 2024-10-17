import React from 'react'
import AuthForm from '../UI/AuthForm';
import RecruiterWindow from '../UI/RecruiterWindow';

function SignUp() {
  return (
    <>
    <RecruiterWindow/>
<AuthForm type="signup" text="create a new account"/>  
    </>
  )
}

export default SignUp;