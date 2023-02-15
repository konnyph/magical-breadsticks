var pageOneEl = $('#pageOne');
var pageTwoEl = $('#pageTwo');
var pageThreeEl = $('#pageThree');
var comicLayoutEl = $('#comic-layout');
var storySubmitBtnEl = $('#storySubmit');
var target1EL = $('#target1');
var target2EL = $('#target2');
var target3EL = $('#target3');
var target4EL = $('#target4');
var saveBtnEl = $('#saveBtn');
var quotes = [];
var payLoad = [];
var captions=[];
var clearEl = $('#clear');
var urls = [];
var comicText = [];

// API functions
// this function takes in words and makes them better
function fetchText(payLoad,i) {
    fetch("/api/comicFetch/text", {
        method: 'POST,',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "payload": `${payLoad}`
        })
    })
    .then(response => {
        return response.json()
    })
    .then(data=>{
        console.log(data)
        captions[i] =data;
        console.log(captions);
    })
        .catch(error => {
            console.log(error)
        });
    }
        
// this function calls to openAPI/DallE then returns the image url. payload is the string to feed the AI 
// comicLayoutEl is the jquery element that the picture will append to and i is the iterator

//payload is single string
function fetchDallE(payLoad,x,i) {
    fetch("/api/comicFetch/image", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "payload": `${payLoad}`,
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data=>{
        pictureUrl =  data;
        // console.log(data);
        // pictureUrl= APIResponse.data[0].url;
        // urls[i]=pictureUrl;
        x.append(`
        <figure class="figure comicContainer">
            <img src="${pictureUrl}" class="figure-img img-fluid rounded " alt="Image${i+1}">
            <figcaption id="fig-cap" class="figure-caption">${captions[i]}</figcaption>
        </figure>`);
    })
        .catch(error => {
            console.log(error)
        });

        // use APIResponse.data[0].url to grab image url.
}
// the fetch function retrieves an image and you need to use APIResponse.data[0].url to grab image url.
// end API function sections

    var stories = [story1, story2, story3, story4];
    var randomGen = Math.floor(Math.random() * stories.length);
    var storyCurrent= stories[randomGen];
    var storyGen = storyCurrent.narration;
    console.log(storyCurrent);

// the body of the main script is wrapped in a setTimeout function to prevent user from spamming API
// thus preventing failures.

setTimeout(function(){

    pageOneEl.remove();
    pageTwoEl.removeAttr('class');
    for (i=0; i < storyGen.length; ++i){
        var temp =storyGen[i].split("*");
        console.log(temp);
        var tempEl = $(`#story${i+1}`);
        tempEl.text("");
        tempEl.html(`
        <span>
                 ${temp[0]}<input class="specificInput" type="text" id="payLoadA${i}">${temp[1]}
                  <input class="specificInput" type="text" id="payLoadB${i}">${temp[2]}
        </span>`)
    }    

    var storySubmitBtnEl = $('#storySubmit')
    var loadingEl = $('#loading');

    storySubmitBtnEl.on('click', function(event){
        event.preventDefault(event);
        for (i=0; i < storyGen.length; ++i) {
            var tempPayload = [];
            tempPayload[0] = $(`#payLoadA${i}`).val();
            tempPayload[1] = $(`#payLoadB${i}`).val();
            var currentTemp = stories[randomGen].payLoadGuide[i];
            // console.log(currentTemp);
            var index = 1;
                for (n=0; n<2; ++n) {
                    index = currentTemp.indexOf('*');
                    currentTemp[index] = ` ${tempPayload[n]} `;
                }
            currentTemp = currentTemp.join('');
            // console.log(currentTemp);
            payLoad[i] = `${storyCurrent.style} ${currentTemp}`;
            console.log(payLoad);
            }
            storySubmitBtnEl.attr('class', 'invisible');
            clearEl.attr('class', 'invisible');
            pageTwoEl.attr('class', 'invisible');
            loadingEl.attr('class', 'loading');
            pageTwoEl.remove();

            var i = 0
            payLoad.forEach((element) => {
                console.log(element)
              fetchText(element,i);
              if (i === 0) {
                fetchDallE(element, target1EL, i);
              }
              else if (i === 1) {
                fetchDallE(element, target2EL, i);
              }
              else if (i === 2) {
                fetchDallE(element, target3EL, i);
              }
              else {
                fetchDallE(element, target4EL, i);
              }
            i = i+1;
            })
            
            setTimeout(function(){
                loadingEl.removeAttr('class');
                pageThreeEl.removeAttr('class');
            },5000)

})


})

clearEl.on("click", (event) => {
    event.preventDefault();
    for (i=0;i<storyGen.length; ++i) {
     var Aremove = $(`#payLoadA${i}`);
     var Bremove = $(`#payLoadB${i}`);
     Aremove.val('');
     Bremove.val('');
    }
  })

  saveBtnEl.on('click', function() {
    pageThreeEl.attr('class', 'invisible');
    if (localStorage.getItem('historyImg')===null){
        var historyCapArr = [];
        var historyImgArr = [];
        for (n=0; n < 4; ++n) {
            var tempImg = urls[n];
            var tempCap = captions[n];
            historyImgArr[n]=tempImg;
            historyCapArr[n]=tempCap;
        }
        console.log(historyCapArr);
        console.log(historyImgArr);
        localStorage.setItem('historyImg', `${JSON.stringify(historyImgArr)}`);
        localStorage.setItem('historyCap', `${JSON.stringify(historyCapArr)}`);
    }

    else {
        var historyImgArr = JSON.parse(localStorage.getItem('historyImg'));
        var historyCapArr = JSON.parse(localStorage.getItem('historyCap'));


    for (n=0; n < captions.length; ++n) {
        historyImgArr.push(urls[n]) 
        historyCapArr.push(captions[n]);
    }
    }


    localStorage.setItem('historyImg', `${JSON.stringify(historyImgArr)}`);
    localStorage.setItem('historyCap', `${JSON.stringify(historyCapArr)}`);
  }) 