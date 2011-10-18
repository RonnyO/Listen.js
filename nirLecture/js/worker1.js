/**
 * Worker demo code
 * @author Nir Geier
 *
 * Free to use any way you wish...
 **/
WorkerDemo = function() {

    // The current state of the worker
    var running = false;

    // The worker Id
    var id = Date.now();

    return{
        onMessage : function (msg) {
            self.postMessage({ info : 'Worker [' + id + '] got message:', data : msg});
        }
    };
}();

// The worker code MUST define this method.
// In the "main" script we call the postMessage(...) and it will trigger the onmessage(...)
// Self, this are both referencing the worker
self.addEventListener('message', function(e) {
    WorkerDemo.onMessage(e.data);
}, false);


