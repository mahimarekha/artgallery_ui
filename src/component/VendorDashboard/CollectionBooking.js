import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { GALLERY } from '../../service/API_URL';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { ARTIST, GALLERY_COLLECTION, EVENTS } from '../../service/API_URL';
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
const CollectionBooking = () => {
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const getRole =  CommonService.getRole();
    const [isAccepted, setIsAccepted] = useState(null);
    const [file, setFile] = useState(null);
    const [validated, setValidated] = useState(false);
    const [typeList, setTypeList] = useState([
        "Collage on Paper",
        "Acrylic On Paper",
        "Other",
    ]);
    const [sizeType, setSizeType] = useState([
        "cm",
        "inch",
    ]);
    const [formErrors, setFormErrors] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showSuccess, setShowSuccess] = useState(false);
    const [artistRegistrationList, setArtistRegistrationList] = useState([]);

    const [logourl, setLogoURL] = useState([]);
    const [imageurl, setImageURL] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        medium: '',
        year: '',
        artworkCode: '',
        style: '',
        height: '',
        sizeType:'',
        width: '',
        price: '',
        status: true,
    });
    const handleAccept = (id, status) => {

        setIsAccepted(true);

        CommonService.putRequest(GALLERY_COLLECTION.POST + "/" + id, { approvalStatus: status }).then((res) => {
            getArtistRegistrationDetailList();
        })
    };

    const handleReject = () => {
        setIsAccepted(false);
    };
    useEffect(() => {
        getArtistRegistrationDetailList();

        return () => {
            setArtistRegistrationList([]);
        }
    }, []);


    const getArtistRegistrationDetailList = () => {
        console.log(getRole)

        if(getRole === 'admin'){
            CommonService.postRequest(GALLERY_COLLECTION.ARTISTGET,{approvalStatus:"Send For Approval"}).then((res) => {

                setArtistRegistrationList(res);
    
    
            }).catch((err) => {
    
            });
        }else{
            CommonService.getDetails(GALLERY_COLLECTION.ORDER).then((res) => {

                setArtistRegistrationList(res);
    
    
            }).catch((err) => {
    
            });
        }

       
    }


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const uploadImage = async (event) => {
        event.preventDefault();
        //// const file = event.target.files[0];
        if (!file) {
            alert("Please select image to upload");
        }
        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageName', file.name);
        try {
            const response = await CommonService.fileUpload(EVENTS.IMG_UPLOAD, formData);

            //console.log(response.data);

            setLogoURL(prevItems => [...prevItems,
            {
                "imageURL": response.url,
                "imageName": response.imageName
            }]);



        } catch (error) {
            console.error(error);
        }




    };
   
    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);
        // if (validateForm()) {
        if (formData.id) {
            formData.imageURL = logourl.length > 0 ? logourl : formData.imageURL;
            CommonService.putRequest(GALLERY_COLLECTION.POST + "/" + formData.id, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    title: '',
                    medium: '',
                    year: '',
                    price: '',
                    height: '',
                    width: '',
                    price: '',
                    style: '',
                    artworkCode: '',
                    sizeType:'',
                    status: true,
                });
                setValidated(false);
                handleClose();
                setLogoURL([]);
                getArtistRegistrationDetailList();
            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        } else {
            formData.imageURL = logourl.length > 0 ? logourl : [];
            CommonService.postRequest(GALLERY_COLLECTION.POST, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    title: '',
                    medium: '',
                    year: '',
                    artworkCode: '',
                    sizeType: '',
                    style: '',
                    price: '',
                    height: '',
                    width: '',
                    price: '',
                    status: true,
                });
                setValidated(false);
                setLogoURL([]);
                handleClose();
                getArtistRegistrationDetailList();

            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        }


    };


    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>Booking Details</h4>

                            

                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                    <th scope="col">Artical Name</th>
                                
                                        <th scope="col">User Name</th>

                                        <th scope="col">Email </th>


                                        <th scope="col">Phone</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Order Status</th>
                                        
                                        <th scope="col">Payment Status</th>

                                        {/* <th scope="col">Current Status</th>
                                        <th scope="col">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistRegistrationList.map((data, index) => (

                                        <tr key={index}>
                                            <td>{data.workId ? data.workId.title :''}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email }</td>
                                            <td>{data.phone} </td>
                                            <td>{data.amount}</td>
                                            <td>{data.orderstatus} </td>
                                            <td>{data.paymentstatus}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.title}
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
                                                        name="medium"
                                                        value={formData.medium}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Type</option>

                                                        {typeList.map((data, index) => (

                                                            <option value={data} key={index}> {data}</option>
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
                                                    placeholder="Year"
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.year}
                                                />
                                            </Col>


                                        </Row>

                                        <br></br>
                                        <Row>
                                            <Col >
                                                <Form.Control
                                                    type="text" style={{ width: "100%" }}
                                                    placeholder="Height"
                                                    name="height"
                                                    value={formData.height}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.height}
                                                />
                                            </Col>
                                            <Col >
                                                <Form.Control
                                                    type="text" style={{ width: "100%" }}
                                                    placeholder="Width"
                                                    name="width"
                                                    value={formData.width}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.width}
                                                />
                                            </Col>
                                            <Form.Group controlId="formSelect">
                                                    <Form.Control
                                                        as="select"
                                                        name="sizeType"
                                                        value={formData.sizeType}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Size Type</option>

                                                        {sizeType.map((data, index) => (

                                                            <option value={data} key={index}> {data}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>

                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col >
                                                <Form.Control
                                                    type="text" style={{ width: "100%" }}
                                                    placeholder="style"
                                                    name="style"
                                                    value={formData.style}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.style}
                                                />
                                            </Col>
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

                                        <Row>

                                            <Col xs={12} md={6} >
                                                <Form.Label>Upload Art work  <span style={{ color: "red" }}>*</span></Form.Label>
                                              
                                                        <Form.Control type="file"  onChange={handleFileChange} accept="image/*" />

                                                    
                                                    
                                                        <Button variant="primary" onClick={uploadImage} style={{ marginTop: '10px' }} >Upload</Button>

                                               
                                                {logourl.map((item, index) => (
                                                    <img src={item.imageURL} key={index} height={100} width={100} />
                                                ))}


                                            </Col>
                                        </Row>


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
        </>
    )
}

export default CollectionBooking
