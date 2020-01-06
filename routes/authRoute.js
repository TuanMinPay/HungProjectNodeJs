var authController = require('../controllers/authController');

module.exports = function(app){
	app.route('/_api/v1/auth')
        .get(authController.getDetail)
        .post(authController.addMember)
		.put(authController.update)
		.delete(authController.delete);
}