import mongoose from 'mongoose'


function connectToDb() {

    mongoose.connect("mongodb+srv://Authentication-System:pLI7vNDaxvJMh5OA@authentication-system.aebyzt5.mongodb.net/BankTransactionSystem")
        .then(() => {
            console.log("server is connected to DB");
        })
        .catch(err => {
            console.log("Error connect to db",err);
            process.exit(1)
        })
.message
}

export default connectToDb;