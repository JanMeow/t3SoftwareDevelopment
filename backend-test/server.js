import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

const app = express();
const port = 3000;

// PG query builder
// knex has to be saved in a variable in order to call the select function
const PGdatabase = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Aa24584223',
      database : 't3db'
    }
  });


PGdatabase.select('*').from('users').then(data =>{
    console.log(data);

})

// we normally dont user variables to store information and we usually uwe SQL but fot simplicity lets just use a variable for now
const database = {
    users: [
        {
            id : '123',
            name : 'Meow',
            email: 'lawmankiian@gmail.com',
            password: '123',
            entries : 0,
            joined: new Date()
        },
        {
            id : '124',
            name : 'Bebu',
            email: 'sexynomn@gmail.com',
            password: 'vanilla',
            entries : 0,
            joined: new Date()
        },
    ]
}

app.use(express.json());
app.use(cors());

// API Design
// root
// sign in Post request ---> success or fail respond
// register --> post = add to server return new user object
// access profile
// image --> materials uploaded
// 

app.get('/', (req,res)=>{
    res.send(database.users);
})


// Turn the follwoing into a loop
// Often an error of 'TypeError: Cannot read properties of undefined (reading 'email')' would show up
// if one tries to read the document without using Json.body parser so remember to use it at the beginning.

// Authenticate password and signin
app.post('/signin', (req, res)=>{

    PGdatabase.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        console.log(data)
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if (isValid){
            return PGdatabase.select('*').from('users').where('email', '=',req.body.email)
            .then(user =>{
                console.log('sucessfully signed in !')
                res.json(user[0])
            })
            .catch(err =>{
                res.status(400).json('unable to find user')
            })
        }else{
            res.status(400).json('wrong user email or password')
        }
    }).catch(err =>{
        res.status(400).json('wrong user email or password')
    })


// Without a data basde 
    // const emailList = database.users.map(user => user.email);
    // const validUser =  emailList.indexOf(req.body.email);

    // try {
    //     if (typeof (validUser) === 'number' && req.body.password === database.users[validUser].password){
    //         res.json(`User ${validUser} ${database.users[validUser].name} succesfully signed in ! `)
    //     }else{
    //         res.status(400).json('error logging in ')
    //     }
        
    // } catch (error) {
    //     res.status(400).json('error logging in ')
    // }

})


// Creating a new user with this json sent from postman
// {
//     "name" : "BebBigTongue",
//     "email": "sexystrong@gmail.com",
//     "password": "strongGirl"
// }
// also you always need to response if not, it wont return anything 
app.post('/register', (req,res)=>{
    const {email,password ,name } = req.body;
    const saltRounds = 10
    
    console.log(email,password,name)
    const hash = bcrypt.hashSync(password, saltRounds,(err, hash)=>{
        return hash;
    });


    PGdatabase.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{

            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            }).then(response =>{
                res.json(response);
            }).then(console.log)
        })
        .then(trx.commit)
        .catch(trx.rollback)
        
    }).catch(err=> res.status(400).json('unable to register'));
    


    
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
})


// Using /:id could allow us to get the id from the broswer through request
// here we use forEach instead of map because we dont necesaarily need to save the id in a variable
app.get('/profile/:id', (req,res)=>{
    const {id} = req.params;
    PGdatabase.select('*').from('users').where({id})
    .then(user =>{
        if(user.length){
            res.json(user)
        }else{
            res.status(400).json('user do not exist')
        }

    })
    // database.users.forEach(user =>{
    //     if (user.id === id){
    //         return res.json(user)
    //     };
    // })
    // return res.status(404).json('user not found')
})

app.post('/image', (req, res)=>{
    const {id} = req.body;
    database.users.forEach(user=>{
        if (user.id === id){
            user.entries ++
            return res.json(user.entries);
        };
    })
    return res.status(404).json('user not found')
})




app.listen(port, ()=>{
    console.log(`App running on ${port}`)
})