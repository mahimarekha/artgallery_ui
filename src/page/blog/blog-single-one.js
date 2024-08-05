import React, { useState } from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import BlogSingleOne from '../../component/Blog/BlogSingleOne'
import BlogSideBar from '../../component/Blog/BlogSideBar'
import BlogSingleContent from '../../component/Blog/BlogSingleContent'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'
import CommonService from '../../service/commonService';
import { EVENTS } from '../../service/API_URL';
import { useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
const BlogSingleOnes = () => {
    const { id } = useParams();

    const [eventList, setEventList] = useState({
        address: "",
        discription: "",
        endDate: "",
        endTime : "",
        eventName : "",
        fee : "",
        id: "",
        imageURL :"",
        organizer :"",
        startDate :"",
        startTime : ""
    });
    useEffect(() => {
        getEventList();

        //  sumOfTotal();
        return () => {
            setEventList([]);
        }
    }, []);
    const getEventList = () => {

        CommonService.getDetails(EVENTS.GET + "/" + id).then((res) => {
            setEventList(res);

        }).catch((err) => {

        });
    }
    return (
        <>
            <Header />
            {/* <Banner title="Blog Single" /> */}
            <BlogSingleOne>
                <BlogSingleContent eventList={eventList} />
                <BlogSideBar />
            </BlogSingleOne>
            <InstgramSlider />
            <Footer />
        </>
    )
}

export default BlogSingleOnes
