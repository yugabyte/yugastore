//Dependencies
import React, { Component } from 'react';
import find from 'lodash/find';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
//Internals
import './index.css';

class ShowProduct extends Component {
  state = {product_id: 0, product: {}}

  componentDidMount() {
    const new_product_id = parseInt(this.props.match.params.id);
    this.fetchProductDetails(new_product_id)
  }

  fetchProductDetails(new_product_id) {
    if (new_product_id != undefined &&
        this.state.product_id != undefined &&
        new_product_id != this.state.product_id) {
      this.state.product_id = new_product_id;
      var url = '/products/details/' + this.state.product_id;
      console.log("Fetching url: " + url);
      fetch(url)
        .then(res => res.json())
        .then(product => this.setState({ product }));
    }
  }

  render () {
    const new_product_id = parseInt(this.props.match.params.id);
    this.fetchProductDetails(new_product_id)
    const currentProduct = this.state.product;
    const relatedProducts = currentProduct.relatedProducts;
    console.log(currentProduct);
    if (!currentProduct) {
      return ("");      
    }
    var stars = ["star_border", "star_border", "star_border", "star_border", "star_border"];
    if (currentProduct.stars > 0) {
      stars[0] = (currentProduct.stars < 1) ? "star_half" : "star";
    }
    if (currentProduct.stars > 1) {
      stars[1] = (currentProduct.stars < 2) ? "star_half" : "star";
    }
    if (currentProduct.stars > 2) {
      stars[2] = (currentProduct.stars < 3) ? "star_half" : "star";
    }
    if (currentProduct.stars > 3) {
      stars[3] = (currentProduct.stars < 4) ? "star_half" : "star";
    }
    if (currentProduct.stars > 4) {
      stars[4] = (currentProduct.stars < 5) ? "star_half" : "star";
    }
    return (
      <div className="show-product">
        <div className="item-wrapper">
          <div className="item-image">
            <img className="product-image" src={currentProduct.img} alt="product" />
          </div>
          <div className="item-name">
            <div className="product-info">
              <h2 id="product-name">{currentProduct.name}</h2>
            </div>
            <div className="product-review">
              <div className="stars">
                <Icon small id="add-icon" className="review-star">{ stars[0] }</Icon>
                <Icon small id="add-icon" className="review-star">{ stars[1] }</Icon>
                <Icon small id="add-icon" className="review-star">{ stars[2] }</Icon>
                <Icon small id="add-icon" className="review-star">{ stars[3] }</Icon>
                <Icon small id="add-icon" className="review-star">{ stars[4] }</Icon>
              </div>
            </div>
            <div className="product-bio">
              <div id="product-price">
                {currentProduct.stars} stars from {currentProduct.num_reviews} reviews
              </div>
              <div id="product-price">${currentProduct.price}</div>
              <div className="add-to-cart">
                <Button color="primary" class="mdc-button mdc-button--raised">
                  Add to cart
                </Button>
              </div>
              <div id="product-description">{currentProduct.description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProduct;
