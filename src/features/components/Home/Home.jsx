import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getBracelet } from "../Bracelet/BraceletSlice";
// import Slider from "react-slick"
import { getBelt } from "../Bracelet/BeltSlice";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"
import beltimg from "../icon/beltimg.png"

import image1 from "../beltimage/beltimg_1.png"
import image2 from "../beltimage/beltimg_2.png"
import image3 from "../beltimage/beltimg_3.png"
import image4 from "../beltimage/beltimg_4.png"
import image5 from "../beltimage/beltimg_5.png"
import image6 from "../beltimage/beltimg_6.png"


import refresh from "../icon/refresh.png"
import left from "../icon/left.png"
import right from "../icon/right.png"
import heart from "../icon/heart.png"
import fillHeart from "../icon/fillheart.png"
import "./Home.css";



function Home({ onAddToWishList, onAddToBag }) {

    const { bracelet } = useSelector((state) => state.bracelet)
    const { belt } = useSelector((state) => state.belt)



    const [selectedImages, setSelectedImages] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [showInSecondDiv, setShowInSecondDiv] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFillHeart, setIsFillHeart] = useState({})

    const handleImageClick = (img, price, title) => {
        if (selectedImages.length < 9) {
            setShowInSecondDiv(true)
            setSelectedImages([...selectedImages, { img, price, title }]);
            setTotalPrice((prevTotal) => prevTotal + price);
        } else {
            alert("Not more than 9 products");
        }
    };


    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [showBeltInSecondDiv, setShowBeltInSecondDiv] = useState(true)

    const handleColorBlockClick = (index) => {
        setShowBeltInSecondDiv(true)
        setSelectedImageIndex(index)
    }

    const selectedBeltImages = [
        {
            img: image1
        },
        {
            img: image2
        },
        {
            img: image3
        },
        {
            img: image4
        },
        {
            img: image5
        },
        {
            img: image6
        }
    ]



    const handleRemoveImage = (index) => {
        const imageToRemove = selectedImages[index];
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
        setTotalPrice(totalPrice - imageToRemove.price)
    };


    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
        setSelectedImages([]);
        setTotalPrice(0)
    };


    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false)
    };


    const handleHeartClick = (id, title, img, price) => {
        setIsFillHeart((prevIsFillHeart) => ({
            ...prevIsFillHeart,
            [id]: !prevIsFillHeart[id]
        }));
    };



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBracelet())
        dispatch(getBelt())
    }, [])


    return (
        <div className="body_home">
            <div className="collection">
                <div className="title"><p>Collection</p></div>
                <div className="collection_charms">
                    <div>
                        <img src={left} alt="" style={{
                            width: "15px"
                        }} />
                    </div>

                    {
                        bracelet.map(({ id, title, img, price }) => {
                            return (
                                <div key={id} className="products_block">
                                    <div className="product_heart_block" onClick={(e) => {
                                        e.stopPropagation();
                                        onAddToWishList({ id, title, img, price })
                                        handleHeartClick(id)
                                    }}>
                                        <img src={isFillHeart[id] ? fillHeart : heart} alt="" />
                                    </div>
                                    <div>
                                        <img src={img} alt="" style={{ width: "60px" }} onClick={() => handleImageClick(img, price, title)} /></div>
                                    <div className="products_block_title_price">
                                        <div className="product_title">{title}</div>
                                        <div className="product_price">{price} $</div>
                                    </div>
                                    <div className="seeMore">
                                        <p className="open" onClick={() => handleOpenModal({ img, title, price })}>See more</p>
                                        {
                                            isModalOpen && selectedItem && (
                                                <div className="modalSeeMore">
                                                    <div key={id} className="modalSeeMoreBlock">
                                                        <div className="close_button">
                                                            <span className="close" onClick={handleCloseModal}>X</span>
                                                        </div>
                                                        <div className="photo_inf">
                                                            <div className="photo">
                                                                <div className="heart_block"><img src={heart} alt="" /></div>
                                                                <div><img src={selectedItem.img} alt="" style={{
                                                                    width: "120px"
                                                                }} /></div>
                                                            </div>
                                                            <div className="inf">
                                                                <h1>{selectedItem.title}</h1>
                                                                <p>{selectedItem.price}.00 $</p>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae non iaculis non non. Tristique vel tellus urna blandit sed gravida posuere tellus diam. Venenatis nunc enim ac condimentum facilisis rutrum rhoncus sagittis sed. Adipiscing odio lectus purus in id id. </p>
                                                            </div>
                                                        </div>
                                                        <div className="circle">
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div>
                        <img src={right} alt="" style={{
                            width: "15px",
                        }} />
                    </div>
                </div>
                <div className="title"><p>Charms</p></div>
                <div className="collection_charms">
                    <div>
                        <img src={left} alt="" style={{
                            width: "15px"
                        }} />
                    </div>
                    {
                        bracelet.map(({ id, title, img, price }) => {
                            return (
                                <div key={id} className="products_block">
                                    <div className="product_heart_block">
                                        <img src={heart} alt="" />
                                    </div>
                                    <div>
                                        <img src={img} alt="" style={{ width: "60px" }} onClick={() => handleImageClick(img, price)} /></div>
                                    <div className="products_block_title_price">
                                        <div className="product_title">{title}</div>
                                        <div className="product_price">{price} $</div>
                                    </div>
                                    <div className="seeMore">
                                        <p className="open" onClick={() => handleOpenModal({ img, title, price })}>See more</p>
                                        {
                                            isModalOpen && selectedItem && (
                                                <div className="modalSeeMore">
                                                    <div key={id} className="modalSeeMoreBlock">
                                                        <div className="close_button">
                                                            <span className="close" onClick={handleCloseModal}>X</span>
                                                        </div>
                                                        <div className="photo_inf">
                                                            <div className="photo">
                                                                <div className="heart_block"><img src={heart} alt="" /></div>
                                                                <div><img src={selectedItem.img} alt="" style={{
                                                                    width: "120px"
                                                                }} /></div>
                                                            </div>
                                                            <div className="inf">
                                                                <h1>{selectedItem.title}</h1>
                                                                <p>{selectedItem.price}.00 $</p>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                                    Vitae non iaculis non non. Tristique vel tellus urna blandit sed gravida posuere tellus diam. Venenatis nunc enim ac condimentum facilisis rutrum rhoncus sagittis sed. Adipiscing odio lectus purus in id. </p>
                                                            </div>
                                                        </div>
                                                        <div className="circle">
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                            <button><img src={selectedItem.img} alt="" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div>
                        <img src={right} alt="" style={{
                            width: "15px",
                        }} />
                    </div>
                </div>
            </div>
            <div className="belt">
                <div className="title_belt">
                    <p>Belt</p>
                </div>


                <div className="belt_block">
                    <div className="colorBlock_01" onClick={() => handleColorBlockClick(0)}>Click me</div>
                    <div className="colorBlock_02" onClick={() => handleColorBlockClick(1)}>Click me</div>
                    <div className="colorBlock_03" onClick={() => handleColorBlockClick(2)}>Click me</div>
                    <div className="colorBlock_04" onClick={() => handleColorBlockClick(3)}>Click me</div>
                    <div className="colorBlock_05" onClick={() => handleColorBlockClick(4)}>Click me</div>
                    <div className="colorBlock_06" onClick={() => handleColorBlockClick(5)}>Click me</div>
                </div>

            </div>
            <div className="belt_second">
                <div className="refresh" key={refreshKey}>
                    <img src={refresh} alt="" onClick={handleRefresh} />
                </div>
                <div className="imgOnBelt_Block">
                    {showBeltInSecondDiv && selectedImageIndex !== null && (
                        <img src={selectedBeltImages[selectedImageIndex].img} alt="" />
                    )}

                    <div className="imgOnBelt">
                        {selectedImages.map((item, index) => (
                            <div key={index}>
                                {showInSecondDiv && <img src={item.img} alt="" />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="title-belt-in-SecondBlock">
                    <p>Belt</p>
                </div>
                <div className="belt_price">
                    <p>Belt price: 400,00 $</p>
                </div>
                <div className="block-for-imgBlock">
                    {
                        selectedImages.map((item, index) => (
                            <div key={index} className="img_onBlock">
                                <div className="img-close">
                                    <div>
                                        <img src={item.img} alt="" style={{ width: "40px" }} />
                                    </div>
                                    <div className="imgBlock-close">
                                        <button className="button-imgBlock-close" onClick={() => handleRemoveImage(index)}>X</button>
                                    </div>
                                </div>
                                <div className="price_block">
                                    <p style={{ color: "white" }}>
                                        {item.price}.00 $
                                    </p>
                                    <div>
                                        <p style={{ color: "#3485FF", cursor: "pointer" }} onClick={() => onAddToBag(item)}>Add to bag</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <br />
                <br />
                <div className="belt_price">
                    <div>
                        <p>Total price: &nbsp; &nbsp;
                            <span style={{ fontWeight: "bold" }}>{totalPrice},00 $</span></p>
                    </div>

                </div>
                <footer>© 2020 Composet. All rights reserved</footer>
                <br />
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}
export default Home