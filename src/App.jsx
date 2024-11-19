import React from 'react';
import { useState } from 'react';
import Home from './features/components/Home/Home';
import WishList from './features/components/WishList/WishList';
import Bag from './features/components/Bag/Bag';
import { Link, useRoutes } from 'react-router-dom';
import heart from "./features/components/icon/heart.png"
import basket from "./features/components/icon/basket.png"
import './App.css';

function App() {

  const [bag, setBag] = useState([]);
  const [wishList, setWishList] = useState([])

  const handleAddToBag = (item) => {
    setBag((prevBag) => [...prevBag, item])
  }

  const handleAddToWishList = (item) => {
    if (wishList.length < 10) {
      setWishList((prevWishList) => [...prevWishList, item])
    }else{
      alert("Cannot add more than 10 items to the WishList")
    }
  }

  const element = useRoutes(
    [
      {
        path: "/",
        element: <Home onAddToWishList={handleAddToWishList} onAddToBag={handleAddToBag}/>
      },
      {
        path: "/Home",
        element: <Home onAddToWishList={handleAddToWishList} onAddToBag={handleAddToBag}/>
      },
      {
        path: "/WishList",
        element: <WishList wishList={wishList} onAddToBag={handleAddToBag} setWishList={setWishList}/>
      },
      {
        path: "/Bag",
      element: <Bag bag={bag} setBag={setBag} />
      }
    ]
  )

  return (
    <div className="App">
      <header className='header'>
        <div className='logo'> <Link  to="/Home">
          COMPOSET
        </Link></div>
        <div className='links'>
          <div className='links-border'><Link to="/Home">Home</Link></div>
          <div className='links-border'><Link to="/WishList">
            <div className='icon'>
              <img src={heart} alt="" />WishList</div>
          </Link></div>
          <div className='links-border'><Link to="/Bag">
            <div className='icon'><img src={basket} alt="" />Bag</div>
          </Link></div>
          <div className='links-border'><Link >Ru</Link></div>
        </div>
      </header>
      <div className='place_routes'>
        <section>{element}</section>
      </div>
    </div>
  );
}

export default App;
