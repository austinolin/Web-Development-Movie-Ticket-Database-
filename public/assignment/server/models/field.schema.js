// Schema for a field object within a form

module.exports = function(mongoose) 
{
	var Field = mongoose.Schema(
	{
		// the label to display above the field
		"label": String,
		// a String enumerated from: TEXT, TEXTAREA, RADIO, CHECKBOX, SELECT, DATE
		"fieldType": {
			type: String, 
			enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE"]
			},
		// an array of options to be used when the field is of type RADIO, CHECKBOX, or SELECT. 
		// Each option has the following properties
				// label - the label used to display
				// value - the actual value of the selected option
		"options": 
		[{
			label : String, 
			value : String
		}],
		// the placeholder attribute text to show when the field is of type TEXT
		"placeholder": String
	});

	return Field;
};