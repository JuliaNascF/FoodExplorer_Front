
import { Container, Content, PaymentCard } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CardOrder } from "../../components/CardOrder";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText";
import { api } from "../../services/api";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'
import { BsReceipt } from 'react-icons/bs';
import pix from '../../assets/pix.svg';
import creditCard from '../../assets/CreditCard.svg';
import qrCode from '../../assets/qrcode 1.svg';
import clock from '../../assets/Clock.svg';
import checkCircle from '../../assets/CheckCircle.svg';


export function Order() {

    const [loading, setLoading] = useState(false);
    const [isPixVisible, setIsPixVisible] = useState(false);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [num, setNum] = useState('');
    const [cvc, setCvc] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [orderId, setOrderId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await api.get("/cart");
                setCartItems(response.data.cartItems);
                setTotal(response.data.total);
            } catch (error) {

            }
        }

        fetchCartItems();
    }, []);

    function handleCreatedOrder() {
        return {
            orderStatus: '🔴 Pendente',
            payment_method: pixActive ? 'pix' : 'creditCard',
            total_amount: total,
            items: JSON.stringify(cartItems.map(item => ({
                id: item.id,
                dish_id: item.id, // Use o id do prato ou a propriedade correta do item
                quantity: item.quantity, // Use a quantidade correta do item
                date: item.date, // Use a data correta do item
                user_id: item.user_id, // Use o user_id correto do item
                name: item.name,
            })))



        };
    }


    async function removeOrder(id) {
        try {
            await api.delete(`/cart/${id}`);
            setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
            const response = await api.get("/cart");
            setTotal(response.data.total);
        } catch (error) {
            console.log(error);
        }
    }


    function handleBack() {
        navigate(-1);
    }

    async function handleFinishPayment() {
        if (!pixActive && num.length < 16) {
            alert("Erro: Número de cartão incompleto!");
            return;
        }


        if (!pixActive && cvc.length < 3) {
            return alert("Erro: CVC do cartão incompleto!");
        }

        setLoading(true);

        try {
            const orderData = handleCreatedOrder();
            const { data: orderId } = await api.post("/orders", orderData);
            setOrderId(orderId);
            disableButton();

            setTimeout(() => {
                alert("Pedido cadastrado com sucesso!");
                navigate(-1);
            }, 7000);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível cadastrar");
            }
        }

        setLoading(false);
    }

    const handleNumChange = event => {
        const limit = 16;
        setNum(event.target.value.slice(0, limit));
    };

    const handleCvcChange = event => {
        const limit = 3;
        setCvc(event.target.value.slice(0, limit));
    };

    const handlePaymentPix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setIsCartVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };

    const handlePaymentCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setIsCartVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };



    const disableButton = () => {
        setDisabledButton(true);

        setIsCreditVisible(false);
        setIsPixVisible(false);

        setIsClockActive(true);
        setIsApprovedActive(false);
        setTimeout(() => {
            setIsClockActive(false);
            setIsApprovedActive(true);

            // Delay
        }, 4000);
    }

    return (
        <Container>
            <Header />


            <Content>

                <div className="order-wrapper">
                    <div className="back">
                        <ButtonText onClick={handleBack} icon={FiArrowLeft} />
                        <h3>Meu pedido</h3>
                    </div>
                    <div className="details">
                        {cartItems.map((item) => (
                            <CardOrder
                                key={item.id}
                                data={item}
                                onRemove={removeOrder}
                            />
                        ))}
                    </div>


                    <h3>Total: <span>{total}</span></h3>

                </div>

                <PaymentCard>
                    <div className="paymentHeader">
                        <h2>Pagamento</h2>

                        <div className="buttons">
                            <button className={pixActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentPix}>
                                <img src={pix} alt="Logo Pix" />
                                PIX
                            </button>

                            <button className={creditActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentCredit}>
                                <img src={creditCard} alt="Logo Cartão de Crédito" />
                                Crédito
                            </button>
                        </div>
                    </div>

                    <div className="paymentBody">

                        {isCartVisible &&
                            <div className="cart" id="cart">

                                <p>Selecione uma forma de pagamento acima!</p>
                            </div>
                        }

                        {isPixVisible &&
                            <div className={pixActive === false ? 'active' : ''} id="paymentPix">
                                <div className="qr">
                                    <img src={qrCode} alt="Imagem do QRCode" />
                                </div>

                                <Button
                                    title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                    disabled={loading}
                                    icon={BsReceipt}
                                    onClick={handleFinishPayment}
                                    style={{ height: 56 }}
                                    className="finishPaymentButton"

                                />
                            </div>
                        }

                        {isCreditVisible &&

                            <div className="paymentCredit" id="paymentCredit">
                                <div className="inputs">
                                    <p>Número do Cartão</p>
                                    <Input
                                        placeholder="0000 0000 0000 0000"
                                        type="number"
                                        id="num"
                                        name="num"
                                        value={num}
                                        onChange={handleNumChange}
                                    />
                                </div>

                                <div className="validTo">
                                    <div>
                                        <p>Validade</p>
                                        <Input
                                            placeholder="MM/AA"
                                            type="text"
                                            id="date"
                                            name="date"
                                            maxLength="5"
                                        />
                                    </div>

                                    <div>
                                        <p>CVC</p>
                                        <Input
                                            placeholder="***"
                                            type="number"
                                            id="cvc"
                                            name="cvc"
                                            value={cvc}
                                            onChange={handleCvcChange}
                                        />
                                    </div>
                                </div>

                                <Button
                                    title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                    disabled={loading}
                                    icon={BsReceipt}
                                    onClick={handleFinishPayment}
                                    style={{ height: 56 }}
                                    className="finishPaymentButton"

                                />
                            </div>
                        }

                        {isClockActive &&

                            <div className="clock" id="clock">
                                <img src={clock} alt="Imagem do QRCode" />
                                <p>Aguarde: Estamos processando o seu pagamento</p>
                            </div>
                        }

                        {isApprovedActive &&

                            <div className="approved" id="approved">
                                <img src={checkCircle} alt="Imagem de pagamento aprovado" />
                                <p>Oba! Pagamento aprovado! Em breve faremos a entrega!</p>
                            </div>
                        }
                    </div>
                </PaymentCard>

            </Content>

            <Footer />
        </Container>

    );
}