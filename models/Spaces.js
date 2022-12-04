import mongoose from "mongoose";
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const SpaceSchema = new Schema({
    name: String,
    roomNumber: Number,
    address: String,
    isOccupied: Boolean,
    pricePerNight: Number,
    image: [ImageSchema],
    rating: {
        type: Number,
        default: 0
    }

})

const Space = mongoose.model('Space', SpaceSchema)
export default Space;
