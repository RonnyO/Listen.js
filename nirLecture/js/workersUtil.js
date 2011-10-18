/*
 This class simply invoke the demo code
 */
WorkersUtil = function() {

    // List of workers
    var workers = [];

    function setBindings() {

        var id, worker;

        // Worker1
        $('#worker1').bind('click', function() {
            id = this.id;

            // Create the worker
            worker = new Worker('js/' + id + '.js')

            // Save the reference to the worker
            workers[ id ] = worker;

            // Add listeners to workers
            worker.addEventListener('message', function(e) {
                console.log('Got message from worker: ', e);
            }, false);

            // Start the worker
            worker.postMessage('Start');
        });

    }

    return{
        init: function() {
            setBindings();
        }
    };

}();


$(document).ready(function() {
    WorkersUtil.init();
});


