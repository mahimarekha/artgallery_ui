import React from 'react'
import BanImg from '../../../assets/img/common/man.png'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <>
             <section id="banner_one">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="banner_text_one">
                        <h1 className="wow flipInX " style={{color:"#fef5ef"}} data-wow-duration="3.0s" data-wow-delay=".3s"> <span className="wow flipInX" data-wow-duration="2.0s" data-wow-delay=".5s"
                        >State Gallery of Art</span></h1>
                        <h3 >Biggest Gallery in Asia</h3>
                        {/* <Link to="/shop" className="theme-btn-one bg-black btn_md">Shop Now</Link> */}
                    </div>
                </div>
                {/* <div className="col-lg-6">
                    <div className="hero_img" >
                        <img src={BanImg} alt="img" />
                    </div>
                </div> */}
            </div>
        </div>
    </section>
        </>
   
    )
}

export default Banner
