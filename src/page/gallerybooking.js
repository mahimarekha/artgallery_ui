import React from 'react'
import Header from '../component/Common/Header'
import Banner from '../component/Common/Banner'
import GalleryBooking from '../component/VendorDashboard/GalleryBoking'
import Footer from '../component/Common/Footer'
const GalleryBookingsMain = () => {
    return (
        <>
            <Header />
            {/* <Banner title="Login" /> */}
            <GalleryBooking />
            <Footer />
        </>
    )
}

export default GalleryBookingsMain