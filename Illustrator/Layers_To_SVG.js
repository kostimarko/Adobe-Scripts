// Global Variables to use.
var destFolder, sourceFolder, files, fileType, sourceDoc, svgSaveOpts, doc, layers;

// The folder where all of the Illustrator files are.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to SVG', '~' );

// Function that sets up the exporting process
function init(){

	// Check to see if sourceFolder has any files in it
	if(sourceFolder != null){
		
		// Create new array for files to be stored
		files =  new Array();

		// Only use file types that are illustrator files
		fileType = "*.ai";

		// Files get save with all of the files in the sourceFolder
		files = sourceFolder.getFiles(fileType);

		// Check to see if there are any files in the folder
		if(files.length > 0){

			// Ask for a destination folder
			destFolder = Folder.selectDialog('Select the folder you want to export files to', '~');

			// Loop through files
			for(var i = 0; i < files.length; i++){

				// Save the open file and properties to sourceDoc
				sourceDoc = app.open(files[i])

				doc = app.activeDocument;

				hideAllLayers();
				exportLayers();
				sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
			}
		} else {
			alert('There is nothing here')
		}


	} else {
		alert('There are no files here')
	}

}

function hideAllLayers(){
	// Loop through doc layers and turn them off
	for(var l = 0; l < doc.layers.length; l++){
		doc.layers[l].visible = false;
	}
}

// Work horse for exporting layers
function exportLayers(){
	for(var e = 0; e< doc.layers.length; e++){
		
		// Set the selected layer on
		doc.layers[e].visible = true;
		// Store layername
		var layerName = doc.layers[e].name;
		
		// Function returns a new file name
		 var targetFile = getNewName(layerName);
		 
		// Function returns SVG save options
		svgSaveOpts = getSVGOptions();

		// Save SVG
		doc.exportFile(targetFile,ExportType.SVG,svgSaveOpts);

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


function getSVGOptions(){
	var exportOpts =  new ExportOptionsSVG();

	return exportOpts;
}

init();