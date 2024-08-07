import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import { EVENTS } from '../../service/API_URL';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import CommonService from '../../service/commonService';
import { useParams } from "react-router-dom";
import { FormControl, FormGroup, Checkbox, Radio, ControlLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
const Event = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [formData, setFormData] = useState({
        eventName: '',
        startDate: '',
        startDate: '',
        startTime: '',
        endTime: '',
        organizer: '',
        discription: '',
        address: '',
        fee: '',
        imageURL:''
    });
    const [validated, setValidated] = useState(false);

    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [formErrors, setFormErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showSuccess, setShowSuccess] = useState(false);
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
        getEventList();

        //  sumOfTotal();
        return () => {
            setEventList([]);
        }
    }, []);
    const getEventList = () => {

        CommonService.postRequest(EVENTS.EVENTGET,{}).then((res) => {
            
            setEventList(res);

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
          errors["eventName"] = "event name is required";
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
          CommonService.postRequest(EVENTS.POST, formData).then((res) => {
           
            setShowSuccess(true);
            setFormData({
                eventName: '',
                startDate: '',
                startDate: '',
                startTime: '',
                endTime: '',
                organizer: '',
                discription: '',
                address: '',
                fee: '',
            });
            setValidated(false);
            handleClose();
            getEventList();
          }).catch((err) => {
            
            if(err.response.data.message){
                  alert(err.response.data.message);
            }
        
          });
          // Handle form submission (e.g., send data to the server)
    
    
        // }
      };
      
      const editEvent = (event) => {
        setFormData(event);
        handleOpen();
    }
    const handleOpen = () => {
        setOpen(true);
    };
   
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>All Events</h4>
                            <Link
                                // to="/vendor/add-products"
                                data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button" onClick={handleShow}>Add Event</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>

                                        <th scope="col">Event Name</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Fee</th>
                                        <th scope="col">Organizer</th>
                                        <th scope="col">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventList.map((data, index) => (
                                        <tr key={index}>
                                            {/* <td><Link to={ `/product-details-one/${data.id}`}><img width="70px" src={data.img} alt="img" /></Link></td> */}
                                            <td>{data.eventName}</td>
                                            <td>{formatDate(data.startDate)} </td>
                                            <td>{formatDate(data.endDate)} </td>
                                            {/* <td> Timing : {data.startTime} TO {data.endTime}</td> */}

                                            {/* <td>{data.startDate}</td>
                                            <td>{data.endDate}</td> */}
                                            <td>{data.address}</td>
                                            <td>{data.fee}</td>
                                            <td>{data.organizer}</td>

                                            {/* <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editDoctor(doctor)} >
                                            </EditIcon >
                                        </TableCell> */}

                                            <td><i className="fa fa-edit" onClick={() => editEvent()}></i> <button style={{ background: "Transparent" }}><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item" onClick={(e) => { randProduct(page > 1 ? page - 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className={"page-item " + (page === 1 ? "active" : null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                <li className={"page-item " + (page === 2 ? "active" : null)} onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                <li className={"page-item " + (page === 3 ? "active" : null)} onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                <li className="page-item" onClick={(e) => { randProduct(page < 3 ? page + 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

                        <Modal show={show} onHide={handleClose}  size="sm">
                            <Modal.Header closeButton  >
                                <Modal.Title >Add Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                <Form
                  noValidate validated={validated} onSubmit={handleSubmit} >
                                    
                                        <InputGroup >
                                            <FormGroup >
                                                <Row>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="text" style={{ width: "100%" }}
                                                            placeholder="Enter Event name"
                                                            name="eventName"
                                                            value={formData.eventName}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors.eventName}
                                                        />
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="text" style={{ width: "100%" }}
                                                            placeholder="Enter organizer"
                                                            name="organizer"
                                                            value={formData.organizer}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors.organizer}
                                                        />
                                                    </Col>
                                                </Row>
<br></br>
                                                <Row>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="date" style={{ width: "100%" }}
                                                            name="startDate"
                                                            placeholder="DateRange"
                                                            value={date.startDate}
                                                            // isInvalid={!!formErrors.startDate}

                                                            onChange={handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="date" style={{ width: "100%" }}
                                                            name="endDate"
                                                            placeholder="DateRange"
                                                            value={date.endDate}
                                                            // isInvalid={!!formErrors.startDate}

                                                            onChange={handleChange}
                                                        />
                                                    </Col>

                                                </Row>
                                                <br></br>

                                                <Row>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="time"
                                                            name="startTime"
                                                            placeholder="TimeRange"
                                                            className="modalTextField"
                                                            onChange={handleChange}
                                                            value={date.startTime}
                                                            style={{ paddingRight: "6px", width: "100%" }}
                                                        />
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="time"
                                                            name="endTime"
                                                            placeholder="TimeRange"
                                                            className="modalTextField"
                                                            onChange={handleChange}
                                                            value={date.endTime}
                                                            style={{ paddingRight: "6px", width: "100%" }}
                                                        />
                                                    </Col>

                                                </Row>
                                                <br></br>
                                                <Row>
                                                    <Col xs={6} md={6}>
                                                    <Form.Control
                                                            type="text" style={{ width: "100%" }}
                                                            placeholder="Enter fee"
                                                            name="fee"
                                                            value={formData.fee}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors.fee}
                                                        />
                                                      
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                        <Form.Control
                                                            type="text" style={{ width: "100%" }}
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
                                                    <Col xs={6} md={6}>
                                                    <Form.Control
                                                            type="text" style={{ width: "100%" }}
                                                            placeholder="Enter discription"
                                                            name="discription"
                                                            value={formData.discription}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors.discription}
                                                        />
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                    <Form.Control
                                                            type="text" style={{ width: "100%" }}
                                                            placeholder="Enter Image URL"
                                                            name="imageURL"
                                                            value={formData.imageURL}
                                                            onChange={handleChange}
                                                            isInvalid={!!formErrors.imageURL}
                                                        />
                                                    </Col>


                                                </Row>
                                            </FormGroup>
                                        </InputGroup>
                                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Add
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

export default Event
