import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const StoreforntLayout = (props) => {
  return (
      <>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="/stylesheets/storefront.css" />
          <link rel="icon" href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png" type="image/x-icon" /> 
          
          <title>Kadung</title>
        </head>

        <body>
          <Header categories={props.categories} cartNum={props.cartNum} isLogin={props.isLogin} />
          <div>
            {props.children}
          </div>
          <Footer />

          {/* Placed at the end of the document so the pages load faster */}
          <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossOrigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous" />
          <script src="https://use.fontawesome.com/c560c025cf.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous" />
          <script src="/javascripts/storefront.js" />
        </body>
      </>
  )
}

export default StoreforntLayout;