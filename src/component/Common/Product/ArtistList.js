import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';
import { useHistory } from "react-router-dom";
const ArtistList = (props) => {
    let dispatch = useDispatch();
    const history = useHistory();
    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
    }
    const handleClick = (id) => {
        history.push("/artistimages" )// Replace '/target-page' with your desired path
        dispatch({payload: { id }})
      };
    // Add to Favorite
    const addToFav = async (id) => {
        dispatch({ type: "products/addToFav", payload: { id } })
    }
    // Add to Compare
    const addToComp = async (id) => {
        dispatch({ type: "products/addToComp", payload: { id } })
    }
    console.log(props)
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/artistimages/${props.data.id}`} className="image">
                        <img src={props.data.profile_img?props.data.profile_img:"https://artistimages.blob.core.windows.net/artistimage/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg"} alt="Product" />
                        {/* <img className="hover-image" src={props.data.profile_img?props.data.profile_img:"https://artistimages.blob.core.windows.net/artistimage/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg"}
                            alt="Product" /> */}
                    </Link>
                    <span className="badges">
                        <span className={(['hot','new','sale'][Math.round(Math.random()*2)])}>{props.data.labels}</span>
                    </span>
                  
                    {/* <button style={{backgroundColor:"black"}} type="button" className="add-to-cart offcanvas-toggle" onClick={() => handleClick(props.data.id)}>View More</button> */}
                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data.id}`}>{props.data.firstName} {props.data.lastName}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">{props.data.expreance}</span>
                    </span>
                </div>
            </div>

            {/* <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} /> */}
        </>
    )
}

export default ArtistList