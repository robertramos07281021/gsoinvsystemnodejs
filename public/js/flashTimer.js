const timeout = setTimeout(closeFlash, 6000);
function closeFlash() {
  const errorEventMessage = document.getElementById('errorEventMessage');
  if(errorEventMessage) {
    errorEventMessage.remove();
  }
  const addSuccess  = document.getElementById('addSuccess');
  if(addSuccess) {
    addSuccess.remove()
  }
  const receiveRequestMessage = document.getElementById('receiveRequestMessage');
  if(receiveRequestMessage) {
    receiveRequestMessage.remove()
  }
  const deleteFlashMessage = document.getElementById('deleteFlashMessage');
  if(deleteFlashMessage){
    deleteFlashMessage.remove()
  }
  const updateSuccess = document.getElementById('updateSuccess');
  if(updateSuccess) {
    updateSuccess.remove()
  }
  const success = document.getElementById('success');
  if(success){
    success.remove()
  }
}