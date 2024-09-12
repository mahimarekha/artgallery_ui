import React from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import GalleryDetails from '../../component/Common/ProductDetails/GalleryDetails'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'

const ProductDetails = () => {
    return (
        <>
            <Header />
            {/* <Banner title="Product Details" /> */}
            <GalleryDetails />
            <InstgramSlider />
            <Footer />
        </>
    )
}

export default ProductDetails