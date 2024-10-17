import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import useUser from "./useUser";
import {useEffect} from "react";
function ProtectedRoute({children}) {
  let navigate = useNavigate();

// load the authenticated user
const {isLoading, isAuthenticated, isPending} = useUser();

// if there is no authenticated useer, then redirect him to login page
useEffect(() => {
    if(!isAuthenticated && !isLoading && !isPending) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);


// while that is happening, show a spinner
if(isLoading && !isAuthenticated) return <Spinner/>

// if there is a user, render the app
  if(isAuthenticated) return children;
    }
    
    export default ProtectedRoute;