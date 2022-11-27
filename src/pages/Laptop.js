import ProductCard from "../components/ProductCard"
import { useState, useEffect } from 'react'

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  /* GET ALL PRODUCTS */
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/active?category=Laptop`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        console.log(data + " data  of laptop")
        setAllProducts(data.map(products => {
          return ({
            productId: products._id,
            category: products.categories,
            brand: products.brand,
            name: products.name,
            source: products.source,
            price: products.price
          })

        }));


      });
  }

  useEffect(() => {
    fetchData();


  }, [])


  const productsAll = allProducts.map(item => {

    return (
      <ProductCard key={item.productId} productProp={item} />
    )

  })



  return (
    <>

      <div className="orderContainer">
        {productsAll}
      </div>

    </>
  )
}

export default Products

