const cardsElement = document.querySelector('#cards')
const symbols = ['https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png']

const view = {
  displayCards() {
    const cardsArray = Array.from(Array(52).keys())
    utility.shuffle(cardsArray) //試玩時可拿掉
    let cardsHTML = ''
    cardsArray.forEach(index => {
      cardsHTML += this.getCardElement(index)
    })
    cardsElement.innerHTML = cardsHTML
  },
  getCardElement(index) {
    return `<div class="card back" data-index="${index}"></div>`
  },
  getCardContent(index) {
    const point = this.transformNumber((index % 13) + 1)
    const symbol = symbols[Math.floor(index / 13)]
    return `<p class="point">${point}</p>
      <img src="${symbol}" alt="">
      <p class="point">${point}</p>`
  },
  flipCard(card) {
    if (card.matches('.back')) {
      const index = Number(card.dataset.index)
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(index)
    } else {
      card.classList.add('back')
      card.innerHTML = null
    }
  },
  transformNumber(point) {
    switch (point) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
    }
    return point
  }
}

const utility = {
  shuffle(arr) {
    for (let index = arr.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
  }
}

view.displayCards()

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    view.flipCard(card)
  })
})
