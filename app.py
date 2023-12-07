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
con = sqlite3.connect("user_data.db", check_same_thread=False)
db = con.cursor()


# Sets API Key & URL, this is used to get user's device data.
api_key = 'your API Key'
api_url = 'https://geo.ipify.org/api/v2/country,city?'


@app.route("/", methods=["GET", "POST"])
def index():
        if (request.method == "GET"):
                return render_template("index.html")
        


@app.route("/about", methods=["GET"])
def about():
        return render_template("about.html")


# date_checker() checks the date inputted follows the guidelines of DD/MM/YYYY, ensuring that the date is also not zero.
def date_checker(date):
    checker = 0
    zero_checker = 0
    for i in range(10):
        if (i == 2) or (i == 5):
            if date[i] == '/':
                checker += 1
        else:
            if date[i].isdigit():
                checker += 1
                if date[i] == '0':
                    zero_checker += 1

    if zero_checker == 8:
        return True

    if checker == 10:
        return False

    else:
         return True
    