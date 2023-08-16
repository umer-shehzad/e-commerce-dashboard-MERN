import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        // console.log(params);
        let result = await fetch(`http://localhost:5000/product/get-single/${params.id}`,{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const handleSubmit = async () => {
        // console.log("update product");
        let result = await fetch(`http://localhost:5000/product/update/${params.id}`, {
            method:"Put",
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        navigate('/');
        // console.log(result);
    }

    return (
        <div className="add-product" >
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputStyle" 
            value={name} onChange={ (e) => {setName(e.target.value)} }  />
            
            <input type="text" placeholder="Enter product price" className="inputStyle"
            value={price} onChange={ (e) => {setPrice(e.target.value)} } />
            
            <input type="text" placeholder="Enter product category" className="inputStyle"
            value={category} onChange={ (e) => {setCategory(e.target.value)} } />

            <input type="text" placeholder="Enter product company" className="inputStyle"
            value={company} onChange={ (e) => {setCompany(e.target.value)} } />
            
            <button className='appButton' type='button' onClick={handleSubmit}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;