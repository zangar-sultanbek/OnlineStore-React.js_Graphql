import React from 'react';
import '../../SCSS/CartOverlay/CartOverlay.scss';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import routes from '../../JS/Router/routes';
import { TYPES } from '../../JS/Redux/Reducers';
import CartList from '../Cart/CartList';

class CartOverlay extends React.Component{
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }
  
  handlePurchase = () => this.props.cart.length && this.props.dispatch({type: TYPES.cart.removeAll});

  //Detect outside click
  handleClickOutside = (event) => {
    if(event.target === this.props.overlayBtnRef.current || !this.ref.current){
      return;
    }

    if(!this.ref.current.contains(event.target)){  
        this.props.handleOverlay();
    }
  }
  componentDidUpdate = (prevProps) => {
    if(this.props.isOverlayOpen !== prevProps.isOverlayOpen){
      if(this.props.isOverlayOpen){
        document.addEventListener("mousedown", this.handleClickOutside);
      }else{
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    }
}
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }


  render(){
    return (
      <>
        <div className={this.props.isOverlayOpen ? 'cart_overlay' : 'cart_overlay_closed'} />
        <div 
        ref={this.ref}
        className={this.props.isOverlayOpen ? 'cart_content' : 'cart_content_closed'}>
          <h3 className='cart_content_header'>
              <strong>My Bag</strong>, {this.props.totalQuantity} items
          </h3>
          {this.props.cart.length > 0 
          && 
          <>
            <div className='cart_content_details'>
              <CartList />
            </div>
            <div className='cart_content_sum'>
                <strong>Total</strong>
                <strong>{this.props.currency.symbol}{this.props.cartItemsTotalSum}</strong>
            </div>
          </>
          }
          <div className='cart_content_actions'>
             <Link to={routes.cart.path} onClick={this.props.handleOverlay}>
                <div className='open-cart_btn'>
                      View Bag
                </div>
             </Link>
              <div className='purchase_btn'
              onClick={this.handlePurchase}>
                  Check Out
              </div>
          </div>
        </div>
      </>
    )
  }
}

export default React.memo(connect()(CartOverlay));