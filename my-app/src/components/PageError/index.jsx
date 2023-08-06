import { Container } from './styles'
import { ButtonText } from '../ButtonText'
import { useNavigate } from 'react-router-dom'


import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from "react-router-dom";


export function PageError(){
    const navigate = useNavigate()

    function handleGoBack(){
        navigate("/")
    }

    return(
        <Container>
            <header>
                <Link to="/">
                    <ButtonText title="Voltar" icon={RiArrowLeftSLine} onClick={handleGoBack}/>
                </Link>
            </header>

            <div className="content">

                <div>
                    <h2>Error 401</h2>
                    <span>Oops!</span>
                    <h3>Você não possuí autorização para acessar esta página!</h3>
                </div>
            </div>
        </Container>
    )
}