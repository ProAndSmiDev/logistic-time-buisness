;
(function() {
  class Select {
    constructor(selectElement) {
      this.selectElement = selectElement;
    }

    drawList() {
      const list = document.createElement('ul');

      list.classList.add('order-form__system-choice-list');

      for(let i = 1; i < this.selectElement.children.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerText = this.selectElement.children[i].innerText;
        list.appendChild(listItem);
      }

      return list;
    };
    getActiveList(buttonElement, list) {
      buttonElement.classList.toggle('active');
      list.classList.toggle('active');
    };
    deleteAllActive(el) {
      return el.classList.remove('active');
    };
    getActiveButton(el, button, items) {
      button.classList.remove('active');
      items.classList.remove('active');
      button.innerText = el.innerText;

      return button;
    };
    toggleSelectAttr(el, button) {
      return (el.innerText === button.innerText)
        ? el.setAttribute('selected', '')
        : el.removeAttribute('selected');
    };
    getActiveListElement(listItems, selectOptions, listButton) {
      listItems.addEventListener('click', (e) => {
        e.preventDefault();

        for(let c = 0; c < listItems.children.length; c++) {
          this.deleteAllActive(listItems.children[c]);
        }

        e.target.classList.add('active');

        this.getActiveButton(e.target, listButton, listItems);

        for(let o = 0; o < selectOptions.length; o++) {
          this.toggleSelectAttr(selectOptions[o], listButton);
        }
      });
  }
}
  const systemChoice = document.querySelector('.order-form__system-choice-select');
  const systemField = document.querySelector('.order-form__system-choice-wrapper');
  const systemButton = document.querySelector('.order-form__system-choice');
  const systemSelect = new Select(systemChoice);

  if(systemField.appendChild(systemSelect.drawList())) {
    const systemList = document.querySelector('.order-form__system-choice-list')

    systemButton.addEventListener('click', () => systemSelect.getActiveList(systemButton, systemList));
    systemSelect.getActiveListElement(systemList, systemChoice.children, systemButton);
  }
})();