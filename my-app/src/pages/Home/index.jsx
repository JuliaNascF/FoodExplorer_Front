// Styling Imports
import { Container, Content, Banner, Category } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Card } from "../../components/Card";
import { useRef } from "react";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import background from "../../assets/Mask group.png"
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md"

export function Home() {
  const [dishes, setDishes] = useState([]);


  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await api.get('/dishes');
        setDishes(response.data);
        

        
      } catch (error) {
        console.error('Erro ao buscar os pratos:', error);
    
      }
    }

    fetchDishes();
  }, []);

  const refeicoesProductContainerRef = useRef(null);
  const sobremesaProductContainerRef = useRef(null);
  const bebidaProductContainerRef = useRef(null);

  const scrollLeft = (category) => {
    if (category === 'refeicao') {
      refeicoesProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    } else if (category === 'sobremesa') {
      sobremesaProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    } else if (category === 'bebida') {
      bebidaProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (category) => {
    if (category === 'refeicao') {
      refeicoesProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    } else if (category === 'sobremesa') {
      sobremesaProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    } else if (category === 'bebida') {
      bebidaProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    }
  };

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
           
           <Category> 
          <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('refeicao')} />

          <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={refeicoesProductContainerRef}>
            {dishes
              .filter((card) => card.category === "refeicao")
              .map((card) => (
                <Card
                  key={card.id}
                  name= {card.name}
                  image={card.image}
                  description={card.description}
                  price={card.price}
                  data={card}
                />
              ))}
          </div>


          <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('refeicao')} />
          </Category>


          <p>Sobremesas</p>
          <Category> 
          <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('sobremesa')} />

          <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={sobremesaProductContainerRef}>
            {dishes
              .filter((card) => card.category === "sobremesa")
              .map((card) => (
                <Card
                  key={card.id}
                  name= {card.name}
                  image={card.image}
                  description={card.description}
                  price={card.price}
                  data={card}
                />
              ))}
          </div>


          <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('sobremesa')} />
          </Category>


          <p>Bebidas</p>
          <Category> 
          <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('bebida')} />

          <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={bebidaProductContainerRef}>
            {dishes
              .filter((card) => card.category === "bebida")
              .map((card) => (
                <Card
                  key={card.id}
                  name= {card.name}
                  image={card.image}
                  description={card.description}
                  price={card.price}
                  data={card}
                />
              ))}
          </div>


          <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('bebida')} />
          </Category>

        </Content>
        <Footer />
      </main>
    </Container>

  );
}