const mongoos = require('mongoose');

const connectToMongo = () => {
    mongoos.connect(process.env.MONGO_URL, ()=>{
        console.log("Connected to MongoDB Successfully");
    })
}


module.exports = connectToMongo;