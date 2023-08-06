import { Container } from "./styles"
import { useNavigate } from "react-router-dom";


 export function AlertModal({ message, onClose, showLoginButton  }) {
  const navigate = useNavigate();
  function handleSignIn(){
    navigate("/signin")
  }
  return (
    <Container>
  
      <div className="alert-modal">
        <p>{message}</p>
    
        <button onClick={onClose}>Fechar</button>

   
       

        
      </div>
   
    </Container>
  );
};