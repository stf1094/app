/**
 * Instantiate the variables assocaited with this controller
 */
var args = $.args;
var userJSON = '';

var androidHour = '12',
    androidMinute = '00',
    androidAMPM = 'AM';

var selectedCalendarId = "-1";

var isProjectContacts = false;

var _args = arguments[0] || {},
    Map = OS_MOBILEWEB ? Ti.Map : require('ti.map'), // Reference to the MAP API
    $FM = require('favoritesmgr');
//, SHARE_STUFF = require ('shareStuff')
// FavoritesManager helper class for managing favorites
var projectTitle = _args.projectName;

if (projectTitle.length > 0) {
	$.vwFollowup.visible = true;
}

var followupWith = '';
/**
 * Check for passed in properties of the contact, and update the
 * Label text and ImageView image values as required
 */
$.name.text = _args.firstName + " " + _args.lastName;
followupWith = _args.firstName + "." + _args.lastName;
$.company.text = _args.company;
//if (_args.followupDate === undefined) {
//	$.lblFollowupDate.text = '';
//} else {
$.lblFollowupDate.text = _args.followupDate;
//}

$.lblFollowupDate.text = _args.followupDate;

//$.phone.text = _args.phone;
//$.email.text = _args.email;
//$.im.text = _args.im || _args.firstName + "." + _args.lastName;
$.job.text = _args.jobTitle;

/**
 * Set the Map Region for the Map Module so that it is at the right zoom level
 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Modules.Map
 */
//var lat = OS_ANDROID ? _args.latitude + 0.75 : _args.latitude;
//$.mapview.setRegion({
//	latitude : lat || 30.631256,
//	longitude : _args.longitude || -97.675422,
//	latitudeDelta : 2,
//	longitudeDelta : 2,
//	zoom : 5,
//	tilt : 45
//});

/**
 * Create the Map Annotation to the latitude and longitude assigned to the user.
 */

//var mapAnnotation = Map.createAnnotation({
//	latitude : _args.latitude || 30.631256,
//	longitude : _args.longitude || -97.675422,
//	customView : Alloy.createController("annotation", {
//		image : _args.photo
//	}).getView(),
//	animate : true
//});

/**
 * Add the Map Annotation to the MapView
 */
//$.mapview.addAnnotation(mapAnnotation);

/**
 * Check that the contact is not already a favorite, and update the favorites button
 * title as required.
 */
$FM.exists(_args.id) && $.addFavoriteBtn.setTitle("- Remove From Favorites");

/**
 * MOBILEWEB : In order to override the standard button style in the Navigation Bar, we will create our own
 * view to use
 */
if (OS_MOBILEWEB) {
	var backBtn = Ti.UI.createLabel({
		text : "\uf104 Back",
		color : "#C41230",
		font : {
			fontFamily : "icomoon",
			fontSize : 20
		}
	});
	backBtn.addEventListener("click", function(e) {
		Alloy.Globals.Navigator.navGroup.close($.profile);
	});
	$.profile.leftNavButton = backBtn;
}

/**
 * Appcelerator Analytics Call
 */
Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.viewed");

/**
 * Function to Email the Contact using the native email tool
 */
function emailContact() {

	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.emailButton.clicked");

	/**
	 * Account for if the user is on iOS and using a simulator - iOS Simulator no
	 * longer supports sending email as of iOS 8
	 */
	if (OS_IOS && Ti.Platform.model === "Simulator") {
		alert("Simulator does not support sending emails. Use a device instead");
		return;
	}
	/**
	 * Create an Email Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.EmailDialog
	 */
	var emailDialog = Ti.UI.createEmailDialog();

	/**
	 * Setup the Email Dialog information, in this case just the recipients field
	 */
	emailDialog.toRecipients = [_args.email];

	/**
	 * Once we have created and setup the Email Dialog, lets open the view
	 */
	emailDialog.open();
};

/**
 * Function to quickly call the contact from the Profile Screen
 */
function callContact() {

	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.callContactButton.clicked");

	/**
	 * Before we send the phone number to the platform for handling, lets first verify
	 * with the user they meant to call the contact with an Alert Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.AlertDialog
	 */
	var dialog = Ti.UI.createAlertDialog({
		cancel : 0,
		buttonNames : ['Cancel', 'Ok'],
		message : "Are you sure you want to call " + _args.firstName + " at " + _args.phone
	});

	/**
	 * Event Handler associated with clicking the Alert Dialog, this handles the
	 * actual call to the platform to make the phone call
	 */
	dialog.addEventListener('click', function(e) {
		if (e.index !== e.source.cancel) {

			// IF WE ARE BUILDING FOR DEVELOPMENT PURPOSES - TRY CALLING A FAKE NUMBER
			//if (ENV_DEV) {
			//	Ti.Platform.openURL("tel:+15125551212");
			//}
			// ELSE IF WE ARE BUILDING PRODUCTION - THEN USE THE LISTED NUMBER
			//else if (ENV_PRODUCTION) {
			Ti.Platform.openURL("tel:" + _args.phone);
			//}
		}
	});

	/**
	 * After everything is setup, we show the Alert Dialog to the User
	 */
	dialog.show();

};

/**
 * Toggle favorites Status
 */
function toggleFavorite() {

	/**
	 * If the user is not currently listed as a favorite user
	 */
	if (!$FM.exists(_args.id)) {

		/**
		 * Appcelerator Analytics Call
		 */
		Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.addToFavorites.clicked");

		/**
		 * Then add this user to the favorites array, and update the button title for favorites
		 */
		$FM.add(_args.id);
		$.addFavoriteBtn.setTitle("- Remove From Favorites");
	} else {

		/**
		 * Appcelerator Analytics Call
		 */
		Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.removeFromFavorites.clicked");

		/**
		 * Else remove the user from the favorites array (usess Underscore js difference function),
		 * and update the button title accordingly
		 */
		$FM.remove(_args.id);
		$.addFavoriteBtn.setTitle("+ Add To Favorites");
	}

	/**
	 * Fire event to trigger a data refresh in the directory view
	 */
	Ti.App.fireEvent("refresh-data");

};

/**
 * Closes the Window
 */
function closeWindow() {
	$.profile.close();
}

/**
 * Lets do a nice fade in after the view has completely rendered **stylin!**
 */
$.profile.addEventListener("postlayout", function(e) {
	$.profile.animate({
		opacity : 1.0,
		duration : 250,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
});

function showPhoneOptions() {
	// Build the list of options, maintaining the position of the options.
	if (Alloy.Globals.Form) {
		Alloy.Globals.Form.Controller.destroy();
	}
	// My list of companies returns companyname, companycode, id
	// companies = db.listCompanies();
	var options = [];

	_.each(_args.phone.home, function(val) {
		options.push("Home: " + val);
	});

	_.each(_args.phone.phone, function(val) {
		options.push("Phone: " + val);
	});
	_.each(_args.phone.work, function(val) {
		options.push("Work: " + val);
	});

	_.each(_args.phone.other, function(val) {
		options.push("Other: " + val);
	});

	_.each(_args.phone.mobile, function(val) {
		options.push("Mobile: " + val);
	});

	_.each(_args.phone.workFax, function(val) {
		options.push("Work Fax: " + val);
	});

	options.push("Cancel");

	var dialog = Ti.UI.createOptionDialog({
		title : 'Phone Numbers',
		options : options
	});

	dialog.addEventListener('click', function(e) {
		var setCode = "";
		var selection = "Unknown";
		if (options[e.index] != "Cancel") {
			// DO WORK HERE.

			var contactInfo = options[e.index];
			var contactInfo = contactInfo.replace("Home: ", "").replace("Other: ", "").replace("Work: ", "").replace("Mobile: ", "").replace("Work Fax: ", "").replace("Phone: ", "");
			_args.phone = contactInfo;
			callContact();

		}
	});
	dialog.show();
};

function showEmailOptions() {
	// Build the list of options, maintaining the position of the options.
	if (Alloy.Globals.Form) {
		Alloy.Globals.Form.Controller.destroy();
	}
	// My list of companies returns companyname, companycode, id
	// companies = db.listCompanies();
	var options = [];

	_.each(_args.email.home, function(val) {
		options.push("Home: " + val);
	});

	_.each(_args.email.work, function(val) {
		options.push("Work: " + val);
	});

	_.each(_args.email.other, function(val) {
		options.push("Other: " + val);
	});

	_.each(_args.email.email, function(val) {
		options.push("Email: " + val);
	});

	_.each(_args.email.mobile, function(val) {
		options.push("Mobile: " + val);
	});

	options.push("Cancel");

	var dialog = Ti.UI.createOptionDialog({
		title : 'Email Adresses',
		options : options
	});

	dialog.addEventListener('click', function(e) {
		var setCode = "";
		var selection = "Unknown";
		if (options[e.index] != "Cancel") {
			// DO WORK HERE.

			var contactInfo = options[e.index];
			var contactInfo = contactInfo.replace("Home: ", "").replace("Other: ", "").replace("Work: ", "").replace("Mobile: ", "").replace("Work Fax: ", "").replace("Email: ", "");

			_args.email = contactInfo;

			emailContact();

		}
	});
	dialog.show();
};

/**
 * Open an SMS dialog with the given message.
 * If the SMS is sent, run the onSuccess callback.
 *
 * @message {text}      the text you want to send
 * @callback {function} the funciton you want to run on success
 **/

function openSmsDialog() {
	// Build the list of options, maintaining the position of the options.
	if (Alloy.Globals.Form) {
		Alloy.Globals.Form.Controller.destroy();
	}
	// My list of companies returns companyname, companycode, id
	// companies = db.listCompanies();
	var options = [];
	_.each(_args.phone.home, function(val) {
		options.push("Home: " + val);
	});

	_.each(_args.phone.work, function(val) {
		options.push("Work: " + val);
	});

	_.each(_args.phone.phone, function(val) {
		options.push("Phone: " + val);
	});

	_.each(_args.phone.other, function(val) {
		options.push("Other: " + val);
	});

	_.each(_args.phone.mobile, function(val) {
		options.push("Mobile: " + val);
	});

	options.push("Cancel");

	var dialog = Ti.UI.createOptionDialog({
		title : 'Text Messaging (only works with mobile numbers)',
		options : options
	});

	dialog.addEventListener('click', function(e) {
		var setCode = "";
		var selection = "Unknown";
		if (options[e.index] != "Cancel") {
			// DO WORK HERE.

			var contactInfo = options[e.index];
			var contactInfo = contactInfo.replace("Home: ", "").replace("Other: ", "").replace("Work: ", "").replace("Mobile: ", "").replace("Phone: ", "");

			_args.email = contactInfo;

			emailContact();

			Titanium.Platform.openURL('sms:' + contactInfo);

		}
	});
	dialog.show();
};

function openGoogleDialog() {
	alert('Error opening Google dialog.');
	//require('T/ga').social('googleplus', 'share', args.url);

	//Ti.Platform.openURL('https://plus.google.com/share' + Util.buildQuery({
	//	url : 'https://plus.google.com/106185654495338091132'
	//}));

};

function linkedIn() {
	alert('Error opening LinkedIn.');
	/*	var linkedin = require('social');
	 var linkedin = social.create({
	 consumerSecret : 'xxxx',
	 consumerKey : 'xzxx',
	 site : 'linkedin'
	 });

	 linkedin.getProfileLinkedin({
	 success : function(data) { XXxx
	 },
	 error : function(error) {
	 console.log("Error while posting: ", error);
	 }
	 })
	 */
};

function faceBook() {

	if (OS_IOS) {

		var fb = require("facebook");

		fb.presentMessengerDialog({
			title : "Message from: " + Alloy.Globals.AccountHolderName, // The title of the link
			description : "Shared from my Network Ninjas app", // The description of the link
			link : "https://www.alvariumsystems.com", // The link you want to share
			to : ['10209826890767977', '120430388462872'] // The user id's you want to preselect in the dialog
		});

	} else {
		alert('Facebook Messenger not currently supported on Android platform.');
	}
}

/*Ti.App.addEventListener("app.fireFaceBook", function() {
 alert('Boo');
 var fb = require("facebook");
 fb.presentMessengerDialog({
 title : "Network ninjas rocks!", // The title of the link
 description : "Shared from my Network Ninjas app", // The description of the link
 link : "https://www.alvariumsystems.com", // The link you want to share
 to : ["10209826890767977", "120430388462872"] // The user id's you want to preselect in the dialog
 });
 }); */

function scheduleFollowup() {
	var selectableCalendars = Ti.Calendar.allCalendars;
	if (selectableCalendars.length > 0) {
		// Handle the date time pickers
		var d = new Date();
		var yyyy = d.getFullYear();
		var dDay = d.getDay();
		var mMonth = d.getMonth();

		if (OS_IOS) {
			var pickerColor = "black";
			var winHeight = "235";
			var PickerHeight = "150";
			var containerViewHeight = "230";
			var pickerTop = "15%";
			var pickerType = Ti.UI.PICKER_TYPE_DATE_AND_TIME;
			var theButtonViewTop = "1%";
			var theButtonViewHeight = "10%";
			var btnSubmitTop = "1%";
			var btnCancelTop = "1%";
			var calBottom = 1;
			var calLeft = 19;
		} else {
			var pickerColor = "white";
			var winHeight = "625";
			var PickerHeight = "450";
			var containerViewHeight = "550";
			var pickerTop = "6%";
			//10%
			var pickerType = Ti.UI.PICKER_TYPE_DATE;
			var theButtonViewTop = "1%";
			var theButtonViewHeight = "5%";
			//10%
			var btnSubmitTop = "1%";
			var btnCancelTop = "1%";
			var calBottom = 20;
			var calLeft = 1;
		}

		var win = Ti.UI.createWindow({
			height : winHeight,
			opacity : "100%",
			backgroundColor : "#ececec"
		});

		//Create the container view
		//<View class="vgroup bg-white" height="35%" width="95%" borderColor= "#acacac">
		var theContainerView = Ti.UI.createView({
			class : "vgroup bg-white",
			height : containerViewHeight,
			width : "95%",
			zIndex : "4090",
			borderColor : "#acacac",
			backgroundColor : "#ececec",
			opacity : "100%"
		});

		/*
		<View class="hgroup top-buffer" height="15%">
		<Label class="left-buffer h5" color="red" text="Cancel"/>
		<Label class="submit-btn h5" text="Submit"/>
		</View>
		<View class="separator" width="100%"/>
		*/

		//Create view to contain buttons
		var theBtnView = Ti.UI.createView({
			class : "hgroup top-buffer",
			top : theButtonViewTop,
			zIndex : 5000,
			height : theButtonViewHeight
		});

		var lblCancel = Ti.UI.createLabel({
			class : " h5",
			left : "5",
			color : "red",
			zIndex : 5001,
			top : btnCancelTop,
			text : "Cancel"
		});

		lblCancel.addEventListener('click', function(e) {
			// $.profile.remove('theContainerView');
			win.close();
		});

		var lblSubmit = Ti.UI.createLabel({
			class : "h5",
			right : "5",
			zIndex : 5001,
			top : btnSubmitTop,
			text : "Submit"
		});

		lblSubmit.addEventListener('click', function(e) {

			Ti.API.info("User selected date: " + theDTPicker.value);
			var theDate = '';
			if (OS_IOS) {
				theDate = theDTPicker.value;
			} else {
				theDate = theDTPicker.value;
				var displayAndroidDate = formatAndroidDateTime(theDate, androidHour, androidMinute, androidAMPM);
				theDate = displayAndroidDate;
				//Ti.API.info(' android selected date: ' + displayAndroidDate);
				// return;
			}
			var myDate = new Date(theDate);
			// $.profile.remove('theContainerView');
			Ti.API.info('ANDROID DATE SUBMITTED:' + myDate);
			if (selectedCalendarId != "-1") {
				var ce = require('addCalendarEvents');
				ce.addCalendarEvents('Follow up with: ' + _args.firstName + " " + _args.lastName, 'You have an appointment with ' + _args.firstName + " " + _args.lastName, 'Network Ninja Dojo ' + projectTitle, myDate, myDate, selectedCalendarId);
				ce = null;
				$.lblFollowupDate.text = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
				win.close();
			} else {
				alert('Please select a calendar for the event.');
			}

		});

		theBtnView.add(lblCancel);
		theBtnView.add(lblSubmit);

		theContainerView.add(theBtnView);

		var theSeparatorView = Ti.UI.createView({
			class : "separator",
			width : "100%"
		});
		theContainerView.add(theSeparatorView);

		//Start Date
		var theDTPicker = Ti.UI.createPicker({
			type : pickerType, //Ti.UI.PICKER_TYPE_TIME,Ti.UI.PICKER_TYPE_DATE_AND_TIME
			//minDate : new Date(yyyy, mMonth, dDay),
			minDate : new Date(),
			maxDate : new Date(yyyy + 100, mMonth, dDay),

			//value : new Date(yyyy, mMonth, dDay),
			value : new Date(),
			backgroundColor : '#C0C0C0',
			top : pickerTop,
			height : PickerHeight
		});

		theDTPicker.addEventListener('doubletap', function(e) {

			Ti.API.info("User selected date: " + theDTPicker.value);
			var theDate = theDTPicker.value;
			var myDate = new Date(theDate);
			//  $.profile.remove('theContainerView');
			var ce = require('addCalendarEvents');
			ce.addCalendarEvents('Follow up with: ' + _args.firstName + " " + _args.lastName, 'You have an appointment with ' + _args.firstName + " " + _args.lastName, 'Network Ninja Dojo ' + projectTitle, myDate, myDate);
			ce = null;
			$.lblFollowupDate.text = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
			win.close();
		});

		var pkCalendar = Ti.UI.createPicker({
			bottom : calBottom,
			zIndex : 5001,
			backgroundColor : '#C0C0C0',
			height : 40,
			left : calLeft,
			color : pickerColor

		});
		getCalendarTypeAndSetPicker(pkCalendar);
		theContainerView.add(pkCalendar);
		theContainerView.add(theDTPicker);
		if (!OS_IOS) {

			var androidHourPicker = Ti.UI.createPicker({
				backgroundColor : '#C0C0C0',
				right : 102,
				bottom : calBottom,
				height : 25,
				height : 40,
				width : 75,
				zIndex : 5001,
				borderColor : 'black',
				color : 'black'
			});
			androidHourPicker.addEventListener('change', function(e) {
				androidHourPicker.setSelectedRow(0, e.row.id, false);
				androidHour = e.row.title;
			});
			androidHourPicker.add(getAdnroidClockHour());
			androidHourPicker.selectionIndicator = true;
			var androidMinutePicker = Ti.UI.createPicker({
				backgroundColor : '#C0C0C0',
				right : 51,
				bottom : calBottom,
				height : 25,
				height : 40,
				width : 75,
				zIndex : 5001,
				borderColor : 'black',
				color : 'black'
			});
			androidMinutePicker.addEventListener('change', function(e) {
				androidMinutePicker.setSelectedRow(0, e.row.id, false);
				androidMinute = e.row.title;
			});
			androidMinutePicker.add(getAdnroidClockMinute());
			androidMinutePicker.selectionIndicator = true;
			var androidAMPMPicker = Ti.UI.createPicker({
				backgroundColor : '#C0C0C0',
				right : 1,
				bottom : calBottom,
				height : 25,
				height : 40,
				width : 75,
				zIndex : 5001,
				borderColor : 'black',
				color : 'black'
			});
			androidAMPMPicker.addEventListener('change', function(e) {
				androidAMPMPicker.setSelectedRow(0, e.row.id, false);
				androidAMPM = e.row.title;
			});
			androidAMPMPicker.add(getAdnroidClockAMPM());
			androidAMPMPicker.selectionIndicator = true;
			theContainerView.add(androidHourPicker);
			theContainerView.add(androidMinutePicker);
			theContainerView.add(androidAMPMPicker);

		}

		win.add(theContainerView);
		win.open();
		return;
	} else {
		alert('There are no calendars associated with an account on this device. Please go to your local calendar settings and add an account.');
	}

}

function getAdnroidClockHour() {

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : '01',
		id : 0,
		color : 'white'
	});
	data[1] = Ti.UI.createPickerRow({
		title : '02',
		id : 1,
		color : 'white'
	});
	data[2] = Ti.UI.createPickerRow({
		title : '03',
		id : 2,
		color : 'white'
	});
	data[3] = Ti.UI.createPickerRow({
		title : '04',
		id : 3,
		color : 'white'
	});
	data[4] = Ti.UI.createPickerRow({
		title : '05',
		id : 4,
		color : 'white'
	});
	data[5] = Ti.UI.createPickerRow({
		title : '06',
		id : 5,
		color : 'white'
	});
	data[6] = Ti.UI.createPickerRow({
		title : '07',
		id : 6,
		color : 'white'
	});
	data[7] = Ti.UI.createPickerRow({
		title : '08',
		id : 7,
		color : 'white'
	});
	data[8] = Ti.UI.createPickerRow({
		title : '09',
		id : 8,
		color : 'white'
	});
	data[9] = Ti.UI.createPickerRow({
		title : '10',
		id : 9,
		color : 'white'
	});
	data[10] = Ti.UI.createPickerRow({
		title : '11',
		id : 10,
		color : 'white'
	});
	data[11] = Ti.UI.createPickerRow({
		title : '12',
		id : 11,
		color : 'white'
	});
	return data;

}

function getAdnroidClockMinute() {

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : '00',
		id : 0,
		color : 'white'
	});
	data[1] = Ti.UI.createPickerRow({
		title : '15',
		id : 1,
		color : 'white'
	});
	data[2] = Ti.UI.createPickerRow({
		title : '30',
		id : 2,
		color : 'white'
	});
	data[3] = Ti.UI.createPickerRow({
		title : '45',
		id : 3,
		color : 'white'
	});
	return data;
}

function getAdnroidClockAMPM() {

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'AM',
		id : 0,
		color : 'white'
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'PM',
		id : 1,
		color : 'white'
	});
	return data;
}

function getCalendarTypeAndSetPicker(pkObject) {
	var calendars = [],
	    pickerData = [];

	var defCalendar = Ti.Calendar.defaultCalendar;
	var selectableCalendars = Ti.Calendar.allCalendars;
	var selectedTempCalendarName,
	    selectedTempid;

	if (OS_IOS) {
		pickerColor = "black";
	} else {
		pickerColor = "white";
	}

	for (var i = 0,
	    ilen = selectableCalendars.length; i < ilen; i++) {
		calendars.push({
			name : selectableCalendars[i].name,
			id : selectableCalendars[i].id
		});

		pickerData.push(Ti.UI.createPickerRow({
			title : calendars[i].name,
			id : calendars[i].id,
			color : pickerColor
		}));

		if (Titanium.Platform.name == 'iPhone OS') {
			if (selectableCalendars[i].id === defCalendar.id) {
				selectedCalendarId = selectableCalendars[i].id;
			}
		}
	}
	pkObject.add(pickerData);
	pkObject.addEventListener('change', function(e) {

		if (Titanium.Platform.name == 'iPhone OS') {
			for (var i = 0,
			    ilen = calendars.length; i < ilen; i++) {
				if (calendars[i].name === e.row.title) {
					selectedCalendarName = calendars[i].name;
					selectedCalendarId = calendars[i].id;
					return selectedCalendarId;
				}
			}
		} else {
			selectedCalendarId = e.row.id;
			//alert(e.row.id + ' ' + e.row.title);
			selectedCalendarName = e.row.title;
			return selectedCalendarId;
		}
	});

}

$.actionPicker.addEventListener('change', function(e) {
	//Ti.API.info("User selected date: " + e.value.toLocaleString());
	if (e.row.title === 'Yes') {
		var p = require('projectManager');
		p.addYesProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeNoProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeWaitingProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p = null;
	} else if (e.row.title === 'No') {
		var p = require('projectManager');
		p.addNoProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeYesProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeWaitingProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p = null;
	} else if (e.row.title === 'Follow-up') {
		var p = require('projectManager');
		p.addProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeYesProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p.removeNoProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		//p.removeWaitingProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		//p.removeProjectContacts(projectTitle, _args.fullName, 'contactUUID', _args);
		p = null;
	}

});

function backToPD() {
	var args = [];
	var margs = require('manageArgs');
	args = margs.manageArgs('projectInfo', projectTitle, args);
	margs = null;
	Alloy.Globals.Navigator.open("pd", args);
}

function formatAndroidDateTime(argDate, hour, minute, ampm) {
	var intHour = 0;
	//Convert to 24 hour clock
	if (ampm === 'PM') {
		intHour = parseInt(hour) + 12;
		hour = intHour;
	}
	var strDate = argDate.toString();
	var timeString = hour + ':' + minute + ':00';
	var outputDateTime = strDate.replace(strDate.substring(16, 24), timeString);
	return outputDateTime;

}
