/**
 * @author William Westgroves
 * Utility class for managing the calendar events modal view

 */

var manageiOSCalendarEvents = {
	manageiOSCalendarEvents : function _manageiOSCalendarEvents(obj, projectTitle) {

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

		function printEventDetails(eventID) {
			Ti.API.info('eventID:' + eventID);
			var defCalendar = Ti.Calendar.defaultCalendar;
			var eventFromCalendar = defCalendar.getEventById(eventID);
			if (eventFromCalendar != null) {
				Ti.API.info('Printing event values ::');
				Ti.API.info('title : ' + eventFromCalendar.title);
				Ti.API.info('notes : ' + eventFromCalendar.notes);
				Ti.API.info('location:' + eventFromCalendar.location);
				Ti.API.info('allDay ? :' + eventFromCalendar.allDay);
				Ti.API.info('status : ' + eventFromCalendar.status);
				Ti.API.info('availability : ' + eventFromCalendar.availability);
				Ti.API.info('hasAlarm ? : ' + eventFromCalendar.hasAlarm);
				Ti.API.info('id : ' + eventFromCalendar.id);
				Ti.API.info('isDetached ? : ' + eventFromCalendar.isDetached);
				Ti.API.info('begin : ' + eventFromCalendar.begin);
				Ti.API.info('end : ' + eventFromCalendar.end);
				var eventRule = eventFromCalendar.recurrenceRules;
				Ti.API.info("recurrenceRules : " + eventRule);
				for (var i = 0; i < eventRule.length; i++) {
					Ti.API.info("Rule # " + i);
					Ti.API.info('frequency : ' + eventRule[i].frequency);
					Ti.API.info('interval : ' + eventRule[i].interval);
					Ti.API.info('daysofTheWeek : ');
					var daysofTheWeek = eventRule[i].daysOfTheWeek;
					for (var j = 0; j < daysofTheWeek.length; j++) {
						Ti.API.info('{ dayOfWeek : ' + daysofTheWeek[j].dayOfWeek + 'weekNumber : ' + daysofTheWeek[j].week + '}, ');
					}
					Ti.API.info('firstDayOfTheWeek : ' + eventRule[i].firstDayOfTheWeek);
					Ti.API.info('daysOfTheMonth : ');
					var daysOfTheMonth = eventRule[i].daysOfTheMonth;
					for (var j = 0; j < daysOfTheMonth.length; j++) {
						Ti.API.info(' ' + daysOfTheMonth[j]);
					}
					Ti.API.info('daysOfTheYear : ');
					var daysOfTheYear = eventRule[i].daysOfTheYear;
					for (var j = 0; i < daysOfTheYear.length; j++) {
						Ti.API.info(' ' + daysOfTheYear[j]);
					}
					Ti.API.info('weeksOfTheYear : ');
					var weeksOfTheYear = eventRule[i].weeksOfTheYear;
					for (var j = 0; j < weeksOfTheYear.length; j++) {
						Ti.API.info(' ' + weeksOfTheYear[j]);
					}
					Ti.API.info('monthsOfTheYear : ');
					var monthsOfTheYear = eventRule[i].monthsOfTheYear;
					for (var j = 0; j < monthsOfTheYear.length; j++) {
						Ti.API.info(' ' + monthsOfTheYear[j]);
					}
					Ti.API.info('daysOfTheYear : ');
					var setPositions = eventRule[i].setPositions;
					for (var j = 0; j < setPositions.length; j++) {
						Ti.API.info(' ' + setPositions[j]);
					}
				};
				Ti.API.info('alerts : ' + eventFromCalendar.alerts);
				var newAlerts = eventFromCalendar.alerts;

				for (var i = 0; i < newAlerts.length; i++) {
					Ti.API.info('*****ALert ' + i);
					Ti.API.info('absoluteDate :' + newAlerts[i].absoluteDate);
					Ti.API.info('relativeOffset ;' + newAlerts[i].relativeOffset);
				}
			}
		}

		function performCalendarWriteFunctions() {
			var defCalendar = Ti.Calendar.defaultCalendar;
			var date1 = new Date(new Date().getTime() + 3000),
			    date2 = new Date(new Date().getTime() + 900000);
			Ti.API.info('Date1 : ' + date1 + 'Date2 : ' + date2);
			var event1 = defCalendar.createEvent({
				title : 'Sample Event',
				notes : 'This is a test event which has some values assigned to it.',
				location : 'Appcelerator Inc',
				begin : date1,
				end : date2,
				availability : Ti.Calendar.AVAILABILITY_FREE,
				allDay : false,
			});
			var alert1 = event1.createAlert({
				absoluteDate : new Date(new Date().getTime() - (1000 * 60 * 20))
			});
			var alert2 = event1.createAlert({
				relativeOffset : -(60 * 15)
			});
			var allAlerts = new Array(alert1, alert2);
			event1.alerts = allAlerts;
			var newRule = event1.createRecurrenceRule({
				frequency : Ti.Calendar.RECURRENCEFREQUENCY_MONTHLY,
				interval : 1,
				daysOfTheWeek : [{
					dayOfWeek : 1,
					week : 2
				}, {
					dayOfWeek : 2
				}],
				end : {
					occurrenceCount : 10
				}
			});
			Ti.API.info('newRule : ' + newRule);
			event1.recurrenceRules = [newRule];
			Ti.API.info('Going to save event now');
			event1.save(Ti.Calendar.SPAN_THISEVENT);
			Ti.API.info('Done with saving event,\n Now trying to retreive it.');
			printEventDetails(event1.id);
		}

		var win = Ti.UI.createWindow({
			backgroundColor : 'white',
			title : 'Calendar Demo'
		});

		var label = Ti.UI.createLabel({
			text : 'Check console log',
			height : Ti.UI.size,
			width : Ti.UI.size
		});
		win.add(label);

		win.open();
	}
};

module.exports = manageiOSCalendarEvents; 