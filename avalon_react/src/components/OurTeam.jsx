import alexImg from "../assets/TeamImages/alex.png"
import emilImg from "../assets/TeamImages/emil.png"
import konstantinImg from "../assets/TeamImages/konstantin.png"
import sindyImg from "../assets/TeamImages/sindy.png"
import nathalieImg from "../assets/TeamImages/nathalie.png"
import joelImg from "../assets/TeamImages/joel.png"
import lalaImg from "../assets/TeamImages/lala.png"
import kamilaImg from "../assets/TeamImages/kamilla.png"
import greidyImg from "../assets/TeamImages/greidy.png"
import peterImg from "../assets/TeamImages/peter.png"
import sabinaImg from "../assets/TeamImages/sabina.png"
import validaImg from "../assets/TeamImages/valida.png"
import dayanaImg from "../assets/TeamImages/dayana.png";
import "./ourTeam.css"

export default function OurTeam() {
    return (
        <div className="our_team_wrapper">
            <div className="sec_title_wrapper">
                <div className="sec_title">
                    <h3 style={{ color: "white" }}>
                        OUR TEAM
                    </h3>
                </div>
            </div>

            <div className="our_team">
                {/* CARD 1 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={alexImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Director of Asset & Finance</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Alex Isak</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:alex.isak@avalon.com">Email to Alex</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Alex Ext-201</a>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={emilImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Director of Acquisitions & Foreclosures</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Emil Shamailov</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:es@avalon990.com">Email to Emil</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Emil Ext-101</a>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={konstantinImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Director of Construction & Planning</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Konstantin Isakov</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:isakovk@avalon990.com">Email to Konstantin</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Konstantin Ext-100</a>
                    </div>
                </div>
            </div>

            {/* OUR TEAM SECOND ROW */}

            <div className="our_team">
                {/* CARD 4 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={sindyImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Billing</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Sindy Astudillo</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:billing@avalon990.com">Email to Sindy</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Sindy Ext-104</a>
                    </div>
                </div>

                {/* CARD 5 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={nathalieImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Secreatry</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Nathalie S</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:info@avalon990.com">Email to Nathalie</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Nathalie Ext-102</a>
                    </div>
                </div>

                {/* CARD 6 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={joelImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Maintenance & Repairs Specialist</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Joel P</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:joel@avalon990.com">Email to Joel</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Joel Ext-107</a>
                    </div>
                </div>
            </div>

            {/* OUR TEAM THIRD ROW */}

            <div className="our_team">
                {/* CARD 7 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={kamilaImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Asset & Financial Operations</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Kamila S</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:kamila@avalon990.com">Email to Kamila</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Kamila</a>
                    </div>
                </div>

                {/* CARD 8 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={lalaImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Accounting</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Lala V</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:lala@avalon990.com">Email to Lala</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Lala Ext-308</a>
                    </div>
                </div>

                {/* CARD 9 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={dayanaImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Marketing and Brand Development Manager</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Dayana Al-Mulhem</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:diana@avalon990.com">Email to Dayana</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Dayana Ext-310</a>
                    </div>
                </div>
            </div>

            {/* OUR TEAM FOURTH ROW */}

            <div className="our_team">
                {/* CARD 10 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={peterImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Project Manager</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Peter A</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:peter@avalon990.com">Email to Peter</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Peter</a>
                    </div>
                </div>

                {/* CARD 11 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={sabinaImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Business Development Assistant</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Sabina I</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:SabinaI@avalon990.com">Email to Sabina</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Sabina Ext-301</a>
                    </div>
                </div>

                {/* CARD 12 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={validaImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Business Development Associate </p>
                    </div>

                    <div className="team_card_name">
                        <h2>Valida Guliyeva</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:valerie@avalon990.com">Email to Valerie</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Valerie</a>
                    </div>
                </div>
            </div>

            {/* OUR TEAM FIFTH ROW */}

            <div className="our_team">
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={greidyImg} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>Office Operations</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Greidy A</h2>
                    </div>

                    <div className="team_card_desc">
                        <a href="mailto:office@avalon990.com">Email to Greidy</a>
                        <br />
                        <br />
                        <a href="tel:+1-609-807-7777">Call Greidy Ext-103</a>
                    </div>
                </div>
            </div>

        </div>
    );
}