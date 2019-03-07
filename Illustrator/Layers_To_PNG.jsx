var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, epsSaveOpts, doc;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to png', '~' );

// If a valid folder is selected
if ( sourceFolder != null )
{
  files = new Array();
	fileType = prompt( 'Select type of Illustrator files to you want to process. Eg: *.ai', ' ' );
	
	// Get all files matching the pattern
	files = sourceFolder.getFiles( fileType );
	
	if ( files.length > 0 )
	{
		// Get the destination to save the files
		destFolder = Folder.selectDialog( 'Select the folder where you want to save the converted png files.', '~' );
		for ( i = 0; i < files.length; i++ )
		{
            sourceDoc = app.open(files[i]); // returns the document object
			doc = app.activeDocument;
			for(var j = 0; j<doc.layers.length; j++){
				if(j === 0){
					doc.layers[0].visible = true;
					doc.layers[1].visible = false;
					doc.layers[2].visible = false;
					doc.layers[3].visible = false;
					var layerName = doc.layers[0].name;
					targetFile=getNewName(layerName);
					pngSaveOpts = getPNGOptions();
					sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);
				}
				if( j === 1){
					doc.layers[0].visible = false;
					doc.layers[1].visible = true;
					doc.layers[2].visible = false;
					doc.layers[3].visible = false;
					var layerName = doc.layers[1].name;
					targetFile=getNewName(layerName);
					pngSaveOpts = getPNGOptions();
					sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);
				}
				if( j === 2){
					doc.layers[0].visible = false;
					doc.layers[1].visible = false;
					doc.layers[2].visible = true;
					doc.layers[3].visible = false;
					var layerName = doc.layers[2].name;
					targetFile=getNewName(layerName);
					pngSaveOpts = getPNGOptions();
					sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);
				}
				if( j === 3){
					doc.layers[0].visible = false;
					doc.layers[1].visible = false;
					doc.layers[2].visible = false;
					doc.layers[3].visible = true;
					var layerName = doc.layers[3].name;
					targetFile=getNewName(layerName);
					pngSaveOpts = getPNGOptions();
					sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);
				}
				if( j === 4){
					doc.layers[0].visible = false;
					doc.layers[1].visible = false;
					doc.layers[2].visible = false;
					doc.layers[3].visible = false;
					doc.layers[4].visible = true;
					var layerName = doc.layers[4].name;
					targetFile=getNewName(layerName);
					pngSaveOpts = getPNGOptions();
					sourceDoc.exportFile(targetFile,ExportType.PNG24,pngSaveOpts);
				}
			}
			sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
		}
		alert( 'Files are saved as EPS in ' + destFolder );
	}
	else
	{
		alert( 'No matching files found' );
	}
}


/*********************************************************
getNewName: Function to get the new file name. The primary
name is the same as the source file.
**********************************************************/

function getNewName(layerName)
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '.png'; // new extension for eps file
	newName = "";
		
	for ( var i = 0 ; docName[i] != "." ; i++ )
	{
		newName += docName[i];
	}
	
	newName  +=  '_' + layerName + ext;

	// Create a file object to save the eps
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


