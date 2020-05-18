/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

export class responseC2C {
  constructor() {}

  handleStateCallMessage = (state, message) => {
    let mes1 = $('#helper_mes1').val();
    this.showOncallIcon();
    this.setMessagePopup(mes1, message);
    if (state === 5 || state == 6) {
      this.closePopup();
    }
  }

  handleBusinessHoursInfo = (bh) => {
    const mes1 = $('#helper_mes2').val();
    const mes4 = $('#helper_mes4').val();
    let outtimemes = bh.toLowerCase();
    outtimemes = outtimemes.charAt(0).toUpperCase() + outtimemes.slice(1)
    // const mes2 = outtimemes + '. ' + mes4;
    this.showPopup(true);
    this.setMessagePopup(mes1, outtimemes);
  }

  responseWeWontCall = () => {
    const mes1 = $('#helper_mes3').val();
    const mes2 = $('#form_error').val();

    this.showPopup(true);
    this.setMessagePopup(mes1, mes2);
  }

  setMessagePopup = (mes1, mes2) => {
    document.getElementById('call-me-later-pop-up').querySelector('.call-me-now-popup__title p').textContent = mes1;
    document.getElementById('call-me-later-pop-up').querySelector('.call-me-now-popup__sub-title p').textContent = mes2;
  }

  showPopup = (close) => {
    document.getElementById('call-me-later-pop-up').classList.add('call-me-now-popup--opened');

    if (close) {
      this.hideOncallIcon();
      this.closePopup();
    }
  }

  closePopup = () => {
    setTimeout(() => {
      document.getElementById('call-me-later-pop-up').classList.remove('call-me-now-popup--opened');
    }, 6000);
  }

  hideOncallIcon = () => {
    let oncall = $('.call-me-now-status--on-call');
    oncall.css('visibility', 'hidden');
  }

  showOncallIcon = () => {
    let oncall = $('.call-me-now-status--on-call');
    oncall.css('visibility', 'inherit');
  }
}

// export {
//   responseC2C,
// };
