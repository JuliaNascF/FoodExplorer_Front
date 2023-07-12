// Styling Imports
import { Container, Content, Banner } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Card } from "../../components/Card";

import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import background from "../../assets/Mask group.png"


export function Home() {

    const [dishes, setDishes] = useState([])
    const [search, setSearch] = useState("")





    return (

        <Container>
            <Header />
            <main>


                <Content>


                    <Banner>
                        <img src={background} alt="Imagem de ingredientes" />

                        <div className="banner">
                            <div className="title">
                                <h1>Sabores inigualáveis</h1>
                                <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
                            </div>
                        </div>
                    </Banner>

                  
                        <p>Refeições</p>

                        <div className="card">

                            <Card />
                            <Card />
                            <Card />
                        
                        </div>

                        <p>Sobremesas</p>
                        <div className="card">

                            <Card />
                            <Card />
                            <Card />
                        
                        </div>

                        <p>Bebidas</p>

                        <div className="card">

                            <Card />
                            <Card />
                            <Card />
                         
                        </div>
                    
                </Content>
                <Footer />
            </main>
        </Container>

    );
}