import React from 'react'
import Header from '../component/Common/Header'

 import Artist from '../component/VendorDashboard/Artist'
 import Footer from '../component/Common/Footer'

const Artists = () => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
         
             <Artist />
             {/* <Calendar /> */}
            
            <Footer />
        </>
    )
}

export default Artists
