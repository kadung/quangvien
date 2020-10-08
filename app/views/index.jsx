import React from 'react';

const HomePage = (props) => {
  const listItems = props.products.map((product) =>
    <li>Name: {product[1]}, Description{product[2]}</li>
  );

  return <ul>{listItems}</ul>;
}

export default  HomePage;