import styles from './styles.scss'

document.addEventListener('DOMContentLoaded', (e) => {

  // const forms = document.forms;
  // for(let i=0; i < forms.length; i++){
  //   forms[i].addEventListener('submit', (e) => {
  //     console.log("set logic when form["+i+"] is submitted");
  //   });
  // }
});


jQuery(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
    console.log("hiding p elements to test jQuery with webpack");
  });
});