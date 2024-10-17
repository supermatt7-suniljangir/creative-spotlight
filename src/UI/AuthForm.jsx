import React from "react";
import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import Logo from "./Logo";
import useSignup from "../features/authentication/useSignup";
import { useLogin } from "../features/authentication/useLogin";
import { Link } from "react-router-dom";

const AuthForm = ({type, text}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {signup, isPending:isSigningup, isSuccess:isSuccessSignup} = useSignup();
const {login, isPending:isLoggingin, isSuccess:isSuccessLogin} = useLogin();

  const onSubmit = (data) => {
    const {name, email, password} = data;

    if(type === "signup") signup({fullName:name, email, password}, {onSuccess: reset()});
    if(type==="login") login({email, password}, {onSuccess: reset()})
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-[var(--bg-quaternary)] flex flex-col rounded shadow-md items-center justify-center">
        <h2 className="text-2xl  text-center font-semibold text-[var(--color-primary)] mb-6">
{text}        </h2>
        <form
          className="flex space-y-4 flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
        {type==="signup" && <FormRow
            type="text"
            fieldName="name"
            id="name"
            register={register}
            errors={errors}
            label="Name"
            requirements={{ required: "Name is required" }}>
            <FormRow.Label></FormRow.Label>
            <FormRow.Input></FormRow.Input>
            <FormRow.Error></FormRow.Error>
          </FormRow>
}
          <FormRow
            type="email"
            fieldName="email"
            id="email"
            label="Email"
            register={register}
            errors={errors}
            requirements={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email",
              },
            }} >
            <FormRow.Label></FormRow.Label>
            <FormRow.Input></FormRow.Input>
            <FormRow.Error></FormRow.Error>
          </FormRow>

          <FormRow
            type="password"
            register={register}
            errors={errors}
            fieldName="password"
            id="password"
            label="Password"
            requirements={{
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}>
            <FormRow.Label></FormRow.Label>
            <FormRow.Input></FormRow.Input>
            <FormRow.Error></FormRow.Error>
          </FormRow>
<div className="py-2 ml-auto capitalize text-[var(--color-dark)]">
{type === "login" &&  <p>new to creative spotlight? <Link className="text-[var(--color-link)]" to="/signup">signup</Link></p>}
{type === "signup" &&  <p>existing user? <Link to="/login" className="text-[var(--color-link)]">login</Link></p>}
</div>
          <button
            type="submit"
            className="text-[var(--color-light)] bg-[var(--bg-secondary)]  font-bold py-2 px-4 mx-auto rounded focus:outline-none focus:shadow-outline"
          disabled={isSigningup || isLoggingin}>
          {isSigningup || isLoggingin ? 
          "processing..." 
          : 
         type === "signup"  ? 'sign up' : 'log in'
          }

          </button>
        </form>
      </div>
      
    </div>
  );
};

export default AuthForm;
