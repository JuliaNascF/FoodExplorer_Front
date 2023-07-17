
import { Container, Content, PurchaseCard } from './styles.js'
import { Button } from '../Button';
import { ButtonText } from "../ButtonText";
import { useAuth } from "../../hooks/auth";

import { useState } from "react";
import { BsReceipt } from 'react-icons/bs';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export function Card({ data, image, description, name, price,  ...rest }) {
    const { user } = useAuth()
    const navigate= useNavigate();
    const [quantity, setQuantity] = useState(1);

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

    return (
        <Container onClick={() => handleDetails(data.id)} {...rest}>
            {
                user.isAdmin ?

                    <Content>
                        <div className="container">
                            <img src={image} alt="Imagem do prato" />
                           
                                <h3 className="product-title">{name}</h3>
                        
                            <p className="description">{description}</p>
                            <h1 className="price">R${price}</h1>
                          
                                <Button
                                    title="editar prato"
                                    icon={BsReceipt}
                                />
                        
                        </div>
                    </Content>

                :

                    <Content>
                        <button 
                            className="favButton"
                           
                            >
                            
                                    <AiFillHeart />
                                
                                    <AiOutlineHeart />
                                
                        </button>

                        <div className="container">
                            <img src={image} alt="Imagem do prato" />
                           
                                <h3 className="product-title">{name} </h3>
                
                            <p className="description">{description}</p>
                            <h1 className="price">R${price}</h1>

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
                                    style={ { height: 56, width: 92, padding: '12px 4px' } }
                                />
                            </PurchaseCard>
                        </div>
                    </Content>
                }
        </Container>
    );
}