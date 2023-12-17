# Accessible-Tic-Tac-Toe
This is a web app that is inclusive to Persons With Disabilities (PWDs), specifically persons with sensory impairments to play Tic-Tac-Toe. While most games focus on graphics and animations, there is a need to make games that are inclusive to Persons With Disabilities (PWDs), specifically persons with sensory impairments. Persons with sensory impairments commonly use a [screen reader](https://www.youtube.com/watch?v=OUDV1gqs9GA&t=1080s) as an interface to navigate their web browser. Do note that this is currently optimised for desktop mode.


## Demo
https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/assets/119602009/25a4142f-d13a-446e-8529-fd787ca6b2cd

A more in-depth explanation of each segment is provided below under **Design Decisions for User Interaction**.

## Accessibility Considerations Made (in 300 Words)
Based on this [video](https://www.youtube.com/watch?v=OUDV1gqs9GA&t=1080s), I found out that screen readers mainly rely on the text of the webpage itself. It turns out that too much text can make the webpage hard to navigate, while short pieces of text do not provide the user with much information. As such, I had to ensure my design was minimal yet verbose to make it more accessible to screen readers. Accessibility enabling devices are also limited in terms of computation due to the acessibility related software, so I had to make my solution lightweight for it to run smoothly for a good user experience.

Another challenge that I anticipated was inputting data into text fields. Most of the user’s control is used to control the screen reader or accessibility-enabling software, thus, making it difficult to interpret and enter text. From this, input fields had to be kept to a minimum, especially when saving & retrieving details of past games. In my solution, I prioritised the accessibility-related features & was not able to implement the multiplayer capability.
Here is what I kept in mind for each type of impairment when building the web app within the time constraint of less than 2 days due to other factors:

**Cognitive:** Make interacting as easy as possible & provide an avenue to assist understanding.

**Visual:** Verbose descriptions to maximise understanding with minimal options to improve navigation.

**Auditory:** Keep audio-related parts to a minimum & provide a text-alternative if applicable.

**Motor:** Highlight key parts of the game & autofill input fields as necessary (also applies to all other impairments).

**Speech:** Keep voice-related features to a minimum.


## Design Decisions for User Interaction
The design decisions made with PWDs in mind have been segmented by each page of the web app. An explanation of how a person with sensory impairment would interact with the game is also covered below. 
<details>
<summary>For the Tic-Tac-Toe Game.</summary>
<br>
<picture>
  <img src="https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/assets/119602009/e62c1f94-edd8-4bb7-a34b-95f0238a68b3">

</picture>
&nbsp;

The board begins empty with the current turn indicated at the end of the header. As the turns progress, a text representation of the board is generated for users using screen readers to make the next move. Once a winner is declared the winning spaces are also highlighted for better emphasis (especially for users with cognitive impairments. The current board & date are then autofilled into the filled below. Since Tic-Tac-Toe is a very repetitive game, I decided to give the user the control to choose which games to save (to remember boards that they had found interesting) to prevent the Past Games page from being too cluttered with information that would affect screen readers. If users require more information, they can utlise the "How To Play" section.

**Accessibility-related features for each impairment:**
1) A string representation of the board is generated after each turn > Visual.
2) Turns change automatically > Cognitive, Visual, & Motor.
3) Highlighted winning tiles > Cognitive, Auditory, & Motor.
4) Autofill board data & current date > Cognitive, Visual, Motor, & Speech.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
</details>

<details>
<summary>For Past Games.</summary>
<br>
<picture>
  <img src="https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/assets/119602009/e5e1a11b-f8c6-419a-9b98-b2f7974db4b0">
</picture>
&nbsp;

Without any interaction required, the user's Past Games data is listed in a table (indicated in the header for screen readers) & ordered by date. By using the IP address as the unique identifier, the user does not have to enter any credentials,
making it much easier to utilise the service.

**Accessibility-related features for each impairment:**
1) Verbose header > Cognitive & Visual.
2) No need to input any details to view history > Cognitive, Visual, & Motor.
3) Amount of interaction points kept to a minimum > Cognitive, Visual, & Speech.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
</details>

<details>
<summary>For How to Play.</summary>
<br>
<picture>
  <img src="https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/assets/119602009/42c883a8-ac37-4e22-ae69-87d0797be91f">
</picture>
&nbsp;

This section has an embedded YouTube video that explains how to play Tic-Tac-Toe for users with cognitive & motor impairments. For users with visual impairements & auditory impairments, a text-based explanation is provided below.

**Accessibility-related features for each impairment:**
1) Short & engaging video embedded > Cognitive.
2) Text-based explanation provided > Visual & Auditory.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
</details>



## Architecture Diagram
![architecture-diagram](https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/assets/119602009/7a5c79d0-5210-454c-8c91-544d3e55cd25)

Above is a diagram showing the various components of the web app. `app.py` handles most of the complexity in this instance, communicating with the database & handling API requests to Geo IPify. The user (the client) is then shown the relevant HTML, CSS & Javascript rendered from the respective route in `app.py`. If a user wishes to save details of a past game, they can do so through a form provided (which gets auto-filled). In order to minimise the friction of using the application, the user's IP address is used as the unique identifier in SQL queries.

## Sample API Request
The below two lines are used to craft the API request to Geo IPify. 
https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/blob/942205df9a0e264c53cf9dc71ab12c4a56e375fd/app.py#L21
https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/blob/942205df9a0e264c53cf9dc71ab12c4a56e375fd/app.py#L47


The outputted data looks something like what is show below sends the geographical details of the user, as well as details of his IP address (which is parsed as the unique identifier). This data is then used in the SQL queries to update or read
from the database, `user_data.db`.
```
{
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "timezone": "-07:00",
    },
    "domains": [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn"
    ],
    "as": {
        "asn": 15169,
        "name": "Google LLC",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
}
```

## Getting Started
You can visit & use the live version [here](https://attt.pythonanywhere.com/) (Desktop Mode recommended). If you wish to run this locally, follow the steps below.

* Install all the dependencies using this command line.
  ```
  pip install -r requirements.txt
  ```

* Make a [Geo Ipify](https://geo.ipify.org/signup) account and set your API Key to `api_key`.
 https://github.com/omcodedthis/Accessible-Tic-Tac-Toe/blob/942205df9a0e264c53cf9dc71ab12c4a56e375fd/app.py#L19-L20

* To run the application on a development server, use this command line while in the main folder of the Web App (Accessible-Tic-Tac-Toe/).
   ```
    flask run
    ```
