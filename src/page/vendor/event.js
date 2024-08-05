import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import Event from '../../component/VendorDashboard/Event'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
const Events = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <Event />
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default Events
