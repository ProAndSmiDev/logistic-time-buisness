;
(function() {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.nav__burger');

 burger.addEventListener('click', () => {
   burger.classList.toggle('active');

   (burger.classList.contains('active'))
     ? menu.classList.add('active')
     : menu.classList.remove('active');
 });
})();