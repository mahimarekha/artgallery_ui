import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import Gallery from '../../component/VendorDashboard/Gallery'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const Gallerys = () => {
    return (
        
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <Gallery />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default Gallerys
