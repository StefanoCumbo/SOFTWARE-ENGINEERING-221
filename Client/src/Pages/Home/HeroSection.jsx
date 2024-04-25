import React from "react";
const HeroSection = () => {
    return ( 
        <section id="heroSection" className="hero--section">
            <div className="hero--section--content--box">
                <div className="hero--section--content">
                    <p className="section--title">Team group 221</p>
                    <h1 className="hero--section--title">
                     <span className="hero--section--title--color">UEA </span>{" "}
                     <br/>
                     parking
                     </h1>
                     <p className="hero--section--description">
                     Intelligent, Adaptable, and Unified Solutions for Parking.
                        <br/>   Elevating Your Parking Experience!
                     </p>


                </div>
                <button className="btn btn-primary">Get in Touch</button>

            </div>
            <div className="hero--section--img">
                <img src="./img/image-1-homepage.png" alt="Main Image"/>
            </div>

        </section>
     );
}
 
export default HeroSection;