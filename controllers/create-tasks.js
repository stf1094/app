// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var tasks = [];
var itemID = 0;
var data = [];
var projectTitle = '';
var goalTitle = '';



function init() {

	var gargs = require('getArgsValue');
    projectTitle = gargs.getArgsValue('projectInfo', args);
	var projectType = gargs.getArgsValue('projectType', args);
	var goalStartDate = gargs.getArgsValue('goalStartDate', args);
	var goalEndDate = gargs.getArgsValue('goalEndDate', args);
	goalTitle = gargs.getArgsValue('goalTitle', args);
	gargs = null;

}

init();

function addNew() {

	//Date time picker

	// Handle the date time pickers
	var d = new Date();
	var yyyy = d.getFullYear();
	var dDay = d.getDay();
	var mMonth = d.getMonth();
	//Start Date
	var startDatePicker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date(yyyy, mMonth, dDay),
		maxDate : new Date(yyyy + 100, mMonth, dDay),
		value : new Date(yyyy, mMonth, dDay),
		top : 50
	});
	startDatePicker.addEventListener('doubletap', function(e) {

		Ti.API.info("User selected date: " + startDatePicker.value);
		var startDate = startDatePicker.value;
		var myStartDate = new Date(startDate);

		//var date = Date.parse(startDate);
		txtTaskStartDate.value = (myStartDate.getMonth() + 1) + "/" + myStartDate.getDate() + "/" + myStartDate.getFullYear();
		containerView.remove(startDatePicker);
	});
	//End Date
	var endDatePicker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date(yyyy, mMonth, dDay),
		maxDate : new Date(yyyy + 100, mMonth, dDay),
		value : new Date(yyyy, mMonth, dDay),
		top : 50
	});
	endDatePicker.addEventListener('doubletap', function(e) {

		Ti.API.info("User selected date: " + endDatePicker.value);
		var endDate = endDatePicker.value;
		var myendDate = new Date(endDate);

		//var date = Date.parse(endDate);
		txtTaskEndDate.value = (myendDate.getMonth() + 1) + "/" + myendDate.getDate() + "/" + myendDate.getFullYear();
		containerView.remove(endDatePicker);
	});

	//end dt picker stuff

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent'
	});
	var wrapperView = Ti.UI.createView({
		class : 'form1',
		top : '0%',
		bottom : '0%',
		borderRadius : '5%'
	});
	// Full screen
	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5,
		class : "form1"
	});
	var containerView = Ti.UI.createView({// Set height appropriately
		height : '40%', //200,
		width : '90%', //335,
		backgroundColor : '#FFF'
	});

	var closeButton = Ti.UI.createButton({
		title : 'Cancel',
		left : '5%',
		bottom : '0%',
		class : "button-half1"
	});
	var saveButton = Ti.UI.createButton({
		title : 'Save',
		right : '5%',
		bottom : '0%',
		class : "button-half1"
	});
	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	//Add to the list items...
	saveButton.addEventListener('click', function() {
		itemID = itemID + 1;
		//Use this to build the outbound JSON

		var addSuccess = false;
		var p = require('projectManager');
		addSuccess = p.addTasks(projectTitle, goalTitle, txtTaskName.value, txtTaskDescription.value, txtTaskStartDate.value, txtTaskEndDate.value);
		p = null;

		if (addSuccess === false) {
			return;
		}

		//Alloy.Globals.nnTasks.push(txtTaskName.value + ' Start:' + txtTaskStartDate.value + ' End:' + txtTaskEndDate.value);
		//tasks.push("{properties: { title: '" + txtTaskName.value + "',  itemId: '" + itemID + "', accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE}},");
		for (var i = 0; i < 1; i++) {
			data.push({

				properties : {
					title : txtTaskName.value + ' Start:' + txtTaskStartDate.value + ' End:' + txtTaskEndDate.value,
					itemId : 'row' + (i + 1),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}

		$.lsTasks.setItems(data);

		myModal.close();
	});
	var txtTaskName = Ti.UI.createTextField({
		top : '10%',
		color : '#444444',
		left : '5%',
		height : '10%',
		width : '80%',
		hintText : 'Add task name',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		borderColor : 'black',
		borderRadius : '35%',
		font : {
			fontSize : '14',
			fontFamily : '',
			fontStyle : '',
			fontWeight : 'normal'
		},
	});

	var txtTaskDescription = Ti.UI.createTextField({
		top : '30%',
		color : '#444444',
		left : '5%',
		height : '10%',
		width : '80%',
		hintText : 'Add task description',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		borderColor : 'black',
		borderRadius : '35%',
		font : {
			fontSize : '14',
			fontFamily : '',
			fontStyle : '',
			fontWeight : 'normal'
		},
	});

	var dtStart = Ti.UI.createImageView({
		height : '20%',
		width : '80%',
		top : '50%',
		left : '5%',
		image : '/images/choose-date-entry.png',
	});

	var txtTaskStartDate = Ti.UI.createTextField({
		top : '55%',
		left : '30%',
		height : '10%',
		width : '40%',
		hintText : 'Start date',
		editable : 'false',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		borderColor : 'black',
		font : {
			fontSize : '14',
			fontFamily : '',
			fontStyle : '',
			fontWeight : 'normal'
		},
	});
	var dtEnd = Ti.UI.createImageView({
		height : '20%',
		width : '80%',
		top : '70%',
		left : '5%',
		image : '/images/choose-date-entry.png',
	});
	var txtTaskEndDate = Ti.UI.createTextField({
		top : '75%',
		left : '30%',
		height : '10%',
		width : '40%',
		hintText : 'End date',
		editable : 'false',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		borderColor : 'black',
		font : {
			fontSize : '14',
			fontFamily : '',
			fontStyle : '',
			fontWeight : 'normal'
		},
	});

	var lblTaskName = Ti.UI.createLabel({
		top : '10%',
		left : '5%',
		title : 'Add a task',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		font : {
			fontSize : '14',
			fontFamily : '',
			fontStyle : '',
			fontWeight : 'normal'
		}
	});

	containerView.add(txtTaskName);
	containerView.add(txtTaskDescription);
	containerView.add(dtStart);
	containerView.add(txtTaskStartDate);
	containerView.add(dtEnd);
	containerView.add(txtTaskEndDate);
	containerView.add(lblTaskName);
	containerView.add(closeButton);
	containerView.add(saveButton);
	dtStart.addEventListener('click', function() {
		containerView.add(startDatePicker);
	});

	dtEnd.addEventListener('click', function() {
		containerView.add(endDatePicker);
	});

	wrapperView.add(backgroundView);
	wrapperView.add(containerView);

	myModal.add(wrapperView);
	myModal.open({
		animate : true
	});
}

function saveTasks() {

	Alloy.Globals.Navigator.open("add-contacts", args);
}
