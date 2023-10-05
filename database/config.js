const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('base de datos en linea')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la DB')
    }
}

module.exports={
    dbConnection
}