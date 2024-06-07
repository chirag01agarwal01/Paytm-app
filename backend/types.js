const express = require('express');
const zod = require('zod');

const user = zod.object({
    username : zod.string().email().min(6).max(30),
    password : zod.string().min(6),
    firstName :  zod.string().max(50),
    lastName :  zod.string().max(50)
})
const signin = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
module.exports = {
    user : user,
    signin : signin,
    updateBody : updateBody
}