const oldPassEye = document.querySelector('.password-toggle-iconOld i');
const newPassEye = document.querySelector('.password-toggle-iconNew i');
const confirmPassEye = document.querySelector('.password-toggle-iconConfirm i');
const oldPassword = document.getElementById('oldPass');
const newPassword = document.getElementById('newPass');
const confirmPassword = document.getElementById('confirmNewPass');
const changePasswordForm = document.getElementById('changePasswordForm')
const checkpassValidity = document.getElementsByClassName('checkpassValidity')
const changePasswordLabels = document.getElementsByClassName('changePasswordLabels')


changePasswordForm.addEventListener('submit', function(e) {
  Array.from(checkpassValidity).forEach((element,index) => {
    element.classList.add('valid:ring-green-500','invalid:ring-red-500')
    if(!element.checkValidity()) {
      e.preventDefault()
      changePasswordLabels[index].classList.add("after:content-['*']", 'after:ml-1', 'after:text-red-500')
    } else {
      changePasswordLabels[index].classList.remove("after:content-['*']", 'after:ml-1', 'after:text-red-500')
    } 
    element.onchange = function() {
      if(element.checkValidity()) {
        changePasswordLabels[index].classList.remove("after:content-['*']", 'after:ml-1', 'after:text-red-500')
      } else {
        changePasswordLabels[index].classList.add("after:content-['*']", 'after:ml-1', 'after:text-red-500')
      }
    }
    
  })
  if(newPassword.value != confirmPassword.value || confirmPassword.value == ""){ 
    e.preventDefault()
    confirmPassword.classList.add('ring-red-500')
    confirmPassword.classList.remove('ring-green-500','valid:ring-green-500','invalid:ring-red-500')
    changePasswordLabels[2].classList.add("after:content-['*']", 'after:ml-1', 'after:text-red-500')
  } else {
    changePasswordLabels[2].classList.remove("after:content-['*']", 'after:ml-1', 'after:text-red-500')
    confirmPassword.classList.remove('ring-red-500')
    confirmPassword.classList.remove('ring-green-500')
  }
})


oldPassEye.addEventListener('click', function() {
  if( oldPassword.type === 'password') {
    oldPassword.type = 'text';
    oldPassEye.classList.remove('fa-eye');
    oldPassEye.classList.add('fa-eye-slash');
  } else {
    oldPassword.type = 'password';
    oldPassEye.classList.remove('fa-eye-slash');
    oldPassEye.classList.add('fa-eye');
  }
})


newPassEye.addEventListener('click', function() {
  if( newPassword.type === 'password') {
    newPassword.type = 'text';
    newPassEye.classList.remove('fa-eye');
    newPassEye.classList.add('fa-eye-slash');
  } else {
    newPassword.type = 'password';
    newPassEye.classList.remove('fa-eye-slash');
    newPassEye.classList.add('fa-eye');
  }
})

confirmPassEye.addEventListener('click', function() {
  if( confirmPassword.type === 'password') {
    confirmPassword.type = 'text';
    confirmPassEye.classList.remove('fa-eye');
    confirmPassEye.classList.add('fa-eye-slash');
  } else {
    confirmPassword.type = 'password';
    confirmPassEye.classList.remove('fa-eye-slash');
    confirmPassEye.classList.add('fa-eye');
  }
})


const updateInfoInputText = document.getElementsByClassName('updateInfoInputText')
const updateUserInfoForm = document.getElementById('updateUserInfoForm')
const updateInfoLabel = document.getElementsByClassName('updateInfoLabel')
const role = document.getElementsByName('role')
const roleMessage = document.getElementById('roleErrorMessage')
const department = document.getElementById("department");
const departmentLabel = document.getElementById('departmentLabel')
const userStatus = document.getElementById('status')


updateUserInfoForm.addEventListener('submit',function(e) {
  Array.from(updateInfoInputText).forEach(element => {
    element.classList.add('valid:ring-green-500','invalid:ring-red-500')
  })
  department.classList.add('invalid:ring-red-500','valid:ring-green-500');
  userStatus.classList.add('invalid:ring-red-500','valid:ring-green-500');

  if(!updateUserInfoForm.checkValidity()) {
    e.preventDefault()
    
    Array.from(updateInfoInputText).forEach( (element, index) => {
      if(!element.checkValidity()) {
        updateInfoLabel[index].classList.add("after:content-['*']", 'after:ml-1', 'after:text-red-500')
      } else {
        updateInfoLabel[index].classList.remove("after:content-['*']", 'after:ml-1', 'after:text-red-500')
      }
    })
  
    if(role[0].checked || role[1].checked) {
      roleMessage.classList.add('hidden')
    } else {
      roleMessage.classList.remove('hidden')
    }

  }
})

Array.from(updateInfoInputText).forEach((element, index) => {
  element.onchange = function() {
    if(element.checkValidity()){
      updateInfoLabel[index].classList.remove("after:content-['*']", 'after:ml-1', 'after:text-red-500')
    } else {
      updateInfoLabel[index].classList.add("after:content-['*']", 'after:ml-1', 'after:text-red-500')
    }
  } 
})