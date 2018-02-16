const scraper = require('scrape-it')
const fs = require('fs')
var cardObj = {
  table: []
};

const gatherData = function() {
  const arr = []
  for (let i = 0; i < 250; i++) {
    scraper(`http://www.yugioh.com/cards?page=${i}`, {
      avatar: {
        selector: "img"
        ,attr: "src"
      }
    }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data)
      cardObj.table.push(data)
      arr.push(data)
    }).then(()=>{
      writeData(arr)
    })
  }
}
const writeData = function(data) {
  fs.writeFile('cards.json',JSON.stringify(cardObj) ,function(err){
    if(err) throw err;
  })
}

gatherData()