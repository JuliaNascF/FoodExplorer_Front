import { Container, Content, Search, Logout } from "./styles";
import { Button } from "../Button";
import order from "../../assets/order.svg"
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { useAuth } from "../../hooks/auth";
import logo from '../../assets/logo.svg';
import logoAdmin from '../../assets/logoAdmin.svg';

export function Header({ search, favoritesFilter }) {
    const { signOut } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();
    function mobileMenu() {
        document.getElementById('hamburger').classList.toggle('active')
        document.getElementById('nav-menu').classList.toggle('active')
    }

    function handleFavorites() {
        navigate("/favorites")
    }

    function handleOrder() {
        navigate("/order")
    }

    function handleHistory() {
        navigate("/history")
    }

    function handleCreate() {
        navigate("/create")
    }

    function handleInit() {
        signOut()
        navigate("/")
    }




    return (
        <Container>

            {
                user.isAdmin ?

                <Content>

                <div className="hamburger" id="hamburger" onClick={mobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className="logo">

                    <img src={logoAdmin} alt="" />
                    

                </div>

                <img onClick={handleHistory} id="order" src={order} alt="" />


                <div className="nav-menu" id="nav-menu">

                    <Search>
                        <label>
                            <FiSearch size={24} />
                            <input
                                type="text"
                                placeholder="Busque por pratos"
                                onChange={e => { search(e.target.value) }}
                            />
                        </label>
                    </Search>

                    <p onClick={handleCreate}>Novo Prato</p>
                  

                    <div className="button">


                        <Button onClick={handleHistory} image={order} title="Pedidos" />

                    </div>

                    <Logout >

                        <FiLogOut onClick={handleInit} />
                    </Logout>


                </div>

            </Content>

            :

                    <Content>

                        <div className="hamburger" id="hamburger" onClick={mobileMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        <div className="logo">

                            <img src={logo} alt="" />
                            <h1>food explorer</h1>

                        </div>

                        <img onClick={handleOrder}  id="order" src={order} alt="" />


                        <div className="nav-menu" id="nav-menu">

                            <Search>
                                <label>
                                    <FiSearch size={24} />
                                    <input
                                        type="text"
                                        placeholder="Busque por pratos"
                                        onChange={e => { search(e.target.value) }}
                                    />
                                </label>
                            </Search>

                            <p onClick={handleFavorites} >Meus favoritos</p>
                            <p onClick={handleHistory}>Histórico de Pedidos</p>

                            <div className="button">


                                <Button onClick={handleOrder} image={order} title="Pedidos" />

                            </div>

                            <Logout onClick={handleInit}>

                                <FiLogOut  />
                            </Logout>


                        </div>

                    </Content>
                  }
        </Container>
    );
}