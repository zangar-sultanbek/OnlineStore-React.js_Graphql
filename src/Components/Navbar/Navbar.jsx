import React from 'react';
import {createPortal} from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import logoIcon from '../../Assets/Icons/Navbar/a-logo.svg';
import cartIcon from '../../Assets/Icons/Navbar/Empty Cart.svg'
import '../../SCSS/Navbar/Navbar.scss';
import CartOverlay from '../CartOverlay/CartOverlay';
import CurrencySwitcher from '../CurrencySwitcher/CurrencySwitcher';
import { getCategoriesAndCurrencies } from '../../JS/GraphQL/Queries';
import { TYPES } from '../../JS/Redux/Reducers';
import totalPrice from '../../JS/Methods/TotalPrice';
import client from '../../Client';

const mapStateToProps = state => ({
    cart: state.cart,
    currency: state.currency,
    selectedCategory : state.selectedCategory
});

class Navbar extends React.Component{
    constructor(props){
        super(props);

        this.overlayBtnRef = React.createRef();
        this.state = {
            isOverlayOpen : false,
            selectedCategory : this.props.selectedCategory ?? null,
            data : null,
            error : null
        }
    }
    componentDidMount(){
        client.query({query: getCategoriesAndCurrencies()})
        .then(result => {
            if(!this.props.selectedCategory){
                this.props.dispatch({type: TYPES.category.setCategory, payload: result.data.categories[0].name});
            }
            
            if(!this.props.currency.label){
                this.props.dispatch({type: TYPES.currency.setCurrency, payload: result.data.currencies[0]});
            }
            this.setState(prevState => 
                ({
                    ...this.state, 
                    selectedCategory : prevState.selectedCategory ?? result.data.categories[0].name,
                    data: result.data,
                }));
        })
        .catch(error => this.setState(prevState => ({...prevState, error})));
    }

    handleOverlay = () =>
        this.setState(prevState => (({...prevState, isOverlayOpen : !prevState.isOverlayOpen})));
    
    handleCategorySwitch(newCategoryName){
        if(this.state.selectedCategory !== newCategoryName){
            this.setState(({...this.state, selectedCategory : newCategoryName}));
            this.props.dispatch({type: TYPES.category.setCategory, payload: newCategoryName});
        }
    }

    render(){
        if(this.state.error){
            return <h1 className='fetch_error_message'>{
                this.state.error.message}
                (Please make sure the GraphQL server is <strong>running</strong> on port <strong>4000</strong>)</h1>
        }

        const {total, quantity} = totalPrice(this.props.cart, this.props.currency);
        return (
        <>
            <header className='global_header'>
                <div className="navbar">
                    <div className="navbar_navigation">
                        {this.state.data?.categories.map(category => 
                            <Link
                            to={category.name}
                            key={category.name} 
                            onClick={() => this.handleCategorySwitch(category.name)}
                            className={category.name === this.state.selectedCategory ? 'category_active' : 'category'}>
                                {category.name}
                            </Link>)
                        }
                    </div>
    
                    <div className="navbar_logo">
                        <img src={logoIcon} alt='logo'/>
                    </div>
                    
                    <div className="navbar_actions">
                        {/*In Figma's design you have 2 empty boxes inside the header's actions. I've added them too*/}
                        <div></div> 
                        <div></div>
                        <div className='currency_btn'>
                            <CurrencySwitcher currencies={this.state.data?.currencies ?? []} currency={this.props.currency}/>
                        </div>
                        <div className='cart_btn'
                        ref={this.overlayBtnRef}
                        onClick={this.handleOverlay}>
                            <img src={cartIcon} alt='cart'/>
                            {Boolean(this.props.cart.length) && <span className='cart_btn_value'>{quantity}</span>}
                        </div>

                       {createPortal(
                        <CartOverlay 
                        cart={this.props.cart} 
                        currency={this.props.currency} 
                        isOverlayOpen={this.state.isOverlayOpen}
                        overlayBtnRef={this.overlayBtnRef}
                        handleOverlay={this.handleOverlay}
                        cartItemsTotalSum={total} 
                        totalQuantity={quantity}
                        />
                        , document.getElementById('root'))}
                    </div>
                </div>
            </header>
            
            <div className="outlet" id='outlet'>
                <div className="outlet_content">
                    <Outlet />
                </div>
            </div>
        </>
        );
    }
}

export default React.memo(connect(mapStateToProps)(Navbar));
