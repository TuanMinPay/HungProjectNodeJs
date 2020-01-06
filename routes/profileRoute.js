var profileController = require('../controllers/profileController');

module.exports = function(app){
	app.route('/_api/v1/profile')
        .get(profileController.getDetail)
        .post(profileController.addProfile)
		.put(profileController.update)
		.delete(profileController.delete);
}