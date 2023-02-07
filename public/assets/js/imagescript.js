var buttonEl = $('#apiCheck');
buttonEl.on('click', function(){
    console.log('i was clicked')
    if (localStorage.getItem('key') === null) {
        window.location.href="./APIRegistration.html"
    }
    else {
        window.location.href="./comicindex.html"
    }
})




