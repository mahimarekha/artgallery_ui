import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import CommentForm from './CommentForm'
import RelatedPost from './RelatedPost'
import SingleCommentArea from './SingleCommentArea'
// import img
import img1 from '../../assets/img/blog/blog_single.png'
import post1 from '../../assets/img/blog/post2.png'
import post2 from '../../assets/img/blog/post3.png'
import post4 from '../../assets/img/blog/post4.png'
import author from '../../assets/img/user/author.png'
import { useHistory, useLocation, } from 'react-router-dom';
import CommonService from '../../service/commonService';
import { ARTIST, EVENTS, IMAGES } from '../../service/API_URL';
import { useEffect } from 'react';
const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
const BlogSingleContent = (props) => {

  const location = useLocation();
  const [artistImageList, setArtistImageList] = useState([]);
  const queryParams = new URLSearchParams(location.search);

  const currentMonth = queryParams.get('currentMonth');

  useEffect(() => {

    if (props?.eventList.artiest && props?.eventList.artiest.id) {
      getArtistImageList(props?.eventList.artiest.id);
    }


    //  sumOfTotal();
    return () => {
      setArtistImageList([]);
    }
  }, []);
  const history = useHistory();
  const goBack = () => {
    // history.goBack(); 
    history.push("/blog-list-view?currentMonth=" + currentMonth);
  };
  const getArtistImageList = (artistId) => {

    CommonService.postRequest(IMAGES.GET + "/getlist", { artiesId: artistId }).then((res) => {

      setArtistImageList(res);

    }).catch((err) => {

    });
  }

  return (
    <>
      <div className="col-lg-9">
        <div className="blog_single_content">
          <div className="text-center">

            {props?.eventList.imageURL ? <img src={props?.eventList.imageURL} alt="img" style={{ height: "20rem" }} /> : ""}

          </div>
          <div>
            <h2>  <i class="fa fa-arrow-circle-left font-color" style={{ fontSize: "2rem" }} onClick={goBack} aria-hidden="true"></i> {props?.eventList.eventName} </h2>
          </div>
          <div className="blog_single_widget">

            <div className="blog_single_date">
              <ul>
                <li>{formatDate(props?.eventList.startDate)} TO {formatDate(props?.eventList.endDate)} - By <a href="#!"> {props?.eventList.organizer}</a></li>
              </ul>
              <ul>
                <li> <span className='secound_font_color'>Timing</span>  : <br></br>{props?.eventList.startTime ? <span >{props?.eventList.startTime} TO {props?.eventList.endTime}</span> : "11-00 AM to 7-00 PM"}</li>
              </ul>

              <ul>
                <li> <span className='secound_font_color'>Address</span>   :  
                <br></br>
                State Gallery of ART, Road No 1,<br></br> Kavuri Hills, Madhapur, <br></br>Hyderabad -500033 </li>
              </ul>
              {/* <ul>
                <li> Fee : {props?.eventList.fee ? props?.eventList.fee : "N/A"} </li>
              </ul> */}
            </div>
            <div className="blog_single_first_Widget">

              <p>
                {props?.eventList.discription}
              </p>


              <div>

              </div>
              {/* <p>
                Quisque velit nisi, pretium ut lacinia in, elementum id
                enim. Curabitur arcu erat, accumsan id imperdiet et,
                porttitor at sem. Vivamus magna justo, lacinia eget
                consectetur sed, convallis at tellus. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Donec velit neque, auctor sit amet aliquam vel,
                ullamcorper sit amet ligula. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia Curae;
                Donec velit neque, auctor sit amet aliquam vel, ullamcorper
                sit amet ligula. Proin eget tortor risus. Proin eget tortor
                risus. Curabitur aliquet quam id dui posuere blandit. Donec
                rutrum congue leo eget malesuada.
              </p> */}
            </div>
            <div className="blog_details_center_img">
              <div className="row">
                {props?.eventList?.artList?.map((url) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="single_center_img img-zoom-hover">
                      <img src={url.imageURL} alt="img" />
                    </div>
                  </div>
                ))}

                {/* <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="single_center_img img-zoom-hover">
                    <img src={post2} alt="img" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="single_center_img img-zoom-hover">
                    <img src={post4} alt="img" />
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="blog_single_secend_widget">
              <h2>There Are Many Variayions Of Product</h2>
              <p>
                Cras ultricies ligula sed magna dictum porta. Praesent
                sapien massa, convallis a pellentesque nec, egestas non
                nisi. Proin eget tortor risus. Cras ultricies ligula sed
                magna dictum porta. Mauris blandit aliquet elit, eget
                tincidunt nibh pulvinar a. Donec sollicitudin molestie
                malesuada. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec velit neque,
                auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                Curabitur aliquet quam id dui posuere blandit
              </p>
            </div>
            <div className="single_categoris_bottom">
              <ul>
                <li><a href="#!">Fashion</a></li>
                <li><a href="#!">Style</a></li>
                <li><a href="#!">Woman</a></li>
                <li><a href="#!">Man</a></li>
              </ul>
            </div> */}
          </div>
          <div className="blog_single_secend_widget">
            <h3 className='primary_font_orange'>Artist Details</h3>
          </div>
          {props?.eventList?.artiest ? <div className="card post_author">
            <div className="card-body">
              <div className="author_img" >
                <img src={props?.eventList?.artiest?.profile} alt="img" style={{ width: "100px" }} />
              </div>
              <div className="author_info">
                <h6 className="author_name">
                  <a href="#!" className="mb-1 d-inline-block">{props?.eventList?.artiest?.artiestName}</a>
                </h6>
                <p>
                  {props?.eventList?.artiest?.discription}

                </p>
              </div>
            </div>
          </div> : 'N/A'}
          <div className="blog_single_secend_widget margin-bottom-10">
            <h3 className='primary_font_orange'>Artist Works</h3>
          </div>
          {props?.eventList?.artiestImages ?
          <Container>
            <Row>
              {props?.eventList?.artiestImages?.map((result) => (
                <Col xs={6} md={4}>
                  <div >
                  <Image src={result.imageURL} thumbnail />
                  </div>
                </Col>
              ))}

            </Row>
          </Container> : 'N/A'}
          {/* <SingleCommentArea /> */}
          {/* <CommentForm /> */}
        </div>
      </div>
    </>
  )
}

export default BlogSingleContent
