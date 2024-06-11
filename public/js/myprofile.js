const myProfileEditButton = document.getElementById('myProfileEditButton');
const informationForm = document.getElementById('informationForm')
const myInformationDiv = document.getElementById('myInformationDiv')


myProfileEditButton.onclick = async function () {
  informationForm.remove()
  const url = window.location.pathname
  const userId = url.substring(url.indexOf('e/') + 2, url.length + 1)
  const userData = await axios(`http://localhost:8000/user/${userId}`)
  console.log(userId)
  const myInfoEditForm = document.createElement('form')
  myInfoEditForm.action = `/user/myprofile/${userId}?_method=PUT`
  myInfoEditForm.setAttribute('method','POST')
  myInformationDiv.append(myInfoEditForm)
  myInfoEditForm.classList.add('bg-white', 'h-full', 'w-2/4', 'rounded-xl', 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4','order-first','px-16', 'py-12')
  const editProfileTitle = document.createElement('h1')
  editProfileTitle.innerHTML = "Edit Profile"
  editProfileTitle.classList.add('text-4xl','font-bold')
  myInfoEditForm.appendChild(editProfileTitle)
  for(let k = 0 ; k < 6; k++ ) {
    const myInfoEditFormDiv = document.createElement('div')
    myInfoEditFormDiv.classList.add('mt-2','w-full')
    myInfoEditForm.appendChild(myInfoEditFormDiv)
    if(k == 0){
      myInfoEditFormDiv.classList.add('grid','grid-cols-2','gap-10')
      for(let j = 0; j < 2 ; j++) {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('flex')
        myInfoEditFormDiv.appendChild(nameDiv)
        myInfoEditFormDiv.classList.add('flex')
        nameDiv.classList.add('flex','flex-col')
        if(j == 0) {
          const firstname = document.createElement('label')
          firstname.setAttribute('for','firstname')
          firstname.classList.add('text-2xl','font-semibold')
          nameDiv.appendChild(firstname)
          firstname.innerHTML = 'Firstname :'
          const inputTextFirstname = document.createElement('input')
          inputTextFirstname.setAttribute('type','text')
          inputTextFirstname.setAttribute('id','firstname')
          inputTextFirstname.setAttribute('name','firstname')
          inputTextFirstname.setAttribute('maxlength','30')
          inputTextFirstname.value = userData.data.firstname.charAt(0).toUpperCase() + userData.data.firstname.slice(1)
          inputTextFirstname.classList.add('ring-2','ring-slate-500','rounded-md','px-2','py-1')
          nameDiv.appendChild(inputTextFirstname)
        } else {
          const lastname = document.createElement('label')
          lastname.setAttribute('for','lastname')
          lastname.classList.add('text-2xl','font-semibold')
          nameDiv.appendChild(lastname)
          lastname.innerHTML = 'Lastname :'
          const inputTextLastname = document.createElement('input')
          inputTextLastname.setAttribute('type','text')
          inputTextLastname.setAttribute('id','lastname')
          inputTextLastname.setAttribute('name','lastname')
          inputTextLastname.setAttribute('maxlength','30')
          inputTextLastname.value = userData.data.lastname.charAt(0).toUpperCase() + userData.data.lastname.slice(1)
          inputTextLastname.classList.add('ring-2','ring-slate-500','rounded-md','px-2','py-1')
          nameDiv.appendChild(inputTextLastname)
        }

      }
      
    }
    if(k == 1) {
      const addressLabel = document.createElement('label')
      addressLabel.setAttribute('for','address')
      addressLabel.innerHTML = 'Address :'
      addressLabel.classList.add('text-2xl','font-semibold')
      myInfoEditFormDiv.appendChild(addressLabel)
      const addressInput = document.createElement('input')
      addressInput.setAttribute('type','text')
      addressInput.setAttribute('id','address')
      addressInput.setAttribute('name','address')
      addressInput.setAttribute('maxlength','100')
      addressInput.value = userData.data.address
      myInfoEditFormDiv.appendChild(addressInput)
      addressInput.classList.add('ring-2','ring-slate-500','rounded-md','px-2','w-full','py-1')
    }
    if(k == 2) {
      const emailLabel = document.createElement('label')
      emailLabel.setAttribute('for','email')
      emailLabel.innerHTML = 'Email :'
      emailLabel.classList.add('text-2xl','font-semibold')
      myInfoEditFormDiv.appendChild(emailLabel)
      const emailInput = document.createElement('input')
      emailInput.setAttribute('type','email')
      emailInput.setAttribute('id','email')
      emailInput.setAttribute('name','email')
      emailInput.setAttribute('maxlength','100')
      emailInput.value = userData.data.email
      myInfoEditFormDiv.appendChild(emailInput)
      emailInput.classList.add('ring-2','ring-slate-500','rounded-md','px-2','w-full','py-1')
    }
    if(k == 3) {
      const contactLabel = document.createElement('label')
      contactLabel.setAttribute('for','phone')
      contactLabel.innerHTML = 'Contact no. :'
      contactLabel.classList.add('text-2xl','font-semibold')
      myInfoEditFormDiv.appendChild(contactLabel)
      const contactInput = document.createElement('input')
      contactInput.setAttribute('type','tel')
      contactInput.setAttribute('id','phone')
      contactInput.setAttribute('name','phone')
      contactInput.value =  `0${userData.data.phone}`
      myInfoEditFormDiv.appendChild(contactInput)
      contactInput.classList.add('ring-2','ring-slate-500','rounded-md','px-2','w-full','py-1')
    }
    if(k == 4) {
      const department = await axios(`http://localhost:8000/department`)
      const departmentLabel = document.createElement('label')
      departmentLabel.setAttribute('for','department')
      departmentLabel.innerHTML = 'Department :'
      departmentLabel.classList.add('text-2xl','font-semibold')
      myInfoEditFormDiv.appendChild(departmentLabel)
      const departmentSelector = document.createElement('select')
      for(let b = 0; b < department.data.length; b++) {
        const departmentSecletorOption = document.createElement('option')
        departmentSecletorOption.text = department.data[b].department;
        departmentSecletorOption.value = department.data[b].department;
        if(department.data[b].department == userData.data.department) {
          departmentSecletorOption.selected = true
        }
        departmentSelector.options.add(departmentSecletorOption,b + 1)

      }
      departmentSelector.setAttribute('id','department')
      departmentSelector.setAttribute('name','department')
      myInfoEditFormDiv.appendChild(departmentSelector)
      departmentSelector.classList.add('ring-2','ring-slate-500','rounded-md','px-2','w-full','py-1')
    }
    
    if(k == 5) {
      for(let j = 0 ; j < 2 ; j++){
        const editButtons = document.createElement('button');
        editButtons.classList.add('w-24', 'h-10', 'border-2', 'mt-4', 'rounded-md', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','font-bold')
        myInfoEditFormDiv.appendChild(editButtons);
        myInfoEditFormDiv.classList.add('flex','gap-10','justify-center','items-center')
        if(j == 0) {
          editButtons.innerHTML = 'Update'
          editButtons.formAction = `/user/myprofile/${userId}?_method=PUT`;
          editButtons.classList.add('text-white', 'bg-orange-500', 'border-orange-300', 'hover:text-orange-500', 'hover:bg-white' , 'translate-ease-in', 'duration-300', 'hover:shadow-[2px_2px_0px_0px_orange]')
        }
        if(j == 1) {
          editButtons.innerHTML = 'Cancel'
          editButtons.classList.add('text-white','bg-black','transition-ease-in','duration-300','hover:text-black','hover:bg-white','hover:border-black','border-white')
          editButtons.onclick = function(e) {
            e.preventDefault();
            location.reload();
          }
        }
      }
      
    }

  }
  
}


const oldPassEye = document.querySelector('.password-toggle-iconOld i');
const newPassEye = document.querySelector('.password-toggle-iconNew i');
const confirmPassEye = document.querySelector('.password-toggle-iconConfirm i');
const oldPassword = document.getElementById('password');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmNewPassword');



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

const changepassForm = document.getElementById('changepassForm')

changepassForm.addEventListener('submit',function(e) {
  if(newPassword.value != confirmPassword.value) {
    e.preventDefault();
    confirmPassword.classList.add('ring-red-500')
  }
})

