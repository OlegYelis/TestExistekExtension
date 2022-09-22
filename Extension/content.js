function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

const createSelectEl = (target, ...values) => {
   const activeSelect = document.querySelector('.active-select');
   if (activeSelect) activeSelect.remove();

   const selectEl = document.createElement('select');
   selectEl.options[selectEl.length] = new Option('Select option');
   for (let val of values) {
      selectEl.options[selectEl.length] = new Option(val, val);
   }

   target.insertAdjacentElement('afterend', selectEl);
   selectEl.classList.add('active-select');

   return selectEl;
};

const replaceWord = (target, el, word, arr) => {
   el.addEventListener('change', evt => {
      el.remove();
      if (target.nodeName === 'DIV') {
         const indexWord = arr.lastIndexOf(`${word}`);
         arr.splice(indexWord, 1, evt.target.value);
         target.textContent = arr.join(' ');
         target.textContent += ' ';
         target.focus();
         return;
      }

      const indexWord = arr.lastIndexOf(`${word}`);
      arr.splice(indexWord, 1, evt.target.value);
      target.value = arr.join(' ');
      target.value += ' ';
      target.focus();
   });
};

const onTextChange = evt => {
   let str = evt.target.nodeName === 'DIV' ? evt.target.textContent : evt.target.value;
   let arr = str.trim().split(' ');
   let selectEl;

   el = arr[arr.length - 1];
   const activeSelect = document.querySelector('.active-select');
   if (activeSelect) activeSelect.remove();

   switch (el) {
      case 'Cat':
         selectEl = createSelectEl(evt.target, 'Dog', 'Rat', 'Bat');
         replaceWord(evt.target, selectEl, el, arr);
         break;
      case 'Helo':
         selectEl = createSelectEl(evt.target, 'hello', 'Help', 'Hell');
         replaceWord(evt.target, selectEl, el, arr);
         break;
      case 'heldp':
         selectEl = createSelectEl(evt.target, 'help', 'held', 'hello');
         replaceWord(evt.target, selectEl, el, arr);
         break;
   }
};

document.addEventListener("click", evt => {
   let elemName = evt.target.nodeName;

   if (elemName !== 'TEXTAREA' && elemName !== 'INPUT' && elemName !== 'DIV') return;
   if (elemName === 'DIV') {
      if (!evt.target.getAttribute('contenteditable')) return;
   }

   evt.target.addEventListener('input', debounce(onTextChange, 250));
});

// ---------- iframe ----------

const iframes = document.getElementsByTagName('iframe');

const readIframe = (iframe) => {
   iframe.addEventListener("click", evt => {
      let elemName = evt.target.nodeName;

      if (elemName !== 'TEXTAREA' && elemName !== 'INPUT' && elemName !== 'DIV') return;
      if (elemName === 'DIV') {
         if (!evt.target.getAttribute('contenteditable')) return;
      }

      evt.target.addEventListener('input', debounce(onTextChange, 250));
   })
};

for (const iframe of iframes) {
   readIframe(iframe);
};