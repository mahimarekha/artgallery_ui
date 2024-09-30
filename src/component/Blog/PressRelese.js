import React from 'react'
import { Link } from 'react-router-dom'
const PressRelese = (props) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
      
        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
      };
    return (
        <>
            {props.list ? (
                <div className={props.className}>
                    <div className="blog_list_item img-zoom-hover">
                        <div className="row">
                            <div className="col-lg-2 col-md-12 col-sm-12 col-12">
                                <div className="blog_one_img">
                                  
                                        <img src={props.img} alt={props.title}/>
                                  
                                </div>
                            </div>
                            {/* <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                                <div className="blog_text">
                                    <h5 className="date_area"><Link to={"/vieweventdetails/"+props.id}> {formatDate(props.date)} </Link></h5>
                                    <h4 className="heading"><Link to={"/vieweventdetails/"+props.id}>{props.title}</Link></h4>
                                    <p className="para">{props.para}</p>
                                                                   </div>
                                                                   <div>
                                                                   <h5 className="date_area">
                                                                  Fee ₹ {props.fee}
                            </h5>   
                                                                   </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={props.className}>
                    <div className="blog_one_item img-zoom-hover">
                        <div className="event_one_item">
                        
                                        <img src={props.img} alt={props.title} />
                                  
                        </div>
                        <div className="blog_text">
                        <h5 className="date_area"> {props.title}</h5>

                        <h4 className="heading">{props.date}</h4>

                            <p className="para">
                                {props.para}
                            </p>
                            <h4 className="heading">
                                {props.organizer}
                            </h4>     
                           
                             </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default PressRelese
