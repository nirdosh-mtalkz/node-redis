const Redis = require('ioredis')

const hostname = '127.0.0.1'
const PORT = 6379

const redis = new Redis({
    host: hostname,
    port: PORT,
})

redis.set('i','j')
redis.set('a','b')
const fun = async()  =>{
    const n = await redis.get('naman')
    console.log(n)
    const keys = await redis.keys('*')
    // console.log('data type of keys is : ' + typeof(keys))
    // console.log('keys : ' + keys)
    // console.log('name : ', await redis.get('name')) 
    // console.log('foo : ', await redis.get('foo'))

    for (key in keys){
        console.log(keys[key])
    }
}
// const keys = redis.keys('*')

// console.log('keys' + keys)

// for(i in keys){
//     console.log('@@@@@@@@@@@'+i)
// }
fun()
