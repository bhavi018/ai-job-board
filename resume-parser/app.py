from flask import Flask, request, jsonify
import spacy
import PyPDF2

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")


@app.route("/parse-resume", methods=["POST"])
def parse_resume():
    file = request.files["resume"]
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()

    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]
    education = [
        sent.text
        for sent in doc.sents
        if "University" in sent.text or "College" in sent.text
    ]

    return jsonify(
        {"skills": skills, "education": education, "raw_text": text[:1000]}  # optional
    )


if __name__ == "__main__":
    app.run(port=8000, debug=True)
