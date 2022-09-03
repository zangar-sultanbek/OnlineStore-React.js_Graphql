
import React from 'react';
import {  connect } from 'react-redux';
import { getProduct } from '../../JS/GraphQL/Queries';
import '../../SCSS/PDP/Product.scss';
import Attribute from '../Cart/Attribute';
import {TYPES} from '../../JS/Redux/Reducers';
import client from '../../Client';
import { getCurrency } from '../../JS/Methods/Currency';
import LoadingBar from '../LoadingComponents/LoadingBar/LoadingBar';

const mapStateToProps = state => ({
    currency: state.currency
});

class Product extends React.Component{
    constructor(props){
        super(props);
        this.id = window.location.href.split('/')[3];

        this.htmlRef = React.createRef();
        this.state = {
            selectedAttributes : null,
            data : null,
            displayedImageIndex : 0
        }
    }
    componentDidMount(){
        client.query({query: getProduct(this.id)})
        .then(result => {
            this.setState(prevState => 
            ({
                ...prevState, 
                data : result.data, 
                selectedAttributes : result.data.product.attributes.map(item => ({name : item.name, value : item.items[0].value}))
            }));   
            })
    }
    componentDidUpdate(){
        this.htmlRef.current.innerHTML = this.state.data.product.description;
    }

    handleAttributeChange = (attributeName, attributeValue) => {
        const matchedAttributeIndex = this.state.selectedAttributes.findIndex(attribute => 
            attribute.name === attributeName && attribute.value !== attributeValue);

        
        if(matchedAttributeIndex <= -1){
            return;
        }

        this.setState(prevState => 
        {
            const stateCopy = [...prevState.selectedAttributes];
            stateCopy[matchedAttributeIndex].value = attributeValue;
            return ({...prevState, selectedAttributes : stateCopy});
        });
    }

    handleImage = (index) => (index !== this.state.displayedImageIndex) && this.setState(prevState => ({...prevState, displayedImageIndex : index}));
    handleCartBtn = (price) => this.props.dispatch({
        type: TYPES.cart.addItem, 
        payload: {
            ...this.state.data.product, 
            selectedAttributes : this.state.selectedAttributes, 
            price, 
            productCount : 1}});

    render(){
        if(!this.state.data){
            return <LoadingBar />
        }
        
        const price = getCurrency(this.props.currency, this.state.data.product.prices);
        return (
            <>
                <div className="product_images">
                    {this.state.data.product.gallery.map((galleryImg, index) => 
                    <img 
                    key={galleryImg}
                    className='product_img' 
                    src={galleryImg} 
                    alt={`img_${index+1}`}
                    onClick={() => this.handleImage(index)}/>)}
                </div>
                <div className="product_content">
                    <div className={`product_content_img ${this.state.data.product.inStock ? '' : 'product_content_img_unavailable'}`}>
                        <img 
                        src={this.state.data.product.gallery[this.state.displayedImageIndex]} 
                        alt={`${this.state.data.product.name}_img`} />
                    </div>
                    <div className="product_content_description">
                        <header className='product_name'>
                            <h3 className='product_name_brand'>{this.state.data.product.brand}</h3>
                            <h3 className='product_name_name'>{this.state.data.product.name}</h3>
                        </header>
                        {this.state.data.product.attributes.length > 0 
                        &&
                        <div className='item_attributes'>
                            {this.state.data.product.attributes.map(attribute => 
                                <Attribute 
                                key={attribute.id}
                                {...attribute}
                                selectedAttributes={this.state.selectedAttributes}
                                handleAttributeChange={this.handleAttributeChange}
                                isMutable={true}
                                />
                            )}
                        </div>
                        }
                        <div className="product_price">
                            <p className='product_price_label'>Price: </p>
                            <p className='product_price_value'><strong>{price.priceCurrency.symbol}{price.amount}</strong></p>
                        </div>
                        <div 
                        className={this.state.data.product.inStock ? "product_cart_btn" : 'product_cart_btn_disabled'}
                        onClick={() => this.state.data.product.inStock ? this.handleCartBtn(price) : undefined}>
                            {this.state.data.product.inStock ? 'Add To Cart' : 'Out Of Stock'}
                        </div>
                        <div ref={this.htmlRef} className="product_description"/>
                    </div>
                </div>
            </>
        )
    }
}

export default React.memo(connect(mapStateToProps)(Product));