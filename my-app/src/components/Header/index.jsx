import { Container, Content, Search, ButtonMenu, Profile, Logout} from "./styles";
import { Button } from "../Button";
import order from "../../assets/order.svg"

import { FiSearch, FiLogOut, FiUser, FiHeart } from 'react-icons/fi';


import logo from '../../assets/logo.svg';


export function Header({search, favoritesFilter}) {

    function mobileMenu() {
        document.getElementById('hamburger').classList.toggle('active')
        document.getElementById('nav-menu').classList.toggle('active')
    }

 

    return (
        <Container>
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
                    
                    <img id="order" src={order} alt="" />


                <div className="nav-menu" id="nav-menu">

                    <Search>
                        <label>
                            <FiSearch size={24}/>
                            <input 
                                type="text" 
                                placeholder="Busque por pratos"
                                onChange={e => {search(e.target.value)}}
                            />
                        </label>
                    </Search>

                    <p>Meus favoritos</p>
                    <p>Histórico de Pedidos</p>
                     
                     <div className="button">
                    
                        
                    <Button image={order} title="Pedidos"/>

                     </div>
                       
                    <Logout>

                        <FiLogOut />
                    </Logout>
                 
                
                </div>

            </Content>
        </Container>
    );
}