import { Container } from "./styles";
import { ButtonText } from "../ButtonText";
import { api } from "../../services/api";

export function CardOrder({data,quantity, onRemove}) { 

    return(
        <Container>
            <div className="card">

                <img src={data.image} alt="Imagem do Prato" />
                
                <div>
                    <p><strong>{data.quantity} x </strong>{data.name}<span>R${data.price}</span></p>
                    <ButtonText color onClick={() => onRemove(data.id)}
                        title="Excluir"
                       
                    />
                </div>
                
            </div>
        </Container>
    )
}