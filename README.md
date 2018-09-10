# PitCrew

PitCrew is designed to help you call for help to the people who can help you.


## Motivation

Inspired by volunteering as a bike technician on charity bike rides, charity riders who needed help were not able to articulate where they are to the people who could help them. They would carry phones that had all the tools within them to communicate all the information necessary to get help to them, but there was no app that closed this gap. PitCrew was designed to fill that gap.

## How It Works

PitCrew starts with a rider looking for help. The rider gives their name and mobile number. PitCrew then queries the rider for the type of help needed: mechanical help (ie. flat tire), medical help (ie. scrapes), and sweep (ie. too tired to continue). PitCrew will then take this information along with their geolocation and send that to a central dispatch. The dashboard dispatch sees has a map that shows the position of all the registered and logged-in technician along with all the technicians occupied on active tickets and riders looking for help. Dispatch is able to assign available technicians to pending tickets. Technicians will then be given a map that shows the fastest route to the rider. After arriving, the technician then completes the ticket and becomes available for another ticket.

## Before Getting Started

To access the mobile app portions of the project, download [Expo](www.expo.io)

## Getting Started

1) install all the npm packages
```
npm install
```

2) start the react server
```
npm start 
```

3) start the express server
```
nodemon server.js
```

4) open your browser
```
localhost:3000
```

## Stack and Frameworks
(all made with the latest versions as of August 2018)

* React
* React Router
* React Native
* Expo
* Express
* Postgres
* Sequelize
* Bootstrap

## Credits

* [Kermit Joseph Lee](www.github.com/kermitjosephlee)
* [Taha Elhardi](www.github.com/elaradi23)
* [Mike Surya](www.github.com/mikeyuchima)

Special Thanks to [Lighthouse Labs](www.lighthouselabs.ca)

Proudly made in Toronto.
