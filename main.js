const cardsElement = document.querySelector('#cards')
const view = {
  displayCards(numbersOfCards) {
    let cardsHTML = ''
    for (let numbersOfCard = 0; numbersOfCard < numbersOfCards; numbersOfCard++) {
      cardsHTML += `<div class="card" style="width: 18rem;">
      <p class="point">5</p>    
      <img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png" alt="">
      <p class="point">5</p>
    </div>`
    }
    cardsElement.innerHTML = cardsHTML
  }
}

view.displayCards(52)