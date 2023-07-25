
import { Container, Content } from "./styles";
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { FaSpinner } from "react-icons/fa";
import { ButtonText } from "../../components/ButtonText";
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";


export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        alert("Erro ao remover produto dos favoritos!");
      }
    
  }


  return (
    <Container>
      <Header />
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
                <div className="detailsDishe">
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
      <Footer/>
    </Container>
  );
}