/**
 * This file will contain the FileSystem demo API + Logic
 * Author: Nir Geier
 *
 * The code is under no license.
 * You are free to do whatever you want with it.
 */
var FilesManager = function() {

    // private section

    // The files that we are processing
    var files;

    // The tree representation
    var tree;

    // The code settings
    var settings = {

        // The file input field id
        ID_FILE_INPUT : 'folderInput'

    };

    /**
     * This method will set up the events, listeners and any other bindings that we might need
     * later on in our code
     */
    function setBindings() {

        // Add the event listener to the folder selector.
        // Once we select the folder we want to load adn store the files in it,
        document.querySelector('#' + settings.ID_FILE_INPUT).addEventListener("change",
            function (e) {
                console.log('(#' + settings.ID_FILE_INPUT + ').addEventListener');
                console.log(tree);

                // Read the files and display them as tree
                tree.init(e);

                // Process the files in the directory
                processDirectory();
            }, false);
    }

    /**
     ** Read the metadata of the files in the given directory
     */
    function processDirectory() {
        console.log('processDirectory');

        // fetch the lists of files
        // The files attribute is returning a FileList object
        files = $('#' + settings.ID_FILE_INPUT)[0].files;

        // Debug - print the files metadata
        FilesManager.debug.printFilesInfo(files);
    }

    /** Public section **/
    return {

        /**
         * Ant init/setup logic we will place in here
         */
        init: function() {
            // Set the needed events/listeners/binding
            setBindings();

            tree = new FilesManager.Tree('#dir-tree');

        },

        /**
         * "API" calls
         */

        /**
         * Get the list of files in the directory
         *
         * @return {Array}  files   List of files
         */
        getFiles:function() {

        }
    }; //return;
}();

/**
 * Init the file manager whn teh page is fully loaded
 */
$(document).ready(function() {
    FilesManager.init();
});
