import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./WishList.css"
import fillHeart from "../icon/fillheart.png"

function WishList({ wishList, onAddToBag, setWishList }) {
  const handleRemoveFromWishList = (item) => {
    setWishList((prevWishList) => prevWishList.filter((wishListItem) => wishListItem.id !== item.id));
  };


  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false)
  }

  // const [isOpenOne, setIsOpenOne] = useState(false)


  return (
    <div className='body-wish'>
      <div className='wish-collection'>
        <div className='wish-title'><p>Collection</p></div>
        <div className='wish-collection-charms'>
          {
            wishList.length > 0 ? wishList.map((item) => (
              <div key={item.id} className='wish-products-block'>
                <div className='wish-products-block-img'>
                  <div className='wishList-heart'>
                    <img src={fillHeart} alt="" onClick={() => handleRemoveFromWishList(item)} />
                  </div>
                  <img src={item.img} alt="" style={{
                    width: "60px"
                  }} />
                </div>
                <div className='wish-title-price'>
                  <div className='wish-products-block-title'>{item.title}</div>
                  <div className='wish-products-block-price'>{item.price} $</div>
                </div>
                <div className='wishList-button'>
                  <p onClick={() => onAddToBag(item)}>Add to Bag</p>



                  <p className="open" onClick={() => handleOpenModal(item.img, item.title, item.price)}>See more</p>
                  {
                    isModalOpen && selectedItem && (
                      <div className="wish-modalSeeMore">
                        <div key={item.id} className="wish-modalSeeMoreBlock">
                          <div className="close_button">
                            <span className="wish-close" onClick={handleCloseModal}>X</span>
                          </div>
                          <div className="wish-photo_inf">
                            <div className="wish-photo">
                              <div className="heart_block"><img src={item.fillheart} alt="" /></div>
                              <div><img src={item.img} alt="" style={{
                                width: "120px"
                              }} /></div>
                            </div>
                            <div className="wish-inf">
                              <h1>{item.title}</h1>
                              <p>{item.price}.00 $</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae non iaculis non non. Tristique vel tellus urna blandit sed gravida posuere tellus diam. Venenatis nunc enim ac condimentum facilisis rutrum rhoncus sagittis sed. Adipiscing odio lectus purus in id id. </p>
                            </div>
                          </div>
                          <div className="wish-circle">
                            <button><img src={item.img} alt="" /></button>
                            <button><img src={item.img} alt="" /></button>
                            <button><img src={item.img} alt="" /></button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            )) : <div className='no-items'>No Items in wishList</div>
          }
        </div>
      </div>
    </div>
  );
}

export default WishList;

