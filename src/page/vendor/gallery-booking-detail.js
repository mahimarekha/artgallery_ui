import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import GalleryBookingDetail from '../../component/VendorDashboard/GalleryBookingDetail'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const GalleryBookingDetails = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <GalleryBookingDetail />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default GalleryBookingDetails
