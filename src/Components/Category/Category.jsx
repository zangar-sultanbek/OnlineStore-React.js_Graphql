import React from 'react';
import { connect } from 'react-redux';
import '../../SCSS/Category/Category.scss';
import ProductList from './ProductList';
//GraphQL
import {getAllDataQuery} from '../../JS/GraphQL/Queries';
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
      client.query({query: getAllDataQuery()})
      .then(result => {
          this.setState(({...this.state, data: result.data, productCategory : result.data.categories.find(category => category.name === this.props.selectedCategory)}));
      })
      .catch(error => this.setState(({...this.state, error})));
    }
    componentDidUpdate(){
      if(!this.state.data){
        return;
      }

      if(this.state.productCategory.name !== this.props.selectedCategory){
        this.setState(({...this.state, productCategory : this.state.data.categories.find(category => category.name === this.props.selectedCategory)}));
      }
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
