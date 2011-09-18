/**
 * This code is for the lecture and for debugging.
 *  The is no real need for it
 **/

FilesManager.debug = function() {

    return{

        printFilesInfo: function(files) {

            // Debug
            // Local variables
            var index, fileInfo, attribute;

            // Print the files and the info that we get from them.
            for (index in files) {
                if (files.hasOwnProperty(index)) {
                    // Loop over each attribute of the files metadata and print it
                    fileInfo = files[index];

                    console.group(fileInfo.fileName);
                    for (attribute in fileInfo) {
                        if (fileInfo.hasOwnProperty(attribute)) {
                            console.log(attribute + ' : ' + fileInfo[attribute]);
                        }
                    }
                    console.groupEnd();

                } // hasOwnProperty

            } // for index
        } // printFilesInfo

    }; // return
}();

