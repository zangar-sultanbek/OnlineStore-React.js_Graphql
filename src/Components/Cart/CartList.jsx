import React from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { getCurrency } from '../../JS/Methods/Currency';

const mapStateToProps = (state) => ({
    cart : state.cart, 
    currency: state.currency
})

class CartList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        this.props.cart.map(cartItem => 
            <CartItem 
            key={cartItem.uniqueId} 
            {...cartItem} 
            price={getCurrency(this.props.currency, cartItem.prices)} 
            isSliderDisplayed={this.props.isSliderDisplayed}/>)
        )
    }
}

CartList.defaultProps = {
    isSliderDisplayed : false
}

export default React.memo(connect(mapStateToProps)(CartList));