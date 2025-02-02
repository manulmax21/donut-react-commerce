const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

/**
 * @route GET /api/products
 * @desс Товары
 * @access Public
 */
const getAll = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        if (products) {
            res.status(200).json(Object.values(products).map(p => ({
                ...p,
                   imageUrl: `${process.env.LINK_SERVER}/uploads/${p.filename}`
            })))
        }
    } catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}
/**
 * @route GET /api/products/:id
 * @desс Получение товара по id
 * @access Public
 */
const getOneProduct = async (req, res) => {
    const {id} = req.params

    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        res.status(200).json({...product, imageUrl: `${process.env.LINK_SERVER}/uploads/${product.filename}`})
    } catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}
/**
 * @route GET /api/products/page/:page
 * @desс Получение страницы по номеру
 * @access Public
 */
const getPageProduct = async (req, res) => {
    const page = parseInt(req.params.page) || 1
    const limit = parseInt(req.params.limit) || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    try {
        const products = await prisma.product.findMany();
        const paginatedProducts = products.slice(startIndex, endIndex)

        res.status(200).json({
            totalItems: products.length,
            currentPage: page,
            totalPages: Math.ceil(products.length / limit),
            products: Object.values(paginatedProducts).map(p => ({
                ...p,
                imageUrl: `${process.env.LINK_SERVER}/uploads/${p.filename}`
            }))
        })
    } catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}
/**
 *
 * @route POST /api/products/add
 * @desc Добавление product
 * @access Public
 */
const addProduct = async (req, res) => {

    try {
        let { name, category, price, count, desc } = req.body;
        let filename = req.file ? req.file.filename : '';

        if (!category || !price || !name) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
        }
        if (!count) {
            count = 0
        }
        if (!desc) {
            count = name
        }


        const product = await prisma.product.create({
            data: {
                name,
                price,
                desc,
                category,
                count,
                filename
            }
        });

        const secret = process.env.JWT_SECRET;

        if (product && secret) {
            res.status(201).json({
                id: product.id,
                name,
                price,
                desc,
                filename,
                category,
                count
            })
        } else {
            return res.status(400).json({ message: 'Не удалось создать товар' })
        }
    } catch {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}
/**
 *
 * @route POST /api/products/image
 * @desc Добавление image
 * @access Public
 */
const addImageProduct = async (req, res) => {
    if (req.file) {
        res.json({ message: 'Файл загружен успешно!', filename: req.file.filename });
    } else {
        res.status(400).json({ message: 'Ошибка загрузки файла.' });
    }
}
/**
 *
 * @route GET /api/products/upload
 * @desc Получение image
 * @access Public
 */

const getImageProduct = async (req, res) => {
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image; // Предполагаем, что поле называется 'image'
    const uploadPath = path.join(__dirname, '../uploads', image.name);

    // Перемещение файла в папку uploads
    image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        res.send({ filename: image.name }); // Возвращаем имя файла
    });
}
/**
 * @route POST /api/products/remove/:id
 * @desс Удаление товара по id
 * @access Public
 */
const removeOneProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productItem = await prisma.product.findUnique({
            where: { id }
        });

        if (!productItem) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        await prisma.product.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Товар удалён' });
    } catch (error) {
        console.error(error); // Логируем ошибку для отладки
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
}
/**
 * @route PUT /api/products/update-name
 * @desc Обновление названия товара
 * @access Public
 */
const updateName = async (req, res) => {
    const { id, name } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { name }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось обновить название товара' });
    }
};
/**
 * @route PUT /api/products/update-category
 * @desc Обновление категории товара
 * @access Public
 */
const updateCategory = async (req, res) => {
    const { id, category } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { category }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось обновить категорию товара' });
    }
};
/**
 * @route PUT /api/products/update-price
 * @desc Обновление цены товара
 * @access Public
 */
const updatePrice = async (req, res) => {
    const { id, price } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { price }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось обновить цену товара' });
    }
};
/**
 * @route PUT /api/products/update-count
 * @desc Обновление Count товара
 * @access Public
 */
const updateCount = async (req, res) => {
    const { id, count } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { count }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось обновить цену товара' });
    }
};
module.exports = {
    getAll,
    addProduct,
    getOneProduct,
    getPageProduct,
    addImageProduct,
    getImageProduct,
    removeOneProduct,
    updateName,
    updateCategory,
    updatePrice,
    updateCount
}