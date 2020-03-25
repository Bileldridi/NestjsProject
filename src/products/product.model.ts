import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
title: { type: String},
description: { type: String},
price: { type: Number}
});


