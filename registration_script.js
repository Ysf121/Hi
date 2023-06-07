const switchbuttons=document.querySelectorAll('[data-switch-buttons]');
const LoginContainer=document.querySelector('[data-login-container]');
const SignupContainer=document.querySelector('[data-signup-container]');
switchbuttons.forEach(button=>{
    button.addEventListener('click',()=>{
        if(button.dataset.switchButtons=='login'){
            SignupContainer.classList.remove('active');
            LoginContainer.classList.add('active');
        }
        else{
            LoginContainer.classList.remove('active');
            SignupContainer.classList.add('active');
        }
        SwitchButtonsSelected(button);
    })
})
function SwitchButtonsSelected(button){
    switchbuttons.forEach(b=>{
        b.classList.remove('selected')
    })
    button.classList.add('selected')
}