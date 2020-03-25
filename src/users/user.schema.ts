import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
email: { 
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
password: { 
    type: String,
    required: true
},
products: [{
    type: mongoose.Schema.Types.ObjectId
}]
});