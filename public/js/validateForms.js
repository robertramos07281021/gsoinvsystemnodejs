const form = document.getElementById("registerForm");
const formElement = document.getElementsByClassName("inputText");
const label = document.getElementsByClassName("inputTextLabel");
const department = document.getElementById("department");
const role = document.getElementsByName("role")
const roleMessage = document.getElementById('roleErrorMessage')
const pass2 = document.getElementById('password2')
const password = document.getElementById('password')
const roleLabel = document.getElementById('roleLabel')
const departmentLabel = document.getElementById('departmentLabel')
const confirmPassword = document.getElementById('confirmPassword')
const passwordToggleIcon = document.querySelector('.password-toggle-icon i')
const passwordToggleIcon2 = document.querySelector('.password-toggle-icon2 i')

form.addEventListener('submit', e => {
  if(!form.checkValidity()) {
    e.preventDefault();
    for (let i = 0; i<formElement.length; i++ ) { 
      formElement[i].classList.add('valid:ring-green-500')
      formElement[i].classList.add('invalid:ring-red-500')
      if(formElement[i].value === "" || formElement[i].checkValidity() === false) {
        formElement[i].classList.add('invalid:ring-red-500') 
        label[i].classList.add("after:content-['*']")
      }

      formElement[i].onchange = function () {
        if(formElement[i].value === "" || formElement[i].checkValidity() === false) {
          label[i].classList.add("after:content-['*']")
        } else {
          label[i].classList.remove("after:content-['*']")
        }
      }  
    
    }
    
    if(role[0].checked || role[1].checked) {
      roleMessage.classList.add('hidden')
    } else {
      roleMessage.classList.remove('hidden')
    }
  
    role[1].onchange = function() {
      if(role[0].checked || role[1].checked) {
        roleMessage.classList.add('hidden')
      } else {
        roleMessage.classList.remove('hidden')
      }
    }
   
    role[0].onchange = function() {
      if(role[0].checked || role[1].checked) {
        roleMessage.classList.add('hidden')
      } else {
        roleMessage.classList.remove('hidden')
      }
    }
   

    if(department.value === "") {
      departmentLabel.classList.add("after:content-['*']")
      department.classList.add('invalid:ring-red-500')
    } else {
      departmentLabel.classList.remove("after:ring-['*']")
    }

    
    department.onchange = function () {
      if(department.value === "") {
        departmentLabel.classList.add("after:content-['*']")
        department.classList.add('invalid:ring-red-500')
      } else {
        departmentLabel.classList.remove("after:content-['*']")
        department.classList.add('valid:ring-green-500')
      }
    }
    
  }

  if(pass2.value === "" || pass2.value !== password.value) {
    confirmPassword.classList.add("after:content-['*']")
    pass2.classList.add('ring-red-500')
    e.preventDefault
  } else {
    confirmPassword.classList.remove("after:content-['*']")
    pass2.classList.add('valid:ring-green-500')
  }
 
  pass2.onchange = function() {
    if(pass2.value === "" || pass2.value !== password.value) {
      confirmPassword.classList.add("after:content-['*']")
      pass2.classList.add('ring-red-500')
      pass2.classList.remove('valid:ring-green-500')
      e.preventDefault
    } else {
      confirmPassword.classList.remove("after:content-['*']")
      pass2.classList.add('valid:ring-green-500')
    }
  }
  
})

passwordToggleIcon.addEventListener('click', function() {
  if( password.type === 'password') {
    password.type = 'text';
    passwordToggleIcon.classList.remove('fa-eye');
    passwordToggleIcon.classList.add('fa-eye-slash');
  } else {
    password.type = 'password';
    passwordToggleIcon.classList.remove('fa-eye-slash');
    passwordToggleIcon.classList.add('fa-eye');
  }
})

passwordToggleIcon2.addEventListener('click', function() {
  if( pass2.type === 'password') {
    pass2.type = 'text';
    passwordToggleIcon2.classList.remove('fa-eye');
    passwordToggleIcon2.classList.add('fa-eye-slash');
  } else {
    pass2.type = 'password';
    passwordToggleIcon2.classList.remove('fa-eye-slash');
    passwordToggleIcon2.classList.add('fa-eye');
  }
})