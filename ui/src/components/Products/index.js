//Dependencies
import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
//Internals
import './index.css';

class Products extends Component {
  state = {current_query: "", products: []}

  fetchProducts() {
    if (this.state.products.length == 0 ||
        this.state.current_query != this.props.query) {
      this.state.current_query = this.props.query;
      var url = '/products';
      if (this.props.query) {
        url = '/products/' + this.props.query;
      }
      fetch(url)
        .then(res => res.json())
        .then(products => this.setState({ products }));
    }
  }

  render() {
    this.fetchProducts();
    var stars = ["star_border", "star_border", "star_border", "star_border", "star_border"];
    return (
      <div className="products">
        <div className="products-title">
          <h4>{this.props.name}</h4>
        </div>

        <div className="items">
          {this.state.products.map((product) => {
              if (product.stars > 0) {
                stars[0] = (product.stars < 1) ? "star_half" : "star";
              }
              if (product.stars > 1) {
                stars[1] = (product.stars < 2) ? "star_half" : "star";
              }
              if (product.stars > 2) {
                stars[2] = (product.stars < 3) ? "star_half" : "star";
              }
              if (product.stars > 3) {
                stars[3] = (product.stars < 4) ? "star_half" : "star";
              }
              if (product.stars > 4) {
                stars[4] = (product.stars < 5) ? "star_half" : "star";
              }
              return(
                <div className="item">
                  <Link to={`/item/${product.id}`}>
                  <div className="product-img">
                    <img alt={product.name} src={product.img} />
                  </div>
                  <div className="product-details">
                    <h1 id="product-name">{product.name}</h1>
                  </div>
                  </Link>
                  <div className="reviews-add">
                    <div className="stars">
                      <Icon small id="add-icon" className="review-star">{ stars[0] }</Icon>
                      <Icon small id="add-icon" className="review-star">{ stars[1] }</Icon>
                      <Icon small id="add-icon" className="review-star">{ stars[2] }</Icon>
                      <Icon small id="add-icon" className="review-star">{ stars[3] }</Icon>
                      <Icon small id="add-icon" className="review-star">{ stars[4] }</Icon>
                    </div>
                    {product.stars} stars from {product.num_reviews} reviews
                  </div>
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
