import { gql } from '@apollo/client';

export const getAllDataQuery = () => gql`
query{
    categories{
      name
      products
      {
        id
        name
        inStock
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const getCurrencies = () => gql`
query{
  currencies{
    label,
    symbol
  }
}`;

export const getCategories = () => gql`
query{
  categories{
    name
  }
}
`;

export const getCategoriesAndCurrencies = () => gql`
query{
  currencies{
    label, 
    symbol
  },
  categories{
    name
  }
}
`;

export const getProduct = (id) => gql`
query{
  product(id: "${id}"){
    id,
    name,
    inStock,
    gallery,
    description,
    category,
    attributes
    {
      id, name, type, 
      items{
        displayValue, value, id
      }
    },
    prices{
      currency
      {
      label, symbol
    	},
      amount
    },
    brand
  }
}
`;

//2.0
export const getCategory = (categoryName = 'all') => gql`
query{
  category(input: {title: "${categoryName}"}){
    name,
    products{
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id, name, type, items{
          displayValue, value, id
        }
      },
      prices{
        amount,
        currency{
          label, symbol
        }
      },
      brand
    }
  }
}`;