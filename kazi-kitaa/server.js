const { Client } = require('pg');

// PostgreSQL connection config
const client = new Client({
  host: 'localhost',     // or your server IP
  port: 5432,            // default PostgreSQL port
  user: 'karim', // e.g., 'postgres'
  password: 'Karim@01',
  database: 'kazi_kitaa' // your database name,
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

/* // Example query
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Query error:', err.stack);
  } else {
    console.log('📅 Server time:', res.rows[0]);
  }
  client.end(); // close connection
});
 */