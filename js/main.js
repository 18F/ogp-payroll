function inputToSessionStorage(){
  function verifyOrCreateKey(el, key){
    if (!tempObj[key]){
      tempObj[key] = {};
    }
    return tempObj;
  }
  var tempObj = {};
  try {
    [].forEach.call(document.querySelectorAll('input, select'), function(el){
      var key = el.attributes["data-key"].value;
      verifyOrCreateKey(el, key);
      if (el.value){
        tempObj[key][el.id] = el.value;
      }
      // Attach user input, now stored in tempObj, to the correct sessionStorage key
      // Can later be parsed like so: JSON.parse(sessionStorage.payroll_start_week)
      sessionStorage.setItem(key, JSON.stringify(tempObj[key]));
    });
  } catch (e){
    console.log("No values found.");
  }
}

// Add click listener to buttons
[].forEach.call(document.getElementsByClassName('usa-button'), function(el){
  // Only add the event listener to capture input if user didn't click cancel.
  if (el.className.indexOf('cancel') == -1) {
    el.addEventListener('click', function(evt) {
      inputToSessionStorage();
    });
  }
});
