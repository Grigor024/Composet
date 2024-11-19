import { useState } from "react"
import "./Bag.css"
import recycle from "../Bag/img/recycle.png"
import Ellipse_1 from "../Bag/img/Ellipse_1.png"
import Ellipse_2 from "../Bag/img/Ellipse_2.png"
import Ellipse_3 from "../Bag/img/Ellipse_3.png"



function Bag({ bag, setBag }) {

    const handleRemoveItem = (index) => {
        setBag((prevBag) => prevBag.filter((_, i) => i !== index))
    };


    const handleIncreaseQuantity = (index) => {
        setBag((prevBag) =>
            prevBag.map((item, i) =>
                i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item))
    };

    const handleDeacreaseQuantity = (index) => {
        setBag((prevBag) =>
            prevBag.map((item, i) =>
                i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    };

    const calculateTotalPrice = (item) => {
        return (item.price || 0) * (item.quantity || 1)
    }

    const calculateAllSelectedPrices = () => {
        return bag.reduce((acc, item) => acc + calculateTotalPrice(item), 0);
    }


    return (
        <div className="body_bag">
            {
                bag.length > 0 ? (
                    <>
                        {bag.map((item, index) => (
                            <div key={index} className="div-choice-products">
                                <div className="recycle">
                                    <img src={recycle} alt="" onClick={() => handleRemoveItem(index)} />
                                </div>
                                <div className="products-img">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="products-title">{item.title}</div>
                                <div className="products-color">
                                    <img src={Ellipse_1} alt="" />
                                    <img src={Ellipse_2} alt="" />
                                    <img src={Ellipse_3} alt="" />
                                </div>
                                <div className="counter">
                                    <button className="bag-counter-button" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                    <p>{item.quantity || 1}</p>
                                    <button className="bag-counter-button" onClick={() => handleDeacreaseQuantity(index)}>-</button>
                                </div>
                                <div className="product-price">{item.price || 0}</div>
                                <div className="total-price">Total price: {calculateTotalPrice(item)}</div>
                                {item.from === 'home' && <div className="source-indicator">Added from Home</div>}
                                {item.from === 'wishList' && <div className="source-indicator">Added from WishList</div>}
                                
                            </div>
                        ))}
                        <div className="all-selected-price">
                            <p>Order price: {calculateAllSelectedPrices()} $</p>
                            <button className="button-order">ORDER</button>
                        </div>
                    </>
                ) : (
                    <p>Your bag is empty</p>
                )}
        </div>
    )
}
export default Bag

