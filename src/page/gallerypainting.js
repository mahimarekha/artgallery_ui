import React from 'react'
import Header from '../component/Common/Header'
import Banner from '../component/Common/Banner'
import GalleryPainting from '../component/VendorDashboard/GalleryPainting'
import Footer from '../component/Common/Footer'
const GalleryPaintingsMain = () => {
    return (
        <>
            <Header />
            {/* <Banner title="Login" /> */}
            <GalleryPainting/>
            <Footer />
        </>
    )
}

export default GalleryPaintingsMain