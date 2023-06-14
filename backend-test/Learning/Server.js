// Express.js
// Most of the current servers are built by express 
import express from 'express';

const app = express();
const port = 3000


// Instead of sending text in html way like '<h1>sexy World!</h1>', one can also send Json
// -----------------------------------------------------------------------------------------------------------------------------------

const user = {
    name: 'Meow B',
    hobby: 'sexy dance'
}

const text = '<h1> Heheheh BEBU</h1> '

// -----------------------------------------------------------------------------------------------------------------------------------



// To access html file in the public folder simply do the following
// app.use(express.static(__dirname + '/(public'))

// app.use(express.static(__dirname,))

app.use((req, res, next)=>{
    express.urlencoded({extended: false});
    express.json();
    next();
})




// In the req object you receive, there could be a few properties you receive
// req.query, req.body, req.header, req.params


// req.query, req.body
// -----------------------------------------------------------------------------------------------------------------------------------
// A query could be made by simply typing ? to the browser For example typing localhost:3000?name=jan&age=27
// console.log(req.query) would give the following in the terminal{ name: 'jan', age: '27' }
// req.body is simply reading what the request says in the body could be form, text or Json
// req.headers

app.get('/', (req, res) => {
    // console.log(req.query)
    // console.log(req.headers)
    res.send('getting beee')
  })


// req.params
// -----------------------------------------------------------------------------------------------------------------------------------
// if you do the following and on postman type do a get request for the address localhost:3000/1234
// the id will therefore 1234

app.get('/:id',(req, res)=>{
    console.log(req.params)
})


// res.status
// additionally you could get status to the response  (you need to comment out the previous get in order to see this)
// -----------------------------------------------------------------------------------------------------------------------------------
// app.get('/',(req, res)=>{
//     res.status(404).send('Meow Not Found')
// })




app.get('/profile', (req,res) =>{
    res.send(user)
})

app.post('/profile', (req,res) =>{
    console.log(req.body)
    res.send(text)
})


// -----------------------------------------------------------------------------------------------------------------------------------
app.listen(port);


// To read files from HTML using __dirname
// __dirname is not usable in the scope of ES6 and therefore some tricks have to be done to use it
// -----------------------------------------------------------------------------------------------------------------------------------

// import express from 'express';
// import path from 'path'
// import { fileURLToPath } from 'url';

// const app = express()
// const port = 3000


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path. dirname(__filename)

// app.use(express.static(__dirname +'/public'))
// app.listen(port)


