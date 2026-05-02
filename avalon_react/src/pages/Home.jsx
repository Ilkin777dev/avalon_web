import Header from "../components/Header"
import HeroScreen from "../components/HeroScreen"
import WhatWeOffer from "../components/WhatWeOffer"
import AboutUs from "../components/AboutUs"
import "../App.css"

export default function Home() {
    return(
        <div className="blogSectionWrapper">
            <div className="blogSection">
                <Header></Header>
                <HeroScreen></HeroScreen>
                <WhatWeOffer></WhatWeOffer>
                {/* Pluses Section */}
                <div className="pluses_wrapper">
                    <div className="pluses">
                        <div className="pluses_card">
                            <div className="pluses_title">
                                <h2>25+</h2>
                            </div>
                            <div className="pluses_text">
                                <h3>YEARS OF EXPERIENCE</h3>
                            </div>
                        </div>
                        <div className="pluses_card">
                            <div className="pluses_title">
                                <h2>378+</h2>
                            </div>
                            <div className="pluses_text">
                                <h3>PROJECTS COMPLETE</h3>
                            </div>
                        </div>
                        <div className="pluses_card">
                            <div className="pluses_title">
                                <h2>1000+</h2>
                            </div>
                            <div className="pluses_text">
                                <h3>SATISFIED CLIENTS</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About Us Section */}
                <AboutUs />
            </div>
        </div>
    )
}