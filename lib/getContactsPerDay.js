/**
 * @author William Westgroves
 * Utility class for the DT Picker.
 */
var getContactsPerDay = {

	getContactsPerDay : function _getContactsPerDay(totalContacts, startDate, endDate) {
		var numberOfDays = daysBetween(startDate, endDate);

		var returnNumber = totalContacts / numberOfDays;

		return Math.round(returnNumber);

	}
};

function daysBetween(startDate, endDate) {

	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;

	// Convert both dates to milliseconds
	var date1_ms = startDate.getTime();
	var date2_ms = endDate.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);

	// Convert back to days and return
	return Math.round(difference_ms / ONE_DAY);

}

module.exports = getContactsPerDay;

