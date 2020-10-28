const mongoose = require('mongoose')
const model = require('../db/models/schema')

async function getUserData(id){
	/*get user data
	according to thei userID */

	return 0 
}

async function createNewUser(obj) {
	const newUser = model.user(obj);
	await newUser.save()
	.then(() => {
		console.log('success ' + result)	
	}).catch((err) => {
		console.log(err)
	})
	return 0
};

async function createNewExpense(obj){
	const newExpense = model.expense(obj);
	await newExpense.save()
	.then(() => {
		console.log('success')
	}).catch((err) => {
		console.log('something went wrong')		
	}) 
	return 0
};

