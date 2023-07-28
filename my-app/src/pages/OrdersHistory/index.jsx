
import { Container, Content, Table } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { api } from '../../services/api';
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from 'react';

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

    const parseItems = (items) => {
        try {
            // Check if items is null or not a string
            if (!items || typeof items !== 'string') {
                return [];
            }

            // Try parsing items as an array of objects
            const parsedItems = JSON.parse(items);

            // Check if parsedItems is an array
            if (Array.isArray(parsedItems)) {
                return parsedItems;
            } else {
                // If parsedItems is not an array, return an array with the single object
                return [parsedItems];
            }
        } catch (error) {
            // Return an empty array if parsing fails
            return [];
        }
    };
    return (
        <Container>
            <Header />
            <Content>

                <h1>Pedidos</h1>

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
                                                <td>{order.date}</td>
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
                                                <td>{order.date}</td>
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