const Database = require('better-sqlite3');
const database = new Database(':memory:');

database.exec(`
    CREATE TABLE User(
    id INTEGER PRIMARY KEY,
    name TEXT
    )
    `);

//insert query 
const insert = database.prepare('INSERT INTO User (id,name) VALUES (?,?)');

//with values
insert.run(101, 'Mukund');
insert.run(102, 'John');
insert.run(103, 'Smith');

//fetch data from data base
const query = database.prepare('SELECT * FROM User ORDER BY id');

console.log(query.all());


