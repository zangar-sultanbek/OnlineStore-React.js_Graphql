import React from 'react';
import { connect } from 'react-redux';
import '../../SCSS/Cart/Cart.scss';
import totalPrice from '../../JS/Methods/TotalPrice';
import { TYPES } from '../../JS/Redux/Reducers';

import CartList from './CartList';
import CartCheer from './CartCheer';

const mapStateToProps = (state) => ({
    cart : state.cart,
    currency : state.currency
})

class Cart extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      hasPurchased : false
    }
  }

  handlePurchase = () => {
      if(this.props.cart.length){
        this.props.dispatch({type: TYPES.cart.removeAll});
        this.setState(prevState => ({...prevState, hasPurchased : true}));
      }
  }

  render(){
    const [cartItemsTotalSum, tax, quantity] = totalPrice(this.props.cart, this.props.currency);

    return (
      <div className='cart_outlet'>
        <h3 className='header'>Cart</h3>
        
        {this.props.cart.length > 0
        ? 
          <>
            <div className="cart_items_list">
                <CartList isSliderDisplayed={true}/>
            </div>
            <div className='cart_summary_wrapper'>
              <div className="cart_summary">
                <p>Tax 21%: </p><strong>{this.props.currency.symbol + tax}</strong>
                <p>Quantity: </p><strong>{quantity}</strong>
                <p>Total: </p><strong>{this.props.currency.symbol + cartItemsTotalSum}</strong>
              <button onClick={this.handlePurchase}>Order</button>
              </div>
            </div>
          </>
        : 
          <>
            {this.state.hasPurchased
            ? 
            <CartCheer />
            : <p className='empty_cart_text'>Oops, seems like your cart is empty.</p>}
          </>}
  
    </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)