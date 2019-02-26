# XHRequest
Trying to do an easier way to perform JS XHR requests  than JQuery or native JS

How to prepare a Request

    var inst = Req(),
    inst.to = "path to request",
    inst.functC = (x) =>x.responseText 
    inst.Request()
    
Or simply execute it by

    Req(X,to,F)
    
Where

    boolean X, if True executes automatically
    string to, path to request
    function F = function to execute by requesting
    
Method is going to return an object anyway so properties values can be changed.
Declaring _ as function before Req is going to execute _ on every request

TODO

set Ev as Object with functions to execute on XHR load events
