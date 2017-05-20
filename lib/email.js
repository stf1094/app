/**
 * @author William Westgroves
 */
var email = {
	emailContacts : function _emailContacts(sendString) {
		Ti.API.info('---------Send Email-----------');
		var sendgrid = require('tisendgrid')('wwestgroves', 'N0t4uris!');
		sendgrid.send({
			to : 'w.westgroves@alvariumsystems.com',
			from : 'williamwestgroves@gmail.com',
			subject : 'Contact debug for: ' + Alloy.Globals.AccountHolderName,
			text : sendString//jsonString //JSON.stringify(array)
		}, function(e) {
			if (e) {
				console.log(e);
				// Email wasn't sent
			}
		});
	}
};

module.exports = email;
