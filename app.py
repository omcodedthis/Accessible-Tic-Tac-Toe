import json
import sqlite3
from datetime import date
from flask import Flask, render_template, request
from flask_session import Session
from urllib.request import urlopen



app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
today = date.today()
db = con.cursor()



@app.route("/", methods=["GET"])
def index():
        return render_template("index.html")


@app.route("/about", methods=["GET"])
def about():
        return render_template("about.html")
