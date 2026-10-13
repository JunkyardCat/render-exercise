require('dotenv').config({ quiet: true })
const { Client } = require('pg')

console.log('URL loaded:', !!process.env.DATABASE_URL)

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
})

console.log('connecting...')
client
  .connect()
  .then(() => client.query('select 1 as ok'))
  .then((res) => console.log('success:', res.rows))
  .catch((err) => console.error('failed:', err))
  .finally(() => client.end())
