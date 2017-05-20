/**
 * @author William Westgroves
 * Utility class for managing data to and from Facebook.
 */
var fb = require('facebook');
var getMyFacebook = {

	/**
	 * Get JSON from Facebook
	 */

	callFaceBook : function _callFacebook() {

		fb.refreshPermissionsFromServer();
		fb.permissions = ['email', 'user_events', 'user_friends'];
		fb.appid = '221673248245127';
		fb.accessToken;
		fb.initialize();
		fb.authorize();
		fb.forceDialogAuth = true;

		Ti.App.fireEvent("app.loginFacebook", {});
	    Ti.App.fireEvent("app.getFacebookContacts", {});
	}
	/**
	 * End Get JSON from Facebook
	 */

};

Ti.App.addEventListener("app.loginFacebook", function(data) {
	fb.addEventListener('login', function(e) {
		if (e.success) {
			alert('Logged in');
		}

	});

	Alloy.Globals.faceBookContacted = true;
	Ti.API.info('Event listner fired loginFacebook set to : ' + Alloy.Globals.faceBookContacted);


});

Ti.App.addEventListener("app.getFacebookContacts", function(data) {
	fb.requestWithGraphPath('me', {
		"fields" : "id,name,email,friends{first_name,last_name}"
	}, 'GET', function(e) {

		if (e.success) {
			Alloy.Globals.faceBookContacts = e.result;
			getFBUserID(e.result);
		} else if (e.error) {
			alert(e.error);
		} else {
			alert('Unknown response');
		}
	});


	Ti.API.info('Event listner fired: getFacebookContacts');

});

module.exports = getMyFacebook;


function getFBUserID (fbInputString){
	var fbJSON = JSON.stringify(fbInputString);
	fbStuff = JSON.parse(fbJSON);
	Ti.API.info("getFacebook.JSON: " + fbInputString);
	Ti.API.info("getFacebook.getFBUserID: " + fbStuff.id + "|" + fbStuff.name);
	Alloy.Globals.FBUserID = fbStuff.id;
	Alloy.Globals.FBUserName = fbStuff.name;
	fbJSON = null;
}
