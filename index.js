import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Flight from "./schema/flightinfo.js"
import Booking from "./schema/individualinfo.js"
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express()

app.use(cors())
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({ extended: true }));

const connection_url = "mongodb+srv://aeroplane:aeroplane@cluster0.fiinm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const port           = process.env.PORT || 5000

//routes//////////////////////////////////////////////////////////
app.post("/postflightinfo",async(req,res)=>{
    const flightName = req.body.flightName
    const fromLocation = req.body.fromLocation
    const toLocation = req.body.toLocation
    const date = req.body.date
    const fare = req.body.fare
    const Fli = new Flight({name:flightName,from:fromLocation,to:toLocation,date:date,fare:fare})
    try{
        await Fli.save()
    }catch(err){
        console.log(err)
    } 
    res.send("hi")
})

app.put("/updateflightinfo",async(req,res)=>{
    const id = req.body.id
    const editted = {
        name: req.body.flightName,
        from: req.body.fromLocation, 
        to: req.body.toLocation,
        date: req.body.date,
        fare: req.body.fare,
    }
    try{
        await Flight.updateOne({_id:id},editted)
        res.json(editted)
    }catch(err){ 
        console.log(err)
    } 
})
app.get("/getallflightsinfo",(req,res)=>{
    Flight.find({},(err,result)=>{
        if(err){
            res.send(err) 
        }
        res.send(result)
    })
})

app.get('/getparticularflight/:id', function(req,res) {
    Flight.findById(req.params.id,function(err,doc) {
        res.send(doc);
    });
});

app.delete("/deleteparticularflight/:id",async (req,res)=>{
    await Flight.findByIdAndRemove(req.params.id).exec()
    res.send("deleted")
}) 
//routes for booking ////////////////////////////////////////////
app.post("/postbookinginfo",async(req,res)=>{
    const name = req.body.name
    const password = req.body.password
    const travelsid = req.body.flightid
    
    const book = new Booking({name:name,password:password,travelsid:travelsid})
    try{
        await book.save()
    }catch(err){
        console.log(err)
    } 
    res.send("hi")
})


app.get("/getallbookingsinfo",(req,res)=>{
    Booking.find({},(err,result)=>{
        if(err){
            res.send(err) 
        }
        res.send(result)
    })
})

app.delete("/deleteparticularbooking/:id",async (req,res)=>{
    await Booking.findByIdAndRemove(req.params.id).exec()
    res.send("deleted")
}) 
//routes//////////////////////////////////////////////////////////
mongoose.connect(connection_url)
    .then(()=>app.listen(port,()=>console.log(`server running on port ${port}`)))
    .catch((error)=>console.log(error.message))