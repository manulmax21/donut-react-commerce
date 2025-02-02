const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'Пожалуйста, заполните обязятельные поля' })
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });
  
    const isPasswordCorrect = user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * 
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if(!email || !password || !name) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
    }
  
    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
  
    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь, с таким email уже существует' })
    }
  
    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        email,
        role: "def",
        name,
        password: hashedPassord
      }
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}
/**
 *
 * @route PUT /api/user/update-name
 * @desc Изменение имени пользователя
 * @access Private
 */
const updateName = async (req, res) => {
  try {
    const { name, userId } = req.body;
    //const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: 'Пожалуйста, укажите новое имя' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name }
    });

    return res.status(200).json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
/**
 *
 * @route PUT /api/user/update-password
 * @desc Изменение пароля пользователя
 * @access Private
 */
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId } = req.body;
    //const userId = req.user.id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !(await brypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ message: 'Неверный старый пароль' });
    }

    const salt = await brypt.genSalt(10);
    const hashedNewPassword = await brypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    return res.status(200).json({ message: 'Пароль успешно изменён' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = {
  login,
  register,
  updateName,
  updatePassword,
  current
}