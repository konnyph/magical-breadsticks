var APIButtonEl = $('#APISubmitBtn');
var APIFormEl = $('#APIentry');
var APIMessage = ($('#keyInputMessage'))

APIButtonEl.on('click', function(event){
    event.preventDefault();
    var temp = APIFormEl.val()
    var testTemp = temp.length
    if (testTemp === 51) {
    localStorage.setItem('key', `${APIFormEl.val()}`);
    window.location.href= "./comicindex.html";
    }
    else {
        APIFormEl.val('oops try again');
    }
})