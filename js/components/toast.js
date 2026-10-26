/**
 * Component: Toast Notification Controller
 */

let toastElement = null;
let toastMessageElement = null;
let toastTimeout = null;

function getToastElements() {
  if (!toastElement) {
    toastElement = document.getElementById('toast');
    toastMessageElement = document.getElementById('toast-message');
  }
  return { toastElement, toastMessageElement };
}

/**
 * Show a toast notification
 * @param {string} message - Notification text
 * @param {number} duration - Milliseconds to show (default 2800)
 */
export function showToast(message, duration = 2800) {
  const { toastElement, toastMessageElement } = getToastElements();
  if (!toastElement || !toastMessageElement) return;

  toastMessageElement.textContent = message;
  toastElement.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastElement.classList.remove('show');
  }, duration);
}
