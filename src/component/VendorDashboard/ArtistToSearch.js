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

import { useEffect } from 'react';
import CommonService from '../../service/commonService';
import { useParams } from "react-router-dom";
import ArtistList from '../Common/Product/ArtistList'

import LeftSideBar from '../../component/Shop/LeftSideBar'

const ArtistToSearch = () => {
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    const [artistRegistrationList, setArtistRegistrationList] = useState([]);

    let allData = [...useSelector((state) => state.products.products)];
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [artistImageList, setArtistImageList] = useState([]);
    const [show3, setShow3] = useState(false);
    // const [eventImageList, setEventImageList] = useState([]);
    const handleShow3 = () => setShow3(true);
    const [show2, setShow2] = useState(false);
  
  
    const [artList, setArtList] = useState([
        "Painting",
        "Sculpture",
        "Print making",
        "Drawing",
        "Photography",
        "Digital",
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
    useEffect(() => {
        getArtistRegistrationDetailList();

        return () => {
            setArtistRegistrationList([]);
        }
    }, []);
    
    const getArtistRegistrationDetailList = () => {
        CommonService.getDetails(ARTIST.FINDARTIEST).then((res) => {

            setArtistRegistrationList(res);


        }).catch((err) => {

        });
    }

    return (
        <>
           <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {artistRegistrationList.map((data, index) => (
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-12" key={index}>
                                        <ArtistList data={data} />
                                    </div>
                                ))}
                                {/* <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randProduct(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item "+ (page === 1?"active":null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item "+ (page === 2?"active":null)}  onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item "+ (page === 3?"active":null)}  onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" onClick={(e) => { randProduct(page <3?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ArtistToSearch
