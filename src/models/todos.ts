import mongoose from "mongoose";
const schema = mongoose.Schema;

const todoSchema = new schema({
    title: String,
    description: String,
    status: Boolean,
})

export default mongoose.model('Todos', todoSchema)