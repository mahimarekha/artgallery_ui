import React from 'react'
import Header from '../component/Common/Header'
import ArtistImages from '../component/VendorDashboard/ArtistImages'

//  import Artist from '../component/VendorDashboard/Artist'
 import Footer from '../component/Common/Footer'

const ArtistImagess=() => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
         
             <ArtistImages />
             {/* <Calendar /> */}
            
            <Footer />
        </>
    )
}

export default ArtistImagess
