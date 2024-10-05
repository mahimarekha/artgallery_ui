import React from 'react'
import Heading from '../Fashion/Heading'
// import img
import img1 from '../../assets/img/team/team1.png'
import img2 from '../../assets/img/team/team2.png'
import img3 from '../../assets/img/team/team3.png'
import img4 from '../../assets/img/team/team4.png'

const TeamData =[
    {
        img:'https://artistimages.blob.core.windows.net/artistimage/1727689789956Sri-Anumula-Revanth-Reddy.webp',
        name:"Sri ANUMULA REVENTH REDDY",
        posation:"Hon'ble Chief Minister",
        subtitle:'Government of Telangana'
    },
    {
        img:'https://artistimages.blob.core.windows.net/artistimage/1727689876162Sri Jupally Krishna Rao.webp',
        name:"Sri  JUPALLY KRISHNA RAO",
        posation:"Hon’ble Minister",
        subtitle:'Prohibition & Excise and Sports, Youth Services, Tourism & Culture Dept.,  Government of Telangana'
    },
    {
        img:'https://artistimages.blob.core.windows.net/artistimage/1727689834974eee604_7688947dccc74a089914139fb0a56874~mv2.webp',
        name:"Smt. VANI PRASAD, IAS",
        posation:"Principal Secretary to Government of Telangana",
        subtitle:`Youth Advancement, Tourism & Culture and Archeology Dept. &
President, State Gallery of Art`
    },
    {
        img:'https://artistimages.blob.core.windows.net/artistimage/1727689924384Dr_K_Lakshmi, IAS.webp',
        name:"DR. K. LAKSHMI, IAS",
        posation:"Director",
        subtitle:'State Gallery of Art'
    }
]

const Team = (props) => {
    return (
        <>
        <section id="team_area" className={`ptb-100 ${props.class}`} >
        <div className="container">
            <Heading heading="" para="" />
            <div className="row">
                {TeamData.map((data, index)=>(
                    <div className="col-lg-3" key={index}>
                    <div className="team_slider">
                        <div className="team-single">
                            <div className="team-img">
                                <img src={data.img} alt="img" />
                            </div>
                            <div className="team-content">
                                <h4 className="team-name font--bold">{data.name}</h4>
                                <span className="team-title"> <p>{data.posation}</p></span>
                               
                                <div>
                                     <p style={{color:'black'}}>{data.subtitle}</p>
                                    </div>
                                {/* <ul className="team-social pos-absolute">
                                    <li><a href="#!"><i className="fa fa-facebook-f"></i></a></li>
                                    <li><a href="#!"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#!"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#!"><i className="fa fa-instagram"></i></a></li>
                                    <li><a href="#!"><i className="fa fa-google-plus-g"></i></a></li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>  
        </>
    )
}

export default Team
