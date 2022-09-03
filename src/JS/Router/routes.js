import Cart from "../../Components/Cart/Cart";
import Category from "../../Components/Category/Category";
import Product from "../../Components/PDP/Product";
import { Navigate } from "react-router-dom";

const routes = {
    categoryAll: {
        path: 'all',
        element: <Category key={'all'} category={'all'}/>
    },
    categoryClothes: {
        path: 'clothes',
        element: <Category key={'clothes'} category={'clothes'}/>
    },
    categoryCloth: {
        path: 'tech',
        element: <Category key={'tech'} category={'tech'}/>
    },
    product: {
        path: '/:category/:id',
        element: <Product />
    },
    cart: {
        path: 'cart',
        element: <Cart />
    },
    home: {
        path: '/',
        element: <Navigate to={'all'}/>
    },
    unmatch: {
        path: '*',
        element: <Navigate to={'all'}/>
    }
}

export default Object.freeze(routes);