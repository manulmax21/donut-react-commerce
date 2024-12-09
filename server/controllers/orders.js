const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
async function pUrlImg(p) {
    const productIds = JSON.parse(p.products);
    const firstProductId = productIds[0];

    const product = await prisma.product.findUnique({
        where: { id: firstProductId }
    });

    return `${process.env.LINK_SERVER}/uploads/${product.filename}`;
}

/**
 * @route GET /api/orders/:id
 * @desc Заказы
 * @access Public
 */
const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await prisma.orders.findMany({
            where: { userId: id }
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Заказы не найдены' });
        }

        const ordersWithImages = await Promise.all(orders.map(async (p) => ({
            ...p,
            imageUrl: await pUrlImg(p),
            productParse: JSON.parse(p.products)
        })));

        res.status(200).json(ordersWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так', error: error.message });
    }
};
/**
 *
 * @route POST /api/order/add
 * @desc Добавление нового заказа
 * @access Public
 */
const addOrder = async (req, res) => {
    try {
        const { data_start, data_end, phone, status, userId, products } = req.body;

        if (!data_start || !data_end || !phone || !userId || !products) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
        }
        console.log(req.body)
        const order = await prisma.orders.create({
            data: {
                data_start,
                data_end,
                phone,
                status,
                userId,
                products,
                img: "photo"
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};
/**
 * @route DELETE /api/order/:id
 * @desc Удаление заказа по ID
 * @access Public
 */
const removeOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const orderItem = await prisma.orders.findUnique({
            where: { id }
        });

        if (!orderItem) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        await prisma.orders.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Заказ удалён' });
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error); // Логируем ошибку для отладки
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};
module.exports = {
    getOrder,
    removeOrder,
    addOrder
}