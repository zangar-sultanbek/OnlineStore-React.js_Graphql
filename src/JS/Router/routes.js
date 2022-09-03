import Cart from "../../Components/Cart/Cart";
import Category from "../../Components/Category/Category";
import Product from "../../Components/PDP/Product";
import { Navigate } from "react-router-dom";

const routes = {
    categoryAll: {
        path: 'all',
        element: <Category category={'all'}/>
    },
    categoryClothes: {
        path: 'clothes',
        element: <Category category={'clothes'}/>
    },
    categoryCloth: {
        path: 'tech',
        element: <Category category={'tech'}/>
    },
    product: {
        path: '/category/:id',
        element: <Product />
    },
    cart: {
        path: 'cart',
        element: <Cart />
    },
    unmatch: {
        path: '*',
        element: <Navigate to={'/all'}/>
    }
}

export default Object.freeze(routes);