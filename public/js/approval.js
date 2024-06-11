const approvalButton = document.getElementsByClassName('approvalButton')
const forApprovalData = document.getElementsByClassName('forApprovalData')
const detailsButton = document.getElementsByClassName('detailsButton')

Array.from(approvalButton).forEach(async(element,index)=> {
  const approvalId = forApprovalData[index].getAttribute('data-request-approval')
  const approvalData = await axios(`https://gsoinvsystemnodejs.onrender.com/user/requests/${approvalId}`);
  const request = approvalData.data;


  element.onclick = function() {

    const approvalFormBg = document.createElement('div')
    approvalFormBg.classList.add('absolute','w-screen','h-screen','top-0','left-0','z-50','flex','justify-center','items-center');
    document.body.appendChild(approvalFormBg);
    const approvalForm = document.createElement('form')
    approvalForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-blue-500','ring-offset-2','border-t-[30px]')
    approvalForm.action = `/approval/${approvalId}?_method=PATCH`;
    approvalForm.method = 'POST';
    approvalFormBg.appendChild(approvalForm)
    const approvalFormMessage = document.createElement('p')
    approvalFormMessage.innerHTML = `Do you want to approve this request with tracking no <span class="font-mono">${request.tracking}</span>?`
    approvalFormMessage.classList.add('font-bold','text-center','px-10')
    approvalForm.appendChild(approvalFormMessage)
    const approvalButtonDiv = document.createElement('div')
    approvalButtonDiv.classList.add('flex','gap-10')
    approvalForm.appendChild(approvalButtonDiv)
    for(let button = 0; button < 2; button ++) {
      const approvalButtons = document.createElement('button');
      approvalButtons.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','rounded-md','font-bold','text-white','transition-ease-in','duration-300','hover:bg-white')
      approvalButtonDiv.appendChild(approvalButtons)
      if(button == 0) {
        approvalButtons.innerHTML = "YES"
        approvalButtons.classList.add('bg-blue-500','hover:text-blue-500','hover:border-blue-500','hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]')
      } else {
        approvalButtons.innerHTML = "NO";
        approvalButtons.classList.add('bg-black','hover:text-black','hover:border-black')
        approvalButtons.onclick = function(e) {
          e.preventDefault()
          approvalFormBg.remove()
        }
      }
    }

   
  }
})

Array.from(detailsButton).forEach(async(element,index) => {

  const approvalId = forApprovalData[index].getAttribute('data-request-approval')
  const approvalData = await axios(`https://gsoinvsystemnodejs.onrender.com/user/requests/${approvalId}`);
  const request = approvalData.data
  const requestDate = (new Date(request.createdAt).getMonth() + 1)  + '/' + new Date(request.createdAt).getDate() + '/' + new Date(request.createdAt).getFullYear()
  
  const requestData = [
    request.tracking,
    request.item.name,
    request.item.code,
    request.item.description,
    request.department.department,
    request.qty,
    request.user.username,
    requestDate,
  ]
  const requestDataLabel = [
    'Tracking No :',
    'Item Name :',
    'Item Code :',
    'Description :',
    'Department :',
    'Quantity :',
    'Requested By :',
    'Date Requested :'
  ]


  // formModal

  element.onclick = function() {

    const detailsFormBg = document.createElement('div');
    detailsFormBg.classList.add('absolute','w-screen','h-screen','top-0','left-0','z-50','flex','justify-center','items-center','bg-white/40','backdrop-blur-sm');
    document.body.appendChild(detailsFormBg);
    const detailsForm = document.createElement('div');
    detailsFormBg.appendChild(detailsForm);
    detailsForm.setAttribute('id','formModal');
    detailsForm.classList.add('bounceEffect','shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]');
    const formFieldset = document.createElement('fieldset');
    formFieldset.classList.add('border-4','w-full','h-full','border-red-500','rounded-md','px-3' ,'py-2', 'flex','flex-col');
    detailsForm.appendChild(formFieldset);
    const formLegend = document.createElement('legend');
    formFieldset.appendChild(formLegend);
    formLegend.innerHTML = `Request Details`;
    formLegend.classList.add('text-3xl','ml-5','font-bold','px-1');
    Array.from(requestData).forEach((element,index)=> {
      if(index != 4 && index != 5) {
     
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('mb-1')
        formFieldset.appendChild(dataDiv);
        const requestLabel = document.createElement('label');
        requestLabel.innerHTML = requestDataLabel[index];
        requestLabel.classList.add('text-lg','font-semibold')
        dataDiv.appendChild(requestLabel);
        const requestData = document.createElement('div')
        requestData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md')
        requestData.innerHTML = element;
        dataDiv.appendChild(requestData)
        if(index == 0 ){
          requestData.classList.add('font-mono')
        }
        if(index == 3) {
          requestData.classList.add('h-20','overflow-y-auto', 'overflow-hidden', 'indent-5')
        }

      } else { 
        if(index == 4 ) {
          const deptAndQtyDiv = document.createElement('div');
          deptAndQtyDiv.classList.add('flex','w-full','gap-5')
          formFieldset.appendChild(deptAndQtyDiv);
          deptAndQtyDiv.setAttribute('id','deptAndQtyDiv');
          const deptDiv = document.createElement('div');
          deptDiv.classList.add('w-full')
          deptAndQtyDiv.appendChild(deptDiv);
          deptAndQtyDiv.classList.add('mb-1');
          const deptLabel = document.createElement('label');
          deptLabel.innerHTML = requestDataLabel[index];
          deptLabel.classList.add('text-lg','font-semibold')
          deptDiv.appendChild(deptLabel);
          const deptData = document.createElement('div');
          deptDiv.appendChild(deptData);
          deptData.innerHTML = element;
          deptData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          
        } else {
          const deptAndQtyDiv = document.getElementById('deptAndQtyDiv')
          if(deptAndQtyDiv) {
            const qtyDiv = document.createElement('div');
            deptAndQtyDiv.appendChild(qtyDiv);
            qtyDiv.classList.add('w-full');
            const qtyLabel = document.createElement('label');
            qtyLabel.innerHTML = requestDataLabel[index];
            qtyLabel.classList.add('text-lg','font-semibold')
            qtyDiv.appendChild(qtyLabel);
            const qtyData = document.createElement('div');
            qtyDiv.appendChild(qtyData);
            qtyData.innerHTML = element;
            qtyData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          }
        }
      }
    })
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('flex','gap-5','mt-5','justify-center')
    formFieldset.appendChild(buttonDiv);
    for(let button = 0; button < 2; button++) {
      const deleteButtons = document.createElement('button')
      deleteButtons.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','text-white', 'font-bold', 'rounded-md')
      buttonDiv.appendChild(deleteButtons)
      if(button == 0){
        deleteButtons.classList.add('bg-red-500','hover:text-red-500','hover:border-red-500','hover:bg-white','hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]')
        deleteButtons.innerHTML = "DELETE";
        deleteButtons.onclick = function() {
          const deleteFormBg = document.createElement('div');
          deleteFormBg.classList.add('absolute','w-screen','h-screen','top-0','left-0','z-50','flex','justify-center','items-center')
          document.body.appendChild(deleteFormBg)
          const deleteForm = document.createElement('form')
          deleteForm.classList.add('border-4','border-black','w-96','h-64','bg-white','rounded-md','flex','items-center','justify-center','flex-col','gap-10',  'ring-4','ring-inset','ring-red-500','ring-offset-2','border-t-[30px]')
          deleteForm.action = `/request/delete/${approvalId}?_method=DELETE`;
          deleteForm.method = 'POST'
          deleteFormBg.appendChild(deleteForm)
          const deleteFormMessage = document.createElement('p');
          deleteFormMessage.innerHTML = `Do you want to delete this request?`;
          deleteFormMessage.classList.add('font-bold','text-center','px-10')
          deleteForm.appendChild(deleteFormMessage)
          const deleteFormButtonDiv = document.createElement('div')
          deleteForm.appendChild(deleteFormButtonDiv)
          deleteFormButtonDiv.classList.add('flex','gap-10')
          for(let deleteButton = 0; deleteButton < 2; deleteButton++) {
            const deleteFormButton = document.createElement('button')
            deleteFormButton.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','text-white', 'font-bold', 'rounded-md')
            deleteFormButtonDiv.appendChild(deleteFormButton);
            if(deleteButton == 0) {
              deleteFormButton.innerHTML = `YES`;
              deleteFormButton.classList.add('bg-red-500','hover:text-red-500','hover:border-red-500','hover:bg-white','hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]')
            } else {
              deleteFormButton.innerHTML = `NO`;
              deleteFormButton.classList.add('hover:bg-white','bg-black','hover:text-black', 'hover:border-black')
              deleteFormButton.onclick = function (e) {
                e.preventDefault();
                deleteFormBg.remove();
              }
            }
          }
        }
      } else {
        deleteButtons.classList.add('hover:bg-white','bg-black','hover:text-black', 'hover:border-black');
        deleteButtons.innerHTML = "CLOSE";
        deleteButtons.onclick = function () {
          detailsFormBg.remove();
        }
      }
      
    }
    
    
    
    

  }
})



// ================================================================= for Receiving

const forReceivingDetailsButton = document.getElementsByClassName('forReceivingDetailsButton')
const forReceiving = document.getElementsByClassName('forReceiving')

Array.from(forReceivingDetailsButton).forEach(async(element,index) => {
  const forReceivingId = forReceiving[index].getAttribute('data-receiving-id')
  const forReceivingData = await axios(`https://gsoinvsystemnodejs.onrender.com/user/requests/${forReceivingId}`);
  const request = forReceivingData.data
  const requestDate = (new Date(request.createdAt).getMonth() + 1)  + '/' + new Date(request.createdAt).getDate() + '/' + new Date(request.createdAt).getFullYear()
  const approvedDate = (new Date(request.approvedate).getMonth() + 1)  + '/' + new Date(request.approvedate).getDate() + '/' + new Date(request.approvedate).getFullYear()

  const requestData = [
    request.tracking,
    request.item.name,
    request.item.code,
    request.item.description,
    request.department.department,
    request.qty,
    request.user.username,
    requestDate,
    request.approvedby.username,
    approvedDate
  ]
  const requestDataLabel = [
    'Tracking No :',
    'Item Name :',
    'Item Code :',
    'Description :',
    'Department :',
    'Quantity :',
    'Requested By :',
    'Date Requested :',
    'Approved By :',
    'Date Approved :'
  ]

  element.onclick = function() { 

    const detailsFormBg = document.createElement('div');
    detailsFormBg.classList.add('absolute','w-screen','h-screen','top-0','left-0','z-50','flex','justify-center','items-center','bg-white/40','backdrop-blur-sm');
    document.body.appendChild(detailsFormBg);
    const detailsForm = document.createElement('div');
    detailsFormBg.appendChild(detailsForm);
    detailsForm.setAttribute('id','formModal');
    detailsForm.classList.add('bounceEffect','shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]');
    const formFieldset = document.createElement('fieldset');
    formFieldset.classList.add('border-4','w-full','h-full','border-green-300','rounded-md','px-3' ,'py-2', 'flex','flex-col');
    detailsForm.appendChild(formFieldset);
    const formLegend = document.createElement('legend');
    formFieldset.appendChild(formLegend);
    formLegend.innerHTML = `Request Details`;
    formLegend.classList.add('text-3xl','ml-5','font-bold','px-1');
    Array.from(requestData).forEach((element,index)=> {
      if(index < 4) {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('mb-1')
        formFieldset.appendChild(dataDiv);
        const requestLabel = document.createElement('label');
        requestLabel.innerHTML = requestDataLabel[index];
        requestLabel.classList.add('text-lg','font-semibold')
        dataDiv.appendChild(requestLabel);
        const requestData = document.createElement('div')
        requestData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md')
        requestData.innerHTML = element;
        dataDiv.appendChild(requestData)
        if(index == 0 ){
          requestData.classList.add('font-mono')
        }
        if(index == 3) {
          requestData.classList.add('h-20','overflow-y-auto', 'overflow-hidden', 'indent-5')
        }
      } else { 
        if(index == 4 || index == 6 || index == 7) {
          if(index == 4) {
          const requestDataDiv = document.createElement('div');
          requestDataDiv.classList.add('flex','w-full','gap-5')
          requestDataDiv.setAttribute('id','requestDataDiv')
          formFieldset.appendChild(requestDataDiv);
          const deptRequestDataDiv = document.createElement('div');
          deptRequestDataDiv.classList.add('w-full','h-full','flex','flex-col','gap-1')
          deptRequestDataDiv.setAttribute('id','deptRequestDataDiv')
          requestDataDiv.appendChild(deptRequestDataDiv);
          const deptDataDiv = document.createElement('div')
          deptRequestDataDiv.appendChild(deptDataDiv)
          const deptLabel = document.createElement('label');
          deptLabel.innerHTML = requestDataLabel[index];
          deptLabel.classList.add('text-lg','font-semibold')
          deptDataDiv.appendChild(deptLabel);
          const deptData = document.createElement('div');
          deptDataDiv.appendChild(deptData);
          deptData.innerHTML = element;
          deptData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          } else {
            const deptRequestDataDiv = document.getElementById('deptRequestDataDiv')
            const requestedByDiv = document.createElement('div')
            deptRequestDataDiv.appendChild(requestedByDiv)
            const requestedByLabel = document.createElement('label')
            requestedByLabel.innerHTML = requestDataLabel[index];
            requestedByLabel.classList.add('text-lg','font-semibold')
            requestedByDiv.appendChild(requestedByLabel)
            const requestedByData = document.createElement('div')
            requestedByDiv.appendChild(requestedByData)
            requestedByData.innerHTML = element;
            requestedByData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          }
          
          
        } 
        if(index == 5 || index == 8 || index == 9) {
          if(index == 5) {
            const requestDataDiv = document.getElementById('requestDataDiv');
            const qtyApprovedDataDiv = document.createElement('div');
            qtyApprovedDataDiv.classList.add('w-full','h-full')
            qtyApprovedDataDiv.setAttribute('id','qtyApprovedDataDiv')
            requestDataDiv.appendChild(qtyApprovedDataDiv);
            qtyApprovedDataDiv.classList.add('w-full','h-full','flex','flex-col','gap-1')
            const qtyDataDiv = document.createElement('div')
            qtyApprovedDataDiv.appendChild(qtyDataDiv)
            const qtyLabel = document.createElement('label');
            qtyLabel.innerHTML = requestDataLabel[index];
            qtyLabel.classList.add('text-lg','font-semibold')
            qtyDataDiv.appendChild(qtyLabel);
            const qtyData = document.createElement('div');
            qtyDataDiv.appendChild(qtyData);
            qtyData.innerHTML = element;
            qtyData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          } else {
            const qtyApprovedDataDiv = document.getElementById('qtyApprovedDataDiv')
            const approvedByDiv = document.createElement('div')
            qtyApprovedDataDiv.appendChild(approvedByDiv)
            const approvedByLabel = document.createElement('label')
            approvedByLabel.innerHTML = requestDataLabel[index];
            approvedByLabel.classList.add('text-lg','font-semibold')
            approvedByDiv.appendChild(approvedByLabel)
            const approvedByData = document.createElement('div')
            approvedByDiv.appendChild(approvedByData)
            approvedByData.innerHTML = element;
            approvedByData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          }
          
        
          
         
 
        }
      }
    })
    const button = document.createElement('button')
    formFieldset.appendChild(button)
    button.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md','bg-black','hover:text-black', 'hover:border-black','self-center','mt-6');
    button.innerHTML = "CLOSE";
    formFieldset.appendChild(button);
    button.onclick = function () {
      detailsFormBg.remove();
      }
  }


})



const forReceivingButton = document.getElementById('forReceivingButton');
const receivedButton = document.getElementById('receivedButton');
const forReceivingData = document.getElementById('forReceivingData')
const completeReceived = document.getElementById('completeReceived')
const forReceivingTitle =document.getElementById('forReceivingTitle')
const receivedTitle = document.getElementById('receivedTitle')
const forReceiveTrackingNo = document.getElementById('forReceiveTrackingNo')

forReceivingButton.onclick = function() {
  receivedButton.classList.remove('hidden')
  forReceivingButton.classList.add('hidden')
  forReceivingData.classList.remove('hidden')
  completeReceived.classList.add('hidden')
  forReceivingTitle.classList.remove('hidden')
  receivedTitle.classList.add('hidden')
  forReceiveTrackingNo.value = ""

}

receivedButton.onclick = function() {
  receivedButton.classList.add('hidden')
  forReceivingButton.classList.remove('hidden')
  completeReceived.classList.remove('hidden')
  forReceivingData.classList.add('hidden')
  forReceivingTitle.classList.add('hidden')
  receivedTitle.classList.remove('hidden')
  forReceiveTrackingNo.value = ""
}


const forApprovalTrackingData = document.getElementsByClassName('forApprovalTrackingData')
function searchForApproval(value) {
  Array.from(forApprovalData).forEach(element => {
    if(value == "") {
      element.classList.add('even:bg-slate-100')
    } else {
      element.classList.remove('even:bg-slate-100')
    }
  }) 
  Array.from(forApprovalTrackingData).forEach((element,index)=> {
    if(element.innerHTML.toUpperCase().includes(value.toUpperCase())) {
      forApprovalData[index].classList.remove('hidden')
    } else {
      forApprovalData[index].classList.add('hidden')
    }
  })
}



const forReceiveTrackingData = document.getElementsByClassName('forReceiveTrackingData')
const receivedTrackingData = document.getElementsByClassName('receivedTrackingData')
const completeReceivedData = document.getElementsByClassName('completeReceivedData')

function searchForReceive(value) {
  Array.from(forReceiving).forEach(element => {
    if(value == "") {
      element.classList.add('even:bg-slate-100')
    } else {
      element.classList.remove('even:bg-slate-100')
    }
  })
  Array.from(completeReceivedData).forEach(element => {
    if(value == "") {
      element.classList.add('even:bg-slate-100')
    } else {
      element.classList.remove('even:bg-slate-100')
    }
  })

  Array.from(forReceiveTrackingData).forEach((element,index) => {
    if(element.innerHTML.toUpperCase().includes(value.toUpperCase())) {
      forReceiving[index].classList.remove('hidden')
    } else {
      forReceiving[index].classList.add('hidden')
    }
  })
  Array.from(receivedTrackingData).forEach((element, index) => {
    if(element.innerHTML.toUpperCase().includes(value.toUpperCase())) {
      completeReceivedData[index].classList.remove('hidden')
    } else {
      completeReceivedData[index].classList.add('hidden')
    }
  })
}

const completeReceivedButton = document.getElementsByClassName('completeReceivedButton')


Array.from(completeReceivedButton).forEach(async(element,index) => {
  const completeReceivedId = completeReceivedData[index].getAttribute('data-received-id')
  const receivedData = await axios(`https://gsoinvsystemnodejs.onrender.com/user/requests/${completeReceivedId}`);
  const request = receivedData.data
  const requestDate = (new Date(request.createdAt).getMonth() + 1)  + '/' + new Date(request.createdAt).getDate() + '/' + new Date(request.createdAt).getFullYear()
  const approvedDate = (new Date(request.approvedate).getMonth() + 1)  + '/' + new Date(request.approvedate).getDate() + '/' + new Date(request.approvedate).getFullYear()
  const receivedDate = (new Date(request.receivedate).getMonth() + 1)  + '/' + new Date(request.receivedate).getDate() + '/' + new Date(request.receivedate).getFullYear()
  console.log(request)
  const requestData = [
    request.tracking,
    request.item.name,
    request.item.code,
    request.item.description,
    request.department.department,
    request.qty,
    request.user.username,
    requestDate,
    request.approvedby.username,
    approvedDate,
    receivedDate
  ]
  const requestDataLabel = [
    'Tracking No :',
    'Item Name :',
    'Item Code :',
    'Description :',
    'Department :',
    'Quantity :',
    'Requested By :',
    'Date Requested :',
    'Approved By :',
    'Date Approved :',
    'Date Received :'
  ]

  element.onclick = function() { 
   
    const detailsFormBg = document.createElement('div');
    detailsFormBg.classList.add('absolute','w-screen','h-screen','top-0','left-0','z-50','flex','justify-center','items-center','bg-white/40','backdrop-blur-sm');
    document.body.appendChild(detailsFormBg);
    const detailsForm = document.createElement('div');
    detailsFormBg.appendChild(detailsForm);
    detailsForm.setAttribute('id','completeReceivedModal');
    detailsForm.classList.add('bounceEffect','shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]');
    const formFieldset = document.createElement('fieldset');
    formFieldset.classList.add('border-4','w-full','h-full','border-green-300','rounded-md','px-3' ,'py-2', 'flex','flex-col');
    detailsForm.appendChild(formFieldset);
    const formLegend = document.createElement('legend');
    formFieldset.appendChild(formLegend);
    formLegend.innerHTML = `Request Details`;
    formLegend.classList.add('text-3xl','ml-5','font-bold','px-1');
    Array.from(requestData).forEach((element,index)=> {
      if(index < 4 || index == 10) {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('mb-1')
        formFieldset.appendChild(dataDiv);
        const requestLabel = document.createElement('label');
        requestLabel.innerHTML = requestDataLabel[index];
        requestLabel.classList.add('text-lg','font-semibold')
        dataDiv.appendChild(requestLabel);
        const requestData = document.createElement('div')
        requestData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md')
        requestData.innerHTML = element;
        dataDiv.appendChild(requestData)
        if(index == 0 ){
          requestData.classList.add('font-mono')
        }
        if(index == 3) {
          requestData.classList.add('h-20','overflow-y-auto', 'overflow-hidden', 'indent-5')
        }
      } 
      else { 
        if(index == 4 || index == 6 || index == 7) {
          if(index == 4) {
          const requestDataDiv = document.createElement('div');
          requestDataDiv.classList.add('flex','w-full','gap-5')
          requestDataDiv.setAttribute('id','requestDataDiv')
          formFieldset.appendChild(requestDataDiv);
          const deptRequestDataDiv = document.createElement('div');
          deptRequestDataDiv.classList.add('w-full','h-full','flex','flex-col','gap-1')
          deptRequestDataDiv.setAttribute('id','deptRequestDataDiv')
          requestDataDiv.appendChild(deptRequestDataDiv);
          const deptDataDiv = document.createElement('div')
          deptRequestDataDiv.appendChild(deptDataDiv)
          const deptLabel = document.createElement('label');
          deptLabel.innerHTML = requestDataLabel[index];
          deptLabel.classList.add('text-lg','font-semibold')
          deptDataDiv.appendChild(deptLabel);
          const deptData = document.createElement('div');
          deptDataDiv.appendChild(deptData);
          deptData.innerHTML = element;
          deptData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          } 
          else {
            const deptRequestDataDiv = document.getElementById('deptRequestDataDiv')
            const requestedByDiv = document.createElement('div')
            deptRequestDataDiv.appendChild(requestedByDiv)
            const requestedByLabel = document.createElement('label')
            requestedByLabel.innerHTML = requestDataLabel[index];
            requestedByLabel.classList.add('text-lg','font-semibold')
            requestedByDiv.appendChild(requestedByLabel)
            const requestedByData = document.createElement('div')
            requestedByDiv.appendChild(requestedByData)
            requestedByData.innerHTML = element;
            requestedByData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          }
          
          
        } 
        if(index == 5 || index == 8 || index == 9) {
          if(index == 5) {
            const requestDataDiv = document.getElementById('requestDataDiv');
            const qtyApprovedDataDiv = document.createElement('div');
            qtyApprovedDataDiv.classList.add('w-full','h-full')
            qtyApprovedDataDiv.setAttribute('id','qtyApprovedDataDiv')
            requestDataDiv.appendChild(qtyApprovedDataDiv);
            qtyApprovedDataDiv.classList.add('w-full','h-full','flex','flex-col','gap-1')
            const qtyDataDiv = document.createElement('div')
            qtyApprovedDataDiv.appendChild(qtyDataDiv)
            const qtyLabel = document.createElement('label');
            qtyLabel.innerHTML = requestDataLabel[index];
            qtyLabel.classList.add('text-lg','font-semibold')
            qtyDataDiv.appendChild(qtyLabel);
            const qtyData = document.createElement('div');
            qtyDataDiv.appendChild(qtyData);
            qtyData.innerHTML = element;
            qtyData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          } else {
            const qtyApprovedDataDiv = document.getElementById('qtyApprovedDataDiv')
            const approvedByDiv = document.createElement('div')
            qtyApprovedDataDiv.appendChild(approvedByDiv)
            const approvedByLabel = document.createElement('label')
            approvedByLabel.innerHTML = requestDataLabel[index];
            approvedByLabel.classList.add('text-lg','font-semibold')
            approvedByDiv.appendChild(approvedByLabel)
            const approvedByData = document.createElement('div')
            approvedByDiv.appendChild(approvedByData)
            approvedByData.innerHTML = element;
            

            approvedByData.classList.add('w-full','ring-2','ring-slate-300','py-1','px-2','rounded-md','w-full');
          }
          
        }
      }
    })
    const button = document.createElement('button')
    formFieldset.appendChild(button)
    button.classList.add('border','w-24','h-10','shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]','transition-ease-in','duration-300','hover:bg-white','text-white', 'font-bold', 'rounded-md','bg-black','hover:text-black', 'hover:border-black','self-center','mt-4');
    button.innerHTML = "CLOSE";
    formFieldset.appendChild(button);
    button.onclick = function () {
      detailsFormBg.remove();
      }
  }
})