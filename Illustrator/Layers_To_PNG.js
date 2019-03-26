// Global Variables to use.
var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, epsSaveOpts, doc, layers, vertScale, horzScale, width, height;

// The folder where all of the Illustrator files are.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to png', '~' );

// Function that sets up the exporting process.
function init(){

		// Check to see if sourceFolder has any folders in it
		if(sourceFolder != null){

			// Create new array for files to be stored;
			files = new Array();

			// Only use file types that are illustrator files
			fileType = "*.ai";

			// Files get saved with all of the files in the sourcefolder
			files = sourceFolder.getFiles( fileType );

			// Check to see if there are any files in the folder
			if(files.length > 0){

				// Ask for destination folder.
				destFolder = Folder.selectDialog('Select the folder you want to export files to', '~');
				askForDimensions();
				// Loop through files
				for(var i = 0; i<files.length; i++){
					// Saves the open file and properties to sourceDoc
					sourceDoc = app.open(files[i]);

					doc = app.activeDocument;

					// Get Bounds to the artboards
					// Bounds work as such, left[0], top[1], right[2], bottom[3]
					var bounds = doc.artboards[0].artboardRect;

					var left = bounds[0];
					var top = bounds[1];

					// Subtract the right bounds from the left bounds to get width
					 width = bounds[2] - left;

					// Subtract the top bounds from the bottom bounds to get height;
					height = top - bounds[3];

					// Prompts user for width and height values in pxs
					
					// Hides all Layers
					hideAllLayers();

					// Exports all layers
					exportLayers();
					
					// Use DONOTSAVECHANGES to keep PNG from adding other names to the file name
					sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
				}
			} else {
				alert('There are no files here')
			}
		} else {
			alert('There is no folder here')
		}
}


function hideAllLayers(){
	
	// Loop throigh doc layers and turn them off
	for(var l = 0; l < doc.layers.length; l++){
		doc.layers[l].visible = false;
	}
}


// Function asks user for width and height in pxs
function askForDimensions(){

	// Create new dialog window
	var w = new Window ("dialog", "Export PNG Scale");

	// Group all inputs together
	var scaleInputGroup = w.add("group");

	// Put all inputs into a column
	scaleInputGroup.orientation = "column";

	// Group all width portions
	var widthGroup = scaleInputGroup.add("group");

	// Puts all width into a row
	widthGroup.orientation = "row"

	// Label for width
	var widthLabel = widthGroup.add("statictext", undefined, "width in px");

	// Editable text field for width
	var widthField = widthGroup.add("edittext", undefined, "200");

	// Sets number of characters allowed
	widthField.characters = 20;

	// Allows field to be editable
	widthField.active = true;

	// Group all height portions
	var heightGroup = scaleInputGroup.add("group");

	// Puts all height into a row
	heightGroup.orientation = "row";

	// Label for height
	var heightLabel = heightGroup.add("statictext", undefined, "height in px");

	// Editable text field for width
	var heightField = heightGroup.add("edittext", undefined, "200");

	// Sets number of characters allowed
	heightField.characters = 20;

	// Allows field to be editable
	heightField.active = true;
	

	// Puts all buttons into a group
	var buttonGroup = w.add("group");

	// Sets all buttons into a row
	buttonGroup.orientation = "row";

	// Aligns buttons to the left side
	buttonGroup.alignment = "left";

	// Set confirm button
	var confirmButton = buttonGroup.add("button", undefined, "OK");

	// Create cancel button
	buttonGroup.add("button", undefined, "Cancel")
	
	// Callback to after the button has been clicked
	confirmButton.onClick = function(){

		// Creates the scale for the height export
		vscale = parseInt(heightField.text)

		// Creates the scale for the width export
		hscale = parseInt(widthField.text)

		// Closes the window
		w.close()
	}
	// Shows the window
	w.show ();
}

// Work horse for exporting layers
function exportLayers(){

	// Loop through layers
	for(var e = 0; e< doc.layers.length; e++){

		// Set selected layer on
		doc.layers[e].visible = true;

		// Store layerName
		var layerName = doc.layers[e].name;

		// Function returns a new file name
		targetFile = getNewName(layerName);

		// Returns PNG options
		pngSaveOpts = getPNGOptions();

		// Export file as PNG
		sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);

		// Turn selected layer off
		doc.layers[e].visible = false;

	}
}

function getNewName(layerName){
	// Local Variables
	var docName;

	// Set docName to the source doc name
	docName = sourceDoc.name;

	// Set newName to empty string
	var newName = "";

	// Get the last underscore in the document name
	var underscore = docName.lastIndexOf('_');

	// Set newName to the docName from the first char to the last underscore
	newName += docName.substring(0,underscore);
	
	// Set newName to underscore + layerName
	newName += '_' + layerName;

	// Save in file at destFolder and newName
	saveInFile = new File(destFolder + '/' + newName);
	
	// Return saveInFile that creates file at folder path
	return saveInFile;
}


// Function returns value of PNG settings
function getPNGOptions(){
	vertScale = (vscale/height) *100;
	horzScale = (hscale/width) * 100;
	
	var pngSaveOpts = new ExportOptionsPNG24();
	pngSaveOpts.antiAliasing = true;
	pngSaveOpts.transparency = true;
	pngSaveOpts.artBoardClipping = true;

	// horzScale and vertScale get set in the askForDimension Function
	pngSaveOpts.horizontalScale =  horzScale;
	pngSaveOpts.verticalScale = vertScale;
    	
	return pngSaveOpts;	
}

init();