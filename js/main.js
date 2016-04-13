function inputToSessionStorage(){
  try {
    [].forEach.call(document.querySelectorAll('input, select'), function(el){
      if (el.value){
        //TODO: Add ids to forms so we can have some better hierarchy
        sessionStorage.setItem(el.id, el.value);
      }
    });
  } catch (e){
    console.log("No values found.");
  }
}

// Add click listener to buttons
[].forEach.call(document.getElementsByClassName('usa-button'), function(el){
  // Only add the event listener to capture input if user didn't click cancel.
  // NOTE: Cancel needs to be added to cancel buttons still.
  if (el.className.indexOf('cancel') == -1) {
    el.addEventListener('click', function(evt) {
      inputToSessionStorage();
    });
  }
});
