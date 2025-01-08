import React from 'react'
import Header from '../component/Common/Header'
import ArtistToSearch from '../component/VendorDashboard/ArtistToSearch'

//  import Artist from '../component/VendorDashboard/Artist'
 import Footer from '../component/Common/Footer'

const ArtistToSearchs=() => {
    return (
        <>
             <Header />
            {/* <Banner title="Vendor" /> */}
         
             <ArtistToSearch />
             {/* <Calendar /> */}
            
            <Footer />
        </>
    )
}

export default ArtistToSearchs
