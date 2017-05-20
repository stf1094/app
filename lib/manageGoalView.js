/**
 * @author William Westgroves
 * Utility class for managing goals modal view

 */

var manageGoalView = {
	manageGoalView : function _manageGoalView(obj, projectTitle) {

		var Goals = [];
		var data = [];
		var modalViewGoals = [];

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
			txtGoalStartDate.value = (myStartDate.getMonth() + 1) + "/" + myStartDate.getDate() + "/" + myStartDate.getFullYear();
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
			txtGoalEndDate.value = (myendDate.getMonth() + 1) + "/" + myendDate.getDate() + "/" + myendDate.getFullYear();
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
			//itemID = itemID + 1;
			//Use this to build the outbound JSON
			//Alloy.Globals.projectGoals.push(txtGoalName.value + ' Start:' + txtGoalStartDate.value + ' End:' + txtGoalEndDate.value);
			//Manage project global

			var addSuccess = false;
			var p = require('projectManager');
			addSuccess = p.addGoals(projectTitle, txtGoalName.value, txtGoalDescription.value, txtGoalStartDate.value, txtGoalEndDate.value);
			p = null;

			if (addSuccess === false) {
				return;
			}

			//Goals.push("{properties: { title: '" + txtGoalEndDate.value + "',  itemId: '" + itemID + "', accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE}},");
			data = [];
			var isCorrectProject = false;
			if (Alloy.Globals.nnGoals.length > 0) {
				for (var i = 0; i < Alloy.Globals.nnGoals.length; i++) {
					if (Alloy.Globals.nnGoals[i].projectName === projectTitle) {
						isCorrectProject = true;

						data.push({

							properties : {
								title : Alloy.Globals.nnGoals[i].goalName + ' Start Date:' + Alloy.Globals.nnGoals[i].startDate + 'End Date: ' + Alloy.Globals.nnGoals[i].endDate,
								itemId : i,
								accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
							}
						});
					}
				}
				if (isCorrectProject === true) {
					obj.setItems(data);
				}

			}

			myModal.close();
		});
		var txtGoalName = Ti.UI.createTextField({
			top : '10%',
			color : '#444444',
			left : '5%',
			height : '10%',
			width : '80%',
			hintText : 'Add goal name',
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

		var txtGoalDescription = Ti.UI.createTextField({
			top : '30%',
			color : '#444444',
			left : '5%',
			height : '10%',
			width : '80%',
			hintText : 'Add gaol description',
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

		var txtGoalStartDate = Ti.UI.createTextField({
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
		var txtGoalEndDate = Ti.UI.createTextField({
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

		var lblGoalName = Ti.UI.createLabel({
			top : '10%',
			left : '5%',
			title : 'Add a Goal',
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			font : {
				fontSize : '14',
				fontFamily : '',
				fontStyle : '',
				fontWeight : 'normal'
			}
		});

		containerView.add(txtGoalEndDate);
		containerView.add(txtGoalDescription);
		containerView.add(dtStart);
		containerView.add(txtGoalStartDate);
		containerView.add(dtEnd);
		containerView.add(txtGoalEndDate);
		containerView.add(txtGoalName);
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
};

module.exports = manageGoalView;
