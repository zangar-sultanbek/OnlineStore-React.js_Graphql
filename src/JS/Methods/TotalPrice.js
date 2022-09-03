import { getCurrency } from "./Currency";

const taxPercent = 0.21;

const calculateTotalPrice = (cart, currency) => {
    let quantity = 0;
    const total = cart.reduce((current, next) => {
        quantity += next.productCount;
        return current + (getCurrency(currency, next.prices).amount * next.productCount);
    }, 0);
    const tax = total * taxPercent;
    const totalWithTax = total + tax;
    return {
        total: totalWithTax.toFixed(2),
        tax: tax.toFixed(2),
        quantity
    };
}

export default calculateTotalPrice;