import mongoose from "mongoose";

var flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    fare: {
        type: Number,
        required: true, 
    },
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight