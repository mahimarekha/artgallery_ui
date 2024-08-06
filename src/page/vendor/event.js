import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import Event from '../../component/VendorDashboard/Event'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const Events = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <Event />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default Events
