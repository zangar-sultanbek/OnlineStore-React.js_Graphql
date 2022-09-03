import React from 'react';
import {connect} from 'react-redux';
import cartBtnIcon from '../../Assets/Icons/Category/Circle_Icon.svg';
import {TYPES} from '../../JS/Redux/Reducers';
import { Link } from 'react-router-dom';
import { getCurrency } from '../../JS/Methods/Currency';

const mapStateToProps = state => {
  return ({
    currency: state.currency
  });
}

class ProductCard extends React.Component{
    constructor(props){
      super(props);
    }

    hasAttributes = () => this.props.product.attributes.length > 0;
    addCartItem = (e, price) => {
        e.preventDefault();
        this.props.dispatch({
          type: TYPES.cart.addItem, 
          payload: {...this.props.product, price: price, productCount : 1, selectedAttributes: []}});
    }

    render(){
      const price = getCurrency(this.props.currency, this.props.product.prices);
      const {id,inStock, name, gallery, category} = this.props.product;
      return (
          <Link 
          to={`/${category + '/' + id}`}
          className={`product_card ${inStock ? 'product_card_hoverable' : 'product_card_disabled'}`
          }>
            <div className={`product_card_img ${inStock ? '' : 'img_stock'}`}>
              <img src={gallery[0]} alt={name}/>
              {inStock 
              &&  
              <button 
              className={this.hasAttributes() ? 'product_cart_btn_disabled': 'product_card_btn'} 
              onClick={(e) => this.hasAttributes() ? undefined : this.addCartItem(e, price)}
              >
                <img src={cartBtnIcon} alt='cart'/></button>}
              </div>
            <div className={`product_card_description ${inStock ? '' : 'product_card_description_disabled'}`}>
              <span className='description_name'>{name}</span>
              <h4 className='description_price'>{price.priceCurrency.symbol}{price.amount}</h4>
            </div>
          </Link>
          )
    }
}

export default React.memo(connect(mapStateToProps)(ProductCard));