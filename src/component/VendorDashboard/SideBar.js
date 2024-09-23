import { yellow } from '@mui/material/colors';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation()
    let role;
    if (localStorage.getItem("role")) {
        role = localStorage.getItem("role");
    }
    const adminMenu = [{
        name: "Events",
        url: "/vendor/event",
        icon: "fa fa-shopping-cart"

    }, {
        name: "Gallery",
        url: "/vendor/gallery",
        icon: "fa fa-shopping-cart"

    }, {
        name: "Gallery Booking Detail",
        url: "/vendor/gallery-booking-detail",
        icon: "fa fa-shopping-cart"
    },
    {
        name: "Collection Approval",
        url: "/vendor/artist-registration-detail",
        icon: "fa fa-shopping-cart"
    },
    {
        name: "Artist Data",
        url: "/vendor/artist-data",
        icon: "fa fa-shopping-cart"
    },
    {
        name: "Gallery Material",
        url: "/vendor/gallery-material",
        icon: "fa fa-shopping-cart"

    },
    ];
    const artiestMenu = [
    {
        name: "Artist Collection",
        url: "/vendor/artist-registration-detail",
        icon: "fa fa-shopping-cart"
    },
    {
        name: "Collection Bookings",
        url: "/vendor/collectionorders",
        icon: "fa fa-shopping-cart"
    },
    
    ];
   let  leftMenu = role && role=== 'admin' ? adminMenu : role === 'artist' ? artiestMenu : [];
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="dashboard_tab_button">
                    <ul role="tablist" className="nav flex-column dashboard-list" >
                        {leftMenu.map((result, index) => (
                            <li key={index} > <Link to={result.url} className={location.pathname === result.url ? 'active' : null}><i className={result.icon}></i>{result.name}</Link></li>
                        ))}
                        {/* <li><Link to="/vendor-dashboard" className={location.pathname === '/vendor-dashboard'?'active':null}><i className="fa fa-tachometer"></i>  Dashboard</Link></li> */}
                        {/* <li> <Link to="/vendor/all-product" className={location.pathname === '/vendor/all-product'?'active':null}><i className="fa fa-shopping-cart"></i>Product</Link></li> */}
                        {/* 
                            <li > <Link  to="/vendor/event" className={location.pathname === '/vendor/event'?'active':null}><i className="fa fa-shopping-cart"></i>Events</Link></li>
                            <li> <Link to="/vendor/gallery" className={location.pathname === '/vendor/gallery'?'active':null}><i className="fa fa-shopping-cart"></i>Gallery</Link></li>
                            <li> <Link to="/vendor/gallery-booking-detail" className={location.pathname === '/vendor/gallery-booking-detaile'?'active':null}><i className="fa fa-shopping-cart"></i>Gallery Booking Detail</Link></li> */}
                        {/* <li> <Link to="/vendor/artist-registration-detail" className={location.pathname === '/vendor/artist-registration-detail'?'active':null}><i className="fa fa-shopping-cart"></i>Artist Collection</Link></li> */}

                        {/* <li><Link to="/vendor/all-order" className={location.pathname === '/vendor/all-order'?'active':null}><i className="fa fa-shopping-bag"></i>Order</Link></li> */}
                        {/* <li><Link to="/vendor/vendor-profile" className={location.pathname === '/vendor/vendor-profile'?'active':null}><i className="fa fa-id-badge"></i>Profile</Link></li> */}
                        {/* <li><Link to="/vendor/add-products" className={location.pathname === '/vendor/add-products'?'active':null}><i className="fa fa-user"></i>Add PRoduct</Link></li> */}
                        {/* <li><Link to="/vendor/vendor-setting" className={location.pathname === '/vendor/vendor-setting'?'active':null}><i className="fa fa-user"></i>Settings</Link></li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar
