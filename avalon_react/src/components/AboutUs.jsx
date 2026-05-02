import "./aboutUs.css"
import aboutUsImage from "../assets/about_us_img.png"
import avalonManagementImage from "../assets/avalon_management.png"

export default function AboutUs() {
    return (
        <div className="about_us_section_wrapper">
            <div className="sec_title_wrapper">
                <div className="sec_title">
                    <h3>ABOUT US</h3>
                </div>
            </div>

            {/* SECTION 1 */}
            <div className="about_us_section">
                <div className="about_us_left">
                    <img src={aboutUsImage} alt="About Us" />
                </div>

                <div className="about_us_right">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                Empowering Real Estate Investors with Expert Financing Solutions
                            </h1>

                            <p>
                                Founded in 2017, Avalon Management Group stands as a beacon of reliability and
                                excellence in the residential real estate financing sector. We are a privately owned
                                company dedicated to delivering fast, high-quality lending services to real estate
                                investors across all 50 states.
                                <br /><br />
                                Our comprehensive suite of products includes Ground-Up Construction, Multifamily Bridge,
                                Fix & Flip, and 30-year Rental Loans, all designed to meet the diverse needs of our
                                clients.
                            </p>

                            <a href="#">View More</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="about_us_section">
                <div className="about_us_left">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                AVALON MANAGEMENT <br /> GROUP
                            </h1>

                            <p>
                                Avalon Management remains an integral part of the Avalon ecosystem, providing a seamless
                                connection between residents and their everyday living experience.
                                <br /><br />
                                Through our dedicated tenant portal, residents have full access to their accounts anytime
                                and from anywhere. Rent payments can be completed securely online using a range of accepted
                                payment methods, with the option to set up automatic payments for added convenience.
                                <br /><br />
                                The platform is designed to simplify communication and ensure efficiency. Maintenance
                                requests and service inquiries can be submitted directly through the portal, where each
                                request is tracked and addressed promptly by our team.
                                <br /><br />
                                Avalon Management is built on responsiveness, accessibility, and a commitment to resolving
                                issues with clarity and speed, creating a streamlined and reliable experience for every
                                resident.
                            </p>

                            <a href="#">View More</a>
                        </div>
                    </div>
                </div>

                <div className="about_us_right">
                    <img src={avalonManagementImage} alt="Avalon Management" />
                </div>
            </div>

            {/* SECTION 3 */}
            <div className="about_us_section">
                <div className="about_us_left">
                    <img src={aboutUsImage} alt="About Us" />
                </div>

                <div className="about_us_right">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                Empowering Real Estate Investors with Expert Financing Solutions
                            </h1>

                            <p>
                                Founded in 2017, Avalon Management Group stands as a beacon of reliability and
                                excellence in the residential real estate financing sector. We are a privately owned
                                company dedicated to delivering fast, high-quality lending services to real estate
                                investors across all 50 states.
                                <br /><br />
                                Our comprehensive suite of products includes Ground-Up Construction, Multifamily Bridge,
                                Fix & Flip, and 30-year Rental Loans, all designed to meet the diverse needs of our
                                clients.
                            </p>

                            <a href="#">View More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}