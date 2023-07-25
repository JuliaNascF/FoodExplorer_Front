import { Container } from "./styles";

export function ButtonText({ icon: Icon, title,  color= false, ...rest }) {
    return (
        <Container
        type="button"
        className={color ? 'color' : ''}
        {...rest}
        >
            {Icon && <Icon size={34} />}
            {title}
        </Container>
    );
}