
import { Container, Content, PurchaseCard } from './styles.js'
import { Button } from '../Button';
import { ButtonText } from "../ButtonText";
import { useAuth } from "../../hooks/auth";
import { api } from '../../services/api.js';
import { useState, useEffect } from "react";
import { BsReceipt } from 'react-icons/bs';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export function Card({ data, image, description, name, price,  ...rest }) {
    const { user } = useAuth()
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate= useNavigate();

    function handleDetails(id) {
        navigate(`/details/${id}`)
      }
    
    const increase = () => {
        if (quantity > 19) {
            alert("Erro: A quantidade máxima é de 20 unidades")
            return;
        }
        setQuantity(count => count + 1);
        console.log(image)
    };
     
    const decrease = () => {
        if (quantity < 2) {
            alert("Erro: A quantidade mínima é 1 unidade")
            return;
        }
        setQuantity(count => count - 1);
    };

      function handleFavoriteClick() {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  }

  async function addToFavorites() {
    if (user && user.id) {
      setIsFavorite(true);
      try {
        const response = await api.post(`/favorites/${data.id}`);
        console.log(response)
      } catch (error) {
      }
    } else {
    
    }
  }

  async function removeFromFavorites() {
    if (user && user.id) {
      setIsFavorite(false);
      try {
       await api.delete(`/favorites/${data.id}`);
       
      } catch (error) {
      }
    } else {
     
    
    }
  }

  useEffect(() => {
    async function checkFavoriteStatus() {
      if (user && user.id) {
        try {
          const response = await api.get(`/favorites/check/${data.id}`);
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
        
        }
      }
    }

    checkFavoriteStatus();
  }, [user, data.id]);

  async function AddToCart(id, quantity) {
      try {
        await api.post(`/cart/${id}`, { quantity });
        alert("Produto adicionado ao carrinho!");
       
      } catch (error) {
        alert("Erro ao adicionar produto ao carrinho!");
       
      }
  }
  
    return (
        <Container {...rest}>
            {
                user.isAdmin ?

                    <Content>
                        <div className="container">
                            <img onClick={() => handleDetails(data.id)} src={image} alt="Imagem do prato" />
                           
                                <h3 onClick={() => handleDetails(data.id)} className="disheName">{name}</h3>
                        
                            <p onClick={() => handleDetails(data.id)} className="description">{description}</p>
                            <h1 onClick={() => handleDetails(data.id)} className="price">R${price}</h1>
                          
                                <Button
                                    title="editar prato"
                                    icon={BsReceipt}
                                />
                        
                        </div>
                    </Content>

                :

                    <Content>
                        <button onClick={handleFavoriteClick}
                            className="favButton"
                           
                            >
                              {isFavorite ?
                                    <AiFillHeart />
                                :
                                    <AiOutlineHeart />
                                }  
                                
                        </button>

                        <div  className="container">
                            <img onClick={() => handleDetails(data.id)}  src={image} alt="Imagem do prato" />
                           
                                <h3 onClick={() => handleDetails(data.id)}  className="disheName">{name} </h3>
                
                            <p onClick={() => handleDetails(data.id)} className="description">{description}</p>
                            <h1 onClick={() => handleDetails(data.id)} className="price">R${price}</h1>

                            <PurchaseCard>
                                <div className="counter">
                                    <ButtonText 
                                        icon={FiMinus}
                                        onClick={decrease}
                                    />
                                    <span>{quantity.toString().padStart(2, '0')}</span>
                                    <ButtonText 
                                        icon={FiPlus}
                                        onClick={increase}
                                    />
                                </div>

                                <Button 
                                    title="incluir"
                                    icon={BsReceipt}
                                    onClick={() => AddToCart(data.id)}
                                    style={ { height: 56, width: 92, padding: '12px 4px' } }
                                />
                            </PurchaseCard>
                        </div>
                    </Content>
                }
        </Container>
    );
}