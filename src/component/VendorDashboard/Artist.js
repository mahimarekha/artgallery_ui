import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { ARTIST, EVENTS, IMAGES } from '../../service/API_URL';
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
const Artist = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [artistImageList, setArtistImageList] = useState([]);
    const [show3, setShow3] = useState(false);
    // const [eventImageList, setEventImageList] = useState([]);
    const handleShow3 = () => setShow3(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [logourl, setLogoURL] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [artistId, setArtistId] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobile:'',
        email:'',
        password:'',
        dob: '',
        placeOfBirth: '',
        nationality: '',
        permAddress: '',
        permCity: '',
        permState: '',
        permPin: '',
        currAddress: '',
        currCity: '',
        currState: '',
        currPin: '',
        qualification: '',
        year: '',
        college: '',
        state: '',
        // artMedium: '',
        expreance: '',
        shortNote: '',
        exhibitions: '',
        // uploadArtwork: '',

    });
    const [imageData, setImageData] = useState({

        profile: '',
    });
    const [artList, setArtList] = useState([
        "Painting",
        "Sculpture",
        "Print making",
        "Drawing",
        "Photography",
        "Digital",
    ]);
    const [exbhitionList, setExbhitionList] = useState([
        "Solo",
        "Group",
    ]);
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
    const [imageurl, setImageURL] = useState(null);
    const [text, setText] = useState('');
    const wordLimit = 500;
    
    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
      };
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
        getArtistList();

        //  sumOfTotal();
        return () => {
            setArtistList([]);
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const getCurrentDate = () => {
        const currentDate = new Date();

        // Get the year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
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
                {"imageURL":response.url,
                "imageName":response.imageName}]);



        } catch (error) {
            console.error(error);
        }

       


    };
   
  

    const getArtistImageList = (artistId) => {

        CommonService.postRequest(IMAGES.GET + "/getlist", { artiesId: artistId }).then((res) => {

            setArtistImageList(res);

        }).catch((err) => {

        });
    }
    
    const getArtistList = () => {

        CommonService.getDetails(ARTIST.GET, {}).then((res) => {

            setArtistList(res);

        }).catch((err) => {

        });
    }
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        const inputText = event.target.value;
        const wordCount = countWords(inputText);
        
        // Only update if word count is within limit
        if (wordCount <= wordLimit) {
          setText(inputText);
        }
        setFormData({
            ...formData,
            [name]: value
            
        });
    };
    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (!formData.firstName) {
            formIsValid = false;
            errors["firstName"] = "first name is required";
        }
        if (!formData.lastName) {
            formIsValid = false;
            errors["lastName"] = "last name is required";
        }
        if (!formData.mobile) {
            formIsValid = false;
            errors["mobile"] = "mobile is required";
        }
        if (!formData.email) {
            formIsValid = false;
            errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors["email"] = "Email is invalid";
        }

        if (!formData.password) {
            formIsValid = false;
            errors["password"] = "Password is required";
        } else if (formData.password.length < 6) {
            formIsValid = false;
            errors["password"] = "Password must be at least 6 characters";
        }
        if (!formData.permAddress) {
            formIsValid = false;
            errors["permAddress"] = "perment address is required";
        }
        if (!formData.permCity) {
            formIsValid = false;
            errors["permCity"] = "perment city is required";
        }
        if (!formData.permState ) {
            formIsValid = false;
            errors["permState"] = "perment state is required";
        }
        if (!formData.permPin ) {
            formIsValid = false;
            errors["permPin"] = "perment pin is required";
        }
        if (!formData.expreance ) {
            formIsValid = false;
            errors["expreance"] = "experience is required";
        }
        if (!formData.exhibitions ) {
            formIsValid = false;
            errors["exhibitions"] = "exhibitions is required";
        }
        setFormErrors(errors);
        return formIsValid;
    };
    const resetForm = ()=>{
        setFormData({
            
            
                firstName: '',
                middleName: '',
                lastName: '',
                mobile:'',
                email:'',
                password:'',
                dob: '',
                placeOfBirth: '',
                nationality: '',
                permAddress: '',
                permCity: '',
                permState: '',
                permPin: '',
                currAddress: '',
                currCity: '',
                currState: '',
                currPin: '',
                qualification: '',
                year: '',
                college: '',
                state: '',
                // artMedium: '',
                expreance: '',
                shortNote: '',
                exhibitions: '',
                // uploadArtwork: '',
       


          
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
debugger
        setValidated(true);
         if (validateForm()) {

        formData.uploadArtwork = logourl ? logourl : '';
        CommonService.postRequest(ARTIST.POST, formData).then((res) => {
            handleShow2();
            
            setShowSuccess(true);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                mobile:'',
                email:'',
                password:'',
                dob: '',
                placeOfBirth: '',
                nationality: '',
                permAddress: '',
                permCity: '',
                permState: '',
                permPin: '',
                currAddress: '',
                currCity: '',
                currState: '',
                currPin: '',
                qualification: '',
                year: '',
                college: '',
                state: '',
                // artMedium: '',
                expreance: '',
                shortNote: '',
                exhibitions: '',
                // uploadArtwork: '',
            });
            setValidated(false);
            handleClose();
            getArtistList();
            resetForm();
            setArtistImageList([]);
        }).catch((err) => {

            if (err.response.data.message) {
                alert(err.response.data.message);
            }

        });

    }

    };
  
    const imageArtist = (artiesdetails) => {
        getArtistImageList(artiesdetails.id);
        setArtistId(artiesdetails.id)
        setShow1();
        handleShow1();
    }

    const editArtist = (event) => {
        setFormData(event);
        handleShow();
    }

    const deleteImage = async (image, index) => {
        const userConfirmed = window.confirm('Do you want to delete the image?');

        if (userConfirmed) {
            try {
                const images = await CommonService.postRequest(IMAGES.DELETEIMAGES,
                    {
                        "imageName": image.imageName,
                        "imageId": image.id,

                    });
                const newItems = artistImageList.filter((item, i) => i !== index);
                setArtistImageList(newItems);
            } catch (error) {
                alert(error);
            }
        }
    }

    const deleteArtist = (event) => {
        const userConfirmed = window.confirm('Do you want to delete the record?');

        if (userConfirmed) {
            CommonService.deleteRequest(ARTIST.POST + "/" + event.id).then((res) => {

                setShowSuccess(true);

                setValidated(false);
                handleClose();
                getArtistList();
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
            <div style={{ padding: "1rem", marginTop: "6rem", }}>

                {/* <h2 style={{textAlign:"center", color:"#ef7528", padding:"25px"}}>Gallery Boking</h2> */}

                <Card style={{
                    width: '100%', background: "white",
                    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                }}>

                    <Card.Body >
                        <Card.Title style={{ color: "#ef7528", marginLeft: "2rem", fontWeight: "550px" }}> Personal Details</Card.Title>


                        <Container>
                            <Form
                                noValidate validated={validated} onSubmit={handleSubmit} >


                                <FormGroup >
                                    <Container>
                                        <Row >

                                            <Col xs={12} md={4}>
                                                <Form.Label>Artist First name <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter first name "
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.firstName}

                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.firstName}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Middle Name</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter middle name"
                                                    name="middleName"
                                                    value={formData.middleName}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.middleName}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} >
                                                <Form.Label>Last Name <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Last Name "
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.lastName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.lastName}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={4} >
                                                <Form.Label>Phone Number <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter phone number "
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.mobile}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.mobile}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={4}  >
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
                                            <Col xs={12} md={4} >
                                                <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter Password "
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.password}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={4}>
                                                <Form.Label> Date Of Birth </Form.Label>

                                                <Form.Control
                                                    // disabled={formData.id != ""}
                                                    type="date"
                                                    max={getCurrentDate()}
                                                    name="dob"
                                                    placeholder="DateRange"
                                                    value={formData.dob}
                                                    isInvalid={!!formErrors.dob}
                                                    onChange={(event) => {
                                                        handleChange(event);
                                                        // fromDateToDate(event.target.value, formData.toDate);
                                                    }}
                                                // onChange={handleChange}
                                                />

                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Place Of Birth</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter place"
                                                    name="placeOfBirth"
                                                    value={formData.placeOfBirth}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.placeOfBirth}
                                                />
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Nationality <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nationality"
                                                    name="nationality"
                                                    value={formData.nationality}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.nationality}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.nationality}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Col item xs={12} >

                                            <h5 style={{ color: "#ef7528", fontWeight: "600", fontSize: "larger" }} >Permanent Address</h5>
                                        </Col>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={3} >
                                                <Form.Label>Permanent Address <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter address "
                                                    name="permAddress"
                                                    value={formData.permAddress}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.permAddress}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.permAddress}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>City <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter city "
                                                    name="permCity"
                                                    value={formData.permCity}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.permCity}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.permCity}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>State <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter state "
                                                    name="permState"
                                                    value={formData.permState}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.permState}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.permState}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>PIN Code <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter PIN "
                                                    name="permPin"
                                                    value={formData.permPin}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.permPin}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.permPin}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>

                                        <br></br>
                                        <Col item xs={12} >
                                            <h5 style={{ color: "#ef7528", fontWeight: "600", fontSize: "larger" }} >Current Address</h5>
                                        </Col>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={3} >
                                                <Form.Label>Current Address </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter address "
                                                    name="currAddress"
                                                    value={formData.currAddress}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.currAddress}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>City </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter city "
                                                    name="currCity"
                                                    value={formData.currCity}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.currCity}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>State </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter state "
                                                    name="currState"
                                                    value={formData.currState}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.currState}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>PIN Code </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter PIN "
                                                    name="currPin"
                                                    value={formData.currPin}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.currPin}
                                                />

                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Col item xs={12} >
                                            <h5 style={{ color: "#ef7528", fontWeight: "600", fontSize: "larger" }} >Educational Details</h5>
                                        </Col>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={3} >
                                                <Form.Label>Qualification</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter qualification "
                                                    name="qualification"
                                                    value={formData.qualification}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.qualification}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>Year</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter year "
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.year}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>College </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter College "
                                                    name="college"
                                                    value={formData.college}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.college}
                                                />

                                            </Col>
                                            <Col xs={12} md={3} >
                                                <Form.Label>State </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter state "
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.state}
                                                />

                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Col item xs={12} >
                                            <h5 style={{ color: "#ef7528", fontWeight: "600", fontSize: "larger" }} >Profissional Details</h5>
                                        </Col>
                                        <br></br>
                                        <Row>
                                            {/* <Col xs={12} md={4} >
                                                <Form.Label>Art Medium <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Group controlId="formSelect">
                                                    <Form.Control
                                                        as="select"
                                                        name="artMedium"
                                                        value={formData.artMedium}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Type</option>

                                                        {artList.map((data, index) => (

                                                            <option value={data.id} key={index}> {data}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.artMedium}
                                                </Form.Control.Feedback>
                                            </Col> */}
                                            <Col xs={12} md={4} >
                                                <Form.Label>Experience  <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter experience "
                                                    name="expreance"
                                                    value={formData.expreance}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.expreance}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.expreance}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col xs={12} md={4} >
                                                <Form.Label>Short Note (max 500 words)</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter short note "
                                                    name="shortNote"
                                                    value={formData.shortNote}
                                                    onChange={handleChange}
                                                    maxLength={500}
                                                    isInvalid={!!formErrors.shortNote}
                                                />
                                                 <Form.Control.Feedback type="invalid">
                                                 {countWords(text)} / {wordLimit} words
                                                </Form.Control.Feedback>

                                            </Col>
                                            <Col xs={12} md={4} >
                                                <Form.Label>Exhibition <span style={{ color: "red" }}>*</span></Form.Label>

                                                <Form.Group controlId="formSelect">
                                                    <Form.Control
                                                        as="select"
                                                        name="exhibitions"
                                                        value={formData.exhibitions}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Type</option>

                                                        {exbhitionList.map((data, index) => (

                                                            <option value={data.id} key={index}> {data}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Control.Feedback type="invalid">
                                                    {formErrors.exhibitions}
                                                </Form.Control.Feedback>
                                            </Col>

                                        </Row>
                                        <br></br>
                                        <Row>
                                           
                                            {/* <Col xs={12} md={6} >
                                                <Form.Label>Upload Art work  <span style={{ color: "red" }}>*</span></Form.Label>
                                                <Row>
                                                        <Col xs={6} md={4}>
                                                            <Form.Control type="file" style={{ width: "100%" }} onChange={handleFileChange} accept="image/*" />

                                                        </Col>
                                                        <Col xs={6} md={4}>
                                                            <Button variant="primary" onClick={uploadImage} style={{ marginTop: '10px' }} >Upload</Button>

                                                        </Col>
                                                    </Row>
                                                {logourl.map((item, index) => (
                                                    <img src={item.imageURL} key={index} height={100} width={100} />
                                                ))}
                                              

                                            </Col> */}
                                        </Row>
                                        <ul>
        {artistImageList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <div style={{ textAlign: "center" }}>
                                            <Button style={{ backgroundColor: "#ef7528", border: "none" }} type="submit">
                                                Register
                                            </Button>
                                        </div>
                                        <Modal show={show2} onHide={handleClose2} >

                                            <Modal.Body style={{ fontSize: 'larger' }}>Registration Done Successfully.
                                               
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose2}>
                                                    Close
                                                </Button>

                                            </Modal.Footer>
                                        </Modal>
                                        
                                    </Container>
                                </FormGroup>


                            </Form>
                            
                        </Container>



                    </Card.Body>
                </Card>
                <br></br>

                <br></br>

            </div>
        </>
    )
}

export default Artist
