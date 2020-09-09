;
(function(){
  const fileInput = document.querySelector('#order-file');
  const fileLabel = document.querySelector('.order-form__file-button');
  let fileLabelValWrapper = fileLabel.querySelector('span');

  fileInput.addEventListener('change', () => {
    if(fileInput.value) {
      const arrFilePath = fileInput.value.split('\\');
      const fileName = arrFilePath[arrFilePath.length - 1];

      return fileLabelValWrapper.innerText = fileName;
    }
    else {
      const fileName = "Прикрепить файл";

      return fileLabelValWrapper.innerText = fileName;
    }
  });
})();