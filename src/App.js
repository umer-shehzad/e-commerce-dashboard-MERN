import './App.css';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import Login from './components/Login';
import Nav from './components/Nav';
import PrivateComp from './components/PrivateComp';
import ProductList from './components/ProductList';
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={ <PrivateComp /> } >
          <Route path='/' element={ <ProductList /> }/>
          <Route path='/add' element={ <AddProduct /> }/>
          <Route path='/update/:id' element={ <UpdateProduct /> }/>
          {/* <Route path='/profile' element={ <h4>Profile Listing Component</h4> }/> */}
          <Route path='/logout' element={ <h4>Logout Listing Component</h4> }/>
          </Route>
          <Route path='/signup' element={ <Register /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
