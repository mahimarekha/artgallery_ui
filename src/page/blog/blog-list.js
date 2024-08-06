import React from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import BlogList from '../../component/Blog/BlogList'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const BlogListView = () => {
    return (
        <>
            <Header/>
            {/* <Banner title="Blog" /> */}
            {/* <BlogList/> */}
            {/* <InstgramSlider/> */}
            <Calendar/>
          
            <Footer/>
        </>
    )
}

export default BlogListView
