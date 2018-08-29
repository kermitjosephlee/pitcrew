const Technician = require('./models').Technician;
const Ride = require('./models').Ride;
const Dispatch = require('./models').Dispatch;
const Ticket = require('./models').Ticket;

module.exports = {
    checkUser: (data) => {
        // const user = data.user
        console.log('dbbbbb', data)
        return Technician.find({
            where: {
                username: data.username,
                password: data.password
            }
        }).then(user => {
            if (user)
                return true
            else {
                throw false
            }
        })
    },
    registerDispatch: function (data) {
        Dispatch.create({
            username: data.username,
            password: data.password
        }).save().then(() => {
            console.log('REGISTERED DISPATCH, SUCCESS') //will be switched to show success of registration
        }).save().catch(error => {
            console.log(`ERROR ${error}`)
        })
    },
    registerTech: function (data) {
        Ride.find({
            where: {
                name: data.ride
            }
        }).then((ride) => {
            console.log(ride)
            Technician.create({
                username: data.username,
                name: data.name,
                password: data.password,
                RideId: ride.id
            }).then(() => {
                console.log('REGISTERED TECH, SUCCESS') //will be switched to show success of registration
            }).catch(error => {
                console.log(`ERROR ${error}`)
            })
        })
    },
    registerRide: function (data) {
        Dispatch.find({
            where: {
                name: data.dispatch
            }
        }).then(dispatch => {
            Ride.create({
                DispatchId: dispatch.id,
                name: data.name,
                date: data.date,
                timeStart: data.timeStart,
                timeEnd: data.timeEnd,
                latStart: data.latStart,
                longStart: data.longStart,
                latEnd: data.latEnd,
                longEnd: data.longEnd
            }).then(() => {
                console.log('REGISTERED TECH, SUCCESS') //will be switched to show success of registration
            }).catch(error => {
                console.log(`ERROR ${error}`)
            })
        })
    },
    openTicket: function (data) {
        Ride.find({
            where: {
                name: data.ride
            }
        }).then(() => {
            Ticket.create({
                rider: data.rider,
                contact: data.contact,
                lat: data.lat,
                long: data.long,
                type: data.type,
                values: data.value,
                startTime: data.startTime,
                endTime: data.endTime,
                description: data.description,
                status: data.status
            }).then(() => {
                console.log('REGISTERED TECH, SUCCESS') //will be switched to show success of registration
            }).catch(error => {
                console.log(`ERROR ${error}`)
            })
        })
    },
}

// db.registerTech(data)

// const Sequelize = require('sequelize');
// const techniciansCreator = require('./models/technicians');

/* const sequelize = new Sequelize('pitcrew', 'labber', 'labber', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const technicians = techniciansCreator(sequelize, Sequelize); */

// sequelize.sync()
//     .then(() => technicians.create({
//         username: 'WORKDAMNIT',
//         name: 'WORK!!!',
//         password: 'pass',
//     }))
//     .then(jane => {
//         console.log(jane.toJSON());
//     });