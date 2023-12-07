import json
import sqlite3
from datetime import date
from flask import Flask, render_template, request
from flask_session import Session
from urllib.request import urlopen


# Configures the web app and database
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
today = date.today()
con = sqlite3.connect("user_data.db", check_same_thread=False)
db = con.cursor()


# Sets API Key & URL, this is used to get user's device data.
api_key = "insert API Key"
api_url = "https://geo.ipify.org/api/v2/country?"



# index() has two methods, "GET" & "POST". If "GET" is used, index.html is rendered, allowing the user to play the game. If
# "POST" is used, the details inputted in the form gets added to user_data.db, which is the database that stores the details 
# of all users.
@app.route("/", methods=["GET", "POST"])
def index():
        if (request.method == "GET"):
                return render_template("index.html")
        else:   
                # gets form details
                player_name = request.form.get("player_name")
                past_moves = request.form.get("past_moves")
                session_date = request.form.get("date")

                # checks that player_name is not empty
                if ((len(player_name) <= 0)):
                      return render_template("error.html")

                # assigns the current date to session_date if it is empty
                if (len(session_date) <= 0):
                        session_date = today.strftime("%d/%m/%Y")                 

                # submits a request to get the device data of the user, the user's IP address is stored in user_ip
                url = api_url + 'apiKey=' + api_key + '&ipAddress=' + request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
                response = urlopen(url)
                geoip_data = json.loads(response.read().decode('utf-8'))
                user_ip = geoip_data["ip"]

                # details are inserted into the database
                db.execute("INSERT INTO user_logs (player_name, past_moves, session_date, user_ip) VALUES(?, ?, ?, ?);", [(player_name), (past_moves), (session_date), (user_ip)])
                con.commit()

                return render_template("index.html")


# games() has one method, "GET". When requested, the database is queried for all relevant entries with the same IP address
# as the user. user_data is then passed to games.html, where a for loop lists the data in a table using Jinja.
@app.route("/games", methods=["GET"])
def games():
        # submits a request to get the device data of the user, the user's IP is stored in user_ip
        url = api_url + 'apiKey=' + api_key + '&ipAddress=' + request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        response = urlopen(url)
        geoip_data = json.loads(response.read().decode('utf-8'))
        user_ip = geoip_data["ip"]

        # selects the relevant data using the user's IP address as the identifier
        user_data = list(db.execute("SELECT * from user_logs WHERE user_ip = ? ORDER BY session_date DESC;", [(user_ip)]))
        return render_template("games.html", user_data=user_data)


# about()) has one method, "GET". When requested, about.html is rendered to the user.
@app.route("/howto", methods=["GET"])
def howto():
        return render_template("howto.html")

# about()) has one method, "GET". When requested, about.html is rendered to the user.
@app.route("/about", methods=["GET"])
def about():
        return render_template("about.html")

    