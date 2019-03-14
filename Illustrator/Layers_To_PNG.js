var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, epsSaveOpts, doc, layers;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to png', '~' );
function init(){
		if(sourceFolder != null){
			files = new Array();
			fileType = "*.ai";
			files = sourceFolder.getFiles( fileType );

			if(files.length > 0){
				destFolder = Folder.selectDialog('Select the folder you want to export files to', '~');
				for(var i = 0; i<files.length; i++){
					sourceDoc = app.open(files[i]);
					doc = app.activeDocument;
					hideAllLayers();
					exportLayers();
					sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

				}
			}
		}
}


function hideAllLayers(){
	for(var l = 0; l < doc.layers.length; l++){
		doc.layers[l].visible = false;
	}
}

function exportLayers(){
	for(var e = 0; e< doc.layers.length; e++){
		doc.layers[e].visible = true;
		var layerName = doc.layers[e].name;

		targetFile = getNewName(layerName);
		pngSaveOpts = getPNGOptions();
		sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);

		doc.layers[e].visible = false;

	}
}

function getNewName(layerName)
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '.png'; 
	newName = "";
		
	for ( var i = 0 ; docName[i] != "." ; i++ )
	{
		newName += docName[i];
	}
	
	newName  +=  '_' + layerName + ext;

	saveInFile = new File( destFolder + '/' + newName );

	return saveInFile;
}


function getPNGOptions()
{
	var pngSaveOpts = new ExportOptionsPNG24();
	pngSaveOpts.antiAliasing = true;
	pngSaveOpts.transparency = true;
	pngSaveOpts.artBoardClipping = true;
	pngSaveOpts.horizontalScale =  833.33;
	pngSaveOpts.verticalScale = 833.33;
    	
	return pngSaveOpts;	
}

init();