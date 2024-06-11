const requestButton = document.getElementsByClassName('requestBtn');
const deployedItemName = document.getElementsByClassName('deployedItemName');
const deployedItemCode = document.getElementsByClassName('deployedItemCode');
const deployedItemQty = document.getElementsByClassName('deployedItemQty');
const deployedItemDesc = document.getElementsByClassName('deployedItemDesc');



for(i = 0; i < requestButton.length; i++) {
  const itemId = deployedItemName[i].getAttribute('data-dept-deploys');
  // =============================================================================Create Request Form  
  requestButton[i].onclick = async function () {
    const deployData = await axios(`https://gsoinventorysystem.onrender.com/items/manage/deploy/${itemId}`)

    const requestFormDiv = document.createElement('div');
    requestFormDiv.setAttribute('id','requestFormDiv');
    const requestForm = document.createElement('form');
    requestForm.classList.add('bounceEffect')
    requestForm.setAttribute('method','POST');
    const formFieldSet = document.createElement('FIELDSET');
    formFieldSet.classList.add('border-4','rounded-lg','h-full','border-yellow-300') 
    const formLegend = document.createElement('LEGEND');
    formLegend.classList.add('text-3xl','ml-5','font-bold','px-1')
    document.body.appendChild(requestFormDiv);
    requestFormDiv.appendChild(requestForm);
    requestForm.appendChild(formFieldSet);
    formFieldSet.appendChild(formLegend);
    formLegend.innerHTML = "Request Form";
    formFieldSet.setAttribute('id','requestFormFieldset');
    formLegend.setAttribute('id','requestFormLegend');
    const selectFormDivField = document.getElementsByClassName('formDivField');
    const selectFormElementLabel = document.getElementsByClassName('formElementLabel');

    for(let i = 0 ; i < 6 ; i++)
    {
      const formDivField = document.createElement('div');
      formDivField.classList.add('formDivField','mt-1');
      formFieldSet.appendChild(formDivField);
    }
    for(let p = 0; p < 4 ; p++) 
    {
      const formElementLabel = document.createElement('div');
      selectFormDivField[p].appendChild(formElementLabel);
      formElementLabel.classList.add('formElementLabel','font-bold','text-lg');
    }

    for(let b = 0; b < 4 ; b++) 
    {
      const createElementP = document.createElement('p');
      selectFormDivField[b].appendChild(createElementP);
      createElementP.classList.add('formElementP','w-full','border-2','px-2', 'py-1','rounded-md','text-sm');
    }

    requestFormDiv.classList.add('backdrop-blur-sm');
    requestForm.setAttribute('id','requestFormModal');
    requestForm.classList.add('shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]');
    const requestFormFieldset = document.getElementById('requestFormFieldset');
    requestFormFieldset.classList.add('px-3' ,'py-2', 'flex','flex-col');


    selectFormElementLabel[0].innerHTML = 'Item Name:';
    selectFormElementLabel[1].innerHTML = 'Item Code:';
    selectFormElementLabel[2].innerHTML = 'Deployed Quantity:';
    selectFormElementLabel[3].innerHTML = 'Description:';

    const selectFormElementP = document.getElementsByClassName('formElementP');
    
    selectFormElementP[3].classList.add('text-justify','indent-12', 'h-28','overflow-y-auto');
    const inputElement = document.createElement('INPUT');
    inputElement.setAttribute('type','number');
    inputElement.setAttribute('name','formRequestQty');
    inputElement.setAttribute('id','formRequestQty');
    inputElement.setAttribute('min','1');
    inputElement.setAttribute('max',`${deployData.data.qty}`);
    inputElement.setAttribute('value',1);
    inputElement.classList.add('w-full','border-2','px-2', 'py-1','rounded-md','text-sm')
    const inputElementLabel = document.createElement('LABEL');
    inputElementLabel.setAttribute('FOR','formRequestQty')
    const spanErrorMessage = document.createElement('span');
    spanErrorMessage.setAttribute('id','spanErrorMessage');
    inputElementLabel.classList.add('font-bold','text-lg')
    selectFormDivField[4].appendChild(inputElementLabel)
    selectFormDivField[4].appendChild(spanErrorMessage)
    inputElementLabel.innerHTML = 'Request Quantity:'
    selectFormDivField[4].appendChild(inputElement)
    document.getElementById('requestFormModal').noValidate = true;


    // =================================================Validate Request QTy
    const requestFormModal = document.getElementById('requestFormModal');
    const validateRequestQty = document.getElementById('formRequestQty')
    const qtyErrorMessage = document.getElementById('spanErrorMessage')
    qtyErrorMessage.classList.add('text-sm','font-semibold','pl-2','text-red-500')
    validateRequestQty.required = true;
    for( let button = 0 ; button < 2 ; button++ )
    {
      const formRequestButton = document.createElement('div');
      formRequestButton.classList.add('border','px-2','formRequestButton','w-24','h-10','rounded-md','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','flex','items-center','justify-center')
      selectFormDivField[5].appendChild(formRequestButton);
      selectFormDivField[5].classList.add('flex','justify-center','items-center','gap-5','font-bold','h-full')
    }
    const formRequestBtn = document.getElementsByClassName('formRequestButton')
    formRequestBtn[0].innerHTML = 'Request';
    formRequestBtn[1].innerHTML = 'Cancel';
    formRequestBtn[0].classList.add('transition-ease-in','duration-300','bg-yellow-300','hover:text-yellow-300','hover:bg-black','border-yellow-200','cursor-pointer');
    formRequestBtn[1].classList.add('text-white','bg-black','transition-ease-in','duration-300','hover:text-black','hover:bg-white','hover:border-black','border-white','cursor-pointer')
    formRequestBtn[0].onclick = function(e) {
      validateRequestQty.classList.add('invalid:border-red-500','valid:border-green-500')
      if( validateRequestQty.value <= 0 || validateRequestQty.value == '' ) 
      {
        qtyErrorMessage.innerHTML = 'Please add request quantity'
        e.preventDefault();
      
      }else if ( validateRequestQty.value > deployData.data.qty ) 
      {
        qtyErrorMessage.innerHTML = `You only have ${deployData.data.qty} quantity to Request`
        e.preventDefault();
   
      } else if( !requestFormModal.checkValidity() ) 
      {
        e.preventDefault();
        
      } else {

        const confirmRequestBackGround = document.createElement('div')
        confirmRequestBackGround.setAttribute('id','confirmRequestBackGround');
        confirmRequestBackGround.classList.add('absolute','left-0','top-0','w-screen','h-screen','z-50','flex','justify-center','items-center')
        selectFormDivField[5].appendChild(confirmRequestBackGround)
        const confirmRequest = document.createElement('div');
        confirmRequestBackGround.appendChild(confirmRequest);
        confirmRequest.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-yellow-300','ring-offset-2','border-t-[30px]');
        confirmRequest.setAttribute('id','confirmRequest');
        for(let x = 0; x < 2; x++) 
        {
          const requestDiv = document.createElement('div');
          confirmRequest.appendChild(requestDiv)
          requestDiv.classList.add('requestDiv')
        }
        const desicionRequestDiv = document.getElementsByClassName('requestDiv')
        desicionRequestDiv[0].innerHTML = `Are you sure you want to add ${validateRequestQty.value} Request?`;
        desicionRequestDiv[1].classList.add('flex','gap-12')
        for(let y = 0; y < 2; y++)
        {
          const confirmButton = document.createElement('button');
          confirmButton.classList.add('confirmButton','border','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','w-24','rounded-md','h-10')
          desicionRequestDiv[1].appendChild(confirmButton);
        
        }
        const confirmButton = document.getElementsByClassName('confirmButton');
        confirmButton[0].innerHTML = 'Yes';
        confirmButton[0].setAttribute('id','confirmButtonYes')
        confirmButton[1].innerHTML = 'No';
        confirmButton[1].setAttribute('id','confirmButtonNo')
        confirmButton[0].classList.add('transition-ease-in','duration-300','bg-yellow-300','hover:text-yellow-300','hover:bg-black','border-yellow-300')
        confirmButton[1].classList.add('text-white','bg-black','transition-ease-in','duration-300','hover:text-black','hover:bg-white','hover:border-black','border-white')
        const confirmButtonNo = document.getElementById('confirmButtonNo')
        const confirmButtonYes = document.getElementById('confirmButtonYes')
        confirmButtonNo.onclick = function() 
        {
          confirmRequestBackGround.remove();
        }
        confirmButtonYes.formAction = `/user/myrequest/requests/add/${itemId}`
      }
    } 
    
    
    formRequestBtn[1].onclick = function() 
    {
      const deleteRequestFormDiv = document.getElementById('requestFormDiv');
      deleteRequestFormDiv.remove();
    }

 
      selectFormElementP[0].innerHTML = deployData.data.item.name;
      selectFormElementP[1].innerHTML = deployData.data.item.code;
      selectFormElementP[2].innerHTML = deployData.data.qty;
      selectFormElementP[3].innerHTML = deployData.data.item.description;
      requestForm.action = `/user/myrequest/requests/add/${itemId}`;
    

  } 
}



// =========================================================== CREATE RECEIVE FORM
const ReceiveBtn = document.getElementsByClassName('receiveBtn');
const forReceiving = document.getElementById('forReceiving');
const receivingData = document.getElementsByClassName('receivingData')

for (let l = 0; l < ReceiveBtn.length; l++) {
  ReceiveBtn[l].onclick = async function () {
    const dataAttribute = receivingData[l].getAttribute('data-request-id');
    const res = await axios(`https://gsoinventorysystem.onrender.com/user/requests/${dataAttribute}`)

    const forReceive = document.createElement('div')
    forReceiving.appendChild(forReceive);
    forReceive.classList.add('absolute','w-screen','h-screen','bg-black/40','top-0','left-0','z-50','flex','justify-center','items-center','backdrop-blur-sm');
    const receiveForm = document.createElement('FORM');
    receiveForm.noValidate = true;
    receiveForm.setAttribute('id','receiveForm');
    receiveForm.setAttribute('action',`/user/myrequest/receive/${res.data._id}?_method=PUT`);
    receiveForm.setAttribute('method',`POST`);
    receiveForm.classList.add('bounceEffect')
    forReceive.appendChild(receiveForm);
    const receiveFormFieldSet = document.createElement('FIELDSET');
    receiveFormFieldSet.setAttribute('id','receiveFieldSet');
    receiveFormFieldSet.classList.add('border-4','w-full','h-full','border-yellow-800','rounded-md','px-3' ,'py-2', 'flex','flex-col');
    const receiveFormLegend = document.createElement('LEGEND');
    receiveFormLegend.classList.add('text-3xl','ml-5','font-bold','px-1');
    receiveForm.appendChild(receiveFormFieldSet);
    receiveFormFieldSet.append(receiveFormLegend);
    receiveFormLegend.innerHTML = "Receiving Form";


    for( let o = 0; o < 7; o++ ) 
    {
      const forReceiveDivs = document.createElement('div');
      forReceiveDivs.classList.add('forReceiveDivs');
      receiveFormFieldSet.append(forReceiveDivs);
      for( let p = 0; p < 2; p++ ) 
      {
        if( o < 5 ) 
        {
          const fieldDiv = document.createElement('div');
          fieldDiv.classList.add(`fieldDiv${p+1}`);
          forReceiveDivs.appendChild(fieldDiv);
        }
        if( o == 5 && p == 0 ) 
        {
          const inputLabel = document.createElement('LABEL');
          const receiveErrorMessage = document.createElement('span');
          receiveErrorMessage.setAttribute('id','receiveErrorMessage');
          receiveErrorMessage.classList.add('text-sm','font-semibold','pl-2','text-red-500')
          inputLabel.setAttribute('FOR','stampNumber')
          inputLabel.classList.add('font-bold','text-lg','pt-2');
          inputLabel.innerHTML = 'Enter Stamp No:';
          forReceiveDivs.appendChild(inputLabel);
          inputLabel.appendChild(receiveErrorMessage);
          
        }
        if(o == 5 && p == 1)
        {
          const inputNumber = document.createElement('input');
          inputNumber.setAttribute('TYPE','text');
          inputNumber.required = true;
          inputNumber.classList.add('w-full','border-2','px-2', 'py-1','rounded-md','text-sm');
          inputNumber.setAttribute('id','stampNumber');
          inputNumber.setAttribute('name','stampNumber');
          forReceiveDivs.appendChild(inputNumber);
        }
        if(o == 6 && p == 0)
        {
          for(let d = 0; d < 2 ; d++) {
            const formButton = document.createElement('button');
            formButton.classList.add('receiveConfirmationButton','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','flex','justify-center','items-center','rounded-md');
            forReceiveDivs.appendChild(formButton);
            forReceiveDivs.classList.add('w-full','flex','gap-5','h-full','flex','justify-center','items-center');
          }
        }
        
      }
      
    }


    const fieldDiv1 = document.getElementsByClassName('fieldDiv1');
    fieldDiv1[0].append('Tracking No:');
    fieldDiv1[1].append('Item Name:');
    fieldDiv1[2].append('Item Code:');
    fieldDiv1[3].append('Request Quantity:');
    fieldDiv1[4].append('Item Description:');
    for(let g = 0; g < fieldDiv1.length; g++) {
      fieldDiv1[g].classList.add('font-bold','text-lg','mt-1');
    }
    const fieldDiv2 = document.getElementsByClassName('fieldDiv2');
    fieldDiv2[0].innerHTML = res.data.tracking;
    fieldDiv2[1].innerHTML = res.data.item.name;
    fieldDiv2[2].innerHTML = res.data.item.code;
    fieldDiv2[3].innerHTML = res.data.qty;
    fieldDiv2[4].innerHTML = res.data.item.description;
    for(let u = 0; u < fieldDiv2.length; u++) {
      fieldDiv2[u].classList.add('w-full','border-2','px-2', 'py-1','rounded-md','text-sm');
      if(u == 4) {
        fieldDiv2[u].classList.add('text-justify','indent-12', 'h-28','overflow-y-auto','mb-1');
      }
    }
    const receiveConfirmationButton = document.getElementsByClassName('receiveConfirmationButton');
    receiveConfirmationButton[0].innerHTML = "Receive";
    receiveConfirmationButton[0].setAttribute('formaction',`/user/myrequest/receive/${res.data._id}?_method=PUT`)
    receiveConfirmationButton[0].classList.add('border','text-white' ,'px-5','rounded-md','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in', 'duration-300','font-semibold','hover:text-yellow-800','border-white','hover:bg-white','bg-yellow-800','border-yellow-500','hover:shadow-[2px_2px_0px_0px_brown]','cursor-pointer')
    receiveConfirmationButton[1].innerHTML = "Cancel";
    receiveConfirmationButton[1].classList.add('border','text-white' ,'px-5','rounded-md','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in', 'duration-300','font-semibold','hover:text-black','border-white','hover:bg-white','bg-black','border-white','hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','hover:border-black','cursor-pointer')

    receiveConfirmationButton[1].onclick = function () {
      forReceive.remove();
    }
    
    receiveConfirmationButton[0].onclick = function(e) {
      const stampNumber = document.getElementById('stampNumber')
      const receiveErrorMessage = document.getElementById('receiveErrorMessage')
      if(stampNumber.value != res.data.stamp) {
        receiveErrorMessage.innerHTML = 'You enter wrong stamp no.'
        stampNumber.classList.add('border-red-500')
        e.preventDefault();
      }
      if(stampNumber.value === "") {
        receiveErrorMessage.innerHTML = 'Please enter stamp no.'
        stampNumber.classList.add('border-red-500')
        e.preventDefault();
      } 
    }


  }
}

// ====================================================================================================Content Picker
const contentPicker = document.getElementById('contentPicker');


contentPicker.onchange = function () {
  const contentPicker = document.getElementById('contentPicker');
  const yourRequestDiv = document.getElementById('yourRequestDiv');
  const yourDepartmentUnitsDiv = document.getElementById('yourDepartmentUnitsDiv')
  if(Boolean(yourRequestDiv)){
    if(contentPicker.value == 'yourDepartmentUnits'){
      yourDepartmentUnitsDiv.classList.remove('hidden')
      yourRequestDiv.classList.add('hidden')
    }
     if(contentPicker.value === 'yourRequests'){
      yourDepartmentUnitsDiv.classList.add('hidden')
      yourRequestDiv.classList.remove('hidden');
    }
  } 

}

// ============================================================Complete Receive Details

const completeReceiveBtn = document.getElementsByClassName('completeReceiveBtn')
const completeReceiveData = document.getElementsByClassName('completeReceiveData') 
const completeReceivedDetailsBg = document.getElementById('completeReceivedDetailsBg')

const closeCompleteReceived = document.getElementById('closeCompleteReceived')
closeCompleteReceived.onclick = function (){
  completeReceivedDetailsBg.classList.add('hidden')
}


for(let k = 0; k < completeReceiveBtn.length; k++) {
  completeReceiveBtn[k].onclick = async function () {
    completeReceivedDetailsBg.classList.remove('hidden')
    const receivedDataAttribute = completeReceiveData[k].getAttribute('data-complete-receive');
    const completeReceiveRes = await axios(`https://gsoinventorysystem.onrender.com/user/requests/${receivedDataAttribute}`)
    const receivedTrackingNo = document.getElementById('receivedTrackingNo')
    const receivedItemName = document.getElementById('receivedItemName')
    const receivedItemCode = document.getElementById('receivedItemCode')
    const receivedQty = document.getElementById('receivedQty')
    const receivedDesc = document.getElementById('receivedDesc')
    const receivedStampNo = document.getElementById('receivedStampNo')
    receivedTrackingNo.innerHTML = completeReceiveRes.data.tracking
    receivedItemName.innerHTML = completeReceiveRes.data.item.name
    receivedItemCode.innerHTML = completeReceiveRes.data.item.code
    receivedQty.innerHTML = completeReceiveRes.data.qty
    receivedDesc.innerHTML = completeReceiveRes.data.item.description
    receivedStampNo.innerHTML = completeReceiveRes.data.stamp
  }  
}


// ============================================================ Edit My Request
const editMyRequestBtn = document.getElementsByClassName('editMyRequestBtn');
const requestData = document.getElementsByClassName('requestData');
const editRequestFormDiv = document.getElementById('editRequestFormDiv');
const editRequestForm = document.getElementById('editRequestForm');
const requestItemName = document.getElementById('requestItemName');
const requestItemCode = document.getElementById('requestItemCode');
const requestDesc = document.getElementById('requestDesc');
const requestQty = document.getElementById('requestQty');
const requestTrackingNo= document.getElementById('requestTrackingNo');
const editRequestQty = document.getElementById('editRequestQtyErrorMessage');
const editMyRequestButton = document.getElementById('editMyRequestButton');

for(let h = 0; h < editMyRequestBtn.length; h++) {
  const requestEditDataAttribute = requestData[h].getAttribute('data-myrequest-id');
  editMyRequestBtn[h].onclick = async function () {
    const requestEditData = await axios(`https://gsoinventorysystem.onrender.com/user/requests/${requestEditDataAttribute}`);
    console.log(requestEditData.data)
    editRequestFormDiv.classList.remove('hidden');
    requestItemName.innerHTML = requestEditData.data.item.name;
    requestItemCode.innerHTML = requestEditData.data.item.code;
    requestDesc.innerHTML = requestEditData.data.item.description;
    requestQty.value = requestEditData.data.qty;
    requestTrackingNo.innerHTML = requestEditData.data.tracking;
    editRequestForm.action = `/user/myrequest/requests/edit/${requestEditData.data._id}?_method=PUT`;
    editMyRequestButton.onclick = function(e) {
      if(requestQty.value > requestEditData.data.deployed.qty) {
        e.preventDefault()
        editRequestQty.innerHTML = `You only have ${requestEditData.data.deployed.qty} ${requestEditData.data.deployed.qty == 1 ? "excess" : "excesses"} on your department`
        requestQty.classList.add('border-red-500')
      } else if(requestQty.value <= 0 ) {
        e.preventDefault()
        editRequestQty.innerHTML = `Please add request quantity`
        requestQty.classList.add('border-red-500')
      } else {
        e.preventDefault()
        requestQty.classList.remove('border-red-500')
        requestQty.classList.add('border-green-500')
        editRequestQty.innerHTML = ""
        const editRequestConfirm = document.getElementById('editRequestConfirm')
        const editRequestConfirmMessage = document.getElementById('editRequestConfirmMessage')
        editRequestConfirmMessage.innerHTML = `Do you want to update this request with tracking no. ${requestEditData.data.tracking}?`
        editRequestConfirm.classList.remove('hidden')
        const editRequestConfirmYes = document.getElementById('editRequestConfirmYes');
        editRequestConfirmYes.formAction = `/user/myrequest/requests/edit/${requestEditData.data._id}?_method=PUT`;
        const editRequestConfirmNo = document.getElementById('editRequestConfirmNo')
        editRequestConfirmNo.onclick = function(e) {
          e.preventDefault()
          editRequestConfirmYes.formAction = ""
          editRequestConfirm.classList.add('hidden')
        }
      }
    }
  }

  const closeMyRequestButton = document.getElementById('closeMyRequestButton');
  closeMyRequestButton.onclick = function(e) {
    editRequestFormDiv.classList.add('hidden');
    requestItemName.innerHTML = "";
    requestItemCode.innerHTML = "";
    requestDesc.innerHTML = "";
    requestQty.value = "";
    requestTrackingNo.innerHTML = "";
    editMyRequestButton.formAction = ``;
    editRequestForm.action = ``;
    e.preventDefault()
  }
}

//============================================================== Delete My Request

const deleteThisRequestBtn = document.getElementsByClassName('deleteThisRequestBtn');
const deleteRequestBg = document.getElementById('deleteRequestBg')

for(let t = 0; t < deleteThisRequestBtn.length; t++) {
  const deleteMessage = document.getElementById('deleteMessage')
  const deleteRequestForm = document.getElementById('deleteRequestForm')
  const deleteRequestBtn = document.getElementById('deleteRequestBtn')
  const cancelDeleteRequestBtn = document.getElementById('cancelDeleteRequestBtn')

  deleteThisRequestBtn[t].onclick = async function() {
    const requestDeleteDataAttribute = requestData[t].getAttribute('data-myrequest-id');
    deleteRequestBg.classList.remove('hidden')
    const requestEditData = await axios(`https://gsoinventorysystem.onrender.com/user/requests/${requestDeleteDataAttribute}`);
    deleteMessage.innerHTML = `You want to delete this request with Tracking No. ${requestEditData.data.tracking} ?`;
    deleteRequestForm.action = `/user/myrequest/requests/delete/${requestEditData.data._id}?_method=DELETE`;
    deleteRequestBtn.formAction = `/user/myrequest/requests/delete/${requestEditData.data._id}?_method=DELETE`;


    cancelDeleteRequestBtn.onclick = async function() {
      const deleteRequestBg = document.getElementById('deleteRequestBg');
      deleteRequestBg.classList.add('hidden');
      deleteMessage.innerHTML = "";
      deleteRequestForm.action = "";
      deleteRequestBtn.formAction = "";
    }
  }
}




const completeReceivedTracking = document.getElementsByClassName('completeReceivedTracking')

function searchCompleteReceive(value) {
  Array.from(completeReceiveData).forEach(element=> {
    if(value == "") {
      element.classList.add('even:bg-slate-100');
    } else {
      element.classList.remove('even:bg-slate-100');
    }
  })
  Array.from(completeReceivedTracking).forEach((element, index) => {
    if(element.innerHTML.toUpperCase().includes(value.toUpperCase())) {
      completeReceiveData[index].classList.remove('hidden')
    } else {
      completeReceiveData[index].classList.add('hidden')
    }
  })
}

const approvedRequestTracking = document.getElementsByClassName('approvedRequestTracking')
function searchForReceive(value) {
  Array.from(approvedRequestTracking).forEach((element,index)=> {
    if(element.innerHTML.toLocaleUpperCase().includes(value.toUpperCase())) {
      receivingData[index].classList.remove('hidden')
    } else {
      receivingData[index].classList.add('hidden')
    }
  })
}