## WorryLess

- [General info](#general-info)
- [Content](#content)
- [Technologies](#technologies)
- [Resources](#resources)
- [How To Run WorryLess Locally](#how-to-run-worryless-locally)
- [Features](#features)
- [Attribution](#attribution)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## General Info

### Project Title 
WorryLess
### Project Description
Our team, Copium, is developing a journaling app, Worryless, to help people who struggle with anxiety to manage their worries with a time-boxed worry-time session in which they reflect on their various worries.

### The Team
- Hailin(Adam) Chen - github: https://github.com/HailinChenbcit
- Bosco Chan - github: https://github.com/BoscoCHW
- Jose Alfonso Clarito - github: https://github.com/FonseLULW
- Jason Lui - github: https://github.com/Jason42lui

## Content

Content of the project folder:

```
Top level of project folder:
.
├── README.md
├── config
├── package-lock.json
├── package.json
├── src
└── uploads

It has the following subfolders and files:
.
├── README.md
├── config
│   └── database.js
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── public
│   ├── utility
│   └── views
└── uploads

Scripts files in source file:
.
├── app.js
├── controllers
│   ├── authController.js
│   ├── indexController.js
│   ├── worryEntryController.js
│   └── worryTimeController.js
├── middleware
│   ├── checkAuth.js
│   ├── multer.js
│   └── passport.js
├── models
│   ├── User.js
│   ├── WorryEntry.js
│   └── WorryTime.js
├── public
│   ├── img
│   │   ├── WorryLessIcon.png
│   │   ├── adamProfile.PNG
│   │   ├── boscoProfile.jpg
│   │   ├── boscoProfile2.PNG
│   │   ├── favicon.ico
│   │   ├── fonseProfile.png
│   │   ├── jasonProfile.jpg
│   │   ├── landing_page_background.jpg
│   │   └── main_card_background.jpg
│   ├── index.html
│   ├── scripts
│   │   ├── accounts.js
│   │   ├── dailyview.js
│   │   ├── duringworry.js
│   │   ├── home_page.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── profile.js
│   │   ├── register.js
│   │   └── worry_form.js
│   └── styles
│       ├── accounts.css
│       ├── dailyView.css
│       ├── duringWorryTime.css
│       ├── edit.css
│       ├── home_page.css
│       ├── layout.css
│       ├── login.css
│       ├── notFound.css
│       ├── profile.css
│       ├── styles.css
│       ├── worryTimeSetup.css
│       └── worry_form.css
├── utility
│   ├── moods.js
│   └── timezones.js
└── views
    ├── accounts.ejs
    ├── dailyView.ejs
    ├── duringWorryTime.ejs
    ├── edit.ejs
    ├── home.ejs
    ├── login.ejs
    ├── notFound.ejs
    ├── partials
    │   └── footer.ejs
    ├── profile.ejs
    ├── register.ejs
    ├── worryForm.ejs
    └── worryTimeSetup.ejs
```

## Technologies

Technologies used for this project:

- HTML, CSS
- JavaScript
- JQuery, Ajax
- Bootstrap
- Express.js and Node.js

## Resources

- In-app icons from Font Awesome
- Logo homemade!
- Hosted on Heroku
- Google fonts for text

## How to run WorryLess locally

1. Install the most recent LTS version of Node.js

2. Clone this repo with 
    ```
    git clone git@github.com:HailinChenbcit/2800-202210-DTC02.git
    ```
3. Install the required dependencies using `npm install`
    ```
    npm install
    ```
4. Add a `.env` file in the root directory of the repo with the following line in the file
    ```
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    ```
5. Start the app by running `npm start`
    ```
    npm start
    ```
6. Visit `http://localhost:3000/` in your web browser of choice


## Features

- Record my mood today
- Write new worry journal
- Set up your worry time

## Attribution

- W3School: https://www.w3schools.com/howto/howto_js_countdown.asp
- Eggonomics: https://eggonomics-35c2b.web.app/
- Stack Overflow: https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
- Brian Design: https://www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A
- PortEXE: https://www.youtube.com/c/PortEXE

## Contact

- Hailin Chen - hchen256@my.bcit.ca
- Bosco Chan - hchan183@my.bcit.ca
- Fonse - jclarito1@my.bcit.ca
- Jason Lui - jlui40@my.bcit.ca

## Acknowledgements

- <a href="https://fontawesome.com/">Font Awesome</a>
- <a href="https://getbootstrap.com/">Bootstrap</a>
- <a href="https://fonts.google.com/">GoogleFont</a>
- <a href="https://cdnjs.com/libraries/Chart.js">Cloudfare</a>
- <a href="https://unsplash.com/">Unsplashed</a>
- <a href="https://dashboard.heroku.com/">Heroku</a>
