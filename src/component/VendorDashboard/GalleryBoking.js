import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { GALLERYBOOKING, GALLERY } from '../../service/API_URL';
import { Grid, Card, Box, MenuItem, Select, InputLabel, TextField } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import CommonService from '../../service/commonService';
import { useParams } from "react-router-dom";
import { FormControl, FormGroup, Checkbox, Radio, ControlLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
const GalleryBooking = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [checked, setChecked] = useState(false);
    const [galleryBookingList, setGalleryBookingList] = useState([]);

    const [formData, setFormData] = useState({
        artistName: '',
        qualification: '',
        occupation: '',
        address: '',
        contact: '',
        email: '',
        fromDate: '',
        toDate: '',
        booking: '',
        bookingAmount: '',
        natureOfExbhition: '',
        numberOfParticipents: '',
        enclosedPhotograph: '',
        guestRoomAccomodation: '',
        startDate: '',
        endDate: '',
        anyOtherDetailes: '',
    });
    const [finalCost, setFinalCost] = useState({
        galleryFee: 0,
        auditoriamFee: 0,
        numberOfDays: 0
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
    const [galleryList, setGalleryList] = useState([]);
    const [auditoriamList, setAuditoriamList] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedGuestOption, setSelectedGuestOption] = useState('');
    const [radioList, setRadioList] = useState([
        { name: "Solo", value: 4500 },
        { name: "Group", value: 6000 },
    ]);
    const [radioGuestList, setRadioGuestList] = useState([
        "Yes",
        "No",
    ]);

    const getCurrentDate = () => {
        const currentDate = new Date();

        // Get the year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            data = data.slice(0, 9);
            setProducts(data);
            setPage(page);
        }
    }
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        // getGalleryBookingList();
        getGalleryList();
        //  sumOfTotal();
        return () => {
            setGalleryBookingList([]);
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const getDayBasedonDates = (sDate, eDate) => {
        const startDate = new Date(sDate);
        const endDate = new Date(eDate);

        // Calculate the time difference in milliseconds
        const timeDifference = endDate - startDate;

        // Convert time difference from milliseconds to days
        return (timeDifference / (1000 * 60 * 60 * 24)) + 1;
    }

    const calculatFinalPrice = (updatedGalleryList, booktype, auditoriamSelectList, fromDate, toDate) => {
        const numberOfDays = getDayBasedonDates(fromDate ? fromDate : formData.fromDate, toDate ? toDate : formData.toDate);
        const natureOfExc = (booktype && booktype != '') ? booktype : formData.natureOfExbhition;
        const galerryList = updatedGalleryList ? updatedGalleryList.filter((item) => item.isChecked) : galleryList.filter((item) => item.isChecked);
        const finalAuditoriam = auditoriamSelectList ? auditoriamSelectList : auditoriamList;
        // let getPrice = 0
        let natureOfCate = 0;
        const sum = finalAuditoriam.filter(item => item.isChecked).reduce((acc, item) => acc + item.price + item.ac, 0);

        const getPrice = radioList.find((item) => item.name === natureOfExc);
        if (getPrice) {
            natureOfCate = getPrice.value;
        }
        const finalPrice = (numberOfDays * galerryList.length) * natureOfCate;
        console.log(numberOfDays);
        console.log(galerryList);
        console.log(getPrice);
        console.log(finalPrice);
        console.log(sum);
        setFinalCost({ galleryFee: finalPrice, auditoriamFee: sum * numberOfDays, numberOfDays: numberOfDays });
    }
    const fromDateToDate = (fromDate, toDate) => {
        if (formData.fromDate && formData.toDate) {
            calculatFinalPrice(null, null, null, fromDate, toDate);
        }
    }
    const selectNatureofExcebetion = (event) => {
        const anySelected = galleryList.filter((item) => item.isChecked);
        if (formData.fromDate && formData.toDate && anySelected.length > 0) {
            calculatFinalPrice(null, event.target.value);
        }

    }
    const handleCheckboxChange = (index) => {
        const updatedGalleryList = galleryList.map((item, i) =>
            i === index ? { ...item, isChecked: !item.isChecked } : item
        );

        setGalleryList(updatedGalleryList);

        calculatFinalPrice(updatedGalleryList, null);


    };
    const handleCheckboxChangeAuditoriam = (index) => {
        const updatedGalleryList = auditoriamList.map((item, i) =>
            i === index ? { ...item, isChecked: !item.isChecked } : item
        );

        setAuditoriamList(updatedGalleryList);

        calculatFinalPrice(null, null, updatedGalleryList);


    };
    const uploadImage = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) {
            alert("Please select image to upload");
        }
        const formData = new FormData();
    };
    const getGalleryBookingList = () => {

        CommonService.getDetails(GALLERYBOOKING.GET, {}).then((res) => {

            setGalleryBookingList(res);

        }).catch((err) => {

        });
    }
    const getGalleryList = () => {

        CommonService.getDetails(GALLERY.GET, {}).then((res) => {
            const galeryTypeList = res.filter((result) => result.type === "Gallery");
            const audiTypeList = res.filter((result) => result.type === "Other");

            setGalleryList(galeryTypeList);
            setAuditoriamList(audiTypeList);

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
        console.log(formData)
        setValidated(true);
        // if (validateForm()) {

        formData.bookedAuditorium = auditoriamList.filter((item) => item.isChecked);
        formData.bookedGallery = galleryList.filter((item) => item.isChecked);
        formData.totalAmount = finalCost.auditoriamFee + finalCost.galleryFee;
        formData.auditoriumBookedAmount = finalCost.auditoriamFee;
        formData.galleryBookedAmount = finalCost.galleryFee;
        formData.numberOfDays = finalCost.numberOfDays;
        CommonService.postRequest(GALLERYBOOKING.POST, formData).then((res) => {

            setShowSuccess(true);
            setFinalCost({ auditoriamFee: 0, galleryFee: 0, numberOfDays: 0 });
            setFormData({
                artistName: '',
                qualification: '',
                occupation: '',
                address: '',
                contact: '',
                email: '',
                fromDate: '',
                toDate: '',
                booking: '',
                bookingAmount: '',
                natureOfExbhition: '',
                numberOfParticipents: '',
                enclosedPhotograph: '',
                guestRoomAccomodation: '',
                startDate: '',
                endDate: '',
                anyOtherDetailes: '',
            });
            setValidated(false);
            handleClose();
            // getGalleryBookingList();
        }).catch((err) => {

            if (err.response.data.message) {
                alert(err.response.data.message);
            }

        });



    };


    const editGalleryBooking = (gallerybooking) => {

        setFormData(gallerybooking);
        handleShow();
    }


    const deleteGalleryBooking = (gallerybooking) => {
        const userConfirmed = window.confirm('Do you want to delete the record?');

        if (userConfirmed) {
            CommonService.deleteRequest(GALLERYBOOKING.POST + "/" + gallerybooking.id).then((res) => {
                alert(" Registration Successfully.");
                setShowSuccess(true);
                setValidated(false);
                handleClose();
                getGalleryBookingList();
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
                        <Card.Title style={{ color: "#ef7528", marginLeft: "2rem" }}> <i className="fa fa-user" style={{ marginRight: "5px" }}></i>Personal Details</Card.Title>


                        <Container>
                            <Form
                                noValidate validated={validated} onSubmit={handleSubmit} >


                                <FormGroup >
                                    <Container>
                                        <Row >

                                            <Col xs={12} md={6}>
                                                <Form.Label>Artist name</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter artist name "
                                                    name="artistName"
                                                    value={formData.artistName}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.artistName}
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Form.Label>Qualification</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter qualification"
                                                    name="qualification"
                                                    value={formData.qualification}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.qualification}
                                                />
                                            </Col>
                                        </Row>
                                        <br></br>


                                        <Row>
                                            <Col xs={12} md={6} >
                                                <Form.Label>Occupation</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter occupation "
                                                    name="occupation"
                                                    value={formData.occupation}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.occupation}
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Form.Label>Address</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.address}
                                                />
                                            </Col>
                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col xs={12} md={6} >
                                                <Form.Label>Phone Number</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter phone number "
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.contact}
                                                />
                                            </Col>
                                            <Col xs={12} md={6}  >
                                                <Form.Label>Email</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!formErrors.email}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </FormGroup>


                            </Form>
                        </Container>



                    </Card.Body>
                </Card>
                <br></br>
                <Card style={{
                    width: '100%', background: "white",
                    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                }}>

                    <Card.Body >
                        <Card.Title style={{ color: "#ef7528", marginLeft: "2rem" }}> <i className="fa fa-id-badge" style={{ marginRight: "5px" }}></i>Gallery Booking Details</Card.Title>

                        {/* <Card.Title style={{textAlign: "center", fontSize: "x-large", fontWeight: "600"}}>GalleryBoking</Card.Title> */}
                        <Card.Text>







                            <Container>
                                <Form
                                    noValidate validated={validated} onSubmit={handleSubmit} >


                                    <FormGroup >
                                        <Container>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> From Date</Form.Label>

                                                    <Form.Control
                                                        // disabled={formData.id != ""}
                                                        type="date"
                                                        min={getCurrentDate()}
                                                        name="fromDate"
                                                        placeholder="DateRange"
                                                        value={formData.fromDate}
                                                        // isInvalid={!!formErrors.startDate}
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                            fromDateToDate(event.target.value, formData.toDate);
                                                        }}
                                                    // onChange={handleChange}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> To Date</Form.Label>

                                                    <Form.Control
                                                        // disabled={formData.id != ""}
                                                        type="date"
                                                        min={formData.fromDate}
                                                        name="toDate"
                                                        placeholder="DateRange"
                                                        value={formData.toDate}
                                                        // isInvalid={!!formErrors.startDate}
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                            fromDateToDate(formData.fromDate, event.target.value);
                                                        }}
                                                    // onChange={handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>

                                                <Col xs={12} md={6} >
                                                    <Form.Label> Nature Of Exbhition</Form.Label>
                                                    {radioList.map((option, index) => (
                                                        <Form.Check
                                                            key={index}
                                                            type="radio"
                                                            label={option.name + " ₹" + option.value}
                                                            name="natureOfExbhition"
                                                            value={option.name}
                                                            checked={formData.natureOfExbhition === option.name}
                                                            onChange={(event) => {
                                                                handleChange(event);
                                                                selectNatureofExcebetion(event);
                                                            }}
                                                            id={`radio-${index}`}
                                                        />
                                                    ))}
                                                    {/* <Form.Control
                                                                type="text"
                                                                placeholder="Enter nature of exbhition "
                                                                name="natureOfExbhition"
                                                                value={formData.natureOfExbhition}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.natureOfExbhition}
                                                            /> */}
                                                </Col>
                                                <Col xs={12} md={6} >
                                                <Form.Label>  Gallery</Form.Label>

                                                    <Row>
                                                        {galleryList.map((gallery, index) => (
                                                            <Col xs={6} md={3}>
                                                                <ToggleButton

                                                                    className="mb-2"
                                                                    id="toggle-check"
                                                                    type="checkbox"
                                                                    variant="inline-primary"
                                                                    checked={gallery.isChecked}
                                                                    value={gallery.name}
                                                                    onChange={() => handleCheckboxChange(index)}

                                                                >
                                                                    {gallery.galleryName}
                                                                </ToggleButton>
                                                            </Col>

                                                        ))}
                                                    </Row>
                                                    <Row>
                                                        {auditoriamList.map((gallery, index) => (
                                                           <Col xs={12} md={12}>
                                                          <ToggleButton
                                                                className="mb-2"
                                                                id="toggle-check"
                                                                type="checkbox"
                                                                variant="inline-primary"
                                                                checked={gallery.isChecked}
                                                                value={gallery.name}
                                                                onChange={() => handleCheckboxChangeAuditoriam(index)}

                                                            >
                                                                {gallery.galleryName} ₹{gallery.price} {gallery.ac > 0 ? <span> + AC ₹ {gallery.ac} Hr</span> : ''}
                                                            </ToggleButton>
                                                            </Col>
                                                        ))}
                                                    </Row>




                                                </Col>

                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> Booking Amount</Form.Label>

                                                    <Form.Control
                                                        type="text"

                                                        placeholder="Enter booking amount"
                                                        name="bookingAmount"
                                                        value={formData.bookingAmount}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors.bookingAmount}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> Number Of Participents</Form.Label>

                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter number of participents"
                                                        name="numberOfParticipents"
                                                        value={formData.numberOfParticipents}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors.numberOfParticipents}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> Enclosed Photograph</Form.Label>

                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter enclosed photograph "
                                                        name="enclosedPhotograph"
                                                        value={formData.enclosedPhotograph}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors.artistName}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> Guest Room Accomodation</Form.Label>
                                                    {radioGuestList.map((option, index) => (
                                                        <Form.Check
                                                            key={index}
                                                            type="radio"
                                                            label={option}
                                                            name="guestRoomAccomodation"
                                                            value={option}
                                                            checked={formData.guestRoomAccomodation === option}
                                                            onChange={handleChange}
                                                            id={`radio-${index}`}
                                                        />
                                                    ))}
                                                    <br></br>
                                                    {formData.guestRoomAccomodation === "Yes" && (
                                                        <Row>
                                                        <Col xs={6} md={6}>
                                                          <Form.Control
                                                          // disabled={formData.id != ""}
                                                          type="date" style={{ width: "100%" }}
                                                          name="startDate"
                                                          placeholder="DateRange"
                                                          value={formData.startDate}
                                                          // isInvalid={!!formErrors.startDate}

                                                          onChange={handleChange}
                                                      />
                                                      </Col>
                                                      <Col xs={6} md={6}>
                                                      <Form.Control
                                                        //    disabled={formData.id != ""}
                                                            type="date" style={{ width: "100%" }}
                                                            name="endDate"
                                                            placeholder="DateRange"
                                                            value={formData.endDate}
                                                            // isInvalid={!!formErrors.startDate}

                                                            onChange={handleChange}
                                                        />
                                                      </Col>
                                                      </Row>
                                                        // <FormGroup controlId="textInput">
                                                        //     <Form.Label>Enter additional information:</Form.Label>
                                                        //     <Form.Control type="text" placeholder="Your input here" />
                                                        // </FormGroup>
                                                    )}
                                                    {/* <Form.Control
                                                                type="text"
                                                              
                                                                placeholder="Enter guest room accomodation: "
                                                                name="guestRoomAccomodation"
                                                                value={formData.guestRoomAccomodation }
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.guestRoomAccomodation}
                                                            /> */}
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Label> Other Detailes</Form.Label>

                                                    <Form.Control
                                                        type="text"

                                                        placeholder="Enter  Detailes:  "
                                                        name="anyOtherDetailes"
                                                        value={formData.anyOtherDetailes}
                                                        onChange={handleChange}
                                                        isInvalid={!!formErrors.anyOtherDetailes}
                                                    />
                                                </Col>

                                            </Row>







                                        </Container>
                                    </FormGroup>
                                    <br></br>

                                    <div style={{ textAlign: "center" }}>
                                        <Button style={{ backgroundColor: "#ef7528", border: "none" }} type="submit">
                                            Book
                                        </Button>
                                    </div>
                                </Form>
                            </Container>



                        </Card.Text>
                    </Card.Body>
                </Card>
                <br></br>
                <Card style={{
                    width: '100%', background: "white",
                    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                }}>

                    <Card.Body >
                        <Card.Title style={{ color: "#ef7528", marginLeft: "2rem" }}> <i className="fa fa-shopping-cart" style={{ marginRight: "5px" }}></i>Amount To Be Paid</Card.Title>


                        <Container>
                            <Form
                                noValidate validated={validated} onSubmit={handleSubmit} >


                                <FormGroup >
                                    <Container>
                                        <Row >

                                            <Col xs={6} md={6} style={{ fontSize: "large", fontWeight: "500" }}>
                                                Selected Dates:
                                            </Col>
                                            <Col xs={6} md={6} style={{ textAlign: 'end', fontSize: "large", fontWeight: "500" }}>
                                                {(formData.fromDate && formData.toDate) ? <span >
                                                    {formData.fromDate} TO  {formData.toDate}
                                                </span> : 'N/A'}

                                            </Col>
                                            <Col xs={6} md={6} style={{ fontSize: "large", fontWeight: "500" }}>
                                                Nature Of Exbhition:

                                            </Col>
                                            <Col xs={6} md={6} style={{ textAlign: 'end', fontSize: "large", fontWeight: "500" }}>
                                                <span >
                                                    {formData.natureOfExbhition ? formData.natureOfExbhition : 'N/A'}
                                                </span>

                                            </Col>
                                            <Col xs={6} md={6} style={{ fontSize: "large", fontWeight: "500" }} >
                                                Final Cost:
                                            </Col>
                                            <Col xs={6} md={6} style={{ textAlign: 'end', fontSize: "large", fontWeight: "500" }}>
                                                <span >
                                                    ₹  {finalCost.galleryFee + finalCost.auditoriamFee}
                                                </span>

                                            </Col>
                                        </Row>

                                        <br></br>



                                    </Container>
                                </FormGroup>


                            </Form>
                        </Container>



                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default GalleryBooking
