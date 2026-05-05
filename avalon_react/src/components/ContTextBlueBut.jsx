import"./ContTextBlueBut.css";

export default function ContTextBlueBut({ title, text, link, textLink }) {
    return(
         <div className="cont_text_blue_but">
            <h1>
                {title}
            </h1>
            <p>
                {text}
            </p>
            <a href={link}>{textLink}</a>
        </div>
    )
}