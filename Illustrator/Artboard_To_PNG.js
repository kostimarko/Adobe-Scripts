// Global Variables to use.
var destFolder, sourceFolder, files, sourceDoc, targetFile, doc, layers,vertScale,horzScale,width,height;

// The folder where all of the Illustrator files are.
sourceFolder = Folder.selectDialog('Select Folders with Illustrator files you want to convert to PNG','~' );

// Function that sets up the exporting process.
function init(){
    // Check to see if sourceFolder has any folders in it
    if(sourceFolder != null){
        // Create new array for files to be stored;
        files = new Array();

        // Only use file types that are illustrator files
        fileType = "*.ai";

        // Files get saved with all of the files in the sourcefolder
        files = sourceFolder.getFiles(fileType);

        // Check to see if there are any files in the folder
        if(files.length > 0){

            // Ask for destination folder.
            destFolder = Folder.selectDialog('Select the folder you want to export your files to', '~');
            
            // Loop through files
            for(var i = 0; i < files.length; i++){
                
                // Saves the open file and properties to sourceDoc
                sourceDoc =  app.open(files[i])
                
                // Sets doc to active document
                doc = app.activeDocument;

                // Exports all artboards
                exportArtboards();

                // Closes Document
                sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

            }

        } else {
            alert('There are no files here')
        }
    } else {
        alert('There is no folder here')
    }
}

// Work horse for exporting artboards
function exportArtboards(){

    // Loop through artboards
    for(var e = 0; e < doc.artboards.length; e++){
        
        // Store artboard name
        var artBoardName = doc.artboards[e].name;

        // Function returns a new file name
        targetFile = getNewName(artBoardName);

        // Returns PNG options
        pngSaveOpts = getPNGOptions();

        // Make current artboard active
        doc.artboards.setActiveArtboardIndex(e)

        // Export file as PNG
        sourceDoc.exportFile(targetFile, ExportType.PNG24, pngSaveOpts);
    }
}

function getNewName(artBoardName){
    
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
    newName += '_' + artBoardName;

    // Save in file at destFolder and newName
    saveInFile = new File(destFolder + '/' + newName);

    // Return saveInFile that creates file at folder path
    return saveInFile;
}

function getPNGOptions(){
    var pngSaveOpts = new ExportOptionsPNG24();
	pngSaveOpts.antiAliasing = true;
	pngSaveOpts.transparency = true;
    pngSaveOpts.artBoardClipping = true;
    
    return pngSaveOpts;
}
init();