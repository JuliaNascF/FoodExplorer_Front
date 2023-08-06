
import { Container, Content, Form, Image } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { IngredientsTag } from "../../components/IngredientsTag";
import { Textarea } from "../../components/Textarea";
import { PageError } from "../../components/PageError/index.jsx";
import { AlertModal } from '../../components/AlertModal';
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiCamera } from "react-icons/fi";

export function DishEdition() {
    const { user } = useAuth()
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [data, setData] = useState(null);
    const [image, setImage] = useState();
    const [imageFile, setImageFile] = useState(null)
    
        const navigate = useNavigate();

   async function handleRemoveDish() {
        setLoadingDelete(true);

        try {
            await api.delete(`/dishes/${params.id}`);
            setAlertMessage("Prato removido com sucesso!");
            setShowAlert(true);
            navigate("/");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                setAlertMessage("Erro ao remover prato!");
            setShowAlert(true);
            }
        }

        setLoadingDelete(false);
    }


    function handleChangeImage(event) {
        const file = event.target.files[0];
        setImageFile(file);

        const imagePreview = URL.createObjectURL(file);
        setImage(imagePreview);
    }

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            setAlertMessage("Você está tentando inserir um nome de ingrediente inválido!");
            setShowAlert(true);
            return;
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    // Update Dish Function
    async function handleUpdateDish() {
        if (!image) {
            setAlertMessage("Você não inseriu uma imagem para o prato!");
            setShowAlert(true);
            return;
        }
        
        if (newIngredient) {
            setAlertMessage("Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique no sinal de + para adicionar!");
            setShowAlert(true);
            return;;
        }
        
        if (!ingredients || ingredients.length === 0) {
            setAlertMessage("Adicione pelo menos um ingrediente!");
            setShowAlert(true);
            return;
        }
        if (!category) {
            setAlertMessage("Você não selecionou a categoria do prato!");
            setShowAlert(true);
            return;
        }

        if (!price) {
            setAlertMessage("Você não informou o preço do prato!");
            setShowAlert(true);
            return;
        }

        if (!description) {
            setAlertMessage("Você não informou uma descrição para o prato!");
            setShowAlert(true);
            return;
        }

        setLoading(true);

        const formData = new FormData();
        if (imageFile) {
            formData.append("file", imageFile);
        }
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))


        await api
            .put(`/dishes/${params.id}`, formData)
            .then( setAlertMessage("Prato atualizado com sucesso!"),setShowAlert(true)
          , navigate("/"))
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    setAlertMessage("Erro ao atualizar o prato!");
                    setShowAlert(true)
                }
            });

        setLoading(false);
    }

    useEffect(() => {
        async function fetchDish() {
            const response = await api.get(`/dishes/${params.id}`);
            setData(response.data);

            const { name, description, category, price, ingredients, image } = response.data;
            setName(name);
            setDescription(description);
            setCategory(category);
            setPrice(price);
            setIngredients(ingredients.map(ingredient => ingredient.name));
            setImage(image);
        }

        fetchDish();
    }, [])

   

    return (

        <Container>
            <Header />

            {
                user.isAdmin ?

                    <Content>



                        {
                            data &&

                            <Form>
                                <header>
                                    <Link to="/">
                                        <ButtonText title="Voltar" icon={RiArrowLeftSLine} />
                                    </Link>
                                    <h1>Editar prato</h1>
                                </header>

                                <div className="details">
                                    <div className="dishImage">
                                        <p>Imagem do Prato</p>

                                        <Image>
                                            <img
                                                src={image ? image : data.image}
                                                alt="Foto do prato"
                                            />

                                            <label htmlFor="image">
                                                <FiCamera />

                                                <input
                                                    id="image"
                                                    type="file"
                                                    name="file"
                                                    accept="file/*"
                                                    onChange={handleChangeImage}
                                                />
                                            </label>
                                        </Image>
                                    </div>

                                    <div className="dishDetails">
                                        <div className="dishName">
                                            <div className="dish">
                                                <p>Nome do prato</p>
                                                <Input
                                                    placeholder="Ex.: Salada Caesar"
                                                    type="text"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="dishCategory">
                                                <p>Categoria</p>

                                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                                    <option value="default" disabled>Selecione a categoria</option>
                                                    <option value="dish">Prato</option>
                                                    <option value="drink">Bebida</option>
                                                    <option value="dessert">Sobremesa</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="dishIngredients">
                                            <div className="ingredientsTag">
                                                <div>
                                                    <p>Ingredientes</p>
                                                    <div className="ingredients">
                                                        {
                                                            ingredients.map((ingredient, index) => (
                                                                <IngredientsTag
                                                                    key={String(index)}
                                                                    value={ingredient}
                                                                    onClick={() => handleRemoveIngredient(ingredient)}
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
                                            </div>

                                            <div className="price">
                                                <p>Preço</p>
                                                <Input
                                                    placeholder="R$ 00,00"
                                                    type="number"
                                                    value={price}
                                                    onChange={e => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="textarea">
                                    <p>Descrição</p>
                                    <Textarea
                                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                        defaultValue={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>

                            </Form>
                        }


                        <div className="button">
                            <Button
                                className="deleteButton"
                                title={loadingDelete ? "Excluindo prato" : "Excluir prato"}
                                onClick={handleRemoveDish}
                                disabled={loadingDelete}
                            />
                            <Button
                                title={loading ? "Salvando alterações" : "Salvar alterações"}
                                onClick={handleUpdateDish}
                                disabled={loading}
                            />
                        </div>

                    </Content>

                    :

                    
                   <PageError/>
            }

            <Footer />

            {showAlert && <AlertModal message={alertMessage}  onClose={() => setShowAlert(false)} />}
        </Container>

    );
}