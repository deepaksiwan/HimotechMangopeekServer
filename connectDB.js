const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "MongoPeek",
     
       
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS)
    console.log('Database Connected Successfully...')
  } catch (error) {
    console.log(error)
  }
}

 module.exports=connectDB