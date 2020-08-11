# Coding Challenge News Update Frontend

Coding challenge instuctions locate at [News update detection (frontend)](https://bitbucket.org/isentia/coding-challenge-news-update-frontend/src/master/).

## How to run app

This project was generated with [Angular CLI](https://www.npmjs.com/package/@angular/cli/v/9.0.4) version 9.0.4.

Only tested in Windows 10 environment, but the other operating system should work as well, please contact me via sethfengli#yahoo.com.au if you have any questions.


## Clone Project Repository

> `git clone https://github.com/sethfengli/coding-challenge-news-update-frontend`


## Install Dependencies

> Run `npm install` to install project dependencies

## Development server

> Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Cross-Origin Resource Sharing (CORS)

You could get CORS errors from Chrome when you try to test or add RSS feeds on dev server locally as above.

To disable the CORS in latest Chrome, you have to start a separate Chrome browser

> Windows - Open command prompt or run box and enter `start chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`

> Linux - Command `google-chrome --disable-web-security`

> MacOS - Terminal `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

## Demo

> The page will automatically poll the news RSS feeds every three minutes, you can manually click the Poll button on the top-left screen.

![Sample](Sample.jpg)

## Build

> Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

> Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Addtional Test RSS feed list

https://www.sbs.com.au/news/feed

https://www.theage.com.au/rss/feed.xml

