import React, {createContext, useContext} from "react";
import { useForm } from "react-hook-form";

const FormRowContext = createContext();


// the parent componenet
function FormRow({children, ...props}) {

 return <FormRowContext.Provider value={props}>
     <div>{children}</div> 
    </FormRowContext.Provider>
}


// child components

function Label(){
  const {id, label} = useContext(FormRowContext);
  return <label
        className="block text-[var(--color-primary)] text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
}

function Input(){
const {id, type, fieldName, register, requirements} = useContext(FormRowContext)
  return <input
        id={id}
        className="shadow bg-[var(--bg-secondary)] font-medium appearance-none border rounded w-full py-2 px-3 text-stone-200 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        {...register(fieldName, {
          required: `${fieldName} is required`, 
        //   the rest of the requirements received from the parent component are here
    //    if patterns exists in the requirements object, add it to the register method
    ...(requirements.pattern && { pattern: requirements.pattern }),
    // if minLength exists in the requirements object, add it to the register method
    ...(requirements.minLength && { minLength: requirements.minLength }),
        })}
      />
}
function Error(){
const {errors, fieldName} = useContext(FormRowContext);
 return errors[fieldName] && 
 <p className="text-red-600 text-sm font-medium italic">{errors[fieldName].message}</p>
        
}
FormRow.Label = Label;
FormRow.Error = Error;
FormRow.Input = Input;


export default FormRow;
