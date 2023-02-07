

storyListEl = $('#storyList');

if (localStorage.getItem('historyImg') === null) {
    storyListEl.append(`<img src="./Images/take-a-sip.png" style="width:25%">
                        <p> <a href = './comicindex.html'> Fill out a story to get started! </p>`)
}

var imageArr = JSON.parse(localStorage.getItem('historyImg'));
var capArr = JSON.parse(localStorage.getItem('historyCap'));

for (i=0; i<imageArr.length; i) {
    console.log(i);
    storyListEl.append(`
      <div class="container comicContainer">
        <div class="row">
          <div id="target${i}" class="col col-6"></div>
          <div id="target${i+1}" class="col col-6"></div>
        </div>
        <div class="row">
          <div id="target${i+2}" class="col col-6"></div>
          <div id="target${i+3}" class="col col-6"></div>
        </div>
      </div>`);
    for (n=0; n<4; ++n) {
        var tempTarget = $(`#target${i+n}`);
        tempTarget.append(`
        <figure class="figure">
        <img src="${imageArr[i+n]}" class="figure-img img-fluid rounded" alt="Image${i+n}">
        <figcaption class="figure-caption">${capArr[i+n]}</figcaption>
        </figure>`)
    }
    i = i + 4;
}
