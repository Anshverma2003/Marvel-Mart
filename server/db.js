import env from 'dotenv';
import pg from 'pg'

env.config();

const db = new pg.Client({
    user: process.env.pgUser,
    host: process.env.pgHost,
    database: process.env.pgDatabase,
    password: process.env.pgPassword,
    port: process.env.pgPort,
    ssl:{
        require:true,
    }
})

db.connect()
.then(()=>{console.log("Connected to Database")}
)
.catch((err)=>{
    console.log("Failed to connect to Database");
});

export default db;