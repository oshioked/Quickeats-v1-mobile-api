const orders = [
    {
        id: 'o1',
        items: [{itemId: 'm1', itemQty: 3, amount: 2000}, {itemId: 'm8', itemQty: 1, amount: 2000}, {itemId: 'm2', itemQty: 2, amount: 2000}],
        userId: 'u1',
        status: 'pending',
        date: new Date(),
        totalAmount: 4000
    },
    {
        id: 'o2',
        items: [{itemId: 'm1', itemQty: 1, amount: 2000}, {itemId: 'm8', itemQty: 1, amount: 2000}, {itemId: 'm2', itemQty: 1, amount: 2000}],
        userId: 'u1',
        status: 'pending',
        date: new Date(),
        totalAmount: 4000
    },
    {
        id: 'o3',
        items: [{itemId: 'm10', itemQty: 3, amount: 2000}, {itemId: 'm3', itemQty: 1, amount: 2000}, {itemId: 'm1', itemQty: 2, amount: 2000}],
        userId: 'u1',
        status: 'pending',
        date: new Date(),
        totalAmount: 4000
    },
    {
        id: 'o4',
        items: [{itemId: 'm1', itemQty: 3, amount: 2000}, {itemId: 'm10', itemQty: 1, amount: 2000}, {itemId: 'm2', itemQty: 2, amount: 2000}],
        userId: 'u1',
        status: 'pending',
        date: new Date(),
        totalAmount: 4000
    },
    {
        id: 'o5',
        items: [{itemId: 'm1', itemQty: 3, amount: 2000}, {itemId: 'm11', itemQty: 1, amount: 2000}, {itemId: 'm2', itemQty: 2, amount: 2000}],
        userId: 'u1',
        status: 'pending',
        date: new Date(),
        totalAmount: 4000
    }
]

module.exports = orders;