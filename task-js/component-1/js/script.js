(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */
 const accordeonItems = document.querySelectorAll('.accordeon-item');
 const classNameAccordeonItemOpen = 'accordeon-item--open';

 const setVisibleAccordeon = (e, className) => {
  e.preventDefault();

  if(settings.tabsLimit) {
    const accordeonItemOpens = document.querySelectorAll('.accordeon-item--open');

    if(settings.tabsLimit === accordeonItemOpens.length) {
      const thisAccordeonItemOpen = e.currentTarget.classList.contains(className)
      if(thisAccordeonItemOpen) {
        e.currentTarget.classList.remove(className)
      } else {
        accordeonItemOpens[0].classList.remove(className)
        e.currentTarget.classList.toggle(className)
      }
    } else {
      e.currentTarget.classList.toggle(className)
    }

  } else {
    e.currentTarget.classList.toggle(className)
  }
 }

  accordeonItems.forEach(item => {
    item.addEventListener('click', (e) => {
      setVisibleAccordeon(e,classNameAccordeonItemOpen)
    })
  })
})();
