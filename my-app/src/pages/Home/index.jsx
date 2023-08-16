import { Container, Content, Banner, Category } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Card } from "../../components/Card";
import { useRef } from "react";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import background from "../../assets/Mask group.png";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md"

export function Home() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);



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


  useEffect(() => {
    async function fetchDishes() {

      const resp = await api.get("/dishes");
      setLoading(false);
      const allDishes = resp.data;

      const filteredProducts = allDishes.filter((dishes) => {
        const lowerCaseSearch = search.toLowerCase();
        const lowerCaseTitle = dishes.name.toLowerCase();
        const lowerCaseCategory = dishes.category.toLowerCase();

        return (
          lowerCaseTitle.includes(lowerCaseSearch) ||
          lowerCaseCategory.includes(lowerCaseSearch)
        );
      });
      setDishes(filteredProducts);
    }
    fetchDishes();
  }, [search]);

  const dishProductContainerRef = useRef(null);
  const dessertProductContainerRef = useRef(null);
  const drinkProductContainerRef = useRef(null);

  const scrollLeft = (category) => {
    if (category === 'dish') {
      dishProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    } else if (category === 'dessert') {
      dessertProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    } else if (category === 'drink') {
      drinkProductContainerRef.current.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (category) => {
    if (category === 'dish') {
      dishProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    } else if (category === 'dessert') {
      dessertProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    } else if (category === 'drink') {
      drinkProductContainerRef.current.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <Header value={search} setSearch={setSearch} showSearch={true} />
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
            <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('dish')} />

            <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={dishProductContainerRef}>
            {loading ? (
               Array.from({ length: 7 }).map((_, index) => (
                <SkeletonTheme key={index} baseColor="hsla(200, 100%, 5%, 1)" highlightColor="#1f2133">
                  <Skeleton containerClassName="flex-1" height={350} width={250} borderRadius={10} style={{ marginRight: '10px' }} />
                </SkeletonTheme>
              ))
              ) : (
                dishes
                  .filter((card) => card.category === "dish")
                  .map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      image={card.image}
                      description={card.description}
                      price={card.price}
                      data={card}
                    />
                  ))
              )}
            </div>


            <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('dish')} />
          </Category>


          <p>Sobremesas</p>
          <Category>
            <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('dessert')} />

            <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={dessertProductContainerRef}>
            {loading ? (
               Array.from({ length: 7 }).map((_, index) => (
                <SkeletonTheme key={index} baseColor="hsla(200, 100%, 5%, 1)" highlightColor="#1f2133">
                  <Skeleton containerClassName="flex-1" height={350} width={250} borderRadius={10} style={{ marginRight: '10px' }} />
                </SkeletonTheme>
              ))
              ) : (
                dishes
                  .filter((card) => card.category === "dessert")
                  .map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      image={card.image}
                      description={card.description}
                      price={card.price}
                      data={card}
                    />
                  ))
              )}
            </div>


            <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('dessert')} />
          </Category>


          <p>Bebidas</p>
          <Category>
            <ButtonText icon={MdOutlineArrowBackIosNew} onClick={() => scrollLeft('drink')} />

            <div className="card" style={{ display: "flex", scrollBehavior: "smooth" }} ref={drinkProductContainerRef}>
            {loading ? (
               Array.from({ length: 7 }).map((_, index) => (
                <SkeletonTheme key={index} baseColor="hsla(200, 100%, 5%, 1)" highlightColor="#1f2133">
                  <Skeleton containerClassName="flex-1" height={350} width={250} borderRadius={10} style={{ marginRight: '10px' }} />
                </SkeletonTheme>
              ))
              ) : (
                dishes
                  .filter((card) => card.category === "drink")
                  .map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      image={card.image}
                      description={card.description}
                      price={card.price}
                      data={card}
                    />
                  ))
              )}
            </div>


            <ButtonText icon={MdOutlineArrowForwardIos} onClick={() => scrollRight('drink')} />
          </Category>

        </Content>
        <Footer />
      </main>
    </Container>

  );
}