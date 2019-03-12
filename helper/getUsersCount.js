/**
 * This helper should return the total amount of users in the company
 *
 * [TODO] please rewrite everything in to async/await/Promises, please document/comment your work
 */

const http = require('http')

const USER_QUERY = '{users{id, firstname, lastname}}'
const REQUEST_PARAMETER = {
  method: 'POST',
  port: 8080,
  hostname: 'localhost',
  path: '/graphql',
  headers: {'Content-Type': 'application/graphql'}
}

const graphqlRequest = (body, callback) => {
  const request = http.request(REQUEST_PARAMETER, (response) => {
    const body = []

    response.setEncoding('utf8')
    response.on('data', (chunk) => body.push(chunk))
    response.on('end', () => {
      let parsedBody = null

      try {
        parsedBody = JSON.parse(body.join(''))
      } catch (error) {
        callback(error)

        return
      }

      callback(null, parsedBody)
    })
  })

  request.end(body)
  request.on('error', (error) => {
    callback(error)
  })
}

const getUsersCount = (callback) => {
  graphqlRequest(USER_QUERY, (error, result) => {
    callback(error, result.data.users.length)
  })
}

module.exports = getUsersCount
