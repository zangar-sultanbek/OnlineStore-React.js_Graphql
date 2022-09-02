import React from 'react';
import { connect } from 'react-redux';
import '../../SCSS/Cart/CartItem.scss';
import Attribute from './Attribute';
import { TYPES } from '../../JS/Redux/Reducers';
import arrowImg from '../../Assets/Icons/Cart/Arrow.svg';

class CartItem extends React.Component{
  constructor(props){
    super(props);

    this.state = 
    {
      selectedImageIndex : 
          {
            maxIndex: this.props.gallery.length - 1,
            minIndex: 0,
            current: 0
          }
    }
  }

  handleProductCountChange = (action) => {
    switch(action){
      case 'increase':
        this.props.dispatch({type: TYPES.cart.increaseCount, payload: {uniqueId : this.props.uniqueId, increaseBy: 1}});
        break;
      case 'decrease':
        if(this.props.productCount <= 1){
          this.props.dispatch({type: TYPES.cart.removeItem, payload: {uniqueId : this.props.uniqueId}});
        }else{
          this.props.dispatch({type: TYPES.cart.increaseCount, payload: {uniqueId : this.props.uniqueId, increaseBy: -1}});
        }
        break;
      default:
        console.log(`No such action like: ${action}`);
        break;
  }
  }

  handleSlider = (action) => {
    if(action === 'increase'){
      this.setState(
        (this.state.selectedImageIndex.current < this.state.selectedImageIndex.maxIndex)
        ? {selectedImageIndex : {...this.state.selectedImageIndex, current : this.state.selectedImageIndex.current + 1}}
        : {selectedImageIndex : {...this.state.selectedImageIndex, current : this.state.selectedImageIndex.minIndex}}
      )
    }else{
      this.setState(
        (this.state.selectedImageIndex.current > this.state.selectedImageIndex.minIndex) 
        ? {selectedImageIndex : {...this.state.selectedImageIndex, current : this.state.selectedImageIndex.current - 1}}
        : {selectedImageIndex : {...this.state.selectedImageIndex, current : this.state.selectedImageIndex.maxIndex}}
      )
    }
  }

  render(){
    const {priceCurrency, amount} = this.props.price;

    return (
          <div className='cart_item'>
              <div className="cart_item_content">
                  <div className="item_name">
                    <div>
                      <p className='item_name_brand'>{this.props.brand}</p>
                      <p className='item_name_name'>{this.props.name}</p>
                    </div>
                    <p className='item_name_price'><strong>{priceCurrency.symbol}{amount}</strong></p>
                  </div>
                  {this.props.attributes.length > 0 
                  && 
                  <div className='item_attributes'>
                      {this.props.attributes.map(attribute => <Attribute key={attribute.id} {...attribute} selectedAttributes={this.props.selectedAttributes}/>)}
                  </div>}
              </div>
              <div className="cart_item_actions">
                  <button 
                  type='button'
                  className='cart_item_actions_btn ' 
                  onClick={() => this.handleProductCountChange('increase')}><p>+</p></button>
                  <div className='cart_item_count_btn'><p>{this.props.productCount}</p></div>
                  <button 
                  type='button'
                  className='cart_item_actions_btn ' 
                  onClick={() => this.handleProductCountChange('decrease')}>{'-'}</button>
              </div>
              <div className="cart_item_img">
                <img src={this.props.gallery[this.state.selectedImageIndex.current]} alt={this.props.name}/>
                {(this.props.isSliderDisplayed && this.props.gallery.length > 1)
                && 
                <div className='cart_item_img_slider'>
                    <img src={arrowImg} alt='<' onClick={() => this.handleSlider('decrease')}/>
                    <img src={arrowImg} alt='>' onClick={() => this.handleSlider('increase')}/>
                </div>
                }
              </div>
          </div>
        )
  }
}

export default React.memo(connect()(CartItem))