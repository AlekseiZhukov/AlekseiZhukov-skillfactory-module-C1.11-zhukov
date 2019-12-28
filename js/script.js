
function jQuery (selector, context = document){
      this.elements = Array.from(context.querySelectorAll(selector));
      return this
    }

jQuery.prototype.each = function (fn){
      this.elements.forEach((element, index) => fn.call(element, element, index));
      return this;
    }

jQuery.prototype.html = function(htmlString){
      this.each(element => element.innerHTML = htmlString)
      return this;
    }

jQuery.prototype.hide = function(){
      this.each(element => element.style.display = 'none')
      return this;
    }

jQuery.prototype.click = function(fn){
      this.each(element => element.addEventListener('click', fn))
    return this
    }

jQuery.prototype.disabled = function(){
      this.each(element => element.setAttribute('disabled', true))
      return this;
    }

const $ = (e) => new jQuery(e);

let countSec = 0;
let countMin = 0;



const updateText = () =>{	
  $('.minutes').html((0 + String(countMin)).slice(-2));
  $('.seconds').html((0 + String(countSec)).slice(-2));
}
updateText();



const countDown = () => {	
  $('.start').disabled();
	let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  
  if (total <= 0) {
    clearInterval(timeinterval);
    $('.countdown').hide();
    $('.message').html('<p>I am done...</p>');
  }
  if(countSec > 0) countSec--;
  else{
  	countSec = 59;
    countMin--;
  } 
  
  updateText();

$('.pause').click( e => {
   clearInterval(timeinterval);
 });
}

$('.plus').click(e =>{
  if(countSec < 59) ++countSec;
  else{
    countSec = 0;
    ++countMin;
  }
  updateText()
});

$('.minus').click(e=> { 
  if(countMin <= 0 && countSec===0){
    countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
    countSec = 59;
    --countMin;
  }
  updateText();
});

$('.start').click(e=> countDown());

$('.resum').click( e => {
    countDown();
});

$('.reset').click(e => {
  location.reload();
});

