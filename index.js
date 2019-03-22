const { send, json } = require('micro')
const { router, get, post, put} = require('microrouter')
const cors = require('micro-cors')()

const db = require('monk')('mongodb://jonathon13:Asdfdsa11@forms-api-shard-00-00-oe4uo.mongodb.net:27017,forms-api-shard-00-01-oe4uo.mongodb.net:27017,forms-api-shard-00-02-oe4uo.mongodb.net:27017/Users?ssl=true&replicaSet=Forms-api-shard-0&authSource=admin&retryWrites=true')
const users = db.get('users')

//  route handlers 

const notfound = (req, res) => send(res, 404, 'Not found route')

const updateUser = async (req, res) => {
    const data = await json(req)
    console.log(data)
    const results = await users.update({ _id: req.params.id }, data);
    return send(res, 200, results)

}

const createUser = async (req, res) => {
    // Create a User
    // Database stuff goes here
    const body = await json(req)
    await users.insert(body)
    return send(res, 201, body)
}

    const getUsers = async (req, res) => {
    const data = await users.find({})
    return send(res, 200, data)
} 

    const getUser = async (req, res) => {
        // Read a Single User
        const user = await users.find({_id: req.params.id})
        // Database stuff goes here
        return send(res, 200, user)
}

    // routes

    module.exports = cors(
        router(
            get('/users', getUsers),
            get('/users/:id', getUser),
            post('/users', createUser),
            put("/users/:id",updateUser),
            get('/*', notfound)
        )
    )
