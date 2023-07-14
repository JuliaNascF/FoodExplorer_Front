
import { Container, Content, PurchaseCard } from './styles.js'

import { Button } from '../Button';
import { ButtonText } from "../ButtonText";

import { useAuth } from "../../hooks/auth";

import { useState } from "react";


import { BsReceipt } from 'react-icons/bs';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import imagePlaceholder from '../../assets/logo-gray.svg';

export function Card({ data, ...rest }) {

    const { user } = useAuth()
    

    const imageURL =  imagePlaceholder;
    
    const [quantity, setQuantity] = useState(1);

    //====increase quantity====//
    const increase = () => {
        if (quantity > 19) {
            alert("Erro: A quantidade máxima é de 20 unidades")
            return;
        }
        setQuantity(count => count + 1);
    };
     
    const decrease = () => {
        if (quantity < 2) {
            alert("Erro: A quantidade mínima é 1 unidade")
            return;
        }
        setQuantity(count => count - 1);
    };

    return (
        <Container {...rest}>
            {
                user.isAdmin ?

                    <Content>
                        <div className="container">
                            <img src={imageURL} alt="Imagem do prato" />
                        
                                <h3 className="product-title">njkfndjfndkjfn{' >'}</h3>
                      
                            <p className="description"></p>
                            <h1 className="price">R$</h1>
                          
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
                               
                             
                        </button>

                        <div className="container">
                            <img src={imageURL} alt="Imagem do prato" />
                        
                                <h3 className="product-title"> </h3>
                        
                            <p className="description"></p>
                            <h1 className="price">R$ </h1>

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