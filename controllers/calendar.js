// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var calendars = [];
var selectedCalendarName;
var selectedid;
var pickerData = [];
var osname = Ti.Platform.osname;

function init() {
	checkPermissions();
}

//Check calendar permissions...
function checkPermissions() {
	if (Ti.Calendar.hasCalendarPermissions()) {
		getCalendarTypeAndSetPicker();
	} else {
		Ti.Calendar.requestCalendarPermissions(function(e) {
			if (e.success) {
				getCalendarTypeAndSetPicker();
			} else {
				Ti.API.error(e.error);
				alert('Access to calendar is not allowed');
			}
		});
	}
}

function getCalendarTypeAndSetPicker() {
	var defCalendar = Ti.Calendar.defaultCalendar;
	var selectableCalendars = Ti.Calendar.allCalendars;
	var selectedTempCalendarName,
	    selectedTempid;

	if (OS_IOS) {
		var pickerColor = "black";
	} else {
		var pickerColor = "white";
		$.pkCalendarType.backgroundColor = "#C0C0C0";
		$.pkCalendarType.width = "100%";
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
				selectedid = selectableCalendars[i].id;
			}
		}
	}

	$.pkCalendarType.add(pickerData);

	if (Titanium.Platform.name == 'iPhone OS') {
		getEvents();
	}
	//

	$.pkCalendarType.addEventListener('change', function(e) {

		if (Titanium.Platform.name == 'iPhone OS') {
			for (var i = 0,
			    ilen = calendars.length; i < ilen; i++) {
				if (calendars[i].name === e.row.title) {
					selectedCalendarName = calendars[i].name;
					selectedid = calendars[i].id;
					Ti.API.info('Selected calendar that we are going to fetch is :: ' + selectedid + ' name:' + selectedCalendarName);
					getEvents();
				}
			}
		} else {
			selectedid = e.row.id;
			//alert(e.row.id + ' ' + e.row.title);
			selectedCalendarName = e.row.title;
			getEvents();
		}
	});

}

//GET EVENTS
function getEvents() {
	var sections = [];
	//return data[] with calendar events
	var dataToAdd = preprocessForListView();

	var section = Ti.UI.createListSection({
		//headerView : sectionHeader
	});

	section.items = dataToAdd;

	sections.push(section);
	$.lvEvents.sections = sections;

}

function preprocessForListView(obj) {
	var data = [];
	var currentYear = new Date().getFullYear();

	//if (OS_IOS) {
	var calendar = Ti.Calendar.getCalendarById(selectedid);
	//} else {
	//var CALENDAR_TO_USE = 3;
	//	var calendar = Ti.Calendar.getCalendarById(selectedid);
	//Ti.Calendar.getCalendarById(CALENDAR_TO_USE);

	//}

	var events = calendar.getEventsInYear(currentYear);

	if (events && events.length) {
		for (var i = 0; i < events.length; i++) {

			var sDt = events[i].begin;
			var eDt = events[i].end;

			if (OS_IOS) {
				var blnCheckDate = checkDate(sDt);
				var startDate = formatDateForCalander(sDt);
				var startTime = formatTimeForCalander(sDt);
				var endTime = formatTimeForCalander(sDt);
			} else {
				var blnCheckDate = checkDateForAndroid(sDt);
				var startDate = formatDateForAndroidCalander(sDt);
				var startTime = formatTimeForAndroidCalander(sDt);
				var endTime = formatTimeForAndroidCalander(sDt);
			}

			if (blnCheckDate === true) {

				//Ti.API.info('Event start : ' + events[i].begin);
				//Ti.API.info('Event end : ' + events[i].end);

				data.push({
					template : "eventTemplate",
					properties : {
						//color : "black"
						height : 90,
						selectedBackgroundColor : '#f6f6f6'
					},
					lblDate : {
						text : startDate,//'startDate',
					},
					startDate : {
						text : startTime,// events[i].begin,
						//color : "black"
					},
					endDate : {
						text : endTime,
						//color : "black"
					},
					orangeLine : {
						class : 'bg-orange hz-separator left-buffer'
					},
					nnEvent : {
						text : events[i].title,
						//color : "black"
					},
					nnLocation : {
						text : events[i].location,
						//color : "black"
					}

				});

			}
		}
	}

	return data;
}

function checkDate(sDt) {
	var dt = sDt.split('T');
	var newDate = new Date(dt[0]);
	var currentDate = new Date();
	if (newDate >= currentDate) {
		return true;
	} else {
		return false;
	}

}

function formatDateForCalander(sDt) {
	var moment = require('alloy/moment');
	var dt = sDt.split('T');
	var newDate = new Date(dt[0]);
	//Ti.API.info('dt[0]: ' + dt[0]);
	//Ti.API.info('newDate: ' + newDate);
	var d = new Date();
	d = newDate;
	var yyyy = d.getFullYear();
	var dDay = d.getDay();
	var mMonth = d.getMonth();

	var eventDate = new Date(yyyy, mMonth, dDay + 1, 15, 25, 50, 125);
	return moment(eventDate).format("dddd, MMMM Do YYYY");

}

function checkDateForAndroid(sDt) {
	var newDate = new Date(sDt);
	var currentDate = new Date();
	if (newDate >= currentDate) {
		return true;
	} else {
		return false;
	}

}

function formatDateForAndroidCalander(sDt) {
	var newDate = new Date(sDt);
	var moment = require('alloy/moment');
	//var day = moment(newDate, "MM-DD-YYYY");
	//return day.format("dddd, MMMM Do YYYY");

	var d = new Date();
	d = newDate;
	var yyyy = d.getFullYear();
	var dDay = d.getDay();
	var mMonth = d.getMonth();

	var eventDate = new Date(yyyy, mMonth, dDay, 15, 25, 50, 125);
	return moment(eventDate).format("dddd, MMMM Do YYYY");

}

function formatTimeForAndroidCalander(sDt) {
	var newDate = new Date(sDt);
	var moment = require('alloy/moment');
	var day = moment(newDate, "MM-DD-YYYY");
	return day.format("h:mm");
}

function formatTimeForCalander(sDt) {
	var offset = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
	var split = new Date().toString().split(" ");
    var timeZoneFormatted = split[split.length - 2] + " " + split[split.length - 1];
	//new Date().getTimezoneOffset();
	//parseInt(offset.substring(1, 2))

	var intOffset = Math.abs(parseInt(offset.substring(0, 3)));
	var dt = sDt.split('T');
	//return dt[1];
	var theTime = dt[1].substring(0, 7);
	var time = theTime;

	
	//A whole new world of time
	var oldDate = new Date(dt[0]);	
	var sDateConcat = oldDate.toString().substring(0, 15) + ' ' + dt[1] + ' ' + timeZoneFormatted;
	sDateConcat  = sDateConcat.replace('.000+0000','');
	var theDate = new Date(sDateConcat);
	theDate.setHours(theDate.getHours() - intOffset);
	var hours = theDate.getHours() == 0 ? 12 : (theDate.getHours() > 12 ? theDate.getHours() - 12 : theDate.getHours());
	var minutes = theDate.getMinutes() < 10 ? '0' + theDate.getMinutes() : theDate.getMinutes();
	var ampm = theDate.getHours() < 12 ? 'AM' : 'PM';
	var time = hours + ':' + minutes + ' ' + ampm;	

	return time;

}

//END GET EVENTS ADD TO SCROLL VIEW

//Call init to make the magic happen...
init();
