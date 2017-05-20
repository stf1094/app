var obj = Ti.Contacts.getAllPeople();
var jsonString = JSON.stringify(obj);
Ti.API.info('---------GET THE CONTACTS-----------');
Ti.API.info(jsonString);
jsonString.replace(/[\xE2\x80\x9C]/g, /[\x22]/g);
jsonString.replace(/[\xE2]/g, /[\x22]/g);
/* Ti.API.info('---------POST To Katana-----------');

 var xhr = Ti.Network.createHTTPClient();
 xhr.onload = function(e) {
 //handle response, which at minimum will be an HTTP status code
 };
 xhr.open('POST', 'http://10.0.2.2:8080/shuriken/orders/v1.0/search');
 xhr.send(jsonString);
 */

Ti.API.info('---------Remove Duplicates-----------');
var array = JSON.parse(jsonString.toString());
var seenNames = {};

array = array.filter(function(currentObject) {
	if (currentObject.lastName in seenNames && currentObject.phone.length == 0) {
		return false;
	} else {
		seenNames[currentObject.lastName] = true;
		return true;
	}
});



Ti.API.info('---------Send Email-----------');
var sendgrid = require('tisendgrid')('wwestgroves', 'N0t4uris!');
sendgrid.send({
	to : 'w.westgroves@alvariumsystems.com',
	from : 'williamwestgroves@gmail.com',
	subject : 'Hello!',
	text : JSON.stringify(array) //jsonString
}, function(e) {
	if (e) {
		console.log(e);
		// Email wasn't sent
	}
});