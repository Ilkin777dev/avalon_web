import "./contTextTransBut.css"

export default function ContTextTransBut({ title, text, link, textLink }) {
    return (
        <div className="cont_text_trans_but">
            <h1>
                {title}
            </h1>
            <p>
                {text}
            </p>
            <a href={link}>{textLink}</a>
        </div>
    );
}