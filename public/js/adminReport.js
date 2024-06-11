const deployedDept = document.getElementById('deployedDept')
const deployedUnitData = document.getElementsByClassName('deployedUnitData')
const deployDept = document.getElementsByClassName('deployDept')
const printPreview = document.getElementById('printPreview')
const printPreviewHref = [
  "/reports/available",
  "/reports/deployed",
  "/reports/complete"
]


deployedDept.onchange = function() {
  printPreview.setAttribute('href',"/reports/deployed") 
  Array.from(deployDept).forEach((element,index) => {
    if(element.innerHTML != deployedDept.value) {
      deployedUnitData[index].classList.add('hidden')
    } else {
      deployedUnitData[index].classList.remove('hidden')
    }
    if(deployedDept.value == "") {
      deployedUnitData[index].classList.remove('hidden')
    }
  })
  Array.from(deployedUnitData).forEach(element=> {
    if(deployedDept.value == "") {
      element.classList.add('even:bg-slate-100')
    } else {
      element.classList.remove('even:bg-slate-100')
    }
  })
  const href = printPreview.getAttribute('href')
  printPreview.setAttribute('href',`${href}?q=${deployedDept.value}`)
}

const printSelection = document.getElementsByClassName('printSelection')
const contentDiv = document.getElementsByClassName('contentDiv')
const dateQuery = document.getElementById('dateQuery')

Array.from(printSelection).forEach((element, index)=> {
  const printSelectionAttribute = element.getAttribute('data-content');
  element.onclick = function() {
    element.classList.add('bg-red-300/20')
    Array.from(printSelection).forEach((removeClasslistElement, removeCLassliistIndex) => {
    if(removeCLassliistIndex != index) {
      removeClasslistElement.classList.remove('bg-red-300/20')
    }
    })
    printPreview.setAttribute('href',printPreviewHref[index])
    Array.from(contentDiv).forEach(contentElement => {
      const contentDivAttribute = contentElement.getAttribute('data-content')
      if(printSelectionAttribute != contentDivAttribute) {
        contentElement.classList.add('hidden')
      } else {
        contentElement.classList.remove('hidden')
      }
    })
    dateQuery.value = ""
  }
})

const completeDept = document.getElementById('completeDept')
const completeTransaction = document.getElementById('completeTransaction');

completeDept.onchange = function() {
  deptQuery += completeDept.value;
  const newAttribute = printPreview.setAttribute('href',`/reports/complete?completeDept=${completeDept.value}&dateQuery=${dateQuery.value}`);
}
dateQuery.onchange = function() {
  if(!completeTransaction.classList.contains('hidden')) {
      const newAttribute = printPreview.setAttribute('href',`/reports/complete?completeDept=${completeDept.value}&dateQuery=${dateQuery.value}`) 
   
  }
}