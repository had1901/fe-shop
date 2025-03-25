import React from 'react'
import ViewedProduct from '../viewedProduct/ViewedProduct'
import { viewedProduct } from './../viewedProduct/_viewedProduct';


function ProductList() {
  return (
    <div>
      <ViewedProduct products={viewedProduct} />
    </div>
  )
}

export default ProductList