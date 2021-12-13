const cardsElement = document.querySelector('#cards')
const symbols = ['https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png'
  , 'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png']

const GAME_STATE = {
  FirstCardAwaits: 'FirstCardAwaits',
  SecondCardAwaits: 'SecondCardAwaits',
  CardsMatch: 'CardsMatch',
  CardsMatchFail: 'CardsMatchFail',
  GameFinished: 'GameFinished'
}

const view = {
  displayCards(indexes) {
    let cardsHTML = ''
    indexes.forEach(index => {
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

const model = {
  revealedCards: []
}

const controller = {
  currentState: GAME_STATE['FirstCardAwaits'],
  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52))
  }
}

const utility = {
  getRandomNumberArray(count) {
    const cardsArray = Array.from(Array(count).keys())
    this.shuffle(cardsArray) //試玩時可拿掉
    return cardsArray
  },
  shuffle(arr) {
    for (let index = arr.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
  }
}

controller.generateCards()

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    view.flipCard(card)
  })
})
