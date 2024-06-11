
const receiveDateAttributte = []
const requestReceiveData = document.getElementsByClassName('requestReceiveData')
function getDateData() {
  for(let b = 0 ; b < requestReceiveData.length ; b++) {
    const requestReceiveDate = requestReceiveData[b].getAttribute('data-receive-date')

    if(!receiveDateAttributte.includes(requestReceiveDate)) {
      receiveDateAttributte.push(requestReceiveDate)
    }
  }

} 
getDateData();

function dateSearch(date) {
  const requestReceiveData = document.getElementsByClassName('requestReceiveData')
  const dateQuery = new Date(date).getMonth() + 1 + '/' + new Date(date).getDate() + '/' + new Date(date).getFullYear()

    const printPreview = document.getElementById('printPreview')
    if(receiveDateAttributte.includes(dateQuery)) {
      printPreview.href = `/user/request/reports/printpreview?dateQuery=${new Date(date)}`;
    } else {
      printPreview.href = `/user/request/reports/printpreview`;
    }
    Array.from(requestReceiveData).forEach( element => {
      const requestReceiveAttributte = element.getAttribute('data-receive-date')
      if(requestReceiveAttributte != dateQuery && receiveDateAttributte.includes(dateQuery) == true &&  Boolean(date)) {
        element.classList.add('hidden')
      }
      if(requestReceiveAttributte == dateQuery || receiveDateAttributte.includes(dateQuery) == false) {
        element.classList.remove('hidden')
      }
    })
  

}

