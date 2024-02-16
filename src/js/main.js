

// close tooltip map
document.querySelector('.contact__tooltip-close').addEventListener('click', () =>{
    document.querySelector('.contact__tooltip').classList.add('close')
});

//search open
document.querySelector('.header__form-button').addEventListener('click', () => {
    document.querySelector('.header__form-input').classList.add('search')
    document.querySelector('.header__form').classList.add('grid__search')
    document.querySelector('.header__form-button').classList.add('cl')
    document.querySelector('.header__logo').classList.add('header__logo-change')
    document.querySelector('.header__form-button-close').classList.add('search')
});
document.querySelector('.header__form-button-close').addEventListener('click', () => {   
    document.querySelector('.header__form-input').classList.remove('search')
    document.querySelector('.header__form').classList.remove('grid__search')
    document.querySelector('.header__logo').classList.remove('header__logo-change')
    document.querySelector('.header__form-button-close').classList.remove('search')
});

// open burger menu
window.addEventListener("load", function() {
    const none =  document.querySelectorAll('.header__nav-button-burger');
    const headerBtn =  document.querySelector('.header__nav-button');
    headerBtn.addEventListener('click', () => {
        headerBtn.classList.toggle('header__nav-button-active');
        none.forEach((element) => {
            element.classList.toggle('none');
        })
        document.querySelector('.header__nav-list-mobile').classList.toggle('header__nav-list-mobile-active');
        document.querySelector('.header__nav-item-last').classList.toggle('header__nav-item-last-active');
    });
});

//validate first form email

function emailTest(inputFirstEmail) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputFirstEmail.value);  //regular expression
  }
function forModalAddError(inputFirstEmail) {
    inputFirstEmail.parentElement.classList.add('_errorh');
    inputFirstEmail.classList.add('_errorh');
}

function formEmailValidate (emailForm) {
    let error = 0;
    
    if(emailTest(inputFirstEmail)){
        forModalAddError(inputFirstEmail);
        error++;
    }
    return error;
}

const emailForm = document.querySelector('.about__block-form');
const form = document.querySelector('.contact__form');
const inputFirstEmail = document.querySelector('.about__block-form-email');
const erorrE = document.querySelector('.about__block-form-email-error')
const email = inputFirstEmail.value;
const inputFooterEmail = document.querySelectorAll('.contact__form-input'); 
const emailFooter = inputFooterEmail.value
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!email || formEmailValidate(email)) {
        inputFirstEmail.parentElement.classList.add('error');
        inputFirstEmail.classList.add('_errorh');
        erorrE.classList.add('errorv');
    } else {

    }
})
//validation form footer
function emailTestFooter(inputFooterEmail) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputFooterEmail.value);  //regular expression
  }
function forModalAddErrorF(inputFooterEmail) {
    inputFooterEmail.parentElement.classList.add('_errorh');
    inputFooterEmail.classList.add('_errorh');
}

function formEmailValidateF (form) {
    let error = 0;
    for(let i=0;i < inputFooterEmail.lenght; i++){
        const input = inputFooterEmail[i];
        if(emailTestFooter(input)){
            formEmailValidateF(input);
            error++;
        }
        return error;
    }
    
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(!input || formEmailValidate(input)){
        input.classList.add('_errorh');
    }
})





