const deptData = document.getElementsByClassName('deptData');
const deleteDeptButton = document.getElementsByClassName('deleteDeptButton');




// =================================================================Delete Button

Array.from(deleteDeptButton).forEach((element, index) => {
  element.onmouseover = function() {
    deptData[index].classList.add('bg-rose-500/20')
    deptData[index].classList.remove('odd:bg-slate-100')
  }

  element.onmouseout = function() {
    deptData[index].classList.remove('bg-rose-500/20')
    deptData[index].classList.add('odd:bg-slate-100')

  }

  element.onclick =async function () {
    const deptId = deptData[index].getAttribute('data-dept-id');
    const getDept = await axios(`http://localhost:8000/department/${deptId}`);
    const deptDeleteBgMessage = document.createElement('div')
    deptDeleteBgMessage.classList.add('absolute','left-0','top-0','h-screen','w-screen', 'justify-center', 'items-center','z-20','flex');
    document.body.appendChild(deptDeleteBgMessage);
    const deptDeleteBgModal = document.createElement('form');
    deptDeleteBgModal.classList.add('w-96', 'h-80', 'bg-white', 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]', 'rounded-md', 'border-black', 'border-4','border-t-[30px]','ring-4','ring-inset' ,'ring-red-500', 'ring-offset-2' ,'flex','flex-col', 'gap-10', 'justify-center','items-center', 'px-5');
    deptDeleteBgMessage.appendChild(deptDeleteBgModal);
    deptDeleteBgModal.setAttribute('action',`/departments/delete/${deptId}?_method=DELETE`);
    deptDeleteBgModal.setAttribute('method','POST');
    const deptDeleteModalP = document.createElement('p');
    deptDeleteModalP.classList.add('text-center','p-5')
    deptDeleteModalP.innerHTML = `Are you sure you want to delete ${getDept.data.department}?`;
    deptDeleteModalP.classList.add('font-bold','text-lg')
    deptDeleteBgModal.appendChild(deptDeleteModalP);
    const confirmButtonDept = document.createElement('div');
    deptDeleteBgModal.appendChild(confirmButtonDept)
    confirmButtonDept.classList.add('flex','gap-5');
    for(let button = 0; button < 2; button++) {
      const buttons = document.createElement('button')
      confirmButtonDept.appendChild(buttons)
      if(button == 0) {
        buttons.innerHTML = 'Yes'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-red-500', 'text-white', 'font-bold', 'border-red-300', 'hover:bg-white', 'hover:text-red-500', 'hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]', 'transition-ease-in', 'duration-300')
        buttons.formAction = `/departments/delete/${deptId}?_method=DELETE`
      }
      if(button == 1) {
        buttons.innerHTML = 'No'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300');
        buttons.onclick = function () {
          deptDeleteBgMessage.remove()
        }
      }
    }

  }
})

// =======================================================  Edit button
const editButton = document.getElementsByClassName('editDeptButton')
Array.from(editButton).forEach((element,index) => {
  element.onmouseover = function() {
    deptData[index].classList.add('bg-orange-500/20')
    deptData[index].classList.remove('odd:bg-slate-100')
  }

  element.onmouseout = function() {
    deptData[index].classList.remove('bg-orange-500/20')
    deptData[index].classList.add('odd:bg-slate-100')

  }
})

const prevNameDept = document.getElementById('prevNameDept');
const editDeptButton = document.getElementsByClassName('editDeptButton')
const saveNewNameDept = document.getElementById('saveNewNameDept')

Array.from(editDeptButton).forEach(async (element,index) => {
  const deptId = deptData[index].getAttribute('data-dept-id');
  const findDept = await axios(`http://localhost:8000/department/${deptId}`)
  element.onclick = function() {
    prevNameDept.innerHTML =  findDept.data.department
    saveNewNameDept.setAttribute('data-dept-id',deptId)

  }
})

const updateButton = document.getElementById('updateButton');
const newNameDept = document.getElementById('newNameDept');
updateButton.onclick = async function (e) {
  e.preventDefault();
  const oldNameId =  saveNewNameDept.getAttribute('data-dept-id');
  const selectDepartmentError = document.getElementById('selectDepartmentError');
  const fromDept = document.getElementById('fromDept');
  const toDept = document.getElementById('toDept')
  
  newNameDept.classList.add('invalid:ring-red-500','valid:ring-green-500');
  if(!newNameDept.checkValidity() || oldNameId == null) {
    e.preventDefault()
    
    if(oldNameId == null) {
      selectDepartmentError.classList.remove('hidden');
      fromDept.classList.add('after:content-["*"]');
    } else {
      selectDepartmentError.classList.add('hidden');
      fromDept.classList.remove('after:content-["*"]');
    }

    if(!newNameDept.checkValidity()) {
      toDept.classList.add('after:content-["*"]')
      newNameDept.setAttribute('placeholder','Please add new dept name!')
      newNameDept.classList.add('placeholder:text-red-500/50')
    } else {
      toDept.classList.remove('after:content-["*"]')
      newNameDept.removeAttribute('placeholder','Please add new dept name!')
      newNameDept.classList.remove('placeholder:text-red-500/50')
    }

  } else {
    const fromDeptId = saveNewNameDept.getAttribute('data-dept-id')
    const updateDeptBgMessage = document.createElement('div')
    updateDeptBgMessage.classList.add('absolute','left-0','top-0','h-screen','w-screen', 'justify-center', 'items-center','z-20','flex');
      document.body.appendChild(updateDeptBgMessage);
      const deptUpdateBgModal = document.createElement('form');
      deptUpdateBgModal.setAttribute('id','updateDeptForm')
      deptUpdateBgModal.classList.add('w-96', 'h-80', 'bg-white', 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]', 'rounded-md', 'border-black', 'border-4','border-t-[30px]','ring-4','ring-inset' ,'ring-orange-500', 'ring-offset-2' ,'flex','flex-col', 'gap-5', 'justify-center','items-center', 'px-5');
      updateDeptBgMessage.appendChild(deptUpdateBgModal);
      deptUpdateBgModal.setAttribute('action',`/departments/manage/${fromDeptId}?_method=PATCH`);
      deptUpdateBgModal.setAttribute('method','POST');
      const deptUpdateModalP = document.createElement('p');
      deptUpdateModalP.classList.add('text-center','p-5')
      deptUpdateModalP.innerHTML = `Are you sure you want to change the department name from ${prevNameDept.innerHTML} to ${newNameDept.value.toUpperCase()}?`;
      deptUpdateModalP.classList.add('font-bold','text-lg')
      deptUpdateBgModal.appendChild(deptUpdateModalP);
      const confirmButtonDept = document.createElement('div');
      deptUpdateBgModal.appendChild(confirmButtonDept)
      confirmButtonDept.classList.add('flex','gap-5');
      for(let button = 0; button < 2; button++) {
        const buttons = document.createElement('button')
        confirmButtonDept.appendChild(buttons)
        if(button == 0) {
          buttons.innerHTML = 'Yes'
          buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-orange-500', 'text-white', 'font-bold', 'border-orange-300', 'hover:bg-white', 'hover:text-orange-500', 'hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]', 'transition-ease-in', 'duration-300')
          buttons.formAction = `/departments/manage/${fromDeptId}?_method=PATCH`
        }
        if(button == 1) {
          buttons.innerHTML = 'No'
          buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300');
          buttons.onclick = function () {
            updateDeptBgMessage.remove()
          }
        }
      }
      deptUpdateBgModal.addEventListener('submit',function (){
        const hiddenInputNewName = document.createElement('input');
        hiddenInputNewName.setAttribute('type','hidden')
        hiddenInputNewName.setAttribute('name','newNameOfDept')
        hiddenInputNewName.setAttribute('id','newNameOfDept')
        hiddenInputNewName.value = newNameDept.value;
        deptUpdateBgModal.appendChild(hiddenInputNewName)
      })
  }




}

//============================================================ Add Department
const department = document.getElementById('department')
const addDeptForm = document.getElementById('addDeptForm')
const nameDeptLabel = document.getElementById('nameDeptLabel')
const addDepartment = document.getElementById('addDepartment')


addDepartment.onclick = function (e) {
  const departmentValue = [];
  departmentValue.push(department.value);
  department.classList.add('valid:ring-green-500','invalid:ring-red-500')
  
  if(!department.checkValidity()) {
    e.preventDefault()
    department.classList.add('placeholder:text-red-500/50')
    department.setAttribute('placeholder','Enter Department Name')
    nameDeptLabel.classList.add('after:content-["*"]')
    
  } else {
    nameDeptLabel.classList.remove('after:content-["*"]')
    const addDepartmentBg = document.createElement('div');
    addDepartmentBg.classList.add('absolute','left-0','top-0','h-screen','w-screen', 'justify-center', 'items-center','z-20','flex');
    document.body.appendChild(addDepartmentBg);
    const addDepartmentModal = document.createElement('form');
    addDepartmentModal.classList.add('w-96', 'h-80', 'bg-white', 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]', 'rounded-md', 'border-black', 'border-4','border-t-[30px]','ring-4','ring-inset' ,'ring-green-500', 'ring-offset-2' ,'flex','flex-col','justify-center', 'items-center','gap-10', 'px-5');
    addDepartmentBg.appendChild(addDepartmentModal)
    addDepartmentModal.setAttribute('action','/departments/manage/add')
    addDepartmentModal.setAttribute(`method`,`POST`)  
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type','hidden')
    hiddenInput.setAttribute('name','departmentHidden')
    hiddenInput.setAttribute('id','departmentHidden')
    hiddenInput.value = department.value;
    addDepartmentModal.addEventListener('submit',(k) => {

      if(!Boolean(departmentValue.includes(hiddenInput.value))){
        k.preventDefault();
        location.reload();
        alert('You dont have permission to do that!')
      }
      if(hiddenInput.value.toUpperCase() !== department.value.toUpperCase()){
        k.preventDefault();
        location.reload();
        alert('You dont have permission to do that!')
      }
    
    })
    addDepartmentModal.appendChild(hiddenInput)
    const addDepartmentMessage = document.createElement('p');
    addDepartmentMessage.innerHTML = `You want to add new department, ${department.value.toUpperCase()}?`;
    addDepartmentMessage.classList.add('font-bold','text-lg','text-center')
    addDepartmentModal.appendChild(addDepartmentMessage);
    const confirmButtonAddDept = document.createElement('div');
    addDepartmentModal.appendChild(confirmButtonAddDept)
    confirmButtonAddDept.classList.add('flex','gap-5');
    for(let button = 0; button < 2; button++) {
      const buttons = document.createElement('button')
      confirmButtonAddDept.appendChild(buttons)
      if(button == 0) {
        buttons.innerHTML = 'Yes'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-green-500', 'text-white', 'font-bold', 'border-green-300', 'hover:bg-white', 'hover:text-green-500', 'hover:shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]', 'transition-ease-in', 'duration-300')
        buttons.formAction = `/departments/manage/add`
      }
      if(button == 1) {
        buttons.innerHTML = 'No'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300');
        buttons.onclick = function () {
          addDepartmentBg.remove()
        }
      }
    }


    e.preventDefault();
  }
  department.onchange = function() {
    if(department.value !== ""){
      nameDeptLabel.classList.remove('after:content-["*"]')
    } else {
      nameDeptLabel.classList.add('after:content-["*"]')
      department.setAttribute('placeholder','Enter Department Name')
      department.classList.add('placeholder:text-red-500/50')
    }
  }


}






//===================================================== Merge Department.

const mergeForm = document.getElementById('mergeForm')
const mergeDeptCheckBox = document.querySelectorAll('input[type=checkbox]')
const pleaseSelectTwo = document.getElementById('pleaseSelectTwo')
const mergeDept = document.getElementById('mergeDept')
const mergeDeptLabelBg = document.getElementsByClassName('mergeDeptLabelBg')


mergeForm.addEventListener('submit',(e) => {
  const notChecked = [];
  const checked = []; 
  const mergeName = [];
  mergeName.push(mergeDept);
  mergeDept.classList.add('invalid:ring-red-500','valid:ring-green-500')
  if(!mergeDept.checkValidity()) {
    mergeDept.classList.add('placeholder:text-red-500/50')
    mergeDept.setAttribute('placeholder','Please add new department name')
    e.preventDefault();
  }

  for(let b = 0; b < mergeDeptCheckBox.length; b++) {
    if(mergeDeptCheckBox[b].checked === true) {
      checked.push(mergeDeptCheckBox[b].value)
    } else {
      notChecked.push(mergeDeptCheckBox[b].value)
    }
  }

  if(checked.length <= 1) {
    e.preventDefault()
    pleaseSelectTwo.classList.remove('hidden')
    Array.from(mergeDeptCheckBox).forEach((element,index) => {
      if(element.checked !== true) {
        mergeDeptLabelBg[index].classList.add('border-red-500')
        mergeDeptLabelBg[index].classList.remove('border-green-500')
      } else {
        mergeDeptLabelBg[index].classList.add('border-green-500')
        mergeDeptLabelBg[index].classList.remove('border-red-500')
      }
    })
   

  } else {
    Array.from(mergeDeptCheckBox).forEach((element,index) => {
      if(element.checked === true) {
        mergeDeptLabelBg[index].classList.add('border-green-500')
        mergeDeptLabelBg[index].classList.remove('border-red-500')
      } else {
        mergeDeptLabelBg[index].classList.remove('border-red-500')
        mergeDeptLabelBg[index].classList.remove('border-green-500')
      }
    })
    pleaseSelectTwo.classList.add('hidden')
  }

  if(mergeDept.checkValidity() && checked.length > 1) {
    e.preventDefault();
  

    const mergeDeptBg = document.createElement('div');
    mergeDeptBg.classList.add('absolute','left-0','top-0','h-screen','w-screen', 'justify-center', 'items-center','z-20','flex');
    document.body.appendChild(mergeDeptBg);
    const mergeDeptModal = document.createElement('form');
    mergeDeptModal.classList.add('w-96', 'h-80', 'bg-white', 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]', 'rounded-md', 'border-black', 'border-4','border-t-[30px]','ring-4','ring-inset' ,'ring-orange-500', 'ring-offset-2' ,'flex','flex-col','justify-center', 'items-center','gap-10', 'px-5');
    mergeDeptBg.appendChild(mergeDeptModal);
    mergeDeptModal.setAttribute('action','/departments/manage/merge');
    mergeDeptModal.setAttribute(`method`,`POST`);
    Array.from(checked).forEach(checkedInput => {
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type','hidden');
      hiddenInput.setAttribute('name','mergeDeptChecked');
      hiddenInput.setAttribute('id',checkedInput);
      hiddenInput.value = checkedInput;
      mergeDeptModal.appendChild(hiddenInput);
    } )
    const mergeDeptMessage = document.createElement('p');
    mergeDeptMessage.innerHTML = `You want to merge those departments, New name is ${mergeDept.value.toUpperCase()}?`;
    mergeDeptMessage.classList.add('font-bold','text-lg','text-center')
    mergeDeptModal.appendChild(mergeDeptMessage);
    const confirmButtonMergeDept = document.createElement('div');
    mergeDeptModal.appendChild(confirmButtonMergeDept)
    confirmButtonMergeDept.classList.add('flex','gap-5');
    for(let button = 0; button < 2; button++) {
      const buttons = document.createElement('button')
      confirmButtonMergeDept.appendChild(buttons)
      if(button == 0) {
        buttons.innerHTML = 'Yes'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-orange-500', 'text-white', 'font-bold', 'border-orange-300', 'hover:bg-white', 'hover:text-orange-500', 'hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]', 'transition-ease-in', 'duration-300')
        buttons.formAction = `/departments/manage/merge`
      }
      if(button == 1) {
        buttons.innerHTML = 'No'
        buttons.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300');
        buttons.onclick = function () {
          mergeDeptBg.remove()
        }
      }
    }

    mergeDeptModal.addEventListener('submit', async function() {
      const mergeDeptName = document.createElement('input')
      mergeDeptName.setAttribute('type','hidden');
      mergeDeptName.setAttribute('name','mergeDeptName');
      mergeDeptName.setAttribute('value',mergeDept.value);
      mergeDeptModal.appendChild(mergeDeptName);
    })
  }
})



// ==================================================================================== History Details

const historyDetailsButton = document.getElementsByClassName('historyDetailsButton');
const historyDetails = document.getElementsByClassName('historyDetails');

Array.from(historyDetailsButton).forEach(async (element, index) =>{
  element.onmouseover = function() {
    historyDetails[index].classList.add('bg-green-500/20')
    historyDetails[index].classList.remove('odd:bg-gray-100')
  }
  element.onmouseout = function() {
    historyDetails[index].classList.remove('bg-green-500/20')
    historyDetails[index].classList.add('odd:bg-gray-100')

  }



  element.onclick = async function () {
    const historyId = historyDetails[index].getAttribute('data-history-id');
  
    const history = await axios(`http://localhost:8000/history/${historyId}`)
    const historyDetailsModalBg = document.createElement('div');
    historyDetailsModalBg.classList.add('absolute','left-0','top-0','h-screen','w-screen','backdrop-blur-sm','bg-white/10', 'justify-center', 'items-center','z-20','flex');
    document.body.appendChild(historyDetailsModalBg);
    const historyModal = document.createElement('div')
    historyModal.classList.add('historyDetailsModal','shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]','bounceEffect')
    historyDetailsModalBg.appendChild(historyModal)
    const historyModalFieldset = document.createElement('fieldset');
    historyModal.appendChild(historyModalFieldset);
    historyModalFieldset.classList.add('border-4','w-full','h-full','border-green-500','rounded-md','px-3' ,'py-2', 'flex','flex-col','relative');
    const historyModalLegend = document.createElement('legend');
    historyModalLegend.innerHTML = 'History Details';
    historyModalFieldset.appendChild(historyModalLegend)
    historyModalLegend.classList.add('text-3xl','ml-5','font-bold','px-1')
    const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = [];
    const minute = [];
    const seconds = [];
    for(let x = 0 ; x < 32 ; x++) {
      if(x < 10) {
        date.push(`0${x}`)
      } else {
        date.push(x)
      }
    }

    for(let x = 0 ; x < 61 ; x++) {
      if(x < 10) {
        seconds.push(`0${x}`)
      } else {
        seconds.push(x)
      }
    }

    for(let x = 0 ; x < 61 ; x++) {
      if(x < 10) {
        minute.push(`0${x}`)
      } else {
        minute.push(x)
      }
    }


    // Add / Delete action
    if(history.data.action === 'add' || history.data.action === 'delete') {
      historyModalFieldset.classList.add('gap-5')
      for(x = 0; x < 5; x++) {
        const historyModalDiv = document.createElement('div');
        historyModalFieldset.appendChild(historyModalDiv);
      
        for(y = 0; y < 2; y++) {
          const historyContent = document.createElement('div');
          historyModalDiv.appendChild(historyContent)

          if(x == 0 ) {
            if(y == 0) {
              historyContent.innerHTML = 'Action :'
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {

              if(history.data.action === 'add' ) {
                historyContent.innerHTML = 'Add Department';
              } else {
                historyContent.innerHTML = 'Delete Department';
              }

              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            }
          }

          if(x == 1) {
            if(y == 0) {
              if(history.data.action === 'add' ) {
                historyContent.innerHTML = 'New Department Name :'
              } else {
                historyContent.innerHTML = 'Deleted Department :';
              }
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = history.data.department;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }

          if(x == 2) {
            if(y == 0) {
             

              if(history.data.action === 'add' ) {
                historyContent.innerHTML = 'Date Added :'
              } else {
                historyContent.innerHTML = 'Date Deleted :'
              }
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = month[new Date(history.data.createdAt).getMonth()] + ' ' + date[new Date(history.data.createdAt).getDate()]  + ' ' + new Date(history.data.createdAt).getFullYear() + ', ' + new Date(history.data.createdAt).getHours() + ':' + minute[new Date(history.data.createdAt).getMinutes()] + ':' + seconds[new Date(history.data.createdAt).getSeconds()] ;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }
          if(x == 3) {
            if(y == 0) {
              historyContent.innerHTML = 'User :'
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = history.data.user.username;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }

          if(x == 4) {
            if(y == 0) {
             
              historyContent.classList.add('w-full','absolute','left-0','bottom-0','flex','h-20','justify-center','items-center')
              const button = document.createElement('button');
              button.classList.add('border','h-10','w-24','border-white','text-white','font-bold','tanslate-ease-in','duration-300','hover:bg-white','hover:text-black','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','bg-black','hover:border-black')
              button.innerHTML = "Close"
              historyContent.appendChild(button)
              button.onclick = function() {
                historyDetailsModalBg.remove()
              }
            }
            if(y == 1) {
              historyContent.remove()
            }
          }
        }
        
      }
    }


    // Edit / Merge Action
    if(history.data.action === 'update' || history.data.action === 'merge') {
      historyModalFieldset.classList.add('gap-4')
      for(x = 0; x < 6; x++) {
        const historyModalDiv = document.createElement('div');
        historyModalFieldset.appendChild(historyModalDiv);
      
        for(y = 0; y < 2; y++) {
          const historyContent = document.createElement('div');
          historyModalDiv.appendChild(historyContent)

          if(x == 0 ) {
            if(y == 0) {
              historyContent.innerHTML = 'Action :'
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              if(history.data.action === 'update' ) {
                historyContent.innerHTML = 'Edit Department';
              } else {
                historyContent.innerHTML = 'Merge Department';
              }
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            }
          }
          
          if(x == 1) {
            if(y == 0) {
              historyContent.innerHTML = 'New Department Name :'
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = history.data.newname;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }

          if(x == 2) {
            if(y == 0) {
              historyContent.innerHTML = 'Old Department Name :'

              if(history.data.action === 'update' ) {
                historyContent.innerHTML = 'Old Department Name :'
              } else {
                historyContent.innerHTML = 'Merge Departments :';
              }

              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = history.data.department;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }

          if(x == 3) {
            if(y == 0) {
              
              if(history.data.action === 'update' ) {
                historyContent.innerHTML = 'Date Updated :'
              } else {
                historyContent.innerHTML = 'Date Merge :';
              }
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = month[new Date(history.data.createdAt).getMonth()] + ' ' + date[new Date(history.data.createdAt).getDate()]  + ' ' + new Date(history.data.createdAt).getFullYear() + ', ' + new Date(history.data.createdAt).getHours() + ':' + minute[new Date(history.data.createdAt).getMinutes()] + ':' + seconds[new Date(history.data.createdAt).getSeconds()] ;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }
          if(x == 4) {
            if(y == 0) {
              historyContent.innerHTML = 'User :'
              historyContent.classList.add('w-full','font-bold','text-xl')
            }
            if(y == 1) {
              historyContent.innerHTML = history.data.user.username;
              historyContent.classList.add('w-full', 'border-2','border-slate-300', 'p-2', 'rounded-md')
            } 
          }

          if(x == 5) {
            if(y == 0) {
             
              historyContent.classList.add('w-full','absolute','left-0','bottom-0','flex','h-20','justify-center','items-center')
              const button = document.createElement('button');
              button.classList.add('border','h-10','w-24','border-white','text-white','font-bold','tanslate-ease-in','duration-300','hover:bg-white','hover:text-black','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','bg-black','hover:border-black')
              button.innerHTML = "Close"
              historyContent.appendChild(button)
              button.onclick = function() {
                historyDetailsModalBg.remove()
              }
            }
            if(y == 1) {
              historyContent.remove()
            }
          }
        }
        
      }
    }

   

  }
})