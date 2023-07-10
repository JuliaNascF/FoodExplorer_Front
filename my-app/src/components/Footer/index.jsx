import { Container, Content, Logo } from "./styles";
import logo from '../../assets/logo-gray.svg'

export function Footer() {
    return (
        <Container>
            <Content>
                <Logo>
                    <div className="logo">    
                        <img src={logo} alt="" />
                        <span>food explorer</span>
                    </div>
                </Logo>

                <p>
                    © 2023 - Todos os direitos reservados.
                </p>

            </Content>
        </Container>
    );
}