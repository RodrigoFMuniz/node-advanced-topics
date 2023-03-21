# Advanced node concepts


## How EventLoop works on the backstage



        // node myFile.js

        const pendingTimers = []
        const pendingOSTasks = []
        const pendingOperations = []


        // New timers, tasks , operations are recorded from  myFile running.
        myFile.runContents()    


        function shouldContinue(){
            // Check 1: Any pending setTimeout, setinterval, setImmediate
            // Check 2: Any pending OS tasks, like server listening port
            // Check 3: Any pending long running operations, like file system module, read/write information from a HDD.

            return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
        }

        // Entire body executes in one Tick

        while ( shouldContinue()){

            // 1) node looks at  pendingtimers  and sees  if any functions are ready to be called

            // 2) node looks at  pendingOSTasks  and pendingOperations and calls relevant callbacks
                
            // 3) Pause execution. Continue when ... 
            //  - a new pendingOSTask is done
            //  - a new pendingOperation is done
            //  - a timer is about to be complete
            // 
            // 4) Look at pendingTimers. Call any setImmediate

            // Handle any 'close' events
        }

        // exit back to terminal 
    

## Threads

- If node was a trully single thread, when calling the function below, we should get a benchmark which would be a sum of each execution. Instead of that , what we see is almost the same amount of time for each exectution.

        const crypto = require('crypto');

        const start = Date.now()

        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {

            console.log('1: ', Date.now() - start, 'ms');
        })

        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {

            console.log('2: ', Date.now() - start, 'ms');
        })

        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {

            console.log('3: ', Date.now() - start, 'ms');
        })

        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {

            console.log('4: ', Date.now() - start, 'ms');
        })

        // results

        1:  463 ms
        2:  466 ms
        3:  471 ms
        4:  490 ms

### Setting number of threads to be used

> `set UV_THREADPOOL_SIZE = 12 && node threads.js`