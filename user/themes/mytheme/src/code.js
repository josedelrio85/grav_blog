import styles from '../assets/styles.scss'
import { c2c } from './c2c'

/* Add smooth scroll */
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        // e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 70
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

// document.addEventListener('DOMContentLoaded', (e) => {
//   const forms = document.forms;
//   for(let i=0; i < forms.length; i++){
//     forms[i].addEventListener('submit', (e) => {
//       console.log("set logic when form["+i+"] is submitted");
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', (e) => {
  let bsc = new c2c();

  let C2cDeskop = document.querySelector('.click-to-call-desktop');
  let C2cMobile = document.querySelector('.click-to-call-mobile');
  let closeC2cDeskop = document.querySelector('.click-to-call-desktop .close-c2c');
  let C2cSide = document.querySelector('.click-to-call-btn');
  let C2cMobileHeader = document.querySelector('.click-to-call-mobile .click-to-call--header');

  // close c2cDesktop when calling modalC2C
  // $('#click-to-call-popup').on('shown.bs.modal', function (e) {
  //   closeC2C();
  // })

  closeC2cDeskop.addEventListener('click', (event) => {
    closeC2C();
  });

  C2cSide.addEventListener('click', (event) => {
    C2cDeskop.classList.remove('c2c-collapsed');
    C2cSide.classList.remove('c2c-size-open');
  });

  C2cMobileHeader.addEventListener('click', (event) => {
    if(C2cMobile.classList.contains('c2c-mobile-open')) {
      C2cMobile.classList.remove('c2c-mobile-open');
      document.querySelector('.click-to-call-mobile .close-c2c').classList.add('d-none');
    } else {
      C2cMobile.classList.add('c2c-mobile-open');
      document.querySelector('.click-to-call-mobile .close-c2c').classList.remove('d-none');
    }
  });

  function closeC2C() {
    C2cDeskop.classList.add('c2c-collapsed');
    C2cSide.classList.add('c2c-size-open');
  }

  let phone = null;
  let smartcenter = PRODUCTION;
  let souid = SOU_ID;

  const dataLayer = {
    event: "event",
    eventCategory: "cmb",
    eventAction: "click",
    eventLabel: window.location.pathname === '/' ? 'index' : window.location.pathname ,
  }


  let c2cpopup_desktop = document.querySelector('.click-to-call--body.c2cdesktop .call-me-now');
  c2cpopup_desktop.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cdesktop")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
      };
      bsc.launchC2C(dataLead, dataLayer);
    }
  }

  let c2cpopup_mobile = document.querySelector('.click-to-call--body.c2cmobile .call-me-now');
  c2cpopup_mobile.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cmobile")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
      };
      bsc.launchC2C(dataLead, dataLayer);
      
      if(C2cMobile.classList.contains('c2c-mobile-open')) {
        C2cMobile.classList.remove('c2c-mobile-open');
        document.querySelector('.click-to-call-mobile .close-c2c').classList.add('d-none');
      }
    }
  }

  // let c2cpopup_modal = document.querySelector('.click-to-call--body.c2cmodal .call-me-now');
  // c2cpopup_modal.onclick = (e) => {
  //   e.preventDefault();

  //   if(validationFields(".click-to-call--body.c2cmodal")){
  //     const dataLead = {
  //       sou_id: souid,
  //       phone: phone,
  //       smartcenter: smartcenter,
  //     };

  //     bsc.launchC2C(dataLead, dataLayer);
  //     $('#click-to-call-popup').modal('hide');
  //   }
  // }

  // let ddi = document.querySelector('.ddi-desktop');
  // ddi.addEventListener('click', (e) => {
    // $('#click-to-call-popup').modal('show');
    
    // let C2cDeskop = document.querySelector('.click-to-call-desktop');
    // let C2cSide = document.querySelector('.click-to-call-btn');

    // C2cDeskop.classList.add('c2c-collapsed');
    // C2cSide.classList.add('c2c-size-open');
  // });

  function validationFields(parent) {
    let text = document.querySelector(parent +' .call-me-now-validation-error');
    if(!bsc.getLandingCommander().checkPhone(document.querySelector(parent +' .form-control').value)){
      text.classList.remove('d-none');
      text.textContent = "El número de teléfono no es válido";
      return;
    }

    if(!checkCheckbox(document.querySelector(parent +' .form-check-input'))){
      text.classList.remove('d-none');
      text.textContent = "Debes aceptar la política de privacidad";
      return;
    }
    phone = document.querySelector(parent +' .form-control').value;
    text.classList.add('d-none');
    return true;
  }

  function checkCheckbox(checkBox) {
    if (checkBox.checked == false){
      return false;
    }
    return true;
  }
});
