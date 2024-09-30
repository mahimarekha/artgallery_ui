import React from 'react'
import PressRelese from '../../Blog/PressRelese'
import Heading from '../Heading'
const Blog = () => {
    const BlogData = [
        {
            img: "https://artistimages.blob.core.windows.net/artistimage/1727690924675AdobeStock_196016288_Preview.jpeg",
            date: "Expressions",
            title: `Solo Painting Exhibition`,
            para: `Paintings exhibition done by Karishma, and 4 differently able children and 20 Kerala women Artists. Exhibition will be inaugurated at 11.30 AM on 26th May 2023 by Major B V Ram Kumar, Director NIEPID, and Sri Ranjan Sood, MD NavSys Marine Technologies Pvt. Ltd.`,
            button: "Read More"
        },
        {
            img: "https://artistimages.blob.core.windows.net/artistimage/1727690924675AdobeStock_196016288_Preview.jpeg",
            date: "Sukalyan Datta",
            title: `Solo Painting Exhibition`,
            para: `State Gallery of Art sponsoring Solo Painting Exhibition to the sponsorship award winner of All India Art Competition and Exhibition 2021.

Sri Sukalyan Datta displaying his 38 paintings from 17th to 23rd April 2023.

Exhibition inaugurated at 5.00 PM on 17th April 2023 by Smt. Anjupoddar, Art lover and Author and Sri M.V. Ramana Reddy, President, Hyderabad Art Society in the presence of Artists.`,
            button: "Read More"
        },
        {
            img: "https://artistimages.blob.core.windows.net/artistimage/1727690924675AdobeStock_196016288_Preview.jpeg",
            date: "Tushar Kanti Pradhan",
            title: `Solo Painting Exhibition`,
            para: `State Gallery of Art sponsoring Solo Painting Exhibition to the sponsorship award winner of All India Art Competition and Exhibition 2021.

Sri Tushar Kanti Pradhan displaying his 15 paintings from 17th to 23rd April 2023.

Exhibition inaugurated at 5.00 PM on 17th April 2023 by Smt. Anjupoddar, Art lover and Author and Sri M.V. Ramana Reddy, President, Hyderabad Art Society in the presence of Artists.`,
            button: "Read More"
        },]
    return (
        <>
            <section id="blog_area_one" className="ptb-100">
                <div className="container">
                    <Heading heading="Press Releases" para="With the movements for art and events that are deeply rooted in relationship, reciprocity, authenticity, and beauty, Chitramayee State Gallery of Art, Madhapur, Hyderabad intends to share all announcements here on this page.

Stand by, and keep an eye for newer announcements to unfold."/>
                    <div className="row">
                        {BlogData.slice(0, 3).map((data, index) => (
                            <PressRelese img={data.img} title={data.title} para={data.para} date={data.date} className="col-lg-4 col-md-4 col-sm-6 col-12" button={data.button} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog
