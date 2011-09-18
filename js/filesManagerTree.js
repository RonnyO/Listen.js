/**
 ** This file will handle the tree representation of the files dir
 **/

/**
 *
 * @param selector The selector in our demo is UL whicch the files will be added to it as LI entries
 */
FilesManager.Tree = function(selector) {

    // The tree dom node
    var domObject = $(selector);
    var files = [];
    var listHtml = [];
    var tree_ = {};
    var pathList_ = [];

    return{

        render : function(object) {
            if (object) {
                for (var folder in object) {
                    if (!object[folder]) { // file's will have a null value
                        listHtml.push('<li><a href="#" data-type="file">', folder, '</a></li>');
                    } else {
                        listHtml.push('<li><a href="#">', folder, '</a>');
                        listHtml.push('<ul>');
                        this.render(object[folder]);
                        listHtml.push('</ul>');
                    }
                }
            }
        },

        buildFromPathList : function(paths) {
            for (var i = 0, path; path = paths[i]; ++i) {
                var pathParts = path.split('/');
                var subObj = tree_;
                for (var j = 0, folderName; folderName = pathParts[j]; ++j) {
                    if (!subObj[folderName] && folderName != '.') {
                        subObj[folderName] = j < pathParts.length - 1 ? {} : null;
                    }
                    subObj = subObj[folderName];
                }
            }
            return tree_;
        },

        init : function(e) {
            // Reset
            listHtml = [];
            tree_ = {};
            pathList_ = [];
            files = e.target.files;

            // TODO: optimize this so we're not going through the file list twice
            // (here and in buildFromPathList).
            var output = [];
            for (var i = 0, file; file = files[i]; ++i) {
                pathList_.push(file.webkitRelativePath);
                output.push(file.webkitRelativePath);
            }

            this.render(this.buildFromPathList(pathList_));

            domObject.html(listHtml.join('')).tree({
                expanded: 'li:first'
            });

            // Add full file path to each DOM element.
            var fileNodes = domObject.get(0).querySelectorAll("[data-type='file']");
            for (var i = 0, fileNode; fileNode = fileNodes[i]; ++i) {
                fileNode.dataset['index'] = i;
            }
        }
    };
};
