import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/post"); 
    }, 2000); // Redirect after a 2-second delay
  }, []);

  return (
    <div>
      Page Not Found
    </div>
  );
}
