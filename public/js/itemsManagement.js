const descButton = document.getElementsByClassName('descButton');
const deployButton = document.getElementsByClassName('deployButton');
const editButton = document.getElementsByClassName('editButton');
const deleteButton = document.getElementsByClassName('deleteButton');
const addItem = document.getElementById('addItem');
const availableItems = document.getElementsByClassName('availableItems');
const actionField = document.getElementById('actionField')






// Deploy button
Array.from(deployButton).forEach(async(element, index) => {
  const unitId = availableItems[index].getAttribute('data-unit-id');
  const findUnit = await axios(`https://gsoinventorysystem.onrender.com/unit/available/${unitId}`);
  const findDepartment = await axios('https://gsoinventorysystem.onrender.com/department');
  const department = findDepartment.data
  const unit = findUnit.data;

  element.onmouseover = function() {
    availableItems[index].classList.add('bg-blue-500/20')
    availableItems[index].classList.remove('even:bg-slate-100')
  }

  element.onmouseout = function() {
    availableItems[index].classList.remove('bg-blue-500/20')
    availableItems[index].classList.add('even:bg-slate-100')
  }

  element.onclick = function() {  
    addItem.remove();
    const editForm = document.getElementById('editForm');
    if(editForm) {
      editForm.remove();
    }
    const deployUnit = document.getElementById('deployUnit')
    if(deployUnit){
      const itemName = document.getElementById('itemName');
      const itemCode = document.getElementById('itemCode');
      const itemDesc = document.getElementById('itemDesc');
      const unitQty = document.getElementById('unitQty');
      const unitId = document.getElementById('unitId')
      itemName.innerHTML = unit.item.name
      itemCode.innerHTML = unit.item.code
      itemDesc.innerHTML = unit.item.description
      unitQty.innerHTML = unit.qty
      unitId.value = unit._id


    } else {
      const deployForm = document.createElement('form');
      deployForm.setAttribute('id','deployUnit')
      deployForm.noValidate = true;
      actionField.appendChild(deployForm);
      deployForm.classList.add('h-full', 'w-full', '2xl:px-10','xl:px-5', 'flex', 'flex-col', 'justify-center','gap-2');
      const deployFormH1 = document.createElement('h1');
      deployForm.appendChild(deployFormH1);
      deployFormH1.innerHTML = 'Deploy Units';
      deployFormH1.classList.add('text-center', 'w-full', 'font-bold', 'text-2xl', 'mb-5')
      const hiddenUnitId = document.createElement('input')
      hiddenUnitId.setAttribute('type','hidden');
      hiddenUnitId.setAttribute('id','unitId');
      hiddenUnitId.setAttribute('name','unitId');
      hiddenUnitId.value = unit._id
      deployForm.appendChild(hiddenUnitId)

      for(let b = 0; b < 6 ; b++) {
        const inputLabelDiv = document.createElement('div');
        deployForm.appendChild(inputLabelDiv);
        if(b < 3) { 
          const deployFormLabels = document.createElement('label');
          inputLabelDiv.appendChild(deployFormLabels);
          deployFormLabels.classList.add('text-lg','font-semibold');
          if(b == 0) {
            const inputItemName = document.createElement('div');
            inputItemName.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md');
            inputItemName.setAttribute('id','itemName')
            inputLabelDiv.appendChild(inputItemName);
            deployFormLabels.innerHTML = 'Item Name :';
            inputItemName.innerHTML = unit.item.name
          }
          if(b == 1) {
            const inputItemCode = document.createElement('div');
            inputItemCode.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md');
            inputLabelDiv.appendChild(inputItemCode);
            inputItemCode.setAttribute('id','itemCode')
            deployFormLabels.innerHTML = 'Item Code :';
            inputItemCode.innerHTML = unit.item.code
          }
          if(b == 2) {
            const inputItemDesc = document.createElement('div');
            inputItemDesc.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md','h-20','overflow-y-auto','overflow-hidden');
            inputItemDesc.setAttribute('id','itemDesc')
            inputLabelDiv.appendChild(inputItemDesc);
            deployFormLabels.innerHTML = 'Item Description :';
            inputItemDesc.innerHTML = unit.item.description
          }
        }
        if(b == 3) {
          for(let x = 0 ; x < 2; x++) {
            const quantityDiv = document.createElement('div');
            inputLabelDiv.classList.add('grid','gap-3','grid-cols-2')
            inputLabelDiv.appendChild(quantityDiv);
            if(x == 0) {  
              const labelUnitQty = document.createElement('label');
              labelUnitQty.classList.add('text-lg','font-semibold')
              labelUnitQty.innerHTML = 'Unit Quantity :'
              quantityDiv.appendChild(labelUnitQty);
              const inputUnitQty = document.createElement('div');
              inputUnitQty.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md');
              inputUnitQty.setAttribute('id','unitQty')
              quantityDiv.appendChild(inputUnitQty);
              inputUnitQty.innerHTML = unit.qty
            } else {
              const labelDeployQty = document.createElement('label');
              labelDeployQty.setAttribute('for','deployQty');
              labelDeployQty.innerHTML = 'Deploy Quantity :'
              labelDeployQty.classList.add('text-lg','font-semibold','label','after:ps-1','after:text-red-500')
              quantityDiv.appendChild(labelDeployQty);
              const inputDeployQty = document.createElement('input');
              inputDeployQty.required = true;
              inputDeployQty.classList.add('ring-2','ring-slate-500','w-full','p-2','rounded-md','checkValidity');
              inputDeployQty.setAttribute('type','number')
              inputDeployQty.setAttribute('id','deployQty')
              inputDeployQty.setAttribute('name','deployQty')
              inputDeployQty.setAttribute('value','1')
              inputDeployQty.setAttribute('min','1')
              inputDeployQty.setAttribute('max',unit.qty)
              quantityDiv.appendChild(inputDeployQty);
            }
            
          }
        }
        if(b == 4) {
          const labelDepartment = document.createElement('label');
          labelDepartment.setAttribute('for','department')
          labelDepartment.classList.add('text-lg','font-semibold','label','after:ps-1','after:text-red-500')
          labelDepartment.innerHTML = 'Department :'
          inputLabelDiv.appendChild(labelDepartment)
          const selectDepartment = document.createElement('select')
          selectDepartment.setAttribute('name','department')
          selectDepartment.setAttribute('id','department')
          selectDepartment.required = true;
          selectDepartment.classList.add('ring-2','ring-slate-500','w-full','p-2','rounded-md','checkValidity')
          inputLabelDiv.appendChild(selectDepartment)
          const deptOption = document.createElement('option');
          deptOption.text = 'Select Department';
          deptOption.value = ""
          selectDepartment.add(deptOption);
          Array.from(department).forEach(element => {
            const deptOption = document.createElement('option');
            deptOption.text = element.department;
            deptOption.value = element._id;
            selectDepartment.add(deptOption);
          })
        }
        if(b == 5) {
          for(let button = 0 ; button < 2; button++) {
            inputLabelDiv.classList.add('mt-10','gap-10','flex','justify-center')
            const deployUnitButton = document.createElement('button')
            deployUnitButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md')
            inputLabelDiv.appendChild(deployUnitButton)
            if(button == 0) {
              deployUnitButton.innerHTML = 'Submit';
              deployUnitButton.classList.add('bg-blue-500','hover:text-blue-500','hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]', 'hover:border-blue-500')
              deployUnitButton.onclick = function (e) {
                const checkValidity = document.getElementsByClassName('checkValidity');
                for(let z of checkValidity) {
                  z.classList.add('valid:ring-green-500','invalid:ring-red-500')
                }
                const label = document.getElementsByClassName('label')
                Array.from(checkValidity).forEach((element, index) => {
                  if(!element.checkValidity()) {
                    e.preventDefault()
                    label[index].classList.add('after:content-["*"]')
                  } else {
                    label[index].classList.remove('after:content-["*"]')
                  }
                })  
            
                if(deployForm.checkValidity()) {
                  e.preventDefault();
                  const confirmDeployUnitBg = document.createElement('div');
                  const selectDepratment = document.getElementById('department')
                  const deployQty = document.getElementById('deployQty')
                  confirmDeployUnitBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center')
                  const departmentArray = []
                  Array.from(department).forEach(element => {
                    departmentArray.push(element._id)
                  })
                  var departmentIndex = departmentArray.indexOf(selectDepratment.value)
                  confirmDeployUnitBg.setAttribute('id','confirmDeployUnitBg')
                  document.body.appendChild(confirmDeployUnitBg)
                  const confirmDeployForm = document.createElement('form')
                  confirmDeployForm.action = '/items/manage/deploy';
                  confirmDeployForm.setAttribute('method','POST')
                  confirmDeployUnitBg.appendChild(confirmDeployForm)
                  confirmDeployForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-blue-500','ring-offset-2','border-t-[30px]');
                  const confirmDeployModalMessage = document.createElement('p');
                  confirmDeployModalMessage.classList.add('font-bold','text-center','px-10')
                  confirmDeployModalMessage.innerHTML = `Deploy ${deployQty.value} ${unit.item.name} ${deployQty.value > 1 ? 'units' : 'unit' },  on ${department[departmentIndex].department} department?`;
                  confirmDeployForm.appendChild(confirmDeployModalMessage)
                  const confirmDeployButtonDiv = document.createElement('div');
                  confirmDeployButtonDiv.classList.add('flex','gap-10')
                  confirmDeployForm.appendChild(confirmDeployButtonDiv)
                  for(let button = 0; button < 2; button ++) {
                    const confirmDeployButton = document.createElement('button')
                    confirmDeployButtonDiv.appendChild(confirmDeployButton)
                    if(button == 0) {
                      confirmDeployButton.innerHTML = "YES"
                      confirmDeployButton.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-blue-500', 'text-white', 'font-bold', 'border-blue-300', 'hover:bg-white', 'hover:text-blue-500', 'hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]', 'transition-ease-in', 'duration-300')
                      confirmDeployButton.formAction = '/items/manage/deploy'
                    }
                    if(button == 1) {
                      confirmDeployButton.innerHTML = 'NO'
                      confirmDeployButton.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300')
                      confirmDeployButton.onclick = function(e) {
                        e.preventDefault()
                        confirmDeployUnitBg.remove()
                      }
                    }
                  } 
                  confirmDeployForm.addEventListener('submit',function(e) {
                    const unitId = document.getElementById('unitId')
                    const hiddenUnitid = document.createElement('input');
                    hiddenUnitid.setAttribute('type','text');
                    hiddenUnitid.setAttribute('id','unitId');
                    hiddenUnitid.setAttribute('name','unitId');
                    hiddenUnitid.classList.add('hidden')
                    hiddenUnitid.value = unitId.value;
                    confirmDeployForm.appendChild(hiddenUnitid);
                    const hiddenDeployQty = document.createElement('input')
                    hiddenDeployQty.setAttribute('type','number');
                    hiddenDeployQty.setAttribute('id','qty');
                    hiddenDeployQty.setAttribute('name','qty')
                    hiddenDeployQty.classList.add('hidden')
                    hiddenDeployQty.value = deployQty.value;
                    confirmDeployForm.appendChild(hiddenDeployQty);
                    const hiddenDepartment = document.createElement('input');
                    hiddenDepartment.setAttribute('type','text');
                    hiddenDepartment.setAttribute('id','department');
                    hiddenDepartment.setAttribute('name','department');
                    hiddenDepartment.classList.add('hidden')
                    hiddenDepartment.value = selectDepratment.value;
                    confirmDeployForm.appendChild(hiddenDepartment);
                  })
                }
              }
                   
            } else {
              deployUnitButton.innerHTML = 'Cancel';
              deployUnitButton.classList.add('bg-black','hover:text-black', 'hover:border-black')
              deployUnitButton.onclick = function (e) {
                e.preventDefault()
                location.reload()
              }
            }
  
          }
        }
      }
    }

    
  }
  
})



//Edit Button

Array.from(editButton).forEach( async(button,index) => {
  const unitId = availableItems[index].getAttribute('data-unit-id');
  const findUnit = await axios(`https://gsoinventorysystem.onrender.com/unit/available/${unitId}`)
  const unit = findUnit.data
  const unitData = [
    unit.item.name,
    unit.item.code,
    unit.qty,
    unit.item.description
  ];
  const formLabel =[
    'Item Name :',
    'Item Code :',
    'Quantity :',
    'Item Description :'
  ] 


  button.onmouseover = function() {
    availableItems[index].classList.add('bg-orange-500/20')
    availableItems[index].classList.remove('even:bg-slate-100')
  }

  button.onmouseout = function() {
    availableItems[index].classList.remove('bg-orange-500/20')
    availableItems[index].classList.add('even:bg-slate-100')
  }
  button.onclick = function(){
    const deployUnit = document.getElementById('deployUnit')
    if(deployUnit) {
      deployUnit.remove();
    }
    const addItem = document.getElementById('addItem')
    if(addItem) {
      addItem.remove()
    }
    const editForm = document.getElementById('editForm') 
    if(editForm) {
      const validateEditForm = document.getElementsByClassName('validateEditForm')
      Array.from(validateEditForm).forEach((element,index) => {
        element.value = unitData[index]
      })
      const editAvailableUnitForm = document.getElementById('editForm')
      const editAvailableUnitLabel = document.getElementsByClassName('editAvailableUnitLabel');
      editAvailableUnitForm.addEventListener('submit',(e)=> {
        e.preventDefault()
        Array.from(validateEditForm).forEach((element,index)=> {
          element.classList.add('invalid:ring-red-500','valid:ring-green-500');
          if(!element.checkValidity()) {
            editAvailableUnitLabel[index].classList.add('after:content-["*"]');
          } else {
            editAvailableUnitLabel[index].classList.remove('after:content-["*"]');
          }
        })
        if(editAvailableUnitForm.checkValidity()) {
          const confirmEditFormBg = document.getElementById('confirmEditFormBg');
          if(confirmEditFormBg) {
            confirmEditFormBg.remove();
          }
          const editAvailableUnitName = document.getElementById('name')
          const confirmedEditFormBg = document.createElement('div');
          confirmedEditFormBg.setAttribute('id','confirmEditFormBg');
          confirmedEditFormBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center');
          document.body.appendChild(confirmedEditFormBg);
          const confirmEditForm = document.createElement('form');
          confirmEditForm.action = `/items/manage/update/${unitId}?_method=PATCH`;
          confirmEditForm.setAttribute('method','POST')
          confirmEditForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-orange-500','ring-offset-2','border-t-[30px]');
          confirmedEditFormBg.appendChild(confirmEditForm);
          const confirmedEditMessage = document.createElement('p');
          confirmedEditMessage.classList.add('font-bold','text-center','px-10');
          confirmedEditMessage.innerHTML = `Do you want to update ${editAvailableUnitName.value}?`
          confirmEditForm.appendChild(confirmedEditMessage) 
          const buttonDiv = document.createElement('div');
          buttonDiv.classList.add('flex','gap-10')
          confirmEditForm.appendChild(buttonDiv);
          for(let button = 0 ;button < 2; button ++) {
            const confirmButton = document.createElement('button');
            confirmButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
            buttonDiv.appendChild(confirmButton)
            if(button == 0) {
              confirmButton.innerHTML = 'YES'
              confirmButton.classList.add('bg-orange-500','hover:text-orange-500','hover:border-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]')
            } else {
              confirmButton.innerHTML = "NO";
              confirmButton.classList.add('bg-black','hover:text-black','hover:border-black')
              confirmButton.onclick = function(e) {
                e.preventDefault()
                confirmedEditFormBg.remove()
              }
            }
          }
          confirmEditForm.addEventListener('submit',function(){
            const name = document.getElementById('name')
            const code = document.getElementById('code')
            const editFormQty = document.getElementById('qty')
            const desc = document.getElementById('description')
            
     

            const itemName = document.createElement('input');
            itemName.classList.add('hidden');
            itemName.value = name.value
            confirmEditForm.appendChild(itemName);
            itemName.setAttribute('type','text');
            itemName.setAttribute('id','name');
            itemName.setAttribute('name','name');
            const itemCode = document.createElement('input');
            itemCode.value = code.value
            itemCode.classList.add('hidden');
            confirmEditForm.appendChild(itemCode);
            itemCode.setAttribute('type','text');
            itemCode.setAttribute('id','code');
            itemCode.setAttribute('name','code');
            const qty = document.createElement('input');
            qty.classList.add('hidden');
            qty.value = editFormQty.value
            confirmEditForm.appendChild(qty);
            qty.setAttribute('type','number');
            qty.setAttribute('id','qty');
            qty.setAttribute('name','qty');
            const textArea = document.createElement('textarea');
            textArea.value = desc.value
            confirmEditForm.appendChild(textArea);
            textArea.setAttribute('id','description')
            textArea.setAttribute('name','description')
            textArea.classList.add('hidden');
          })
        }


        
      })
      
      
    } else {
      const editAvailableUnitForm = document.createElement('form');
      editAvailableUnitForm.setAttribute('id','editForm');
      editAvailableUnitForm.noValidate = true;
      editAvailableUnitForm.classList.add('flex','h-full','w-full','2xl:px-10','xl:px-5','flex-col','justify-center','gap-2');
      actionField.appendChild(editAvailableUnitForm);
      const editAvailableUnitH1 = document.createElement('h1');
      editAvailableUnitH1.classList.add('text-center','w-full','font-bold','text-2xl','mb-5');
      editAvailableUnitH1.innerHTML = 'Edit Available Unit';
      editAvailableUnitForm.appendChild(editAvailableUnitH1);
      for(let x = 0; x < unitData.length + 1; x++ ) {
        const editFormDiv = document.createElement('div');
        editFormDiv.classList.add('w-full')
        editAvailableUnitForm.appendChild(editFormDiv);
        if(x < unitData.length) {
          const editFormLabel = document.createElement('label');
          editFormLabel.classList.add('text-lg','font-semibold','after:ms-2','after:text-red-500','editAvailableUnitLabel');
          editFormDiv.appendChild(editFormLabel);
          editFormLabel.innerHTML = formLabel[x];
          if(x < 2) {
            const formInputTypeText = document.createElement('input');
            formInputTypeText.classList.add('w-full','ring-2','ring-slate-300','p-2','rounded-md','validateEditForm');
            formInputTypeText.setAttribute('type','text');
            formInputTypeText.required =true;
            editFormDiv.appendChild(formInputTypeText);
            if(x == 0) {
              formInputTypeText.setAttribute('id','name');
              formInputTypeText.setAttribute('name','name');
              formInputTypeText.value = unitData[x];
            }
            if(x == 1) {
              formInputTypeText.setAttribute('id','code')
              formInputTypeText.setAttribute('name','code')
              formInputTypeText.value = unitData[x]
            }
          }
          if(x == 2) {
            const formInputTypeNum = document.createElement('input');
            formInputTypeNum.required = true;
            formInputTypeNum.classList.add('w-full','ring-2','ring-slate-300','p-2','rounded-md','validateEditForm');
            formInputTypeNum.setAttribute('type','number');
            formInputTypeNum.setAttribute('id','qty');
            formInputTypeNum.setAttribute('name','qty');
            formInputTypeNum.setAttribute('min','1');
            formInputTypeNum.value = unitData[x];
            editFormDiv.appendChild(formInputTypeNum);
          }
          if(x == 3) {
            const formTextArea = document.createElement('textarea');
            formTextArea.classList.add('ring-2','ring-slate-300','w-full','p-2','rounded-md','resize-none','validateEditForm');
            formTextArea.required = true;
            formTextArea.setAttribute('name','description');
            formTextArea.setAttribute('id','description');
            formTextArea.setAttribute('cols','30');
            formTextArea.setAttribute('rows','3');
            formTextArea.value = unitData[x];
            editFormDiv.appendChild(formTextArea);
            
          }
        }
        if(x == unitData.length) {
          for(let button = 0; button < 2; button++) {
            const editFormButton = document.createElement('button');
            editFormButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md');
            editFormDiv.appendChild(editFormButton);
            editFormDiv.classList.add('flex','gap-10','justify-center','mt-10');
            if(button == 0) {
              editFormButton.innerHTML = `Update`;
              editFormButton.classList.add('bg-orange-500','hover:text-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]', 'hover:border-orange-500');
            }
            if(button == 1) {
              editFormButton.innerHTML = 'Cancel';
              editFormButton.classList.add('bg-black','hover:text-black', 'hover:border-black');
              editFormButton.onclick = function(e) {
              e.preventDefault();
              location.reload();
              }
            }
          }
        }
      }

      const validateEditForm = document.getElementsByClassName('validateEditForm');
      const editAvailableUnitLabel = document.getElementsByClassName('editAvailableUnitLabel');
      editAvailableUnitForm.addEventListener('submit',(e)=> {
        e.preventDefault()
        Array.from(validateEditForm).forEach((element,index)=> {
          element.classList.add('invalid:ring-red-500','valid:ring-green-500');
          if(!element.checkValidity()) {
            editAvailableUnitLabel[index].classList.add('after:content-["*"]');
          } else {
            editAvailableUnitLabel[index].classList.remove('after:content-["*"]');
          }
        })
        if(editAvailableUnitForm.checkValidity()) {
          const confirmEditFormBg = document.getElementById('confirmEditFormBg');
          if(confirmEditFormBg) {
            confirmEditFormBg.remove();
          }
          const editAvailableUnitName = document.getElementById('name')
          const confirmedEditFormBg = document.createElement('div');
          confirmedEditFormBg.setAttribute('id','confirmEditFormBg');
          confirmedEditFormBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center');
          document.body.appendChild(confirmedEditFormBg);
          const confirmEditForm = document.createElement('form');
          confirmEditForm.action = `/items/manage/update/${unitId}?_method=PATCH`;
          confirmEditForm.setAttribute('method','POST')
          confirmEditForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-orange-500','ring-offset-2','border-t-[30px]');
          confirmedEditFormBg.appendChild(confirmEditForm);
          const confirmedEditMessage = document.createElement('p');
          confirmedEditMessage.classList.add('font-bold','text-center','px-10');
          confirmedEditMessage.innerHTML = `Do you want to update ${editAvailableUnitName.value}?`
          confirmEditForm.appendChild(confirmedEditMessage) 
          const buttonDiv = document.createElement('div');
          buttonDiv.classList.add('flex','gap-10')
          confirmEditForm.appendChild(buttonDiv);
          for(let button = 0 ;button < 2; button ++) {
            const confirmButton = document.createElement('button');
            confirmButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
            buttonDiv.appendChild(confirmButton)
            if(button == 0) {
              confirmButton.innerHTML = 'YES'
              confirmButton.classList.add('bg-orange-500','hover:text-orange-500','hover:border-orange-500','hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]')
            } else {
              confirmButton.innerHTML = "NO";
              confirmButton.classList.add('bg-black','hover:text-black','hover:border-black')
              confirmButton.onclick = function(e) {
                e.preventDefault()
                confirmedEditFormBg.remove()
              }
            }
          }
     
          confirmEditForm.addEventListener('submit',function(){
    
            const name = document.getElementById('name')
            const code = document.getElementById('code')
            const editFormQty = document.getElementById('qty')
            const desc = document.getElementById('description')

        
            const itemName = document.createElement('input');
            itemName.classList.add('hidden');
            itemName.value = name.value
            confirmEditForm.appendChild(itemName);
            itemName.setAttribute('type','text');
            itemName.setAttribute('id','name');
            itemName.setAttribute('name','name');
            const itemCode = document.createElement('input');
            itemCode.value = code.value
            itemCode.classList.add('hidden');
            confirmEditForm.appendChild(itemCode);
            itemCode.setAttribute('type','text');
            itemCode.setAttribute('id','code');
            itemCode.setAttribute('name','code');
            const qty = document.createElement('input');
            qty.classList.add('hidden');
            qty.value = editFormQty.value
            confirmEditForm.appendChild(qty);
            qty.setAttribute('type','number');
            qty.setAttribute('id','qty');
            qty.setAttribute('name','qty');
            const textArea = document.createElement('textarea');
            textArea.value = desc.value
            confirmEditForm.appendChild(textArea);
            textArea.setAttribute('id','description')
            textArea.setAttribute('name','description')
            textArea.classList.add('hidden');
          })
        }
      })
    }
  }
 })


// Delete Button
Array.from(deleteButton).forEach(async (element,index) => {
  const unitId = availableItems[index].getAttribute('data-unit-id');
  const findUnit = await axios(`https://gsoinventorysystem.onrender.com/unit/available/${unitId}`)
  const unit = findUnit.data
  element.onmouseover = function() {
    availableItems[index].classList.add('bg-red-500/20')
    availableItems[index].classList.remove('even:bg-slate-100')
  }
  element.onmouseout = function() {
    availableItems[index].classList.remove('bg-red-500/20')
    availableItems[index].classList.add('even:bg-slate-100')
  }
  
  element.onclick = function (){
    const deleteUnitFormBg = document.createElement('div')
    deleteUnitFormBg.classList.add('absolute','left-0','top-0','w-screen','h-screen','flex','justify-center','items-center')
    document.body.appendChild(deleteUnitFormBg)
    const deleteUnitForm = document.createElement('form')
    deleteUnitForm.setAttribute('method','POST');
    deleteUnitForm.action = `/items/manage/delete/${unitId}?_method=DELETE`;
    deleteUnitFormBg.appendChild(deleteUnitForm);
    deleteUnitForm.classList.add('border-4', 'border-black', 'w-96', 'h-64', 'bg-white', 'rounded-md', 'flex', 'items-center', 'justify-center', 'flex-col', 'gap-10', 'ring-4','ring-inset', 'ring-red-500', 'ring-offset-2', 'border-t-[30px]');
    const confirmDeleteMessage = document.createElement('p');
    confirmDeleteMessage.classList.add('font-bold','text-center','px-10');
    confirmDeleteMessage.innerHTML = `You want to delete ${unit.item.name} unit?`;
    deleteUnitForm.appendChild(confirmDeleteMessage);
    const confirmButtonDiv = document.createElement('div') 
    confirmButtonDiv.classList.add('flex', 'gap-10')
    deleteUnitForm.appendChild(confirmButtonDiv)
    for(let button = 0; button < 2; button++) {
      const confirmDeleteButton = document.createElement('button');
      confirmDeleteButton.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md','font-bold','transition-ease-in', 'duration-300','text-white')
      confirmButtonDiv.appendChild(confirmDeleteButton)
      if(button == 0) {
        confirmDeleteButton.innerHTML = 'YES'
        confirmDeleteButton.classList.add('bg-red-500','border-red-300', 'hover:text-red-500','hover:bg-white', 'hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]')
        confirmDeleteButton.formAction = `/items/manage/delete/${unitId}?_method=DELETE`;
      }
      if(button == 1) {
        confirmDeleteButton.innerHTML = 'NO'
        confirmDeleteButton.classList.add('border', 'h-10', 'w-24', 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', 'rounded-md', 'bg-black', 'font-bold', 'text-white', 'border-white','hover:border-black', 'hover:bg-white', 'hover:text-black', 'transition-ease-in', 'duration-300')
        confirmDeleteButton.onclick = function(e) {
          e.preventDefault()
          deleteUnitFormBg.remove()
        }
      }
    }
  }
  
})


// Add Button
const addValidate = document.getElementsByClassName('addUnitsValidate')
const addUnitLabels = document.getElementsByClassName('addUnitLabels')

addItem.addEventListener('submit',(e)=> {
  Array.from(addValidate).forEach((element,index)=> {
    element.classList.add('invalid:ring-red-500','valid:ring-green-500')
    element.onchange = function () {
      if(!element.checkValidity()) {
        addUnitLabels[index].classList.add('after:content-["*"]')
      } else {
        addUnitLabels[index].classList.remove('after:content-["*"]')
      }
    }
  }) 
  
  if(!addItem.checkValidity()) {
    e.preventDefault()
    Array.from(addValidate).forEach((element,index)=> {
      element.classList.add('invalid:ring-red-500','valid:ring-green-500')
        if(!element.checkValidity()) {
          addUnitLabels[index].classList.add('after:content-["*"]')
        } else {
          addUnitLabels[index].classList.remove('after:content-["*"]')
        }
    }) 
  }
})


const unitName = document.getElementsByClassName('unitName')
Array.from(unitName).forEach((element,index) => {
  element.onmouseover = function() {
    availableItems[index].classList.add('bg-green-500/20')
    availableItems[index].classList.remove('even:bg-slate-100')
  }
  element.onmouseout = function() {
    availableItems[index].classList.remove('bg-green-500/20')
    availableItems[index].classList.add('even:bg-slate-100')
  }  
})


