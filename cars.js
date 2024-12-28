 const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//mongodb+srv://rishivasan:<db_password>@nodeexp.colby.mongodb.net/?retryWrites=true&w=majority&appName=nodeexp

const mongoose = require('mongoose');
try {
mongoose.connect('mongodb+srv://rishivasan:EEaIGzftx7C7vARa@nodeexp.colby.mongodb.net/?retryWrites=true&w=majority&appName=nodeexp');
} catch(err){
    console.error('unable to connect to mongoose ',err)
}

const Car = mongoose.model('Car', {name:String,color:String, year:Number });


app.get('/cars',async(req,res)=> {
        const car = await Car.find()
        res.json(car)

})

app.post('/cars',async(req,res)=>{
    const body = req.body
    const car = await Car.create({name:body.name, color:body.color, year:body.year })
    res.json(car)
})


app.delete('/cars/:id', async(req,res)=>{

const sui = await Car.deleteOne({_id:req.params.id})
res.json(sui)
})
















app.listen(3000)