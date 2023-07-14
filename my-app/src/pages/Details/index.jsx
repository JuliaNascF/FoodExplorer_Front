// Styling Imports
import { Container, Content, Ingredient, PurchaseCard } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";


import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { BsReceipt } from 'react-icons/bs';

export function Details() {

    const { user } = useAuth()


    const [data, setData] = useState(null);
    const params = useParams();


    const [quantity, setQuantity] = useState(1);

    // Increase Quantity
    const increase = () => {
        if (quantity > 19) {
            alert("Erro: A quantidade máxima é de 20 unidades")
            return;
        }
        setQuantity(count => count + 1);
    };

    // Decrease Quantity
    const decrease = () => {
        if (quantity < 2) {
            alert("Erro: A quantidade mínima é 1 unidade")
            return;
        }
        setQuantity(count => count - 1);
    };

    useEffect(() => {
        async function fetchDishDetail() {
            const response = await api.get(`/dishes/${params.id}`);
            setData(response.data);
        }

        fetchDishDetail();
    }, []);

    return (

        <Container>
            <Header />
            {
                data &&

                <Content>




                    <ButtonText
                        title="Voltar"
                        icon={RiArrowLeftSLine}

                    />


                    <div className="content">

                        <div className="dish">
                            <img alt="Logo" />
                            <div className="description">

                                <h1>Macarronada</h1>

                                <h3>Bem massuda</h3>

                              

                                <div className="price">
                                    <h4>R$ </h4>

                                    <div className="purchaseCard">
                                        {
                                            user.isAdmin ?

                                                <PurchaseCard>
                                                    {
                                                        data &&
                                                       
                                                            <Button
                                                                title="editar prato"
                                                                icon={BsReceipt}
                                                            />
                                                  
                                                    }
                                                </PurchaseCard>

                                                :

                                                <PurchaseCard>
                                                    <div className="counter">
                                                        <ButtonText
                                                            icon={FiMinus}
                                                           
                                                        />
                                                        <span>{quantity.toString().padStart(2, '0')}</span>
                                                        <ButtonText
                                                            icon={FiPlus}
                                                          
                                                        />
                                                    </div>

                                                    <Button
                                                        title="incluir"
                                                        icon={BsReceipt}
                                                       
                                                        style={{ height: 56, width: 92, padding: '12px 4px' }}
                                                    />
                                                </PurchaseCard>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Content>
            }
            <Footer />
        </Container>

    );
}