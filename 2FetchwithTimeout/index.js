// const fetchWithTimeout = function(){
//     // ... your code goes here
//   }
  
  
//   fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 100).then((resp) => {
//     console.log(resp);
//   }).catch((error) => {
//     console.error(error);
//   });
  
//   // Aborted
//   // error


const fetchWithTimeout = function(url, timeout){
    console.log("resp");
    return new Promise((resolve, reject)=> {
        const abortController = new AbortController();
        const signal = abortController.signal;    
        let timerId = null;
        fetch(url, { signal }).then((res)=> {
            res.json().then((dat)=>{
                clearTimeout(timerId);
                resolve(dat);
            }).catch((err)=>{
                reject(err)
            })
        }).catch((err)=>{
            reject(err)
        });

        timerId = setTimeout(()=>{
            abortController.abort()
        }, timeout)
    }) 
}


fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 100).then((resp) => {
    console.log(resp);
}).catch((error) => {
    console.error(error);
});

  // Aborted
  // error

