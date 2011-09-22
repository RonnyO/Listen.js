/**
 * @class This file will contain the FileSystem demo API + Logic<br/>
 * @author Nir Geier<br/>
 * <br/>
 * The code is under no license.<br/>
 * You are free to do whatever you want with it.<br/>
 */
var FilesManager = function() {

    // private section

    /**
     * The array fo files that were found in the given directory
     *
     * @type {Array} type
     * @field The field
     * @private private
     */
    var files;

    /**
     * The jQuery tree plugin to display the file as tree
     *
     * @type {jQuery.tree}
     * @field The field
     * @private private
     */
    var tree;

    /**
     * Object with the different settings/defaults that the user can change
     *
     * @type {Object}
     * @field The field
     * @private private
     */
    var settings = {

        /** The file input field id */
        ID_FILE_INPUT : 'folderInput'

    };

    /**
     * This method will set up the events, listeners and any other bindings that we might need later on in our code
     *
     * @private private
     */
    function setBindings() {

        // Add the event listener to the folder selector.
        // Once we select the folder we want to load adn store the files in it,
        document.querySelector('#' + settings.ID_FILE_INPUT).addEventListener("change", function(e) {
            console.log('(#' + settings.ID_FILE_INPUT + ').addEventListener');
            console.log(tree);

            // Read the files and display them as tree
            tree.init(e);

            // Process the files in the directory
            processDirectory();
        }, false);
    }

    /**
     * Read the files in the choosen directory
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
         * Init the FilesManager. <br/>
         * Here we will call the binding method and will init our tree
         *
         * @public
         * @param {String [optional]} [selector]  The selector of the dom element to display the results inside
         */
        init : function() {
            // Set the needed events/listeners/binding
            setBindings();

            // init the tree
            tree = new FilesManager.Tree('#dir-tree');

        },

        /** "API" calls */

        /**
         * Get the list of files in the directory
         *
         * @return {Array}  files   the list of the current processed files in the chosen directory
         */
        getFiles : function() {
            return files;
        }
    }; //return;
}();

/**
 * Init the file manager whn teh page is fully loaded
 */
$(document).ready(function() {
    FilesManager.init();
});
