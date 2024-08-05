import React,{ useState } from 'react'
import { BlogData } from './BlogData'
import BlogCard from './BlogCard';
import CommonService from '../../service/commonService';
import { EVENTS } from '../../service/API_URL';
import { useEffect } from 'react';



const BlogList = () => {
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        getEventList();
       
        //  sumOfTotal();
        return () => {
            setEventList([]);
        }
      }, []);
    const getEventList = () => {
    
        CommonService.getDetails(EVENTS.GET).then((res) => {
            setEventList(res.results);
          
        }).catch((err) => {
    
        });
      }

    return (
        <>
            <section id="blog_list_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        {eventList.map((data, index) => (
                            <BlogCard img={data.imageURL} id={data.id} fee={data.fee} title={data.eventName} para={data.discription} date={data.startDate}  className="col-lg-4 col-md-4 col-sm-6 col-12"  button={data.button} key={index} />
                        ))}
                        <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#!" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#!">1</a></li>
                                <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#!" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogList
