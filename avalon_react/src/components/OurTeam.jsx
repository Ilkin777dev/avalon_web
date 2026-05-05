import team1Img from "../assets/TeamImages/team1.png"
import team2Img from "../assets/TeamImages/team2.png"
import team3Img from "../assets/TeamImages/team3.png"
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
                        <img src={team1Img} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>CEO</p>
                    </div>

                    <div className="team_card_name">
                        <h2>John Doe</h2>
                    </div>

                    <div className="team_card_desc">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={team2Img} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>CTO</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Katie Doe</h2>
                    </div>

                    <div className="team_card_desc">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="team_card">
                    <div className="team_card_image">
                        <img src={team3Img} alt="" />
                    </div>

                    <div className="team_card_spec">
                        <p>GENERAL MANAGER</p>
                    </div>

                    <div className="team_card_name">
                        <h2>Jane Doe</h2>
                    </div>

                    <div className="team_card_desc">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}