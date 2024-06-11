const detailsButton = document.getElementsByClassName('detailsDeployedButton');
const editButton = document.getElementsByClassName('editDeployedButton');
const deleteButton = document.getElementsByClassName('deleteDeployedButton');
const addItem = document.getElementById('addItem');
const availableItems = document.getElementsByClassName('availableItems');
const actionField = document.getElementById('actionField');


// Add Button
const addValidate = document.getElementsByClassName('addUnitsValidate');
const addUnitLabels = document.getElementsByClassName('addUnitLabels');

addItem.addEventListener('submit',(e)=> {

  Array.from(addValidate).forEach((element,index)=> {
    element.classList.add('invalid:ring-red-500','valid:ring-green-500');
    element.onchange = function () {
      if(!element.checkValidity()) {
        addUnitLabels[index].classList.add('after:content-["*"]');
      } else {
        addUnitLabels[index].classList.remove('after:content-["*"]');
      }
    }
  }) 
  
  if(!addItem.checkValidity()) {
   e.preventDefault()

   Array.from(addValidate).forEach((element,index)=> {
    element.classList.add('invalid:ring-red-500','valid:ring-green-500');
      if(!element.checkValidity()) {
        addUnitLabels[index].classList.add('after:content-["*"]');
      } else {
        addUnitLabels[index].classList.remove('after:content-["*"]');
      }
  }) 
  }
})







// Edit Button
Array.from(editButton).forEach(async(element,index)=> {
  const deployedUnit = document.getElementsByClassName('deployedUnit')
  const deployedId = deployedUnit[index].getAttribute('data-deployed-id')
  const findDepartment = await axios(`http://localhost:8000/items/manage/deploy/${deployedId}`);
  const deployed = findDepartment.data;
  const data = [
    deployed.item.name,
    deployed.item.code,
    deployed.item.description,
    deployed.department.department,
    deployed.qty
  ];
  const label = [
    'Item Name :',
    'Item Code :',
    'Description :',
    'Department :',
    'Quantity :'
  ];

  element.onmouseover = function() {
    deployedUnit[index].classList.add('bg-orange-500/20')
    deployedUnit[index].classList.remove('even:bg-slate-100')
  }
  element.onmouseout = function() {
    if(chooseDept.value !== "") {
      deployedUnit[index].classList.remove('even:bg-slate-100')
    } else {
      deployedUnit[index].classList.add('even:bg-slate-100')
    }
    deployedUnit[index].classList.remove('bg-orange-500/20')
  }

  element.onclick = function() {
    if(addItem) {
      addItem.remove();
    }
    const detailsDiv = document.getElementById('detailsDiv')
    if(detailsDiv) {
      detailsDiv.remove();
    }

    const infoDiv = document.getElementsByClassName('infoDiv');
    const editDeployedForm = document.getElementById('editDeployedForm');
    if(editDeployedForm) {
    
      Array.from(infoDiv).forEach((element,index) => {
        if(index < (data.length - 1)) {
          element.innerHTML = data[index];
        } else {
          element.value = data[index];
        }
      })
      editDeployedForm.addEventListener('submit',(e)=> {
        const deployedQty = document.getElementById('qty');
        deployedQty.classList.add('invalid:ring-red-500','valid:ring-green-500');
        const deployedQtyLabel = document.getElementById('deployedQtyLabel');
        if(!editDeployedForm.checkValidity()) {
          deployedQtyLabel.classList.add('after:content-["*"]');
          e.preventDefault();
        } else {
          e.preventDefault();
          const confirmEditFormBg = document.getElementById('confirmEditFormBg');
          if(confirmEditFormBg) {
            confirmEditFormBg.remove()
          }
          const confirmEditDeployBg = document.createElement('div')
          confirmEditDeployBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center');
          confirmEditDeployBg.setAttribute('id','confirmEditFormBg')
          document.body.appendChild(confirmEditDeployBg)
          const confirmDeployedForm = document.createElement('form')
          confirmDeployedForm.action = `/items/manage/deploy/update/${deployedId}?_method=PATCH`;
          confirmDeployedForm.setAttribute('method','POST');
          confirmDeployedForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-orange-500','ring-offset-2','border-t-[30px]')
          confirmEditDeployBg.appendChild(confirmDeployedForm)
          const confirmDeployedMessage = document.createElement('p');
          confirmDeployedMessage.innerHTML = `Do you want to update ${deployed.item.name} quantity?`;
          confirmDeployedMessage.classList.add('font-bold','text-center','px-10')
          confirmDeployedForm.appendChild(confirmDeployedMessage)
          const confirmDeployButtonDiv = document.createElement('div');
          confirmDeployButtonDiv.classList.add('flex','gap-10');
          confirmDeployedForm.appendChild(confirmDeployButtonDiv);
          for(let button = 0 ; button < 2 ; button ++) {
            const confirmEditDeployButton = document.createElement('button')
            confirmEditDeployButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
            confirmDeployButtonDiv.appendChild(confirmEditDeployButton)
            if(button == 0) {
              confirmEditDeployButton.innerHTML = "YES";
              confirmEditDeployButton.classList.add('bg-orange-500','hover:text-orange-500','hover:border-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]')
            } else {
              confirmEditDeployButton.innerHTML = "NO";
              confirmEditDeployButton.classList.add('bg-black','hover:text-black','hover:border-black')
              confirmEditDeployButton.onclick = function(e) {
                e.preventDefault()
                confirmEditDeployBg.remove()
              }
            }
          }
          confirmDeployedForm.addEventListener('submit',function(){
            const editDeployQty = document.getElementById('qty')
            const confirmEditDeployQty = document.createElement('input');
            confirmEditDeployQty.classList.add('hidden')
            confirmEditDeployQty.setAttribute('type','number')
            confirmEditDeployQty.setAttribute('id','hiddenQty')
            confirmEditDeployQty.setAttribute('name','hiddenQty')
            confirmEditDeployQty.value = editDeployQty.value
            confirmDeployedForm.appendChild(confirmEditDeployQty)
          })

        }
      })

    } else {
      const editDeployedForm = document.createElement('form');
      editDeployedForm.setAttribute('id','editDeployedForm');
      editDeployedForm.noValidate = true;
      actionField.appendChild(editDeployedForm);
      editDeployedForm.classList.add('flex','h-full','w-full','2xl:px-10','xl:px-5','flex-col','justify-center','gap-2');
      const editDeployH1 = document.createElement('h1');
      editDeployH1.innerHTML = 'Edit Deployed Units';
      editDeployH1.classList.add('text-center','w-full','font-bold','text-2xl','mb-5');
      editDeployedForm.appendChild(editDeployH1);
      for(let y = 0; y < 6; y++) {
        const editDeployFormDiv = document.createElement('div');
        editDeployedForm.appendChild(editDeployFormDiv);
        const editDeployedFormLabel = document.createElement('label');
        editDeployFormDiv.appendChild(editDeployedFormLabel);
        editDeployedFormLabel.classList.add('text-lg','font-semibold');
        if(y < 4) {
          editDeployedFormLabel.innerHTML = label[y];
          const deployedInfo = document.createElement('div');
          deployedInfo.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md','infoDiv');
          editDeployFormDiv.appendChild(deployedInfo);
          deployedInfo.innerHTML = data[y];
    
          if(y == 2) {
          deployedInfo.classList.add('overflow-hidden','h-20','overflow-y-auto','indent-5');
          }
        }
        if(y == 4) {
          editDeployedFormLabel.innerHTML = label[y];
          editDeployedFormLabel.setAttribute('for','qty');
          editDeployedFormLabel.setAttribute('id','deployedQtyLabel');
          editDeployedFormLabel.classList.add('after:ms-2','after:text-red-500');
          const editDeployedQty = document.createElement('input');
          editDeployedQty.value = data[y];
          editDeployedQty.required = true;
          editDeployedQty.setAttribute('type','number');
          editDeployedQty.setAttribute('id','qty');
          editDeployedQty.setAttribute('name','qty');
          editDeployedQty.setAttribute('min','1');
          editDeployedQty.classList.add('ring-2','ring-slate-500','w-full','p-2','rounded-md','infoDiv');
          editDeployFormDiv.appendChild(editDeployedQty);
        }
        if(y == 5) {
          for(let button = 0; button < 2; button++){
            editDeployFormDiv.classList.add('flex','justify-center','gap-5','mt-10');
            const editDeployedButtons = document.createElement('button');
            editDeployedButtons.setAttribute('id','updateButton')
            editDeployedButtons.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md');
            editDeployFormDiv.appendChild(editDeployedButtons);
            if(button == 0) {
              editDeployedButtons.innerHTML = 'Update';
              editDeployedButtons.classList.add('bg-orange-500','hover:text-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]', 'hover:border-orange-500');
            }
            if(button == 1) {
              editDeployedButtons.innerHTML = 'Cancel';
              editDeployedButtons.classList.add('bg-black','hover:text-black', 'hover:border-black')
              editDeployedButtons.onclick = function(e) {
                e.preventDefault()
              location.reload();
              }
            }
          }
        }
      }
      editDeployedForm.addEventListener('submit',(e)=> {
        const deployedQty = document.getElementById('qty')
        deployedQty.classList.add('invalid:ring-red-500','valid:ring-green-500')
        const deployedQtyLabel = document.getElementById('deployedQtyLabel')
        if(!editDeployedForm.checkValidity()) {
          e.preventDefault()
          deployedQtyLabel.classList.add('after:content-["*"]')
        } else {
          e.preventDefault();
          const confirmEditFormBg = document.getElementById('confirmEditFormBg');
          if(confirmEditFormBg) {
            confirmEditFormBg.remove()
          }
          const confirmEditDeployBg = document.createElement('div')
          confirmEditDeployBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center');
          confirmEditDeployBg.setAttribute('id','confirmEditFormBg')
          document.body.appendChild(confirmEditDeployBg)
          const confirmDeployedForm = document.createElement('form')
          confirmDeployedForm.action = `/items/manage/deploy/update/${deployedId}?_method=PATCH`;
          confirmDeployedForm.setAttribute('method','POST');
          confirmDeployedForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-orange-500','ring-offset-2','border-t-[30px]')
          confirmEditDeployBg.appendChild(confirmDeployedForm)
          const confirmDeployedMessage = document.createElement('p');
          confirmDeployedMessage.innerHTML = `Do you want to update ${deployed.item.name} quantity?`;
          confirmDeployedMessage.classList.add('font-bold','text-center','px-10')
          confirmDeployedForm.appendChild(confirmDeployedMessage)
          const confirmDeployButtonDiv = document.createElement('div');
          confirmDeployButtonDiv.classList.add('flex','gap-10');
          confirmDeployedForm.appendChild(confirmDeployButtonDiv);
          for(let button = 0 ; button < 2 ; button ++) {
            const confirmEditDeployButton = document.createElement('button')
            confirmEditDeployButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
            confirmDeployButtonDiv.appendChild(confirmEditDeployButton)
            if(button == 0) {
              confirmEditDeployButton.innerHTML = "YES";
              confirmEditDeployButton.classList.add('bg-orange-500','hover:text-orange-500','hover:border-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]')
            } else {
              confirmEditDeployButton.innerHTML = "NO";
              confirmEditDeployButton.classList.add('bg-black','hover:text-black','hover:border-black')
              confirmEditDeployButton.onclick = function(e) {
                e.preventDefault()
                confirmEditDeployBg.remove()
              }
            }
          }
          confirmDeployedForm.addEventListener('submit',function(){
            const editDeployQty = document.getElementById('qty')
            const confirmEditDeployQty = document.createElement('input');
            confirmEditDeployQty.classList.add('hidden')
            confirmEditDeployQty.setAttribute('type','number')
            confirmEditDeployQty.setAttribute('id','hiddenQty')
            confirmEditDeployQty.setAttribute('name','hiddenQty')
            confirmEditDeployQty.value = editDeployQty.value
            confirmDeployedForm.appendChild(confirmEditDeployQty)
          })

        }
      })
    }
  }
})


// Details Button

Array.from(detailsButton).forEach(async(element,index)=> {



  const deployedUnit = document.getElementsByClassName('deployedUnit')
  const deployedId = deployedUnit[index].getAttribute('data-deployed-id')
  const findDeployed = await axios(`http://localhost:8000/items/manage/deploy/${deployedId}`);
  const details = findDeployed.data;
  const data = [
    details.item.name,
    details.item.code,
    details.item.description,
    details.department.department,
    details.qty
  ];
  const label = [
    'Item Name :',
    'Item Code :',
    'Description :',
    'Department :',
    'Quantity :'
  ];

  
  element.onmouseover = function() {
    deployedUnit[index].classList.add('bg-green-500/20')
    deployedUnit[index].classList.remove('even:bg-slate-100')
  }
  element.onmouseout = function() {
    if(chooseDept.value !== "") {
      deployedUnit[index].classList.remove('even:bg-slate-100')
    } else {
      deployedUnit[index].classList.add('even:bg-slate-100')
    }
    deployedUnit[index].classList.remove('bg-green-500/20')
   
  }
  element.onclick = function(){
    const addItemForm = document.getElementById('addItem');
    if(addItemForm) {
      addItemForm.remove();
    }
    const editDeployedForm =  document.getElementById('editDeployedForm');
    if(editDeployedForm) {
      editDeployedForm.remove()
    }
    const detailsDIv = document.getElementById('detailsDiv');
    if(detailsDIv){
      const dataSection = document.getElementsByClassName('dataSection');
      Array.from(dataSection).forEach((element,index) => {
        element.innerHTML = data[index]
      })
    } else {
      const detailsDIv = document.createElement('div');
      detailsDIv.setAttribute('id','detailsDiv');
      actionField.appendChild(detailsDIv);
      detailsDIv.classList.add('flex','h-full','w-full','2xl:px-10','xl:px-5','flex-col','justify-center','gap-2');
      const detailsH1 = document.createElement('h1');
      detailsH1.innerHTML = "Deployed Details";
      detailsH1.classList.add('text-center','w-full','font-bold','text-2xl','mb-5');
      detailsDIv.appendChild(detailsH1);
      Array.from(data).forEach((element,index)=> {
        const detailsSection = document.createElement('div')
        detailsDIv.appendChild(detailsSection)
        const labelSection = document.createElement('label')
        labelSection.classList.add('text-lg','font-semibold','after:text-red-500')
        labelSection.innerHTML = label[index]
        detailsSection.appendChild(labelSection)
        const dataSection = document.createElement('div')
        dataSection.classList.add('w-full','ring-2','ring-slate-300','p-2','rounded-md','dataSection')
        dataSection.innerHTML = element;
        detailsSection.appendChild(dataSection);
        if(index == 2) {
          dataSection.classList.add('h-20','overflow-y-auto','overflow-hidden','indent-5')
        }
      })

      const closeButton = document.createElement('button');
      closeButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md','bg-black','hover:text-black', 'hover:border-black','self-center','mt-10');
      closeButton.innerHTML = "CLOSE";
      detailsDIv.appendChild(closeButton);
      closeButton.onclick = function () {
        location.reload();
      }
    }
  }


})


// Delete Button

Array.from(deleteButton).forEach(async(element,index)=> {
  const deployedUnit = document.getElementsByClassName('deployedUnit')
  const deployedId = deployedUnit[index].getAttribute('data-deployed-id')
  const findDeployed = await axios(`http://localhost:8000/items/manage/deploy/${deployedId}`);
  const chooseDept = document.getElementById('chooseDept')

  element.onmouseover = function() {
    deployedUnit[index].classList.add('bg-red-500/20')
    deployedUnit[index].classList.remove('even:bg-slate-100')
  }
  element.onmouseout = function() {
    if(chooseDept.value !== "") {
      deployedUnit[index].classList.remove('even:bg-slate-100')
    } else {
      deployedUnit[index].classList.add('even:bg-slate-100')
    }
    deployedUnit[index].classList.remove('bg-red-500/20')
   
  }



  element.onclick = function() {
    const deleteFormBg = document.createElement('div')
    document.body.appendChild(deleteFormBg);
    deleteFormBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center');
    const deleteForm = document.createElement('form')
    deleteForm.setAttribute('method','POST');
    deleteForm.action = `/items/manage/deploy/delete/${deployedId}?_method=DELETE`
    deleteFormBg.appendChild(deleteForm);
    deleteForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-red-500','ring-offset-2','border-t-[30px]');
    const deleteFormMessage = document.createElement('p')
    deleteFormMessage.innerHTML = `Do you want to delete ${findDeployed.data.item.name}?`
    deleteFormMessage.classList.add('font-bold','text-center','px-10')
    deleteForm.appendChild(deleteFormMessage);
    const deleteFormButtonDiv = document.createElement('div')
    deleteFormButtonDiv.classList.add('flex','gap-10')
    deleteForm.appendChild(deleteFormButtonDiv);
    for(let button = 0; button < 2 ; button++) {
      const deleteButtons = document.createElement('button');
      deleteButtons.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
      deleteFormButtonDiv.appendChild(deleteButtons)
      if(button == 0) {
        deleteButtons.innerHTML = 'YES';
        deleteButtons.classList.add('bg-red-500','hover:text-red-500','hover:border-red-500','hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]')
      } else { 
        deleteButtons.innerHTML = "NO";
        deleteButtons.classList.add('bg-black','hover:text-black','hover:border-black');
        deleteButtons.onclick = function(e) {
          e.preventDefault();
          location.reload();
        }
      }
    }
  }


})



const departmentDiv = document.getElementsByClassName('departmentDiv');
const chooseDept = document.getElementById('chooseDept');
const deployedUnit = document.getElementsByClassName('deployedUnit')


chooseDept.onchange = function() {

  Array.from(departmentDiv).forEach((element, index) => {
    if(chooseDept.value !== element.innerHTML) {
      deployedUnit[index].classList.add('hidden')
    } else {
      deployedUnit[index].classList.remove('hidden')
    }
    if(chooseDept.value === "") {
      deployedUnit[index].classList.remove('hidden')
    }
  })
  
  Array.from(deployedUnit).forEach(element=> {
    element.classList.remove('even:bg-slate-100')
    if(chooseDept.value === "") {
      element.classList.add('even:bg-slate-100')
    }
  }) 

}

