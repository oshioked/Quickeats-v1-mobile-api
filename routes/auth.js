const express = require('express');
const router = express.Router();
const {registerValidate, loginValidate} = require('../validation');
const database = require('../database');
const bcrypt = require('bcrypt-nodejs');


router.post('/register', async (req, res) =>{
    const {fullName, email, phoneNumber, password} = req.body;

    // VALIDATE DATA (USE MIDDLEWARE LATER)
    const error = registerValidate(req.body);
    if(error){
        res.status(400).json(error);
        return;
    }

    // CHECK IF USER ALREADY EXISTS
    const emailExist  = await database.select('*').from('users').where('email', email.toLowerCase());
    const phoneNumberExist = await database.select('*').from('users').where('phonenumber', phoneNumber);

    if(emailExist.length != 0){
        res.status(400).json('Email already exists');
        return;
    };
    if(phoneNumberExist.length != 0){
        res.status(400).json('Phone number already exists');
        return;
    };
    
    // HASHPASSWORD
    const hashedPassword = await bcrypt.hashSync(password);
    console.log(hashedPassword)
    
    // CREATE A NEW USER
    try {
        const user = await database('users').returning('*').insert({
            fullname: fullName, 
            email: email.toLowerCase(), 
            phonenumber: phoneNumber, 
            bonusprogress: 0.3,
            joined: new Date(),
            password:  hashedPassword
        });

        const userId = user[0].userid;
        const userPendingOrders = await database.select('*').from('orders').where({userid: userId, status: 'pending'});
        const orderItems = userPendingOrders.map(order => order.items)
        const orderItemsId = orderItems.flat(2).map(items => items.itemId);
        const orderItemsTitle = await database.select('id', 'title').from('meals').whereIn('id', orderItemsId);

         // SEND USER DATA 
         res.status(200).json({
            userid: user[0].userid,
            fullname: user[0].fullname,
            email: user[0].email,
            profileImage: user[0].imageurl,
            phonenumber: user[0].phonenumber,
            bonusprogress: user[0].bonusprogress,
            address: user[0].address,
            favoritemeals: user[0].favoritemeals, 
            orders: userPendingOrders.map(order => ({
                ...order, 
                items: order.items.map(item => ({
                    itemId: item.itemId,
                    itemQty: item.itemQty,
                    amount: item.amount, 
                    itemTitle: orderItemsTitle.find(itm => (itm.id === item.itemId)).title,
                }))
            }))
        })
    } catch (error) {
        console.log(error)
        res.status(400).json('Error registering user')
    }
})


router.post('/login', async (req, res) =>{
    const {email, password} = req.body;

    // VALIDATION OF INPUT.
    const error = loginValidate(req.body);
    if(error){
        res.status(400).json(error);
        return;
    }

    // GET USER DATA
    try {
        const user = await database.select('*').from('users').where({email: email.toLowerCase()});
        if(user.length === 0){
            res.status(400).json('Wrong credentials');
            return;
        }
        
        // COMPARE THE USER PASSWORD AND PROVIDED PASSWORD
        const isPasswordValid = bcrypt.compareSync(password, user[0].password);
        if(!isPasswordValid){
            res.status(400).json("Invalid credentials");
            return;
        }

        const userId = user[0].userid;
        const userPendingOrders = await database.select('*').from('orders').where({userid: userId, status: 'pending'});
        const orderItems = userPendingOrders.map(order => order.items)
        const orderItemsId = orderItems.flat(2).map(items => items.itemId);
        const orderItemsTitle = await database.select('id', 'title').from('meals').whereIn('id', orderItemsId);
        
        // SEND USER DATA 
        res.status(200).json({
            userid: user[0].userid,
            fullname: user[0].fullname,
            email: user[0].email,
            profileImage: user[0].imageurl,
            phonenumber: user[0].phonenumber,
            bonusprogress: user[0].bonusprogress,
            address: user[0].address,
            favoritemeals: user[0].favoritemeals, 
            orders: userPendingOrders.map(order => ({
                ...order, 
                items: order.items.map(item => ({
                    itemId: item.itemId,
                    itemQty: item.itemQty,
                    amount: item.amount, 
                    itemTitle: orderItemsTitle.find(itm => (itm.id === item.itemId)).title,
                }))
            }))
        })
        console.log(user)
        
    } catch (error) {
        console.log(error)
        res.status(400).json("Error logging in.");
        return;
    }
})

module.exports = router;

