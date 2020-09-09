;
(function(){
  const rangeInput = document.querySelector('#discount-range');
  const rangeLabel = document.querySelector('.order-form__discount-title');
  let rangeValWrapper = rangeLabel.querySelector('span');

  rangeInput.addEventListener('change', () => {
    return rangeValWrapper.innerText = rangeInput.value + '%';
  });
})();