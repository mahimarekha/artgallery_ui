import React from 'react'
import Header from '../../component/Common/Header'
import Layout from '../../component/VendorDashboard/Layout'
import ArtistData from '../../component/VendorDashboard/ArtistData'
import Banner from '../../component/Common/Banner'
import Footer from '../../component/Common/Footer'
import Calendar from '../../component/Blog/Calendar'
const ArtistDatas = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
            <Layout>
             <ArtistData />
             {/* <Calendar /> */}
             </Layout>
            {/* <Footer /> */}
        </>
    )
}

export default ArtistDatas
