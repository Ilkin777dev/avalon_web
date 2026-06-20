import "./aboutUs.css"
import aboutUsImage from "../assets/aboutUsImg.jpeg"
import avalonManagementImage from "../assets/avalon_management_group.png"
import inKitchenImage from "../assets/infocus_main_page.jpeg"

export default function AboutUs() {
    return (
        <div className="about_us_section_wrapper">
            <div className="sec_title_wrapper">
                <div className="sec_title">
                    <h3>ABOUT US</h3>
                </div>
            </div>

            {/* SECTION 1 */}
            <div className="about_us_section" id="aboutUs">
                <div className="about_us_left">
                    <img src={aboutUsImage} alt="About Us" />
                </div>

                <div className="about_us_right">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                From Acquisition to Expansion, We Finance Growth
                            </h1>

                            <p>
                                Principal Partnership, established in 2015, was founded with a clear vision: to create a lending platform built around the real needs of real estate investors. What began as a focused partnership has evolved into a trusted financing group committed to helping investors grow, build, and scale with confidence.
                                <br /><br />
                                Today, Avalon Development proudly provides strategic residential real estate financing solutions nationwide, combining speed, reliability, and hands-on industry experience. As a privately owned company, we understand the challenges investors face because our foundation was built within the investment world itself.
                                <br /><br />
                                We specialize in delivering tailored financing solutions including Ground Up Construction, Multifamily Bridge Loans, Fix & Flip Financing, and 30 Year Rental Loans, all designed to help investors move quickly, seize opportunities, and maximize long term growth.
                                <br /><br />
                                Our mission is simple: empower investors with dependable capital, strong relationships, and a lending experience built on trust, transparency, and execution.
                            </p>

                            {/* <a href="#">View More</a> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="about_us_section" id="managementAvalon">
                <div className="about_us_left">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                AVALON MANAGEMENT <br /> GROUP
                            </h1>

                            <p>
                                Avalon Management remains an essential part of the Avalon ecosystem, providing residents with a reliable and efficient management experience built on accessibility, responsiveness, and professionalism.
                                <br /><br />
                                Through our dedicated resident portal, tenants have secure access to their accounts at all times, including the ability to make online payments, enroll in automatic payments, and manage account information with ease.
                                <br /><br />
                                The platform also streamlines communication between residents and management. Maintenance requests and service inquiries can be submitted directly through the portal, allowing our team to respond quickly and efficiently while ensuring every request is properly tracked and addressed.
                                <br /><br />
                                At Avalon Management, we are committed to delivering dependable service, clear communication, and a management experience designed to support the long term quality and stability of the communities we serve.
                                <br /><br />
                                <p>You can contact us via: <br /><br /> <a href="tel:+16098077777">+1-609-807-7777</a></p>
                            </p>

                            <a href="https://avalonmgmt.managebuilding.com/Resident/portal/login" target="_blank">Tenant Portal</a>
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
                    <img src={inKitchenImage} alt="About Us" />
                </div>

                <div className="about_us_right">
                    <div className="cont_text_blue_but_wrapper">
                        <div className="cont_text_blue_but">
                            <h1>
                                Transforming Homes, Elevating Living
                            </h1>

                            <p>
                                Infocus Kitchen & Bath is your premier partner for home transformations in New Jersey. Whether you are looking for a kitchen refresh, a bathroom upgrade, or custom storage solutions, we combine premium products from trusted brands with seamless, end-to-end service. From your first consultation to the final installation, our mission is to bring professional design, expert craftsmanship, and exceptional value to your home.
                            </p>

                            <a href="https://infocuskitchenbath.com/" target="_blank">View More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}