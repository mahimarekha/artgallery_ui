import React,{useState,useEffect} from 'react'
import ProductInfo from './ProductInfo'
import GalleryInfo from './GalleryInfo'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {FormGroup} from 'react-bootstrap';

import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import Swal from 'sweetalert2';
import {GALLERY_COLLECTION } from '../../../service/API_URL';
import CommonService from '../../../service/commonService';
import Modal from 'react-bootstrap/Modal';
const GalleryDetailsOne = () => {
    let dispatch = useDispatch();
    const [product, setArtistRegistrationList] = useState({});
    const [formErrors, setFormErrors] = useState({});
    let { id } = useParams();
    const [formData, setFormData] = useState({
       "phone":"",
       "email":"",
       "name":""
    });
    // dispatch({ type: "products/getProductById", payload: { id } });
    // let product = useSelector((state) => state.products.single);

    // // Add to cart
    // const addToCart = async (id) => {
    //     dispatch({ type: "products/addToCart", payload: { id } })
    // }

    // // Add to Favorite
    // const addToFav = async (id) => {
    //     dispatch({ type: "products/addToFav", payload: { id } })
    // }

    // // Add to Compare
    // const addToComp = async (id) => {
    //     dispatch({ type: "products/addToComp", payload: { id } })
    // }

    // const colorSwatch = (i) => {
    //     let data = product.color.find(item => item.color === i)
    //     setImg(data.img)
    // }
    const [validated, setValidated] = useState(false);

    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // const [img, setImg] = useState(product.img)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            Swal.fire('Sorry!', "Minimun Quantity Reached",'warning')
            setCount(1)
        }
    }
    useEffect(() => {
        getArtistRegistrationDetailList();

        return () => {
            setArtistRegistrationList({});
        }
    }, []);

    const getArtistRegistrationDetailList = () => {
       
            CommonService.getDetails(GALLERY_COLLECTION.GET+"/"+id).then((res) => {

                setArtistRegistrationList(res);
    
    
            }).catch((err) => {
    
            });
        }

        const handleSubmit = (event) => {
            event.preventDefault();
    
            setValidated(true);
            if (validateForm()) {
          const formInputData ={"artiestId":product.artiestId ? product.artiestId.id:"" ,
            "workId":product.id,
            "amount":product.price,
            "phone":formData.phone,
            "email":formData.email,
            "name":formData.name};
                CommonService.postRequest(GALLERY_COLLECTION.ORDER, formInputData).then((res) => {
    
                   
                    setFormData({
                       phone:"",
                        email:"",
                        name:""
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'You have place order successfully',
                        text: 'Order Placed '
                      })
                      handleClose();
                      getArtistRegistrationDetailList();
                }).catch((err) => {
    
                    if (err.response.data.message) {
                        alert(err.response.data.message);
                    }
    
                });
           
            }
    
        };
    
        const validateForm = () => {
            let errors = {};
            let formIsValid = true;
            if (!formData.name) {
                formIsValid = false;
                errors["name"] = "name is required";
            }else if (!formData.email) {
                formIsValid = false;
                errors["email"] = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                formIsValid = false;
                errors["email"] = "Email is invalid";
            }
    
            if (!formData.phone) {
                formIsValid = false;
                errors["phone"] = "phone is required";
            }
    
            setFormErrors(errors);
            return formIsValid;
        };

        
    return (
        <>{product
            ?
            <section id="product_single_one" className="ptb-100">
                <div className="container">
                    <div className="row area_boxed">
                        <div className="col-lg-4">
                            <div className="product_single_one_img">
                                <img src={product?.imageURL?.length ? product?.imageURL[0].imageURL :''} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.title}</h3>
                                    <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={3} id="rating-star-common" />
                                        <span>(By {product.artiestId?.firstName} {product.artiestId?.lastName})</span>
                                    </div>
                                    <h4>₹{product.price}.00  </h4>
                                    <p>Medium : {product?.medium} </p>
                                    <p>Style : {product?.style} </p>
                                    <p>Year : {product?.year} </p>
                                    <p>Size : {product?.height} H X {product?.width} W {product?.sizeType}</p>
                                    <p>{product.description}</p>
                                    <div className="customs_selects">
                                        {/* <select name="product" className="customs_sel_box">
                                            <option value="volvo">Size</option>
                                            <option value="xl">XL</option>
                                            <option value="small">S</option>
                                            <option value="medium">M</option>
                                            <option value="learz">L</option>
                                        </select> */}                      
{product.approvalStatus == 'Sold Out' ? <Button variant="outline-secondary" disabled={true}>Sold Out</Button> :  <button type="button" className="theme-btn-one bg-black btn_sm"  onClick={handleShow}>Buy </button>}
                                                           
                                    </div>
                                    
                                    {/* <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={decNum}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control" type="number" value={count} readOnly />
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={incNum}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form> */}
                                    {/* <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product.id)}><i
                                                    className="fa fa-heart"></i>Add To Wishlist</a>
                                            </li>
                                            <li>
                                                <a href="#!" className="action compare" onClick={() => addToComp(product.id)} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li>
                                        </ul>
                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product.id)}>Add To Cart</a>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <GalleryInfo prod={product} />
                </div>
            </section>
            :
            <div className="container ptb-100">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src="" alt="img" />
                            <h2>PRODUCT NOT FOUND</h2>
                            <h3>Sorry Mate... No Item Found according to Your query!</h3>
                            <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        }

            <RelatedProduct />

            <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
                            <Form
                                noValidate validated={validated} onSubmit={handleSubmit} >


                                <FormGroup >
                                    <Container>
                                       

                                            <Col xs={12} md={12}>
                                                <Form.Label> Name <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter first name "
                                                    name="name"
                                                    value={formData.name }
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.name }

                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.name }
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Form.Label>Phone Number <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter phone number "
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.phone}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.phone}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={12}  >
                                                <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.email}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <div style={{ textAlign: "center",marginTop:"20px" }}>
                                            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
                                            <Button style={{ backgroundColor: "#ef7528", border: "none",margin:"10px" }} type="submit">
                                                Book
                                            </Button>
                                        </div>
                                     
                           
                                    </Container>
                                </FormGroup>


                            </Form>
                            
                        </Container>

        </Modal.Body>
        
      </Modal>
        </>
    )
}

export default GalleryDetailsOne