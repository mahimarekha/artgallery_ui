import React,{useState,useEffect} from 'react'
// import ProductCard from '../../Common/Product/ProductCard';
import ProductCard from '../Common/Product/ProductCard'
// import GalleryList from '../../Common/Product/GalleryList';
import GalleryList from '../Common/Product/GalleryList';
// import Heading from '../Heading';
import Heading from '../Furniture/Heading';
import { useParams } from 'react-router-dom';
// import { ARTIST, GALLERY_COLLECTION, EVENTS } from '../../../service/API_URL';
import { ARTIST, GALLERY_COLLECTION } from '../../service/API_URL';
// import CommonService from '../../../service/commonService';
import CommonService from '../../service/commonService';
import { useSelector } from "react-redux";
const ArtistImages = () => { 
    const [artistRegistrationList, setArtistRegistrationList] = useState([]);
    let { id } = useParams();
    let products = useSelector((state) => state.products.products);
    
    useEffect(() => {
        getArtistRegistrationDetailList();

        return () => {
            setArtistRegistrationList([]);
        }
    }, []);

    const getArtistRegistrationDetailList = () => {
       
            CommonService.postRequest(GALLERY_COLLECTION.ARTISTGET,{status:true, artiestId:id}).then((res) => {

                setArtistRegistrationList(res);
    
    
            }).catch((err) => {
    
            });
        }
    return (
        <>
    <section id="hot_Product_area" className="ptb-100">
        <div className="container">
            <Heading heading="New Collections"  />
            <div className="row">
                <div className="col-lg-12">
                    <div className="tabs_center_button">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" href="#new_arrival" className="active">New Arrival</a></li>
                            {/* <li><a data-toggle="tab" href="#trending">Trending</a></li>
                            <li><a data-toggle="tab" href="#best_sellers">Best Sellers</a></li> 
                            <li><a data-toggle="tab" href="#featured">Featured</a></li>
                            <li><a data-toggle="tab" href="#on_sall">On sall</a></li> */}
                          </ul>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tabs_el_wrapper">
                        <div className="tab-content">
                          <div id="new_arrival" className="tab-pane fade show in active">
                              <div className="row">
                                {artistRegistrationList.map((data, index) =>(
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                            <GalleryList data={data} />
                                    </div>
                                ))}
                              </div>
                          </div>
                          <div id="trending" className="tab-pane fade">
                          <div className="row"> 
                                {products.slice(0, 5).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div>
                          <div id="best_sellers" className="tab-pane fade">
                          <div className="row">
                                {products.slice(3, 5).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div>
                          <div id="featured" className="tab-pane fade">
                          <div className="row">
                                {products.slice(5, 11).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div>
                          <div id="on_sall" className="tab-pane fade">
                          <div className="row">
                                {products.slice(6, 13).map((data, index) =>(
                                     <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                     <ProductCard data={data} />
                             </div>
                                ))}
                              </div>
                          </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
                                
        </>
    )
}

export default ArtistImages
