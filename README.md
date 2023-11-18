![21 Savage](public/21savage.jpg)

## Installation

1. Clone repo
2. run `npm install`

## Usage
This app is for users to be able to put comments about 2121 savage and also be able to thumbs up or thumbs down and also delete
using font awsome 
1. run `npm run savage`
2. Navigate to `localhost:3000`
# savage-complete
# savage-complete
to make this project work i needed 
thumbUp: req.body.subtract ? req.body.thumbUp - 1 : req.body.thumbUp + 1,
also had to recreate a new function to target 
Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    
    fetch('messages', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp,
        'subtract': true,

        
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});