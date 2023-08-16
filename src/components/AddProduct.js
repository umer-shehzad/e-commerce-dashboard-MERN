import React, { useEffect, useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);


    const handleSubmit = async (e) => {
        // check validation
        if (!name||!price||!category||!company){
            setError(true);
            return false;
        }

        // console.log( name, price, category, company);
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.log(userID);
        let data = await fetch("http://localhost:5000/product/add", {
            method:'post',
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        data = await data.json();
        if (data) {
            alert("Product added successfully.");
            e.preventDefault();
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
        }
        // console.log(data);
    }

    return (
        <div className="add-product" >
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product name" className="inputStyle" 
            value={name} onChange={ (e) => {setName(e.target.value)} }  />
            { error && !name && <span className="invalid-error" >Enter valid name</span>}
            
            <input type="text" placeholder="Enter product price" className="inputStyle"
            value={price} onChange={ (e) => {setPrice(e.target.value)} } />
            { error && !price && <span className="invalid-error" >Enter valid price</span>}
            
            <input type="text" placeholder="Enter product category" className="inputStyle"
            value={category} onChange={ (e) => {setCategory(e.target.value)} } />
            { error && !category && <span className="invalid-error" >Enter valid category</span>}

            <input type="text" placeholder="Enter product company" className="inputStyle"
            value={company} onChange={ (e) => {setCompany(e.target.value)} } />
            { error && !company && <span className="invalid-error" >Enter valid company</span>}
            
            <button className='appButton' type='button' onClick={handleSubmit}>Add Product</button>
        </div>
    )
}

export default AddProduct;