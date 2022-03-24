function Summ(){return this.amount * this.price}
function Kcall(){return this.amount * this.kcall}
const products = {
  plainBurger: {
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 500,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 700,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
  freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 1230,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
}
const extraProducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 500,
    kcall: 200,
  },
  lettuce: {
    name: 'Салатный лист',
    price: 400,
    kcall: 40,
  },
  cheese: {
    name: 'Сыр',
    price: 700,
    kcall: 130,
  },
}

const mainProducts = document.querySelectorAll('.main__product')
const addCart = document.querySelector('.addCart')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const receiptBtnClose = document.querySelector('.receipt__window-btn')

let arrProducts = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0

addCart.addEventListener('click', function(){
  for(const key in products){
    const pObj = products[key]
    if(pObj.amount > 0){
      arrProducts.push(pObj)
      pObj.name += `:${pObj.amount}`
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `\n${extraProducts[info].name}`
        }
      }
      pObj.name += `\nСтоимость: ${pObj.Summ()}\nКаллории: ${pObj.Kcall()}`
    }
  }
  for(let i = 0; i < arrProducts.length; i++){
    totalName += `\n${arrProducts[i].name}\n`
    totalPrice += arrProducts[i].Summ()
    totalKcall += arrProducts[i].Kcall()
  }
  receiptOut.innerHTML = `Ваш заказ:\n${totalName}\nКаллорийность: ${totalKcall}\nОбщая стоимость: ${totalPrice}`
  
  receipt.style.display = 'flex'
  setTimeout(function(){
    receipt.style.opacity = '1'
  }, 100)
  setTimeout(function(){
    receiptWindow.style.top = '10%'
  }, 300)
})

receiptBtnClose.addEventListener('click', function(){
  window.location.reload()
})
// let arr = ['http://google.com', 'http://yandex.ru', 'http://proweb.uz']
// receiptBtnClose.addEventListener('click', function(){
//   arr.forEach(function(link, key){
//     setTimeout(function(){
//       open(link, '50px', '50px')
//     }, 100)
//   })
// })


mainProducts.forEach(function(card, key){
  const cardBtns = card.querySelectorAll('.main__product-btn')
  const cardId = card.getAttribute('id')
  const productNum = card.querySelector('.main__product-num')
  const productPrice = card.querySelector('.main__product-price span')
  const productKcall = card.querySelector('.main__product-kcall span')
  const extraCheck = card.querySelectorAll('.main__product-checkbox')
  
  extraCheck.forEach(function(check, checkKey){
    check.addEventListener('click', function(){
      const dataExtra = check.getAttribute('data-extra');
      products[cardId][dataExtra] = check.checked
      
      if(products[cardId][dataExtra] == true){
        products[cardId].price += extraProducts[dataExtra].price
        products[cardId].kcall += extraProducts[dataExtra].kcall
      }else{
        products[cardId].price -= extraProducts[dataExtra].price
        products[cardId].kcall -= extraProducts[dataExtra].kcall
      }
      productPrice.innerHTML = products[cardId].Summ()
      productKcall.innerHTML = products[cardId].Kcall()
    })
  })
  
  cardBtns.forEach(function(btn, btnKey){
    btn.addEventListener('click', function(){
      const dataSymbol = btn.getAttribute('data-symbol')
      
      if(dataSymbol == '+' && products[cardId].amount < 30){
        products[cardId].amount++
      }else if(dataSymbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      productNum.innerHTML = products[cardId].amount;
      productPrice.innerHTML = products[cardId].Summ();
      productKcall.innerHTML = products[cardId].Kcall();
    })
  })
})















// дз
const logo = document.querySelector('.header__timer-extra')
// let speed = 50
// function lvl(i){
//   console.log(i++);
//   if(i>50 && i<=60){speed = 100}
//   else if(i>60 && i<=70){speed = 150}
//   else if(i>70 && i<=80){speed = 200}
//   else if(i>80 && i<=90){speed = 250}
//   else if(i>90 && i<=100){speed = 300}
  
//   if(i <= 100){
//     setTimeout(function(){
//       lvl(i)
//     }, speed)
//   }
// }
// lvl(0)
function lvl(i){
  // console.log(i++);
  i++
  logo.innerHTML = i
  if(i < 100){
    setTimeout(function(){
      lvl(i)
    }, i + i)
  }
}
lvl(0)

// дз2
const cards = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const closeBtn = document.querySelector('.view__close');
cards.forEach(function(card, key){
  card.addEventListener('dblclick', function(){
    const imgSrc = card.querySelector('img').getAttribute('src');
    console.log(imgSrc);
    view.classList.add('active')
    // view.querySelector('img').setAttribute('src', imgSrc)
    view.querySelector('img').src = imgSrc
    
  })
})
closeBtn.addEventListener('click', function(){
  view.classList.remove('active')
})

