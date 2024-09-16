import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import CollectionBooking from '../../component/VendorDashboard/CollectionBooking'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const CollectionBookingScreen = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <CollectionBooking />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default CollectionBookingScreen
