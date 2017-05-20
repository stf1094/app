/**
 * NumberFunctions
 * Utility class for number functions helper 
 */
var numberFunctions = {

	isNumber : function _isNumber(strArg) {

		var letters = /^[0-9. ]+$/;
		var bl = false;
		if (number.match(letters)) {

			bl = true;
		}
		return bl;
	}
};
module.exports = numberFunctions;

