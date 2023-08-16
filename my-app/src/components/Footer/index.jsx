import { Container, Content } from "./styles";
import logo from '../../assets/logo-gray.svg'

export function Footer() {
    return (
        <Container>
            <Content>
             
                    <div className="logo">    
                        <img src={logo} alt="" />
                        <span>food explorer</span>
                    </div>
              

                <p>
                    © 2023 - Todos os direitos reservados.
                </p>

            </Content>
        </Container>
    );
}