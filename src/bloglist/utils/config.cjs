require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
//const MONGO = 'mongodb+srv://tonytanduaymongo_db_user:BrGseH9ECEu5UkeQ@cluster0.vdccw4q.mongodb.net/?appName=Cluster0'
module.exports = {MONGODB_URI, PORT}
