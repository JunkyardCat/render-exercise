const Sequelize = require('sequelize')
const {DATABASE_URL} = require('./config.cjs')

const {Umzug,SequelizeStorage} = require('umzug')

const isLocal = process.env.DATABASE_URL.includes('localhost')

const sequelize = new Sequelize(DATABASE_URL,
  {
    dialectOptions:isLocal
    ?{}
    :{
      ssl:{
        require:true,
        rejectUnauthorized:false
      }
    }
  })

const migrationConf = {
  migrations: {
      glob: 'migrations/*.cjs',
    },
    storage: new SequelizeStorage({sequelize,tableName: 'migrations'}),
    context: sequelize.getQueryInterface(),
    logger: console,
}

const runMigrations = async () =>{
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migration up to date',{
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async()=>{
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectToDatabase = async () =>{
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection has been establised successfully.')
  }catch(error){
    console.error('Unable to connect to the database:',error)
    return process.exit(1)
  }
  return null
}

module.exports = {connectToDatabase, sequelize, rollbackMigration}
