const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt, email } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                return resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city, phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })
                if (createdOrder) {
                    try {
                        const userOrders = await Order.find({ user: user, isPaid: true });
                        let totalSpent = 0;
                        userOrders.forEach(o => totalSpent += o.totalPrice);
                        let memberLevel = 'Đồng';
                        if (totalSpent >= 100000000) memberLevel = 'Kim cương';
                        else if (totalSpent >= 50000000) memberLevel = 'Vàng';
                        else if (totalSpent >= 20000000) memberLevel = 'Bạc';
                        await User.findByIdAndUpdate(user, { memberLevel });
                    } catch (e) {
                        console.log('Error updating member level:', e)
                    }

                    try {
                        await EmailService.sendEmailCreateOrder(email, orderItems)
                    } catch (e) {
                        console.log('Error sending email:', e)
                    }
                    return resolve({
                        status: 'OK',
                        message: 'SUCCESS'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cancelledOrder = null
            const promises = data.map(async (item) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        selled: { $gte: item.amount }
                    },
                    {
                        $inc: {
                            countInStock: +item.amount,
                            selled: -item.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    cancelledOrder = await Order.findByIdAndDelete(id)
                    if (cancelledOrder === null) {
                        return resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'ERR',
                        id: item.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const failedItem = results && results.find(r => r && r.id)

            if (failedItem) {
                return resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${failedItem.id} khong ton tai`
                })
            }
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: cancelledOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            return resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder
}