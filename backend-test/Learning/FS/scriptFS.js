// fs
// -----------------------------------------------------------------------------------------------------------------------------------
// import fs from 'fs'

// fs.readFile('./test.txt', (err, data)=>{
//     if (err){
//         console.log('error');
//     }
//     console.log('1: ', data.toString());
// })

// const file = fs.readFileSync('./test.txt');
// console.log('2: ', file.toString());


// from the above two functions, the major difference is that readFile is asynochonise while .readFileSync() is not
// in other words .readFileSync() is going to wait until it finish reading another file before reading the next line in code

// Append
// -----------------------------------------------------------------------------------------------------------------------------------
// fs.appendFile('./test.txt', 'cute cute nom loves you ', err=>{
// if(err){
//     console.log('error')}
// })

// WRITE
// -----------------------------------------------------------------------------------------------------------------------------------
// fs.writeFile('./bye.txt','sad to see you go meow', err=>{
//     if (err){
//         console.log('sadddd')}
// })


// DELETE
// -----------------------------------------------------------------------------------------------------------------------------------
// fs.unlink('./bye.txt', err=>{
//     if (err){
//         console.log(err)
//     }
//     console.log('file deleted')
// })



// Excercise
// -----------------------------------------------------------------------------------------------------------------------------------
import fs from 'fs'
const info = fs.readFileSync('./test.txt').toString()

const count_floor = (info)=>{
    console.time('s1')
    let up = 0
    let down = 0
    for (let c of info){
        if(c === '('){
            up ++
        }
    };
    console.timeEnd('s1')
    console.log(up-(info.length-up))
}


const first_minus = (info)=>{
    console.time('s2')
    let up = 0
    for (let i = 0; i<info.length; i++){
        if (info[i] === '('){
            up ++  
        }else{
            up --
            if (up === -1){
                console.timeEnd('s2')
                console.log(i +1)
                return true
            }
        }
    }
}

count_floor(info)
first_minus(info)