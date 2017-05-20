/**
 * @author William Westgroves
 * Utility class for getting user identity from Magento and Katana...
 */
var getIdentityFromKatana = {

	/**
	 * Get JSON from Katana
	 * 
	 */

	getIdentityFromKatana : function _getIdentityFromKatana(un, pw) {

		var xhr = Titanium.Network.createHTTPClient();
		xhr.setTimeout(5000);
		var url = Alloy.Globals.KatanaPathURL + "customerEntity/v1.0/get";
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader('charset', 'utf-8');

		xhr.onload = function() {
			var status;
			var data;

			if (xhr.readyState == 4) {// `DONE`
				status = xhr.status;
				if (status == 200) {
					Ti.API.info('Status 200:' );
					Ti.API.info('xhr.responseText:' + xhr.responseText);
					Ti.App.fireEvent("app.loadEntity", {
						"responseText" : xhr.responseText
					});
				} else {
					
					Ti.API.info('xhr.responseText:' + status);
					var freindlyError = '{"message": "Failed attempt"}';
					Ti.App.fireEvent("app.entityError", {
						"responseText" : freindlyError
					});
				}
			}
		};
		var sendString = '{\"username\" : \"' + un + '\",\"password\" : \"' + pw + '\"}';
		Ti.API.info('xhr.sendString:' + sendString);
		xhr.send(sendString);
		if (Alloy.Globals.entityFromKatanaAutenticated === true) {
			return true;
		} else {
			return false;
		};

	}
	/**
	 * End Get JSON from Katana
	 */

};

Ti.App.addEventListener("app.loadEntity", function(data) {
	Alloy.Globals.katanaContacted = true;
	Ti.API.info('Event listner fired katanaEntity set to : ' + Alloy.Globals.katanaContacted);
	Alloy.Globals.userIdentityFromKatana  = "";
	Alloy.Globals.katanaAPIServiceRunning = true;
	Alloy.Globals.userIdentityFromKatana  = data.responseText;
	if (data.responseText.search('Login failed') === -1){
		Alloy.Globals.entityFromKatanaAutenticated  = true;
		var wld = require('logLocalData');
		wld.logLocalData(data.responseText, 'userIdentity');
	}
});

Ti.App.addEventListener("app.entityError", function(data) {
	Alloy.Globals.katanaContacted = false;
	Ti.API.info('Event listner fired katanaContacted Error set to : ' + Alloy.Globals.katanaContacted);
	Alloy.Globals.userIdentityFromKatana = "";
	Alloy.Globals.katanaAPIServiceRunning = false;
	Alloy.Globals.userIdentityFromKatana = data.responseText;
	Ti.API.info('Event listner fired: ' + Alloy.Globals.katanaContacts);

});

module.exports = getIdentityFromKatana;

