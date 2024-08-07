import React from 'react'
import CommentForm from './CommentForm'
import RelatedPost from './RelatedPost'
import SingleCommentArea from './SingleCommentArea'
// import img
import img1 from '../../assets/img/blog/blog_single.png'
import post1 from '../../assets/img/blog/post2.png'
import post2 from '../../assets/img/blog/post3.png'
import post4 from '../../assets/img/blog/post4.png'
import author from '../../assets/img/user/author.png'

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
};
const BlogSingleContent = (props) => {
  return (
    <>
      <div className="col-lg-9">
        <div className="blog_single_content">
          <div className="text-center">
            <img src={props?.eventList.imageURL} alt="img" style={{height:"20rem"}} />
          </div>
          <div>
          <h2>{props?.eventList.eventName} </h2>
          </div>
          <div className="blog_single_widget">
            
            <div className="blog_single_date">
              <ul>
                <li>{formatDate(props?.eventList.startDate)} TO {formatDate(props?.eventList.endDate)} - By <a href="#!"> {props?.eventList.organizer}</a></li>
              </ul>
              <ul>
                <li> Timing : {props?.eventList.startTime} TO {props?.eventList.endTime}</li>
              </ul>
             
              <ul>
                <li> Address : {props?.eventList.address} </li>
              </ul>
              <ul>
                <li> Fee : {props?.eventList.fee} </li>
              </ul>
            </div>
            <div className="blog_single_first_Widget">
             
              <p>
              {props?.eventList.discription}
              </p>
             
              <blockquote>
               {props?.eventList.address}
              </blockquote>
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
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="single_center_img img-zoom-hover">
                    <img src={post1} alt="img" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="single_center_img img-zoom-hover">
                    <img src={post2} alt="img" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="single_center_img img-zoom-hover">
                    <img src={post4} alt="img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="blog_single_secend_widget">
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
            </div>
          </div>
          <div className="card post_author">
            <div className="card-body">
              <div className="author_img">
                <img src={author} alt="author" />
              </div>
              <div className="author_info">
                <h6 className="author_name">
                  <a href="#!" className="mb-1 d-inline-block">Maria Redwood</a>
                </h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a
                  type specimen book.
                </p>
              </div>
            </div>
          </div>
          <RelatedPost />
          <SingleCommentArea />
          <CommentForm />
        </div>
      </div>
    </>
  )
}

export default BlogSingleContent
