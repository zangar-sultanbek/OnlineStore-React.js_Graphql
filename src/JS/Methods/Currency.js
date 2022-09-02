export const getCurrency = (currency, prices) => {
    if(!prices){
        return {priceCurrency: 0, amount: 0};
    }

    const {currency : priceCurrency, amount} = prices.find(price => price.currency.label === currency.label);
    return {priceCurrency, amount : amount.toFixed(2)};
}
