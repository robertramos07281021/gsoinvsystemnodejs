const selectedDept = document.getElementById('selectedDept')
const deployedUnitData = document.getElementsByClassName('deployedUnitData')
const departmentData = document.getElementsByClassName('departmentData')


selectedDept.onchange = function() {
  Array.from(departmentData).forEach((element,index) => {
    if(element.innerHTML !== selectedDept.value ) {
      deployedUnitData[index].classList.add('hidden')
    } else {
      deployedUnitData[index].classList.remove('hidden')
    }
    if(selectedDept.value === "") {
      deployedUnitData[index].classList.remove('hidden')
    }
  })

  Array.from(deployedUnitData).forEach(element=> {
    element.classList.remove('odd:bg-slate-100')
    if(selectedDept.value === "") {
      element.classList.add('odd:bg-slate-100')
    }
  }) 
}