import { Container} from "./styles.js";
import { Header } from "../../components/Header/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";

export function Home(){
    return(
    <Container>
      <Header/>
      <Footer/>
     
    </Container>

    );
}