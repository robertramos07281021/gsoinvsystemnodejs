const deployedFilter = document.getElementById('deployedFilter')
const deployedOnOtherDept = document.getElementsByClassName('deployedOnOtherDept')
const department = document.getElementsByClassName('department')


deployedFilter.onchange = function() {

  Array.from(department).forEach((element,index) => {

    if(element.innerHTML == deployedFilter.value) {
      deployedOnOtherDept[index].classList.remove('hidden')
    } else {
      deployedOnOtherDept[index].classList.add('hidden')
    }
    if(deployedFilter.value == "") {
      Array.from(deployedOnOtherDept).forEach(element => {
        element.classList.remove('hidden')
      })
    }
  })
}