import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { HelpBlock } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import {  GALLERYBOOKING } from '../../service/API_URL';
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
const GalleryBookingDetail = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [galleryBookingDetailList, setGalleryBookingDetailList] = useState([]);
    const [galleryBookingList, setGalleryBookingList] = useState([]);

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
  
    useEffect(() => {
        getGalleryBookingDetailList();

        return () => {
            setGalleryBookingList([]);
        }
    }, []);


    const getGalleryBookingDetailList = () => {
        CommonService.getDetails(GALLERYBOOKING.GET, {}).then((res) => {
debugger
            setGalleryBookingList(res);


        }).catch((err) => {

        });
    }
   
  

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>Gallery Booking Table</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Artist Name</th>
                                       
                                        <th scope="col">Contact</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        {/* <th scope="col">Booking</th>
                                        <th scope="col">Booking Amount</th> */}
                                        <th scope="col">Nature Of Exbhition</th>
                                        <th scope="col">Number Of Participents</th>
                                        <th scope="col">Enclosed Photograph</th>
                                        <th scope="col">Guest Room Accomodation</th>
                                        {/* <th scope="col">start Date</th>
                                        <th scope="col">end Date</th> */}
                                        <th scope="col">Any Other Detailes</th>
                                        <th scope="col">Booking Status</th>
                                        {/* <th scope="col">Any Other Detailes</th> */}
                                        <th scope="col"> Payment Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {galleryBookingList.map((data, index) => (

                                        <tr key={index}>
                                            <td>{data.artistName}</td>
                                            
                                            <td>{data.contact}</td>
                                            <td>{data.email}</td>
                                            <td>{data.fromDate}</td>
                                            <td>{data.toDate} </td>
                                            {/* <td>{data.bookedGallery} </td> */}
                                            {/* <td>{data.bookedAuditorium}</td> */}
                                            <td>{data.natureOfExbhition}</td>
                                            <td>{data.numberOfParticipents}</td>
                                            <td>{data.enclosedPhotograph} </td>
                                            <td>{data.guestRoomAccomodation} </td>
                                            <td>{data.anyOtherDetailes}</td>
                                            <td>{data.bookingStatus}</td>
                                            <td>{data.paymentStatus}</td>
                                           

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryBookingDetail
