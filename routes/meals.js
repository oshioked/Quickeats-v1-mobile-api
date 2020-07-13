const express = require('express');
const router = express.Router();
const orders = require('../data/orders.data');
const meals = require('../data/meals.data');
const categories = require('../data/categories.data');
const database = require('../database');


router.get('/postall', async (req, res) =>{
  try {
    const response = await database('meals').insert(meals).returning('*');
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})


// GET ALL MEALS USING A SEARCH QUERY. MATCHING MEALS AND CATEGORY MEALS
router.get('/', async (req, res) =>{
  const searchQuery = req.query.searchQuery;
  try {
    const mealsMatch = await database.select('*').from('meals').where('title', 'ilike', `%${searchQuery}%`);
    res.status(200).json(mealsMatch);
  } catch (error) {
    res.status(400).json('No results');
  }
})


// GET ALL RECOMMENDED MEALS
router.get('/recommended', async (req, res) =>{
  try {
    const recommendedMeals = await database.select('*').from('meals').where('title', 'ilike', '%r%').limit(5);
    res.status(200).json(recommendedMeals);
  } catch (error) {
    res.status(400).json("Error getting recommended meals")
  }
})


// GET QUICKEST MEALS
router.get('/quickest', async (req, res) =>{
  try {
    const quickestMeals = await database.select('*').from('meals').orderBy('readytime', 'asc').limit(5);
    res.status(200).json(quickestMeals)
  } catch (error) {
    res.status(400).json('Error fetching quickest meals')
  }
})


// GET TOP ORDERED AVAILABLE MEALS IN LAST 24 HOURS
router.get('/topOrdered', async (req, res) =>{
  try {
    const recentOrdersItemsArray = await database.select('items').from('orders').where('ordered_date', '>=', new Date(Date.now() - (24 * 60 * 60 * 1000)));
    const recentOrdersItems = recentOrdersItemsArray.map((a) => a.items).flat(2);
    const allOrdersItemsIds = recentOrdersItems.flat(2).map(items => items.itemId);
    const uniqueItemsIds = [...new Set(allOrdersItemsIds)];
    let itemsAndOrders = uniqueItemsIds.map(id => {
      return {
          itemId: id, 
          itemQty: recentOrdersItems.map(item =>(
              item.itemId === id ? item.itemQty : 0
          )).reduce((a,b) => a + b)
      }
    });
    const sortedItemsAndOrders = itemsAndOrders.sort((a,b) => b.itemQty - a.itemQty);
    try {
      const topOrderedMeals = await database.select('*').from('meals').where('id', 'in', sortedItemsAndOrders.map(item => item.itemId)).limit(5)
      res.status(200).json(topOrderedMeals)
    } catch (error) {
      console.log(error)
      res.status(400).json('Error fetching most ordered meals')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json('Error fetching most ordered meals')
  }
})

// GET ALL MEALS IN A GIVEN CATEGORY
// FETCH FROM DATABASE HERE IS TERRIBLE CAUSE THERE'S NO WAY TO CHECK ARRAY COLUMNS FOR CONDITION IN DATABASE USING KNEX. SO LOOK FOR ALTERNATIVE TO KNEX.
router.get('/category/:catId', async (req, res) =>{
  try {
    const allMeals = await database.select('*').from('meals');
    let categoryMeals = allMeals.filter(meal => meal.categories.includes(req.params.catId));
    const {searchQuery} = req.query;
    if(Boolean(searchQuery)){
      categoryMeals = allMeals.filter(meal => meal.categories.includes(req.params.catId)).filter(meal => meal.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    res.status(200).json(categoryMeals);
  } catch (error) {
    
    res.status(400).json("Error getting category meals")
  }
})


// GET USER'S FAVORITE MEALS GIVEN userId
router.post('/favMeals', async (req, res)=>{
  const mealsId = req.body;
  try {
    const meals = await database.select('*').from('meals').whereIn('id', mealsId );
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json("Error fetching user's fav meals")
  }
  
})

module.exports = router;


