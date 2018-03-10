//Dependencies
import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
//Internals
import './index.css';

class Products extends Component {
  state = {current_category: "", products: []}

  fetchProducts() {
    if (this.state.products.length == 0 ||
        this.state.current_category != this.props.category) {
      this.state.current_category = this.props.category;
      var url = '/products';
      console.log(this.props);
      console.log("Fetching url: " + url);
      if (this.props.category) {
        url = '/products/category/' + this.props.category;
      }
      fetch(url)
        .then(res => res.json())
        .then(products => this.setState({ products }));
    }
  }

  render() {
    this.fetchProducts();
    console.log(this.props.name);
    console.log(this.state.products);
    return (
      <div className="products">
        <div className="products-title">
          <h4>{this.props.name}</h4>
        </div>

        <div className="items">
          {this.state.products.map((product) => {
          	  console.log(product);
              return(
                <div className="item">
                  <Link to={`/products/${product.id}`}>
                  <div className="product-img">
                    <img alt={product.name} src={product.img} />
                  </div>
                  <div className="product-details">
                    <h1 id="product-name">{product.name}</h1>
                  </div>
                  </Link>
                  <div className="price-add">
                    <h5 id="product-price">${product.price}</h5>
                    <Icon small onClick={() => this.addProduct(product)} id="add-icon">add_shopping_cart</Icon>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    );
  }
}

export default Products;
