// Styling Imports
import { Container, Content, Form } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { IngredientsTag } from "../../components/IngredientsTag/index.jsx";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiUpload } from "react-icons/fi";

export function DishCreation( ) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            return alert("Erro: Você está tentando inserir um nome de ingrediente inválido!");
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted){
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    async function handleNewDish() {
        if (!image) {
            return alert("Erro: Você não inseriu uma imagem para o prato!");
        }
        
        if (!name) {
            return alert("Erro: Você não informou o nome do prato!");
        }

        if (ingredients.length < 1) {
            return alert("Erro: Adicione pelo menos um ingrediente!")
        }

        if (newIngredient) {
            return alert("Erro: Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique no sinal de + para adicionar!");
        }

        if (!category) {
            return alert("Erro: Você não selecionou a categoria do prato!");
        }

        if (!price) {
            return alert("Erro: Você não informou o preço do prato!");
        }

        if (!description) {
            return alert("Erro: Você não informou uma descrição para o prato!");
        }

       

      
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("file", image);
    
    
        for (let i = 0; i < ingredients.length; i++) {
          formData.append("ingredients", ingredients[i]);
        }
    
        setLoading(true);
    
        try {
          // Fazer a chamada para a API utilizando o método POST
          await api.post("/dishes", formData);
    
          alert("Prato adicionado com sucesso!");
          navigate("/");
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert("Erro ao criar o prato!");
          }
        }
    
        setLoading(false);
      }
      
    return(
                <Container>
                    <Header />
                                <Content>


                                <Form>
                                    <header>
                                        <Link to="/">
                                            <ButtonText title="Voltar" icon={RiArrowLeftSLine}/>
                                        </Link>
                                        <h1>Adicionar prato</h1>
                                    </header>

                                    <div className="details">
                                        <div className="dishImage">
                                            <p>Imagem do Prato</p>
                                            <label htmlFor="file">
                                                <FiUpload size={24}/> 
                                                Selecione imagem 
                                            </label>
                                            <Input 
                                                type="file"
                                                id="file" 
                                                name="file"
                                                accept="file/*" 
                                                onChange={e => setImage(e.target.files[0])}
                                            />
                                        </div>
                                        
                                        <div className="dish">
                                            <p>Nome do prato</p>
                                            <Input
                                                placeholder="Ex.: Salada Caesar"
                                                type="text"
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="dishCategory">
                                            <p>Categoria</p>

                                            <select defaultValue={'default'} onChange={e => setCategory(e.target.value)}>
                                                <option value="default" disabled>Selecione a categoria</option>
                                                <option value="dish">Prato</option>
                                                <option value="drink">Bebida</option>
                                                <option value="dessert">Sobremesa</option>
                                            </select> 
                                        </div>
                                    </div>

                                    <div className="ingredientsTag">
                                        <div>
                                            <p>Ingredientes</p>
                                            <div className="ingredients">
                                                {
                                                    ingredients.map((ingredient, index) => (
                                                        <IngredientsTag 
                                                            key={String(index)} 
                                                            value={ingredient} 
                                                            onClick={() => handleRemoveIngredient(ingredient) }
                                                            
                                                        />
                                                    ))
                                                }

                                                <IngredientsTag 
                                                    isNew 
                                                    placeholder="Adicionar" 
                                                    onChange={e => setNewIngredient(e.target.value)}
                                                    value={newIngredient}
                                                    onClick={handleAddIngredient}
                                                />
                                            </div>
                                        </div>

                                      

                                        <div className="price">
                                            <p>Preço</p>
                                            <Input
                                                placeholder="R$ 00,00"
                                                type="number"
                                                onChange={e => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="textarea">
                                        <p>Descrição</p>
                                        <Textarea 
                                            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </div>

                                </Form>

                                <div className="button">
                                    <Button 
                                        title={loading ? "Salvando alterações" : "Salvar alterações"}
                                        onClick={handleNewDish} 
                                        disabled={loading}
                                    />
                                </div>

                                </Content>

                    
                        <Footer />
                </Container>
    );
}