const express = require('express')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker');

const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)

  connection.query(`INSERT INTO people (nome) values ('${faker.person.firstName()}')`)

  connection.query(`SELECT nome FROM people`, (error, results) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
      </ol>
    `)
  })
})

app.listen(port, () => {
  console.log('Running on port ', + port)
})