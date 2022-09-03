import React from 'react';
import '../../SCSS/CurrencySwitcher/CurrencySwitcher.scss';
import dropIcon from '../../Assets/Icons/Navbar/Vector.svg';
import { connect } from 'react-redux';
import {TYPES} from '../../JS/Redux/Reducers';

class CurrencySwitcher extends React.Component{
    constructor(props){
      super(props);
      this.ref = React.createRef();
      this.state = {
        isSelectOpen : false
      }
    }

    handleSelectOpen = () => this.setState(prevState => ({...prevState, isSelectOpen : !prevState.isSelectOpen}));

    
    handleCurrencyChange = ({label, symbol}) => {
      this.props.dispatch({type: TYPES.currency.setCurrency, payload: {label, symbol}});
      this.setState(prevState => ({...prevState, isSelectOpen : false}));
    }

    //Detect outside click
    handleClickOutside = (event) => {
      if(!this.ref.current){
        return;
      }

      if(!this.ref.current.contains(event.target)){  
          this.setState(prevState => ({...prevState, isSelectOpen : false}));
      }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.isSelectOpen !== prevState.isSelectOpen){
          if(this.state.isSelectOpen){
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
        <div className='currency_container' ref={this.ref}>
          <div className='currency_value'
          onClick={this.handleSelectOpen}>
            <span className='currency_value_text'>{this.props.currency.symbol}</span>
            <img className={`currency_value_img ${this.state.isSelectOpen ? `currency_value_img_selected` : ''}`} src={dropIcon} alt='open'/>
          </div>
  
          <div className={`${this.state.isSelectOpen ? 'currency_select' : 'currency_select_closed'}`}>
            {this.props.currencies.map(currencyItem => 
              <div 
              className={`${this.props.currency.label === currencyItem.label ? 'currency_option_selected' : 'currency_option'}`} 
              key={currencyItem.label}
              onClick={() => this.handleCurrencyChange(currencyItem)}>
                <p className='currency_option_text'
                >{currencyItem.symbol} {currencyItem.label}</p>
              </div>)}
          </div>
        </div>
    )
    }

}

export default React.memo(connect()(CurrencySwitcher));