import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return <h1>You are directed to the home page.</h1>;
}

export default Redirect;
