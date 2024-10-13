// 1. Create abort controller and get signal
const abortController = new AbortController();
const signal = abortController.signal;
// 2. Add event listeners for both the buttons on the page
const apiCallBtn = document.getElementById("makeapicallbtn");
const cancelApiCallBtn = document.getElementById("cancelapicallbtn");
apiCallBtn.addEventListener("click", makeCall);
cancelApiCallBtn.addEventListener("click", cancelApiCall);
// 3. Write make call function for api call
function makeCall() {
    fetch("", {signal})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.error(err);
    })
}
// 4. Write cancel fn for the api call
function cancelApiCall() {
    abortController.abort();
}