# yb-ecommerce

Sample e-commerce app with a products catalog listing, product details page and a shopping cart for online checkout.

Uses the following stack:
* UI: React
* REST server: Express and NodeJS
* Database: pluggable. Can use either the following:
    * YugaByte DB
    * PostgreSQL

To run the REST API server do:
```
$ cd yb-ecommerce
$ PORT=3001 node bin/www
```

To run the webserver do:
```
$ cd yb-ecommerce/ui
$ npm install # First time only
$ npm start
```


        <div className="similar-products">
          <h5>You might also like</h5>
          {relatedProducts.map((product) => {
            return(
              <Link to={`/products/${product.id}`}>
                <div key={product.id} className="item">
                  <Link to={`/products/${product.id}`}>
                  <div className="product-img">
                    <img alt={product.name} src={product.img} />
                  </div>
                  <div className="product-details">
                    <h1 id="product-name">{product.name}</h1>
                    <h4 id="product-description">{product.description}</h4>
                  </div>
                  </Link>
                  <div className="price-add">
                    <h5 id="product-price">${product.price}</h5>
                    <Icon small id="add-icon">add_shopping_cart</Icon>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
