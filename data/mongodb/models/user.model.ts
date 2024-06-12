import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'Email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password es requerido']
    },
    img: {
        type: String
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    }
})

export const UserModel = mongoose.model('User', userSchema)
