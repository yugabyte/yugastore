import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Cart from './components/Cart';
import BaseLayout from './components/BaseLayout';
import Products from './components/Products';
import ShowProduct from './components/ShowProduct';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path="/" component={App} />

        <Route path="/cart" component={Cart} />

        <Route path="/business"
          render={(props) => (
            <Products
              name={"Business Books"}
              query={"category/business"} /> 
          )} />
        <Route path="/cookbooks"
          render={(props) => (
            <Products
              name={"Cookbooks"}
              query={"category/cookbooks"} /> 
          )} />
        <Route path="/mystery"
          render={(props) => (
            <Products
              name={"Mystery & Suspense"}
              query={"category/mystery"} /> 
          )} />
        <Route path="/scifi"
          render={(props) => (
            <Products
              name={"Sci-Fi & Fantasy"}
              query={"category/scifi"} /> 
          )} />

        <Route path="/sort/num_stars"
          render={(props) => (
            <Products
              name={"Books with the Highest Rating"}
              query={"sort/num_stars"} /> 
          )} />
        <Route path="/sort/num_reviews"
          render={(props) => (
            <Products
              name={"Books with the Most Reviews"}
              query={"sort/num_reviews"} /> 
          )} />
        <Route path="/sort/num_buys"
          render={(props) => (
            <Products
              name={"Best Selling Books"}
              query={"sort/num_buys"} /> 
          )} />
        <Route path="/sort/num_views"
          render={(props) => (
            <Products
              name={"Books with the Most Pageviews"}
              query={"sort/num_views"} /> 
          )} />


        <Route exact path="/item/:id" component={ShowProduct} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
