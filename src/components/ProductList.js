import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const id = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch(`http://localhost:5000/product/get/${id}`,{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    // console.log(products);
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/product/search/${id}/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h1>Products List</h1>
            <input type="search" placeholder="Search Product" className="searchStyle"
                onChange={handleSearch} />
            <ul>
                <li>Sr. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>Rs. {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`} >Update</Link>
                        </li>
                    </ul>
                ) :
                <h3>No Record Found</h3>
            }
        </div>
    )
}

export default ProductList;