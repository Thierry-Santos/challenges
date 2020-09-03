const { Router } = require('express');
const HerosController = require('./app/Controllers/api/v1/HerosController');
const OccurrencesController = require('./app/Controllers/api/v1/OccurrencesController');
const UsersController = require('./app/Controllers/api/v1/UsersController');
const AuthController = require('./app/Controllers/api/v1/AuthController');

const EnsureAuthenticated = require('./app/Middlewares/EnsureAuthenticated');

const router = Router();

router.post('/auth', AuthController.authenticate);

router.post('/users', UsersController.create);
router.put('/users', EnsureAuthenticated, UsersController.update);

router.get('/heros', EnsureAuthenticated, HerosController.index);
router.get('/heros/:id', EnsureAuthenticated, HerosController.show);
router.post('/heros', EnsureAuthenticated, HerosController.create);
router.put('/heros/:id', EnsureAuthenticated, HerosController.update);
router.delete('/heros/:id', EnsureAuthenticated, HerosController.delete);

router.get('/occurrences', EnsureAuthenticated, OccurrencesController.index);
router.get('/occurrences/:id', EnsureAuthenticated, OccurrencesController.show);
router.post('/occurrences', EnsureAuthenticated, OccurrencesController.create);
router.put('/occurrences/:id', EnsureAuthenticated, OccurrencesController.update);
router.delete('/occurrences/:id', EnsureAuthenticated, OccurrencesController.delete);

router.put('/hero_occurrences/:id', EnsureAuthenticated, OccurrencesController.checkHeroOccurrence);

module.exports = router;