import { Route, Routes } from "react-router-dom";


import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { Favorites } from "../pages/Favorites";
import { Order } from "../pages/Order";
import { OrdersHistory } from "../pages/OrdersHistory";
export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/order" element={<Order />} />
            <Route path="/history" element={<OrdersHistory />} />

           
        </Routes>
    )
}