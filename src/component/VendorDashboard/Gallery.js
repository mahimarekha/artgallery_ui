import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { GALLERY } from '../../service/API_URL';
import { Grid, Card, Box, MenuItem, Select, InputLabel, TextField } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import CommonService from '../../service/commonService';
import { useParams } from "react-router-dom";
import { FormControl, FormGroup, Checkbox, Radio, ControlLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
const Gallery = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [galleryList, setGalleryList] = useState([]);
    
    const [typeList, setTypeList] = useState([
        "Gallery",
        "Other",
    ]);
    const [formData, setFormData] = useState({
        galleryName: '',
        price: '',
        ac: '',
        type: '',
        status: true,
    });
    const [imageData, setImageData] = useState({

        profile: '',


    });
    const [validated, setValidated] = useState(false);
    const [validated1, setValidated1] = useState(false);
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [formErrors, setFormErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [logourl, setLogoURL] = useState(null);
    const [imageurl, setImageURL] = useState(null);
    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            data = data.slice(0, 9);
            setProducts(data);
            setPage(page);
        }
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        getGalleryList();

        //  sumOfTotal();
        return () => {
            setGalleryList([]);
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadImage = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) {
            alert("Please select image to upload");
        }


        const formData = new FormData();


    };






    const getGalleryList = () => {

        CommonService.getDetails(GALLERY.GET, {}).then((res) => {

            setGalleryList(res);

        }).catch((err) => {

        });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // const validateForm = () => {
    //     let errors = {};
    //     let formIsValid = true;
    //     if (!formData.eventName) {
    //         formIsValid = false;
    //         errors["artiestName"] = "artiest name is required";
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         formIsValid = false;
    //         errors["email"] = "Email is invalid";
    //     }

    //     if (!formData.password) {
    //         formIsValid = false;
    //         errors["password"] = "Password is required";
    //     } else if (formData.password.length < 6) {
    //         formIsValid = false;
    //         errors["password"] = "Password must be at least 6 characters";
    //     }

    //     setFormErrors(errors);
    //     return formIsValid;
    // };
    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);
        // if (validateForm()) {
        if (formData.id) {
            formData.profile = logourl ? logourl : formData.profile;
            CommonService.putRequest(GALLERY.POST + "/" + formData.id, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    galleryName: '',
                    price: '',
                    type: '',
                    galleryName: '',
                    status: true,
                });
                setValidated(false);
                handleClose();
                getGalleryList();
            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        } else {
            formData.profile = logourl ? logourl : '';
            CommonService.postRequest(GALLERY.POST, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    galleryName: '',
                    price: '',
                    type: '',
                    ac: '',
                    status: true,
                });
                setValidated(false);
                handleClose();
                getGalleryList();
            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        }


    };


    const editGallery = (gallery) => {
        debugger
        setFormData(gallery);
        handleShow();
    }


    const deleteGallery = (gallery) => {
        const userConfirmed = window.confirm('Do you want to delete the record?');

        if (userConfirmed) {
            CommonService.deleteRequest(GALLERY.POST + "/" + gallery.id).then((res) => {

                setShowSuccess(true);

                setValidated(false);
                handleClose();
                getGalleryList();
            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        } else {
            // User clicked "Cancel"
            console.log('User canceled the action.');
            // You can handle the cancelation here
        }


    }


    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>Gallery</h4>
                            <button
                                // to="/vendor/add-products"
                                data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button" onClick={handleShow}>Add Gallery</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Gallery Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">AC Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {galleryList.map((data, index) => (

                                        <tr key={index}>

                                            {/* <td><img src={data.profile} height={50} width={50} /> </td> */}

                                            {/* <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={data.img} alt="img" /></Link></td> */}
                                            <td>{data.galleryName}</td>
                                            <td>{data.type}</td>
                                            <td>{data.price} </td>
                                            <td>{data.ac} </td>
                                            <td>{data.status ? 'Active' : "In Active"}</td>
                                            <td><i className="fa fa-edit" onClick={() => editGallery(data)}></i> <button style={{ background: "Transparent" }}><i className="fa fa-trash" onClick={() => deleteGallery(data)}></i></button></td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>



                        <Modal show={show} onHide={handleClose} size="sm">
                            <Modal.Header closeButton  >
                                <Modal.Title >Add Gallery</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form
                                        noValidate validated={validated} onSubmit={handleSubmit} >

                                        <InputGroup >
                                            <FormGroup >
                                                <Container>
                                                    <Row>
                                                        <Col >
                                                            <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter Gallery name"
                                                                name="galleryName"
                                                                value={formData.galleryName}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.galleryName}
                                                            />
                                                        </Col>
                                                        <Col >
                                                        {/* key={index}
                                                            type="radio"
                                                            label={option}
                                                            name="guestRoomAccomodation"
                                                            value={option}
                                                            checked={formData.guestRoomAccomodation === option}
                                                            onChange={handleChange}
                                                            id={`radio-${index}`} */}
                                                           
                                                        <Form.Group controlId="formSelect">
                                                        <Form.Control
                                                            as="select"
                                                            name="type"
                                                            value={formData.type}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Type</option>

                                                             {typeList.map((data, index) => (
                                                                      
                                                          <option value={data.id} key={index}> {data}</option>
                                                             ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                                {/* <Form.Group controlId="formSelect">
                                                                    <Form.Control
                                                                        as="select"
                                                                        name="type"
                                                                        value={formData.type}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">Select Type</option>

                                                                        {typeList.map((data, index) => (

                                                                            <option value={data.id} key={index}> {data.type}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </Form.Group> */}
                                                            </Col>
                                                            </Row>
                                                            <br></br>
                                                            <Row>
                                                            <Col>
                                                            <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter price"
                                                                name="price"
                                                                value={formData.price}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.price}
                                                            />
                                                        </Col>
                                                    
                                                   
                                                        <Col >
                                                            <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter AC price"
                                                                name="ac"
                                                                value={formData.ac}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.ac}
                                                            />
                                                        </Col>
</Row>
<br></br>
<Row>

                                                        <Col>

                                                            <Form.Group controlId="formSelect">
                                                                <Form.Control
                                                                    as="select"
                                                                    name="status"
                                                                    value={formData.status}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value={true}>Active</option>
                                                                    <option value={false}> In Active</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <br></br>


                                                </Container>
                                            </FormGroup>
                                        </InputGroup>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit">
                                                {formData.id ? "Update" : "Create"}
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Container>
                            </Modal.Body>

                        </Modal>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery
