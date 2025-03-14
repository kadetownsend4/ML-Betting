# I asked ChatGPT for help setting up a simple flask application to get a better idea of how to interact with the application. 
# It ran me through the process of setting up flask and setting up a postgres sql database from the command line terminal

# https://chatgpt.com/share/67d35b8f-f968-800f-84b2-0d2a5ec7feaf 
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")  # Serve the HTML page

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)



