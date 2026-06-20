import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. check if the user is Authenticated
  const { isLoading, isAuthenticated } = useUser();
  //2. if there is no  authencated user redirect to thelog in page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  //3. while Loading show spinner
  if (isLoading) return <Spinner />;

  //4. if there is
  if (isAuthenticated) return children;
}
export default ProtectedRoute;
