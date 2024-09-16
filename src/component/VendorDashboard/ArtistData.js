import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { GALLERY } from '../../service/API_URL';
import Swal from 'sweetalert2';
import { Alert, Button } from 'react-bootstrap';
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
const ArtistData = () => {
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
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => setShowAlert(true);
    const handleCloseAlert = () => setShowAlert(false);
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
   

    const handleReject = () => {
        setIsAccepted(false);
    };
    useEffect(() => {
        getArtistRegistrationDetailList();

        return () => {
            setArtistRegistrationList([]);
        }
    }, []);
    
    const handleAccept = (data) => {
        setIsAccepted(true);

        CommonService.postRequest(ARTIST.ARTISTUPDATE, { userId:data.userId.id, artistId:data.id }).then((res) => {
            getArtistRegistrationDetailList();
            Swal.fire({
                icon: 'success',
                title: 'User Activated Succesfully',
                text: 'Success '
            })
        })
    };

    const getArtistRegistrationDetailList = () => {
        // CommonService.getDetails(GALLERYBOOKING.GET, {}).then((res) => {

        //     setGalleryBookingList(res);
        
            CommonService.getDetails(ARTIST.GET).then((res) => {

                setArtistRegistrationList(res);
    
    
            }).catch((err) => {
    
            });  
    }
    return (
        <>
       
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <div className="mb-2">
                            <h4>Collection Details</h4>
                            {/* {getRole === 'artist' ? <button
                                
                                data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button" onClick={handleShow}>Add Collection</button>:""} */}
                        </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                    <th scope="col">Artist Name</th>
                                    
                                <th scope="col">Mobile </th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Nationality</th>
                                        <th scope="col">Status</th>
                                        {/* <th scope="col">Perm Pin</th> */}
                                        {/* <th scope="col">Curr Address</th>
                                        <th scope="col">Curr State</th>
                                        <th scope="col">Cur Pin</th>
                                        <th scope="col">Qualification</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">College</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Experience </th>
                                        <th scope="col">Short Note</th>
                                        <th scope="col">Exhibition</th>
                                        <th scope="col">User Status</th> */}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistRegistrationList.map((data, index) => (

                                        <tr key={index}>
                                              <td>{data.firstName } {data.middleName } {data.lastName }</td>
                                             
                                             <td>{data.userId.mobile} </td>
                                            <td>{data.userId.email} </td> 
                                            {/* <td>{data.dob} </td>
                                            <td>{data.placeOfBirth} </td> */}
                                           <td>{data.nationality}</td> 
                                           {/* <td>{data.approvalStatus}</td> */}
                                            <td ><Button variant="danger" onClick={() => handleAccept(data)} className="ms-2">
                                                            Approve
                                                        </Button>
                                                        

                                                    
                                            </td>
                                         


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

export default ArtistData
