const itemRoutes = require('express').Router();
const { ItemController } = require('../controllers');
const multer = require('../helpers/multer');
const { auth } = require('../middleware/auth');

itemRoutes.get('/', ItemController.getData);
itemRoutes.post('/filter', ItemController.filter);
itemRoutes.post('/', auth, multer.single('gambar'), ItemController.create);
itemRoutes.put('/:id', auth, multer.single('gambar'), ItemController.update); //post diganti put
itemRoutes.delete('/:id', ItemController.delete); //get di ganti delete
itemRoutes.get('/:id', ItemController.getInformation);

module.exports = itemRoutes;
