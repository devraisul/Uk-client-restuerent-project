import AdminOrderProvider from "./context/AdminOrderContext";
import RestaurantOrder from "./RestaurantOrder";


export default function RestaurantOrderContainer() {
    return (
        <AdminOrderProvider>
            <RestaurantOrder />
        </AdminOrderProvider>

    )
}
