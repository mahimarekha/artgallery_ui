import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { ARTIST, EVENTS } from '../../service/API_URL';
import { Grid, Card, Box, MenuItem, Select, InputLabel, TextField } from "react-bootstrap";

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
    const [artistList, setArtistList] = useState([]);
    const [formData, setFormData] = useState({
        artiestName: '',
        expreance: '',
        profile: '',
        status: true,
        discription: '',

    });
    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [formErrors, setFormErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [logourl, setLogoURL] = useState(null);
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
        const file =  event.target.files[0];
        if (!file) {
           alert("Please select image to upload");
        }
    
       
        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageName', file.name);
        try {
            const response = await CommonService.fileUpload(EVENTS.IMG_UPLOAD,formData);
            
              //console.log(response.data);
             
            setLogoURL(response.url);
            
            } catch (error) {
              console.error(error);
            }
      };
    
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
        if(formData.id){
            formData.profile =   logourl ? logourl :formData.profile;
            CommonService.putRequest(ARTIST.POST+"/"+formData.id, formData).then((res) => {
    
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
        }else{
            formData.profile =   logourl ? logourl :'';
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

    const editArtist = (event) => {
        setFormData(event);
        handleShow();
    }
   
    const deleteArtist = (event) => {
        const userConfirmed = window.confirm('Do you want to delete the record?');

        if (userConfirmed) {
            CommonService.deleteRequest(ARTIST.POST+"/"+event.id).then((res) => {
    
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
                                      
                                        <th scope="col">Discription</th>
                                        <th scope="col">Status</th>
                                      
                                        <th scope="col">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistList.map((data, index) => (
                                        <tr key={index}>
                                                                                           
                                             <td><img src={data.profile} height={50} width={50}/> </td>

                                            {/* <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={data.img} alt="img" /></Link></td> */}
                                            <td>{data.artiestName}</td>
                                            <td>{data.expreance} </td>
                                            <td>{data.discription}</td>
                                            <td>{data.status?'Active':"In Active"}</td>
                                            <td><i className="fa fa-edit" onClick={() => editArtist(data)}></i> <button style={{ background: "Transparent" }}><i className="fa fa-trash" onClick={() => deleteArtist(data)}></i></button></td>
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
                                                            <Form.Control
                                                                type="text" style={{ width: "100%" }}
                                                                placeholder="Enter discription"
                                                                name="discription"
                                                                value={formData.discription}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.discription}
                                                            />

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
                                                {formData.id ? "Update":"Create"}
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
