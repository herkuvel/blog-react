import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import PropTypes from "prop-types";

function SmoothScroll({ children }) {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);
  return <>{children}</>;
}

SmoothScroll.propTypes = {
  children: PropTypes.any,
};

export default SmoothScroll;
