/**
 * @author William Westgroves
 * Utility class for the DT Picker.
 */
var getEventPicker = {

	getEventPicker : function _getEventPicker(windowObject, textObject) {
		// Handle the date time pickers
		var d = new Date();
		var yyyy = d.getFullYear();
		var dDay = d.getDay();
		var mMonth = d.getMonth();

		if (OS_IOS) {
			var PickerHeight = "150";
			var containerViewHeight = "200";
			var pickerTop = "15%";
			var pickerType = Ti.UI.PICKER_TYPE_DATE_AND_TIME;
			var theButtonViewTop = "1%";
			var theButtonViewHeight = "10%";
			var btnSubmitTop = "1%";
			var btnCancelTop = "1%";
		} else {
			var PickerHeight = "450";
			var containerViewHeight = "475";
			var pickerTop = "10%";
			var pickerType = Ti.UI.PICKER_TYPE_TIME;
			var theButtonViewTop = "1%";
			var theButtonViewHeight = "10%";
			var btnSubmitTop = "1%";
			var btnCancelTop = "1%";
		}

		//Create the container view
		//<View class="vgroup bg-white" height="35%" width="95%" borderColor= "#acacac">
		var theContainerView = Ti.UI.createView({
			class : "vgroup bg-white",
			height : containerViewHeight,
			width : "95%",
			zIndex :"4090",
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
			top :theButtonViewTop,
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
			windowObject.remove(theContainerView);
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
			var theDate = theDTPicker.value;
			var myDate = new Date(theDate);
			windowObject.remove(theContainerView);

			textObject.value = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
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
			type : pickerType,//Ti.UI.PICKER_TYPE_TIME,Ti.UI.PICKER_TYPE_DATE_AND_TIME
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
			windowObject.remove(theContainerView);

			textObject.value = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();

		});

		theContainerView.add(theDTPicker);

		windowObject.add(theContainerView);
	}
};

module.exports = getEventPicker;
