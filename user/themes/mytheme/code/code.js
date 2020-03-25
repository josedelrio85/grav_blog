import styles from './styles.scss'

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
