/**
 * @author William Westgroves
 * Utility class for managing the calendar modal view

 */

var manageiOSCalendar = {
	manageiOSCalendar : function _manageiOSCalendar(obj, projectTitle) {

		var calendars = [];
		var selectedCalendarName;
		var selectedid;
		var pickerData = [];
		var osname = Ti.Platform.osname;

		//**read events from calendar*******
		function performCalendarReadFunctions() {
			var scrollView = Ti.UI.createScrollView({
				backgroundColor : 'green',
				height : 500,
				top : 20
			});

			var label = Ti.UI.createLabel({
				backgroundColor : 'white',
				text : 'Click on the button to display the events for the selected calendar',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				top : 20
			});
			scrollView.add(label);

			var selectableCalendars = Ti.Calendar.allCalendars;
			for (var i = 0,
			    ilen = selectableCalendars.length; i < ilen; i++) {
				calendars.push({
					name : selectableCalendars[i].name,
					id : selectableCalendars[i].id
				});
				pickerData.push(Ti.UI.createPickerRow({
					title : calendars[i].name
				}));
				if (i === 0) {
					selectedCalendarName = selectableCalendars[i].name;
					selectedid = selectableCalendars[i].id;
				}
			}

			if (!calendars.length) {
				label.text = 'No calendars available. Select at least one in the native calendar before using this app';
			} else {
				label.text = 'Click button to view calendar events';

				var picker = Ti.UI.createPicker({
					top : 20
				});

				picker.add(pickerData);
				win.add(picker);

				picker.addEventListener('change', function(e) {
					for (var i = 0,
					    ilen = calendars.length; i < ilen; i++) {
						if (calendars[i].name === e.row.title) {
							selectedCalendarName = calendars[i].name;
							selectedid = calendars[i].id;
							Ti.API.info('Selected calendar that we are going to fetch is :: ' + selectedid + ' name:' + selectedCalendarName);
						}
					}
				});

				var button = Ti.UI.createButton({
					title : 'View events',
					top : 20
				});
				win.add(button);

				button.addEventListener('click', function(e) {
					label.text = 'Generating...';

					var currentYear = new Date().getFullYear();

					var consoleString = '';

					function print(s) {
						if (consoleString.length) {
							consoleString = consoleString + '\n';
						}
						consoleString = consoleString + s;
					}

					var calendar = Ti.Calendar.getCalendarById(selectedid);
					Ti.API.info('Calendar was of type' + calendar);
					Ti.API.info('calendar that we are going to fetch is :: ' + calendar.id + ' name:' + calendar.name);

					function printReminder(r) {
						if (osname === 'android') {
							var typetext = '[method unknown]';
							if (r.method == Ti.Calendar.METHOD_EMAIL) {
								typetext = 'Email';
							} else if (r.method == Ti.Calendar.METHOD_SMS) {
								typetext = 'SMS';
							} else if (r.method == Ti.Calendar.METHOD_ALERT) {
								typetext = 'Alert';
							} else if (r.method == Ti.Calendar.METHOD_DEFAULT) {
								typetext = '[default reminder method]';
							}
							print(typetext + ' reminder to be sent ' + r.minutes + ' minutes before the event');
						}
					}

					function printAlert(a) {
						if (osname === 'android') {
							print('Alert id ' + a.id + ' begin ' + a.begin + '; end ' + a.end + '; alarmTime ' + a.alarmTime + '; minutes ' + a.minutes);
						} else if (osname === 'iphone' || osname === 'ipad') {
							print('Alert absoluteDate ' + a.absoluteDate + ' relativeOffset ' + a.relativeOffset);
						}
					}

					function printEvent(event) {
						if (event.allDay) {
							print('Event: ' + event.title + '; ' + event.begin + ' (all day)');
						} else {
							print('Event: ' + event.title + '; ' + event.begin + ' ' + event.begin + '-' + event.end);
						}

						var reminders = event.reminders;
						if (reminders && reminders.length) {
							print('There is/are ' + reminders.length + ' reminder(s)');
							for (var i = 0; i < reminders.length; i++) {
								printReminder(reminders[i]);
							}
						}
						print('hasAlarm? ' + event.hasAlarm);
						var alerts = event.alerts;
						if (alerts && alerts.length) {
							for (var i = 0; i < alerts.length; i++) {
								printAlert(alerts[i]);
							}
						}

						var status = event.status;
						if (status == Ti.Calendar.STATUS_TENTATIVE) {
							print('This event is tentative');
						}
						if (status == Ti.Calendar.STATUS_CONFIRMED) {
							print('This event is confirmed');
						}
						if (status == Ti.Calendar.STATUS_CANCELED) {
							print('This event was canceled');
						}
					}

					var events = calendar.getEventsInYear(currentYear);
					if (events && events.length) {
						print(events.length + ' event(s) in ' + currentYear);
						print('');
						for (var i = 0; i < events.length; i++) {
							printEvent(events[i]);
							print('');
						}
					} else {
						print('No events');
					}

					label.text = consoleString;
				});
			}

			win.add(scrollView);
		}

		var win = Ti.UI.createWindow({
			backgroundColor : 'white',
			exitOnClose : true,
			fullscreen : false,
			layout : 'vertical',
			title : 'Calendar Demo'
		});

		if (Ti.Calendar.hasCalendarPermissions()) {
			performCalendarReadFunctions();
		} else {
			Ti.Calendar.requestCalendarPermissions(function(e) {
				if (e.success) {
					performCalendarReadFunctions();
				} else {
					Ti.API.error(e.error);
					alert('Access to calendar is not allowed');
				}
			});
		}

		var btnClose = Ti.UI.createButton({
			title : 'Close',
		    top: 20,
			right : 0
		});
		win.add(btnClose);
		btnClose.addEventListener('click', function(e) {
			win.close();
		});

		

		var btnManageEvents = Ti.UI.createButton({
			title : 'Add events',
			top: 20,
			left : 0
		});
		win.add(btnManageEvents);
		btnManageEvents.addEventListener('click', function(e) {
			var gv = require('manageiOSCalendarEvents');
			gv.manageiOSCalendarEvents(args, '$.txtPDProjectName.text');
			gv = null;
		});
		
		

		win.open();

	}
};

module.exports = manageiOSCalendar;
