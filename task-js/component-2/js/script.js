(function() {
  /* Код компонента пишите здесь */
  const regExpTel = /^((\+7)[\- ]{0,2})?(\(?\d{3}\)?[\- ]{0,2})?[\d\- ]{7,10}$/;
  const regExpDate = /^\d{2}([./-])\d{2}\1\d{4}$/
  const fieldCorrect = 'field-correct';
  const fieldError = 'field-error';
  const submitBtn = document.querySelector('.submit-btn');
  const tel = document.querySelector('#phone');
  const checkinDate = document.querySelector('#checkin-date');
  const checkoutDate = document.querySelector('#checkout-date');
  const adults = document.querySelector('#adults');
  const children = document.querySelector('#children');
   const radio1 = document.querySelector('#radio-1')
   const radio2 = document.querySelector('#radio-2')
   const radio3 = document.querySelector('#radio-3')

  const validateTel = (data, classNameCorrect, classNameError) => {
    if(data.tel.match(regExpTel)) {
      tel.classList.remove(classNameError)
      tel.classList.add(classNameCorrect)
    } else {
      tel.classList.remove(classNameCorrect)
      tel.classList.add(classNameError)
    }
  }

  function transformDateSting(date) {
    if(date.match(regExpDate)) {
      const [day, month, year] = date.split(/[./-]/)
       return (new Date(`${year}-${month}-${day}`))
    } else {
      return date
    }
  }

  const validateDate = (data, fieldCorrect, fieldError) => {
    const dateIn = transformDateSting(data.dateIn)
    const dateOut = transformDateSting(data.dateOut)
    const minus = new Date(dateOut) - new Date(dateIn)
    if(new Date(dateIn) && new Date(dateOut) && (minus >= 345600000)) {
      checkinDate.classList.remove(fieldError)
      checkoutDate.classList.remove(fieldError)
      checkinDate.classList.add(fieldCorrect)
      checkoutDate.classList.add(fieldCorrect)
    } else {
      checkinDate.classList.remove(fieldCorrect)
      checkoutDate.classList.remove(fieldCorrect)
      checkinDate.classList.add(fieldError)
      checkoutDate.classList.add(fieldError)
    }
  }

  const valueRadio = (radio1, radio2, radio3) => {
    if(radio1.checked) {
      return 'single'
    } else if(radio2.checked) {
      return 'double'
    } else {
      return 'family'
    }
  }

  const validateGuests = (data, fieldCorrect, fieldError) => {

    if(data.adults >= 1 && (data.adults >= data.children)) {
      if(data.radio === 'single' && data.adults === '1') {
        adults.classList.remove(fieldError)
        children.classList.remove(fieldError)
        adults.classList.add(fieldCorrect)
        children.classList.add(fieldCorrect)
      } else if(data.radio === 'family' && data.adults >= 2 && data.children >= 1) {
        adults.classList.remove(fieldError)
        children.classList.remove(fieldError)
        adults.classList.add(fieldCorrect)
        children.classList.add(fieldCorrect)
      } else if(data.radio === 'double') {
        adults.classList.remove(fieldError)
        children.classList.remove(fieldError)
        adults.classList.add(fieldCorrect)
        children.classList.add(fieldCorrect)
      } else {
        adults.classList.remove(fieldCorrect)
        children.classList.remove(fieldCorrect)
        adults.classList.add(fieldError)
        children.classList.add(fieldError)
      }
    } else {
      adults.classList.remove(fieldCorrect)
      children.classList.remove(fieldCorrect)
      adults.classList.add(fieldError)
      children.classList.add(fieldError)
    }
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const radio = valueRadio(radio1, radio2, radio3)
    const data = {
      tel: tel.value,
      dateIn: checkinDate.value,
      dateOut: checkoutDate.value,
      adults: adults.value,
      children: children.value,
      radio: radio,
    };

    validateTel(data, fieldCorrect, fieldError);
    validateDate(data, fieldCorrect, fieldError)
    validateGuests(data, fieldCorrect, fieldError)
  })

})();
