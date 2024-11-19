import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBracelet } from "../Bracelet/BraceletSlice";
import left from "../icon/left.png"
import right from "../icon/right.png"
import heart from "../icon/heart.png"


const BraceletSlider = ({ bracelet }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <img src={right} alt="Next" style={{ width: "15px" }} />,
        prevArrow: <img src={left} alt="Previous" style={{ width: "15px" }} />
    };


    // const { bracelet } = useSelector((state) => state.bracelet)

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getBracelet())

    // }, [])




    return (
        <Slider{...settings}>
            {
                bracelet.map(({ id, title, img, price }) => (
                    <div key={id} className="products_block">
                        <div className="heart_block">
                            <img src={heart} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" className="products_image" />
                        </div>
                        <div>
                            <div className="product_title">
                                {title}
                            </div>
                            <div className="product_price">{price}</div>
                            <div className="seeMore">
                                <p>See more</p>
                            </div>
                        </div>
                    </div>
                ))}
        </Slider>
    )
};

export default BraceletSlider