/**
 * @author William Westgroves
 * Utility class for managing the calendar events modal view

 */

var addCalendarEvents = {
	addCalendarEvents : function _addCalendarEvents(eventTitle, eventNotes, eventLocation, beginDate, endDate, selectedCalendarId) {

		if (OS_IOS) {

			var defCalendar = Ti.Calendar.getCalendarById(selectedCalendarId);
			//Ti.Calendar.defaultCalendar;
			var date1 = beginDate;
			//.getTime() + 3000,
			date2 = endDate;
			//.getTime() + 900000;
			Ti.API.info('Date1 : ' + date1 + 'Date2 : ' + date2);
			var event1 = defCalendar.createEvent({
				title : eventTitle,
				notes : eventNotes,
				location : eventLocation,
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
					occurrenceCount : 1
				}
			});
			Ti.API.info('newRule : ' + newRule);
			event1.recurrenceRules = [newRule];
			Ti.API.info('Going to save event now');
			event1.save(Ti.Calendar.SPAN_THISEVENT);
			Ti.API.info('Done with saving event,\n Now trying to retreive it.');

		} else {

			//var d = new Date();
			//d = beginDate;
			//var yyyy = d.getFullYear();
			//var dDay = d.getDay();
			//var mMonth = d.getMonth();
			var date1 = beginDate;
			//.getTime() + 3000,
			date2 = endDate;

			//Android events
			var calendar = Ti.Calendar.getCalendarById(selectedCalendarId);
			//var calendar = Ti.Calendar.defaultCalendar;

			// Create the event
			//var eventBegins = new Date(yyyy, mMonth, dDay, 12, 0, 0);
			//var eventEnds = new Date(yyyy, mMonth, dDay, 14, 0, 0);
			var details = {
				title : eventTitle,
				description : eventNotes,
				location : eventLocation,
				begin : date1,
				end : date2
			};

			var event = calendar.createEvent(details);

			// Now add a reminder via e-mail for 10 minutes before the event.
			var reminderDetails = {
				minutes : 10,
				method : Ti.Calendar.METHOD_EMAIL
			};

			event.createReminder(reminderDetails);

		}
	}
};

module.exports = addCalendarEvents;

