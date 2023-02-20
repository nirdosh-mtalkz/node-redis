const PORT = 8000

const axios = require('axios')
const fastify = require('fastify')({ logger: true })
const Redis = require('ioredis')



const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
})

fastify.get('/', (req, res) => {
    res.send("Hello, world!")
})

fastify.get('/get-gender', async(req, res) => {
    const name = req.query.name
    // for(key in req.query){
    //     console.log(`key is :${key} and value is :${req.query[key]}`)
    // }

    const data = await redis.get(name)
    // try{
    // console.log('@@@@@@@@@@@@@@@@@@@',data.name)
    // }
    //catch{}
    if (data === null){
        const result = {
            message: 'Not found in redis database, serving from api call',
        }
        await axios.get(`https://api.genderize.io/?name=${name}`)
        .then( async(reply) => {
            // for(key in reply.data){
            //     console.log(`Key is : ${key} and value is : ${reply.data[key]}`)
            // }
            console.log('####################',reply.data)
            await redis.set(name, JSON.stringify(reply.data), 'ex', 20)
            result.data = reply.data
            res.send(result)
    })
        .catch((err) => {
            console.log(err)
            res.send("Found error")
    })
    }

    else{
        const result = {
            message: 'Found in database, serving from redis',
            data: JSON.parse(data)
        }
        res.send(result)
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: PORT })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()