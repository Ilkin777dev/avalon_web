import HeroVideo from "../assets/video/bg_vid.webm"

export default function HeroScreen() {
  return (
    <div className="hero_screen_wrapper">
      <div className="video_screen_wrapper">
        <div className="video_screen">
          <video autoPlay muted loop playsInline>
            <source src={HeroVideo} type="video/webm" />
          </video>
        </div>
      </div>

      <div className="hero_screen">
        <div className="hero_screen_content">
          <div className="cont_text_trans_but">
            <h1>
              Quick, Reliable, And Investor-Centric Property
              Management Solutions
            </h1>

            <p>
              Avalon Management Group has quickly become synonymous
              with quality service and dependability in the
              residential, commercial and retail real estate
              industry. We offer a comprehensive suite of products
              tailored for real estate investors, including property
              management, financing, accounting and much more.
            </p>

            <a href="#">About Us</a>
          </div>
        </div>
      </div>
    </div>
  )
}