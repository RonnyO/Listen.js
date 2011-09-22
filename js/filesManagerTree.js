/**
 * @class This class is responsible for displaying the files as tree.<br/>
 * <br/>
 * @author Nir Geier<br/>
 **/

/**
 *
 * @param selector The selector in our demo is UL whicch the files will be added to it as LI entries
 */
FilesManager.Tree = function(selector) {

    /**
     * The output dom selector for printing out the files as tree
     *
     * @type {Array} type
     * @field The field
     * @private
     */
    var domObject = $(selector);

    /**
     * The files that this tree is displaying
     *
     * @type {Array}
     * @field
     * @private
     */
    var files = [];

    /**
     * The html that contains the details fo all the files. The html is Array of dom elements
     *
     * @type {Array}
     * @field
     * @private
     */
    var outputHtml = [];


    /**
     * The tree structure of teh files.<br/>
     * The tree is a (JSON) object that store the files and folder in levels as in real tree,
     *
     * @type {Object}
     * @field
     * @private
     */
    var tree = {};

    /**
     * Generate the tree html representation of the selected path. <br/>
     *
     * @param {Array}  pathList    Array of path(s) of all files in the selected directory
     */
    function pathToHtml(pathList) {
        var folder;

        // Verify that we have any data to process
        if (pathList) {

            // Loop over every path entry and process it.
            for (folder in  pathList) {

                // safety
                if (pathList.hasOwnProperty(folder)) {

                    // Check if teh entry if folder or file
                    // file's will have a null value
                    if (pathList[folder]) {
                        // Add a new folder entry
                        outputHtml.push('<li><a href="#">', folder, '</a>');

                        // Sub list for the new folder
                        outputHtml.push('<ul>');

                        // recursive. Generate html for the current folder
                        pathToHtml(pathList [folder]);

                        // Folder is processed. close the sub list
                        outputHtml.push('</ul>');
                    } else {
                        // file, set the html5 "custom data attributes" to file
                        outputHtml.push('<li><a href="#" data-type="file">', folder, '</a></li>');
                    }  // else
                } // hasOwnProperty
            } // for loop
        }  //  if (pathList)
    }

    /**
     * Build the tree from the given path(s)
     *
     * @param paths
     */
    function buildTree(paths) {

        var i,path, subTree;

        subTree = tree;
        // JS5 forEach loop
        paths.forEach(function(path /*, index, originalArray */) {

            // Loop over each directory in the given path
            path.split('/').forEach(function(folder /*, index, originalArray */) {
                // Check to see if this folder was initialized already or not
                if (!subTree[folder] && folder !== ".") {

                }
            });

        });
        for (i = 0; path = paths[i]; ++i) {
            var pathParts = path.split('/');
            var subObj = tree;
            for (var j = 0, folderName; folderName = pathParts[j]; ++j) {
                if (!subObj[folderName] && folderName != '.') {
                    subObj[folderName] = j < pathParts.length - 1 ? {} : null;
                }
                subObj = subObj[folderName];
            }
        }
        return tree;
    }

    return{

        init : function(e) {

            var pathList = [];

            // Reset
            outputHtml = [];
            tree = {};
            files = e.target.files;

            // TODO: optimize this so we're not going through the file list twice
            // (here and in buildTree).
            var output = [];
            for (var i = 0, file; file = files[i]; ++i) {
                pathList.push(file.webkitRelativePath);
                output.push(file.webkitRelativePath);
            }

            pathToHtml(buildTree(pathList));

            domObject.html(outputHtml.join('')).tree({
                expanded: 'li:first'
            });

            // Add full file path to each DOM element.
            var fileNodes = domObject.get(0).querySelectorAll("[data-type='file']");
            for (var i = 0, fileNode; fileNode = fileNodes[i]; ++i) {
                fileNode.dataset['index'] = i;
            }
        },

        readFile:function() {
            document.querySelector('input[type="file"]').onchange = function(e) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var dv = new DataView(this.result);

                    // "TAG" starts at byte -128 from EOF.
                    // See http://en.wikipedia.org/wiki/ID3
                    if (dv.getString(3, dv.length - 128) == 'TAG') {
                        var title = dv.getString(30, dv.tell());
                        var artist = dv.getString(30, dv.tell());
                        var album = dv.getString(30, dv.tell());
                        var year = dv.getString(4, dv.tell());
                    } else {
                        // no ID3v1 data found.
                    }
                };

                reader.readAsArrayBuffer(this.files[0]);
            };
        }

    };
};
