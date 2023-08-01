
import { Container, Content, Table } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { api } from '../../services/api';
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export function OrdersHistory() {
    const { user } = useAuth()
    const [orders, setOrders] = useState([]);
   

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await api.get("/orders");
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrders();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = format(date, 'dd/MM');
        const formattedTime = format(date, 'HH:mm');
        return `${formattedDate} às ${formattedTime}h`;
      }

    const parseItems = (items) => {
        try {
         
            if (!items || typeof items !== 'string') {
                return [];
            }

            const parsedItems = JSON.parse(items);

        
            if (Array.isArray(parsedItems)) {
                return parsedItems;
            } else {
              
                return [parsedItems];
            }
        } catch (error) {
     
            return [];
        }
    };
    return (
        <Container>
            <Header />
                <h1> Histórico de Pedidos</h1>
            <Content>


                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Código</th>
                                <th>Detalhamento</th>
                                <th>Data e hora</th>
                            </tr>
                        </thead>

                        {orders.length === 0 &&


                            <tbody>
                                <tr>
                                    <td colSpan="4">
                                        <div className="zeroOrders">
                                            <p>Não existem pedidos cadastrados ainda! =/</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        }

                        {
                            user.isAdmin ?

                                <tbody className="order">

                                    {orders &&
                                        orders.map(order => (
                                            <tr key={String(order.id)}>
                                                <td>
                                                    <select  >
                                                        <option value="🟡 Pendente">🟡 Pendente</option>
                                                        <option value="🟠 Preparando">🟠 Preparando</option>
                                                        <option value="🟢 Entregue">🟢 Entregue</option>
                                                        <option value="🔴 Cancelado">🔴 Cancelado</option>
                                                    </select>
                                                </td>
                                                <td>0000{order.id}</td>
                                                <td>
                                                   
                                                        <span >
                                                        {parseItems(order.items).map(item => (
                                                        <div key={item.id}>
                                                            {item.quantity} x {item.name}
                                                        </div>
                                                    ))}
                                                        </span>
                                                  
                                                </td>
                                                <td>{formatDate(order.date)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                :
                                <tbody className="order">
                                    {orders &&
                                        orders.map(order => (
                                            <tr key={String(order.id)}>
                                                <td>{order.orderstatus}</td>
                                                <td>0000{order.id}</td>
                                                <td>
                                                   
                                                <span>
                                                    {parseItems(order.items).map(item => (
                                                        <div key={item.id}>
                                                            {item.quantity} x {item.name}
                                                        </div>
                                                    ))}
                                                </span>
                                                </td>
                                                <td>{formatDate(order.date)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                        }
                    </table>
                </Table>
            </Content>
            <Footer />
        </Container>

    );
}