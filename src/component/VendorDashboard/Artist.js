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
    const [artistList, setArtistList] = useState([]);
    const [artistId, setArtistId] = useState('');
    const [formData, setFormData] = useState({
        artiestName: '',
        expreance: '',
        profile: '',
        status: true,
        discription: '',

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
        getArtistList();

        //  sumOfTotal();
        return () => {
            setArtistList([]);
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
        formData.append('image', file);
        formData.append('imageName', file.name);
        try {
            const response = await CommonService.fileUpload(EVENTS.IMG_UPLOAD, formData);

            //console.log(response.data);

            setLogoURL(response.url);

        } catch (error) {
            console.error(error);
        }
    };
    const uploadImage1 = async (event) => {

        event.preventDefault();
        // const file = event.target.files[0];
        if (!file) {
            alert("Please select image to upload");
            return;
        }


        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageName', file.name);

        try {
            const response = await CommonService.fileUpload(EVENTS.IMG_UPLOAD, formData);
            const images = await CommonService.postRequest(IMAGES.GET,
                {
                    "imageName": response.imageName,
                    "imageURL": response.url,
                    "artiesId": artistId,
                    "type":"artiest"
                });

            //console.log(response.data);
            setArtistImageList([...artistImageList, {
                "imageName": response.imageName,
                "imageURL": response.url,
                "artiesId": artistId,
                "type":"artiest"
            }]);

            // setArtistImageList([response.url])
            // setLogoURL(response.url);
            // setImageURL(images.url)

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
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (!formData.eventName) {
            formIsValid = false;
            errors["artiestName"] = "artiest name is required";
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

        setFormErrors(errors);
        return formIsValid;
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);
        // if (validateForm()) {
        if (formData.id) {
            formData.profile = logourl ? logourl : formData.profile;
            CommonService.putRequest(ARTIST.POST + "/" + formData.id, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    artiestName: '',
                    expreance: '',
                    profile: '',
                    status: '',
                    discription: '',
                });
                setValidated(false);
                handleClose();
                getArtistList();
            }).catch((err) => {

                if (err.response.data.message) {
                    alert(err.response.data.message);
                }

            });
        } else {
            formData.profile = logourl ? logourl : '';
            CommonService.postRequest(ARTIST.POST, formData).then((res) => {

                setShowSuccess(true);
                setFormData({
                    artiestName: '',
                    expreance: '',
                    profile: '',
                    status: '',
                    discription: '',
                });
                setValidated(false);
                handleClose();
                getArtistList();
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

    const deleteImage = async (image,index)=>{
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
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>Artist</h4>
                            <button
                                // to="/vendor/add-products"
                                data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button" onClick={handleShow}>Add Artist</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Profile</th>
                                        <th scope="col">Artist Name</th>
                                        <th scope="col">Experience</th>

                                        <th scope="col">Status</th>

                                        <th scope="col">Edit/Delete</th>
                                        <th scope="col">Images </th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {artistList.map((data, index) => (
                                        <tr key={index}>

                                            <td><img src={data.profile} height={50} width={50} /> </td>

                                            {/* <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={data.img} alt="img" /></Link></td> */}
                                            <td>{data.artiestName}</td>
                                            <td>{data.expreance} </td>
                                            <td>{data.status ? 'Active' : "In Active"}</td>
                                            <td><i className="fa fa-edit" onClick={() => editArtist(data)}></i> <button style={{ background: "Transparent" }}><i className="fa fa-trash" onClick={() => deleteArtist(data)}></i></button></td>

                                            <td><Button style={{ backgroundColor: '#f79837', border: 'none' }} onClick={() => imageArtist(data)}>Add Images</Button> </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

                        <Modal show={show} onHide={handleClose} size="sm">
                            <Modal.Header closeButton  >
                                <Modal.Title >Add Artist</Modal.Title>
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
                                                                placeholder="Enter Artist name"
                                                                name="artiestName"
                                                                value={formData.artiestName}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.artiestName}
                                                            />
                                                        </Col>
                                                        <Col >
                                                            <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter expirence"
                                                                name="expreance"
                                                                value={formData.expreance}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.expreance}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    <Row>
                                                        <Col >

                                                            <Form.Control type="file" style={{ width: "100%" }} onChange={uploadImage} accept="image/*" />


                                                            {/* <Button onClick={uploadImage} variant="contained" style={{marginTop:'10px'}} >Upload</Button>
                                                   
                                                    {logourl?  <img src={logourl}  alt='logo' height="50%" width="50%"/>:''} */}



                                                        </Col>
                                                        <Col>
                                                            {/* <Dropdown>
                                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                                   Status
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item value={true}>True</Dropdown.Item>
                                                                    <Dropdown.Item value={false}>False</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown> */}
                                                            <Form.Group controlId="formSelect">
                                                                <Form.Control
                                                                    as="select"
                                                                    name="status"
                                                                    value={formData.status}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                >
                                                                    <option value={true}>Active</option>
                                                                    <option value={false}> In Active</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <br></br>

                                                    <Row>

                                                        <Col >
                                                            {/* <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter discription"
                                                                name="discription"
                                                                value={formData.discription}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.discription}
                                                            /> */}
                                                            <FloatingLabel controlId="floatingTextarea2" >
                                                                <Form.Control
                                                                    name="discription"
                                                                    value={formData.discription}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.discription}
                                                                    as="textarea"
                                                                    placeholder="Enter discription"
                                                                    style={{ height: '100px' }}
                                                                />
                                                            </FloatingLabel>

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
                        <Modal show={show1} onHide={handleClose1} size="sm">
                            <Modal.Header closeButton  >
                                <Modal.Title >Add Images</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form
                                        noValidate validated={validated} onSubmit={handleSubmit} >

                                        <InputGroup >
                                            <FormGroup >
                                                <Container>
                                                    <Row>
                                                        <Col xs={6} md={4}>
                                                            <Form.Control type="file" style={{ width: "100%" }} onChange={handleFileChange} accept="image/*" />

                                                        </Col>
                                                        <Col xs={6} md={4}>
                                                            <Button variant="primary" onClick={uploadImage1} style={{ marginTop: '10px' }} >Upload</Button>

                                                        </Col>
                                                    </Row>
                                                    <div style={{ marginTop: '1rem', height: "22rem", "overflow": "auto" }}>

                                                    <Row>
                                                            {artistImageList.map((result,index) => (
                                                                 
                                                                <Col xs={6} md={4}>
                                                                    <div class="image-container">
                                                                    <Image src={result.imageURL} thumbnail  class="image"/>

    <div class="overlay-text"><i className="fa fa-trash" onClick={() => deleteImage(result,index)} ></i></div>
</div>

                                                                </Col>
                                                            ))}

                                                        </Row>
                                                    </div>

                                                    




                                                </Container>
                                            </FormGroup>
                                        </InputGroup>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose1}>
                                                Close
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

export default Artist
