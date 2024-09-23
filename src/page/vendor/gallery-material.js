import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import GalleryMaterial from '../../component/VendorDashboard/GalleryMaterial'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const GalleryMaterials = () => {
    return (
        
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <GalleryMaterial />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default GalleryMaterials
