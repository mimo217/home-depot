import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import { getUser, makeGuest } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import CategoryListPage from '../CategoryListPage/CategoryListPage';
import FAQPage from '../FAQPage/FAQPage';
import HomePage from '../HomePage/HomePage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import ItemListPage from '../ItemListPage/ItemListPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import OrderPage from '../OrderPage/OrderPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import WishlistPage from '../WishlistPage/WishlistPage';
import NavBar from '../../components/NavBar/NavBar'
import * as ordersAPI from '../../utilities/orders-api'
import * as catDepAPI from '../../utilities/catDep-api'
import * as wishAPI from '../../utilities/wishlist-api'

export default function App() {
  const [user, setUser] = useState(getUser())
  const [cart, setCart] = useState({})
  const [wishlist, setWishlist] = useState({})
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate()

  useEffect(function () {
    try {
      async function getDeps() {
        const deps = await catDepAPI.getDepartments()
        setDepartments(deps)
      }
      getDeps()
      async function getCart() {
        if (user) {
          const data = await ordersAPI.getCart()
          setCart(data)
        }
      }
      getCart()
      async function getWishlist() {
        if (user) {
          const data = await wishAPI.showWishlist()
          setWishlist(data)
        }
      }
      getWishlist()
      async function confirmUser() {
        if (!user) {
          try {
            const guest = await makeGuest()
            setUser(guest)
          }
          catch (error) {
            console.log(error)
          }
          console.log(user)
        }
      }
      confirmUser()
    } catch (error) {
      console.log(error)
    }
  }, [user])
  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addToCart(itemId)
    setCart(updatedCart)
  }
  
  async function handleAddToWishList(itemId) {
    const data = await wishAPI.addToWishlist(itemId)
    setWishlist(data)
  }
  async function handleRemoveFromWishList(itemId) {
    const data = await wishAPI.removeFromWishlist(itemId)
    setWishlist(data)
  }
  async function handleSelectItem(itemId, catName, depName) {
    navigate(`/home/${depName}/${catName}/${itemId}`)
  }
  const onSearch = (searchTerm) => {
    navigate(`/home/search/${searchTerm}`);
  }
  return (
    <main className={styles.App}>
      <NavBar
        className={styles.NavBar}
        user={user}
        setUser={setUser}
        departments={departments}
        onSearch={onSearch}
      />
      <Routes>
        {/* client-side route that renders the component instance if the path matches the url in the address bar */}
        <Route path="/home" element={<HomePage user={user} departments={departments} />} />
        <Route path="/cart"
          element={<OrderPage
            user={user}
            handleAddToWishList={handleAddToWishList}
            handleSelectItem={handleSelectItem}
          />} />
        <Route path="/orders" element={<OrderHistoryPage user={user} />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile" element={<UserProfilePage user={user} setUser={setUser} />} />
        <Route path="/wishlist"
          element={<WishlistPage
            user={user}
            wishlist={wishlist}
            handleAddToOrder={handleAddToOrder}
            handleRemoveFromWishList={handleRemoveFromWishList}
            handleSelectItem={handleSelectItem}
          />}
        />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/auth" element={<AuthPage user={user} setUser={setUser} />} />
        <Route path="/home/search/:term"
          element={<SearchResultsPage
            handleAddToOrder={handleAddToOrder}
            handleAddToWishList={handleAddToWishList}
            handleRemoveFromWishList={handleRemoveFromWishList}
            handleSelectItem={handleSelectItem}
            onSearch={onSearch}
            wishlist={wishlist}
            cart={cart}
          />}
        />
        <Route path="/home/:depName/categories" element={<CategoryListPage departments={departments} />} />
        <Route path="/home/:depName/:catName/items"
          element={<ItemListPage
            handleAddToOrder={handleAddToOrder}
            handleAddToWishList={handleAddToWishList}
            handleRemoveFromWishList={handleRemoveFromWishList}
            handleSelectItem={handleSelectItem}
            wishlist={wishlist}
            cart={cart}
          />}
        />
        <Route path="/home/:depName/:catName/:id"
          element={<ItemDetailPage
            user={user}
            handleAddToOrder={handleAddToOrder}
            handleAddToWishList={handleAddToWishList}
            handleRemoveFromWishList={handleRemoveFromWishList}
            wishlist={wishlist}
            cart={cart}
          />}
        />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  )
}