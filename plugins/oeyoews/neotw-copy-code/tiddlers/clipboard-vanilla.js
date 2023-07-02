/*\
title: $:/plugins/oeyoews/neotw-copy-code/copyCode.js
type: application/javascript
module-type: library

eotw-copy-code widget

\*/
function addCopyButton() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(codeBlock => {
    const existingButton = codeBlock.querySelector('.copy-button');
    const codeElement = codeBlock.querySelector('code');
    // const cloneCodeElement = codeElement.cloneNode(true);
    // const fileType = codeElement?.className.split(' ')[0] ?? null; // get file type from first class name default ??
    const regex = /language-(\w+)/;
    const match = codeElement?.className?.match(regex);
    const fileType = match ? match[1] : null;

    // use hidden ???
    const showButton = buttonStatus => {
      codeBlock.addEventListener('mouseenter', () => {
        buttonStatus.classList.remove('hidden');
        buttonStatus.classList.add('block');
      });

      codeBlock.addEventListener('mouseleave', () => {
        buttonStatus.classList.remove('block');
        buttonStatus.classList.add('hidden');
      });
    };
    // ??
    if (existingButton && codeElement) {
      // to remove not hidden because of new codeblocks should add new copy button if dom has new pre>code
      // existingButton.remove();
      // TODO: need remove addEventListener ???
      // TODO transition hidden
      showButton(existingButton);
    } else {
      // TODO: option this hidden or not
      classNames =
        'copy-button float-right hover:bg-gray-200 transition duration-200 hidden ease-in p-2'; //  opacity-0 hover:opacity-100
      const copyButton = $tw.utils.domMaker('button', {
        text: fileType ? `${fileType} 📋` : '📋',
        class: fileType ? classNames : classNames + ' -m-4',
        attributes: {
          title: '',
        },
      });

      showButton(copyButton);

      const notify = () => {
        Swal.fire({
          title: `Copied to clipboard`,
          icon: 'success',
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
        });
      };

      copyButton.addEventListener('click', () => {
        navigator.clipboard
          .writeText(codeElement.textContent)
          .then(() => {
            if (typeof Swal?.fire === 'function') {
              notify();
            } else {
              copyButton.textContent = '✅ Copied!';
              setTimeout(() => {
                copyButton.textContent = fileType ? `${fileType} 📋` : '📋';
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });

        /**
         * preview
         *
         */
        /* if (isSuccess) {
          // confetti();
          // howler();

          const container = document.createElement('div');
          container.classList.add('max-w-full', 'overflow-auto'); // 添加适当的容器样式

          const copiedCodeNode = document.createElement('pre');
          copiedCodeNode.appendChild(cloneCodeElement);
          copiedCodeNode.classList.add(
            'bg-gray-200',
            'shadow-sm',
            'p-0',
            'rounded',
            'text-base',
            'font-mono',
            'leading-relaxed',
            'text-left',
            'overflow-x-auto',
            'whitespace-pre-wrap',
            'border',
            'border-none',
            'break-words',
            'max-h-48', // 添加最大高度限制，例如48像素
          );
          container.appendChild(copiedCodeNode);
          // TODO: add preview option configuration
        */
      });
      codeElement?.parentNode?.insertBefore(copyButton, codeElement);
    }
  });
}

module.exports = {
  addCopyButton,
};
