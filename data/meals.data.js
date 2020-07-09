const database = require('../database');

const MEALS = [
    {
        title: 'Spaghetti and Turkey',
        imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8YbEiYxnJBOvfzqr5-cvkAlgg9NCQIOn3nb13wR9dBxUS1gYK7tpF7OGgSyb8-xQg6xVpZkaCLeAdhoINxyQDLVwSAaoBjAJbOHrHgj6ypTQuxAEPwAfnTb3tGQxQOkAjUaZ0pR3iw9p-55E3XNWmqXzwHO8sB8SB3ZiUd2Pz6r0BU4njuBWmaD3l4LYnBOzyjqhj1lzisdL-cRzdicQ6e0bIDVi_EouH2m5ntQy312zHhcxwy9iTQIBwcbXPYhcRX-N-PEHgah6aMQCgYfOEY0DkMSB4FpbNc-Hv9poM9b6SBjZLMOrxWYf0jU054n0TUwFyQwPXtNW_BPDghXGoDn-9Jyh9jCLir1wTxFlY825EnNDfGVuBwz_E4eO0oVes9PFCaSSUwCEq5a0BHrC7gu2nykyZDOSanUcGjpekpQXBxNcrQ2HBygpPaPyd271Wrb11Ng&usqp=CAU',
        price: 1200,
        description: "Nice spagetti with turkey. Spagetti prepared personally by oshioke so you know it's great. Turkey by Ifeoluwa so you know it's divine",
        categories: ['c4'],
        readytime: 955,
    },
    {
        title: 'Jollof rice and Beef',
        imageurl: 'https://elleyajoku.com/wp-content/uploads/2017/10/jollof-rice-cooking-500x490.jpg',
        price: 1200,
        description: "Delicious jollof rice (naija) with Fish. Jollof prepared personally by oshioke so you know it's great. Beef by Ifeoluwa so you know it's divine",
        categories: ['c4'],
        readytime: 2155,
    },
    {
        title: 'Yam porridge with Fish',
        imageurl: 'https://www.africanahome.ae/store/wp-content/uploads/2017/12/2-2000x1324.jpg',
        price: 1200,
        description: "Yam porridge mad die. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c4'],
        readytime: 955,
    },
    {
        title: 'Chicken and Chips',
        imageurl: "https://i.pinimg.com/736x/75/14/d2/7514d211c99873ebdff41a1d9dd8f8ed.jpg",
        price: 1200,
        description: "Chicken and chips. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c1', 'c3'],
        readytime: 315,
    },
    {
        title: 'Beef Shawarma',
        imageurl: "https://media-cdn.tripadvisor.com/media/photo-s/0e/04/16/1c/1754-beef-shawarma.jpg",
        price: 1500,
        description: "Beef Shawarma. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c1'],
        readytime: 375,
    },
    {
        title: 'Chief Burger',
        imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5ZUuOdRiD-rF6C6gRvhLlvr0ZfLl51nEdNrrYJ4lUJ-FRez2T&usqp=CAU",
        price: 1200,
        description: "Burger. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c1'],
        readytime: 955
    },
    {
         
        title: 'Coke',
        imageurl: 'https://zdnet4.cbsistatic.com/hub/i/2020/06/09/2eacd230-d144-4224-9e64-aa012e900877/coca-cola-coke-coca-cola.jpg',
        price: 150,
        description: "Coke. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c2'],
        readytime: 1,
    },
    {
         
        title: 'Chi Exotic',
        imageurl: 'https://i1.wp.com/christystores.com/wp-content/uploads/2018/05/cr-chi-exotic-pineapple-juice-1l-1.jpg?fit=1200%2C1200&ssl=1',
        price: 1000,
        description: "Chi-exotic. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c2'],
        readytime: 955,
    },
    {
         
        title: '5 Alive Berry Blast Fruit Drink',
        imageurl: "https://kadunasolutions.com/wp-content/uploads/2020/03/5-Alive-Berry-Blast-Fruit-Drink-78cl-x-12.jpg",
        price: 800,
        description: "Berry blast. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c2'],
        readytime: 955,
    },
    {
        
        title: 'Fried Plantain Frittata',
        imageurl: "https://guardian.ng/wp-content/uploads/2017/11/Fried-Plantain-Frittata-2-e1510306800913.jpg",
        price: 1000,
        description: "Fried Plantain. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c3'],
        readytime: 955,
    },
    {
        
        title: 'Akara balls and pap.',
        imageurl: "https://travel.jumia.com/blog/ng/wp-content/uploads/2016/06/Akara-bean-cake.jpg",
        price: 800,
        description: "Akara's balls. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c3'],
        readytime:  895
    },
    {
         
        title: 'Salad Sandwich and Coffee',
        imageurl: "https://3.bp.blogspot.com/-9WmC4LbMs8U/VemdJRgN0-I/AAAAAAAAESo/ZwpBFxgXiEk/s1600/Nigerian%2Bsandwich%2Bsalad%2Bsandwich%2B2.jpg",
        price: 1000,
        description: "Sandwich. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c3'],
        readytime: 895
    },
    {
        title: 'Cupcakes',
        imageurl: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        price: 500,
        description: "Cupcakes. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c1'],
        readytime: 895
    },
    {
        title: 'Noodles with Boiled Egg and Beef',
        imageurl: "https://lh3.googleusercontent.com/proxy/0gTd8aTE2PUlBAW3vljwf6rgxukvLfh0qFpWmLxJLqvlaEu0uD5qfwWKNDW_XR3TpPuBG8z7augBPHeRVOnfnAUHV2ynKzJEMWKeo9pGdlcv0S8dE5khRL6FJ8PN",
        price: 950,
        description: ". Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        categories: ['c3', 'c4'],
        readytime: 895
    }
]

database.insert(...MEALS).into('meals');
module.exports = MEALS;