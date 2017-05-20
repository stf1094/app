// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function addContacts() {

	if ($.txtcontactsNumber.value === '') {
		alert('Please enter a number.');
		return;
	} else {

		var margs = require('manageArgs');
		args = margs.manageArgs('contactsNumber', $.txtcontactsNumber.value, args);
		args = margs.manageArgs('startDate', '', args);
		margs = null;
		Alloy.Globals.Navigator.open("add-contacts", args);
	}

}

//$.txtcontactsNumber.addEventListener('change', function(e) {
//	$.txtcontactsNumber.value = $.txtcontactsNumber.value.replace(/[^0-9]+/, "");
//});

	