function init_fbox() {
  const images = document.querySelectorAll('img');

  images.forEach((image, index) => {
    var parent = image.parentElement;
    var hasFancybox = parent.hasAttribute('data-fancybox');
    if (hasFancybox) return;
    if (parent && !parent.hasAttribute('data-fancybox')) {
      const link = document.createElement('a');
      link.href = image.getAttribute('src');
      link.setAttribute('data-fancybox', '');
      image.parentNode.replaceChild(link, image);
      link.appendChild(image);
    }
  });
}

init_fbox();

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  var element = document.elementFromPoint(x, y);
  if (element?.tagName.toLowerCase() === 'img') {
    init_fbox();
  }
});

// WIP dblclick is not suitable
// if (!fbox_initialized) {
// document.addEventListener('dblclick', () => {
//   // listen to any DOM change and automatically perform spacing via MutationObserver()
//   init_fbox();
//   // console.log('init_fbox');
//   // console.log(fbox_initialized);
// });
// }
// const lables = document.querySelectorAll('img');
// const elem = document.createElement('a');
// lables.forEach((lable, index) => {
//   const elem = document.createElement('a');
//   elem.href = lable.getAttribute('src');
//   elem.setAttribute('data-fancybox', 'gallary');
//   lable.parentNode.replaceChild(elem, lable);
//   elem.appendChild(lable);
// });
