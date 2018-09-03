const Technician = require("./models").Technician;
const Ride = require("./models").Ride;
const Dispatch = require("./models").Dispatch;
const Ticket = require("./models").Ticket;

module.exports = {
    checkUser: data => {
        const Model = data.type === "Technician" ? Technician : Dispatch;
        console.log("CHECKING USER", data);
        return Model.find({
            where: {
                username: data.username,
                password: data.password
            }
        }).then(user => {
            if (user) return user;
            else {
                throw "USER DOES NOT EXISTS";
            }
        });
    },
    checkRegister: data => {
        const Model = data.type === "Technician" ? Technician : Dispatch;
        console.log("CHECKING REGISTER", data);
        return Model.find({
            where: {
                username: data.username
            }
        }).then(user => {
            if (user) throw "USER EXISTS";
            else {
                return user;
            }
        });
    },
    registerDispatch: function (data) {
        Dispatch.create({
                username: data.username,
                password: data.password
            })
            .then(() => {
                console.log("REGISTERED DISPATCH, SUCCESS"); //will be switched to show success of registration
            })
            .catch(error => {
                console.log(`ERROR ${error}`);
            });
    },
    registerTechnician: function (data) {
        Ride.find({
            where: {
                name: "John Doe"
            }
        }).then(ride => {
            console.log("regggTech", ride);
            Technician.create({
                    username: data.username,
                    name: data.name,
                    password: data.password,
                    RideId: ride.id
                })
                .then(() => {
                    console.log("REGISTERED TECH, SUCCESS"); //will be switched to show success of registration
                })
                .catch(error => {
                    console.log(`ERROR ${error}`);
                });
        });
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
                })
                .then(() => {
                    console.log("REGISTERED TECH, SUCCESS"); //will be switched to show success of registration
                })
                .catch(error => {
                    console.log(`ERROR ${error}`);
                });
        });
    },
    openTicket: function (data) {
        Ride.find({
            where: {
                name: data.ride
            }
        }).then(() => {
            Ticket.create({
                    rider: data.name,
                    contact: data.contact,
                    lat: data.lat,
                    lng: data.lng,
                    type: data.type,
                    startTime: data.startTime,
                    description: data.description,
                    status: data.status
                })
                .then(() => {
                    console.log("CREATED TICKET, SUCCESS"); //will be switched to show success of registration
                })
                .catch(error => {
                    console.log(`ERROR ${error}`);
                });
        });
    },
    assignTech: data => {
        Technician.find({
            where: {
                username: data.id
            }
        }).then(query => {
            Ticket.update({
                technicianId: query.id,
                status: "active"
            }, {
                where: data.id
            });
        });
    },
    updateTicket: data => {
        Ticket.update({
            status: data.status
        }, {
            where: data.id
        });
    },
    getTickets: function (data) {
        return Ticket.findAll({
            where: {
                status: 'pending'
            },
            raw: true
        }).then(data => {
            console.log('TICKET DATA IN DB', data)
            return data;
        }).catch(error => {
            console.log(`ERROR ${error}`)
        })
    }
};

//  DB AS SERVER (below)
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