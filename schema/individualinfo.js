import mongoose from "mongoose";

var bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    travelsid: {
        type: String,
        required: true,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking