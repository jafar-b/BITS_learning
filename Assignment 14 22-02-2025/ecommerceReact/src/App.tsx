
import './App.css'

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import CartPage from './views/CartPage'
import UserOperations from './views/ProductsCrud'
import Login from './views/Login'
import ProductsCrud from './views/ProductsCrud'
import ProtectedRoute from './components/ProtectedRoute'


function App() {



  return (
    <>
<Router>
<Routes>
  <Route path="/" element={<Dashboard/>}/> 
  <Route path="/login" element={<Login/>} />
  <Route path="/cart" element={<CartPage/>}/> 
  <Route path="/user-operations" element={<UserOperations/>}/> 
  <Route path="/cart" element={<CartPage/>}/> 
  <Route element={<ProtectedRoute isAuthenticated={false}/>}>
  <Route path="/productscrud" element={<ProductsCrud/>}/>
  </Route>
  <Route path="/productscrud" element={<ProductsCrud/>}/> 
  <Route path="*" element={<h1>404 Not Found</h1>}/>         
  </Routes>
</Router>


    </>
  )
}

export default App
