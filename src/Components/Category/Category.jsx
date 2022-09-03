import React from 'react';
import { connect } from 'react-redux';
import '../../SCSS/Category/Category.scss';
import ProductList from './ProductList';
//GraphQL
import {getCategory} from '../../JS/GraphQL/Queries';
//Redux
import client from '../../Client';

const mapStateToProps = state => ({
  selectedCategory: state.selectedCategory
});

class Category extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        productCategory : null,
        data : null,
        error : null
      }
    }

    componentDidMount(){
      client.query({query: getCategory(this.props.selectedCategory)})
      .then(result => {
          this.setState(({...this.state, data: result.data, productCategory : result.data.category}));
      })
      .catch(error => this.setState(({...this.state, error})));
    }

    render(){    
      if(this.state.error){
        return <span>
          <p style={{color: 'red', display: 'inline-block'}}>Unpredicted Error:</p> 
          {this.state.error.message}. Are you sure GraphQL <strong>server</strong> is on & running on port <strong>4000</strong>?</span>
      }

      return (
        <div className='category_outlet'>
            <h3 className='header'>{this.state.productCategory?.name ?? 'Loading...'}</h3>
            <ProductList products={this.state.productCategory?.products}/>
        </div>
      );
    }
}

export default React.memo(connect(mapStateToProps)(Category));
