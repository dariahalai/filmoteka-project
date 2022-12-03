export default function spinnerToggle() { 
  document.querySelector('.spinner').classList.toggle("is-hidden");
}

// потрібно викликати функцію spinnerToggle(), для цього у js файлі до якого функція викликається потрібно зробити імпорт:     import spinnerToggle from './js/spinner';
// Функція просто забирає у спінера display:none, тому коли сторінка завантажиться потрібно знову викликати функцію.
