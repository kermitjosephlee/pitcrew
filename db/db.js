const techniciansCreator = require('./models/technicians');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('pitcrew', 'labber', 'labber', {
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

const technicians = techniciansCreator(sequelize, Sequelize);

// var db = {
//     registerTech: function (data) {
//         const technician = technicians.build({
//             username: data.username,
//             name: data.name,
//             password: data.password,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         })
//         technician.save().then(() => {
//             console.log('REGISTERED TECH, SUCCESS') //will be switched to show success of registration
//         })
//         technician.save().catch(error => {
//             console.log(`ERROR ${error}`)
//         })
//     },
//     registerDispatch: function (data) {
//         const technician = technicians.build({
//             username: data.username,
//             password: data.password,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         })
//         technician.save().then(() => {
//             console.log('REGISTERED DISPATCH, SUCCESS') //will be switched to show success of registration
//         })
//         technician.save().catch(error => {
//             console.log(`ERROR ${error}`)
//         })
//     }
// }

let data = {
    username: 'WORKDAMNIT',
    name: 'WORK!!!',
    password: 'pass'
}
sequelize.sync()
    .then(() => technicians.create({
        username: 'WORKDAMNIT',
        name: 'WORK!!!',
        password: 'pass',
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });


// db.registerTech(data)