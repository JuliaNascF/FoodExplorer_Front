
import { Container, Content } from "./styles";
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { PageError } from '../../components/PageError';
import { FaSpinner } from "react-icons/fa";
import { ButtonText } from "../../components/ButtonText";
import { AlertModal } from '../../components/AlertModal';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";


export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useAuth();

  async function fetchFavorites() {
    try {
      const resp = await api.get(`/favorites`);
      setFavorites(resp.data.favorites);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }


  async function removeFromFavorites(id) {
      try {
       await api.delete(`/favorites/${id}`);
        fetchFavorites();
      } catch (error) {
        setAlertMessage("Erro ao remover produto dos favoritos!");
        setShowAlert(true);
      }
    
  }


  return (
    <Container>
      <Header />
      {
        user.isAdmin? 
        <PageError/>

        :
        <Content>
    
        <div className="back">
          <ButtonText onClick={handleBack}  icon={FiArrowLeft} />
          <h3>Meus Favoritos</h3>
        </div>
          <div className="favorites">

        {isLoading ? (
          <FaSpinner size={25} className="loading-spinner" />
          ) : favorites.length > 0 ? (
            favorites.map((favorite) => (
              <div
              className="favorite"
              key={favorite._id}
              >
                <img  onClick={() => handleDetails(favorite.id)} src={favorite.image} alt="" />
                <div className="detailsDish">
                <h1>{favorite.name} </h1>
                 <ButtonText color title="Remover dos Favoritos" onClick={() => removeFromFavorites(favorite.id)}/>
                </div>
              </div>
            ))
            ) : (
              <p>Você não possui favoritos.</p>
              )}
            
              </div>
        </Content>
          }
      <Footer/>
      {showAlert && <AlertModal message={alertMessage}  onClose={() => setShowAlert(false)} />}
    </Container>
  );
}