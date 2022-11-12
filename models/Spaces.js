import mongoose from "mongoose";
const Schema = mongoose.Schema



const SpaceSchema = new Schema({
    name: String,
    address: String,
    pricePerNight: Number,
    isOccupied: Boolean,
    imageUrl: String,
    rating: Number
})

const Space = mongoose.model('Space', SpaceSchema)
export default Space;
