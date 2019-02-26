
            /*
                ! How to prepare a Request
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

                Method is going to return an object anyway
                so properties values can be changed

                Declaring _ as function before Req is going to
                execute _ on every request

                xhr.upload.addEventListener('progress',x=>console.log(x));
                TODO
                set Ev as Object with functions to execute on XHR load events
            */


    let _ = () => 1;
    
    const Req = function(X,to,Ev,D) { 

        //PData = (Tio={}) => (Form=new FormData(),Object.keys(Tio).forEach(x=>Form.append(x,Tio[x])),Form);

        F = typeof Ev.ready == "function" ? Ev.ready : Ev;
        d = D instanceof FormData;
        let Requesting = {
            to : to,
            Request : ()=>{

                            var Response = Requesting.prep();
                            typeof Ev.progress == "function" ? Response.upload.addEventListener("progress",Ev.progress):0;
                            typeof Ev.loadstart == "function" ? Response.addEventListener("loadstart",Ev.loadstart):0;
                            typeof Ev.loadend == "function" ? Response.addEventListener("loadend",Ev.loadend):0;
                            typeof Ev.error == "function" ? Response.onerror=Ev.error:0;
                            typeof Ev.abort == "function" ? Response.onabort=Ev.abort:0;
                            Response.open(d?"POST":"GET", Requesting.to, true);
                            Response.setRequestHeader("X-Requested-With","XMLHttpRequest");
                            Response.send(d?D:0);
                          },
            functC : F||((x)=>console.log(x.responseText)),
            fWrap: function(){

                        if(this.readyState == 4 && this.status == 200){
                            typeof _ == "function"?_(this.responseText):0;
                            Requesting.functC(this);
                        }
                   },
            prep : () => {

                        var Response = new XMLHttpRequest();
                        Response.onreadystatechange = Requesting.fWrap;
                        return Response
                   }
        };
		X?Requesting.Request():0;
        return Requesting
    }

