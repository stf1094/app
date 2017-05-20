// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var activityIndicator = Ti.UI.createActivityIndicator({
	color : 'orange',
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : 26,
		fontWeight : 'bold'
	},
	message : '',
	style : Ti.UI.ActivityIndicatorStyle.DARK,
	top : '48%',
	left : '50%',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE
});

function init() {

}

function ZZretrieveUserIdentity() {
	Ti.App.fireEvent("app.checkScreen", {});
}

function retrieveUserIdentity() {

	var un = $.txtUsername.getValue();
	var pw = $.txtPassword.getValue();

	if (un.length === 0) {
		$.txtUsername.hintText = 'Enter a valid username.';
		$.txtUsername.borderColor = "#ff1e12";
		$.btnSignIn.enabled = "true";
		return;
	} else if (pw.length === 0) {
		$.txtPassword.hintText = 'Enter a valid password.';
		$.txtPassword.borderColor = "#ff1e12";
		$.btnSignIn.enabled = "true";
		return;
	}
	if (Alloy.Globals.loginCount < 2) {
		Ti.App.fireEvent("app.getIDFromKatana", {});
	}
	Alloy.Globals.loginCount = Alloy.Globals.loginCount + 1;
	if ((Alloy.Globals.entityFromKatanaAutenticated === false) && (Alloy.Globals.loginCount > 2)) {
		//$.txtPassword.value = '';
		//$.txtPassword.value = '';
		Alloy.Globals.loginCount = 0;
		alert('Login attempt failed');
	} else {
		//You need to sign up.

		var cud = require('getUserIdenity');
		if (cud.getUserIdenity() === true) {
			Ti.App.fireEvent("app.checkScreen", {});

		}

	}
	$.btnSignIn.enabled = "true";

}

function signIn() {
	$.btnSignIn.enabled = "false";
	Ti.App.fireEvent("app.signIn", {});

}

Ti.App.addEventListener('app.openNetNinja', function(e) {
	Ti.Platform.openURL(e.url);
});

Ti.App.addEventListener('app.vistUs', function(e) {
	Ti.Platform.openURL(e.url);
});

Ti.App.addEventListener('app.signIn', function(e) {
	setTimeout(function() {
		retrieveUserIdentity();
	}, 1600);
});

Ti.App.addEventListener('app.checkScreen', function(e) {

	if (Alloy.Globals.osname === 'iphone') {

		var dbView = Alloy.createController("pleaseWait");
		dbView.getView().open();

	} else {
		Alloy.Globals.Navigator.open("dashboard", {
			restrictToFavorites : false,
			title : "Dashboard",
			displayHomeAsUp : false
		});
	}

});

Ti.App.addEventListener('app.getIDFromKatana', function(e) {
	$.Window_1.add(activityIndicator);
	activityIndicator.show();
	Ti.App.fireEvent("app.signIn", {});
	var gidfk = require('getIdentityFromKatana');
	var un = $.txtUsername.getValue();
	var pw = $.txtPassword.getValue();

	if (gidfk.getIdentityFromKatana(un, pw) === true) {
		Ti.App.fireEvent("app.checkScreen", {});
		var cud = require('getUserIdenity');
		//The data should be in the local file now.
		if (cud.getUserIdenity() === true) {
			//alert('Go to DBoard after Katana call Counter:' +  Alloy.Globals.loginCount);
			var dbView = Alloy.createController("pleaseWait");
			dbView.getView().open();
		}
	}
	setTimeout(function() {
		activityIndicator.hide();

	}, 6000);
});

function signUp() {
	var btnSignUp = $.btnSignUp;

	Ti.App.fireEvent("app.openNetNinja", {
		"url" : "https://thenetworkninjas.co/customer/account/create/"
	});

}

function onInitLoad() {
	if (Alloy.Globals.entityFromKatanaAutenticated === true) {
		//Check the userIdentity/ Chew that cud.
		var cud = require('getUserIdenity');
		if (cud.getUserIdenity() === true) {
			Ti.App.fireEvent("app.checkScreen", {});
		}
	}
}

init();

