
const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
  
    this.el.classList.remove('btn-up_hide');
  },
  hide() {

    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
   
    window.addEventListener('scroll', () => {
   
      const scrollY = window.scrollY || document.documentElement.scrollTop;
    
      scrollY > 400 ? this.show() : this.hide();
    });
    
    document.querySelector('.btn-up').onclick = () => {
   
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();

const btnBottom = {
   el: document.querySelector('.btn-bottom'),
  show() {
  
    this.el.classList.remove('btn-bottom_hide');
  },
  hide() {

    this.el.classList.add('btn-bottom_hide');
  },
  addEventListener() {
   
    window.addEventListener('scroll', () => {
   
      const scrollY = window.scrollY || document.documentElement.scrollTop;
    
      scrollY < 400 ? this.show() : this.hide();
    });
     document.querySelector('.btn-bottom').onclick = () => {
   
      window.scrollTo({
        top: 5000,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}


btnBottom.addEventListener();

