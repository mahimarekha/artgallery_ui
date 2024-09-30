import React from 'react'
import SkillBar from 'react-skillbars';

const skills = [
    { type: "UI/UX", level: 85 },
    { type: "IDEA", level: 75 },
    { type: "DESIGN", level: 55 },
];

const colors = {
    "bar": "#f798378a",
    "title": {
        "text": "#fff",
        "background": "#f79837"
    }
}

const Functionality = () => {
    return (
        <>
            <section id="about_progressbar" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about_progressbar_content">
                                {/* <h2>Functionality meets perfection</h2> */}
                                <p>Chitramayee State Gallery of Art has, thus far, conducted three editions of All India Art Competition and Exhibition where artist from across the nation participated enthusiastically; and the gallery stood as the primary venue for Indian Photography Festival for the last eight years where works of eminent photographers all over the world, are showcased.</p>
                                <p>The gallery is known for diligent research and connoisseurship, and regularly stages major exhibitions accompanied by scholarly publications. Art and sculpture camps are conducted apart from holding annual exhibition by opening up adequate gallery-space for free to encourage upcoming artists.</p>
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                            <div className="custom-progress m-t-40">
                                <SkillBar skills={skills} height={40} colors={colors} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Functionality
