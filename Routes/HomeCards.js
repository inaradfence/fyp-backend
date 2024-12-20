const express = require('express');
const router = express.Router();
const HomeCards = require('../Controllers/HomeCards');

router.post('/api/createCards', HomeCards.createCard);

router.get('/api/getCards', HomeCards.getCards);
router.get('/api/all-Cards', HomeCards.getCardsJson);  //Frontend

router.get('/api/cards/:id', HomeCards.getCardById);

router.post('/update-card/:id', HomeCards.updateCard);

router.get('/deletecard/:id', HomeCards.deleteCard);

module.exports = router;
