module.exports = {
    registerTech: function (data) {
        const technician = technicians.build({
            username: data.username,
            name: data.name,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        technician.save().then(() => {
            console.log('REGISTERED TECH SUCCESS') //will be switched to show success of registration
        })
        technician.save().catch(error => {
            console.log(`ERROR ${error}`)
        })
    }
}