const loginValidate = document.getElementsByClassName('loginValidate')
const requiredMessage = document.getElementsByClassName('requiredMessage')
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit',function(e) {
  Array.from(loginValidate).forEach((element,index) => {
    if(!element.checkValidity()) {
      e.preventDefault()
      requiredMessage[index].classList.remove('hidden')
      } else {
      requiredMessage[index].classList.add('hidden')
    }
  })
})