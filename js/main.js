function inputToSessionStorage(){
  var tempObj = {};

  function verifyOrCreateKey(el){
    var key = el.attributes.name.value;
    if (!tempObj[key]){
        tempObj[key] = {};
      }
    return tempObj;
  }

  function nest(fromObj, toObj){
    var employeeId = tempObj[fromObj]["id-number"];
    if (!tempObj.hasOwnProperty(toObj)){
      tempObj[toObj] = {};
    }
    tempObj[toObj][employeeId] = {};
    for (var key in tempObj[fromObj]){
      tempObj[toObj][employeeId][key] = tempObj[fromObj][key];
    }
    delete tempObj[fromObj];
  }

  try {
    [].forEach.call(document.querySelectorAll('input, select'), function(el){
      var key = el.attributes.name.value;
      verifyOrCreateKey(el);
      tempObj[key][el.id] = el.value;

      // Attach user input, now stored in tempObj, to the correct sessionStorage key
      // Can later be parsed like so: JSON.parse(sessionStorage.payroll_start_week)
    });

    if (document.getElementsByClassName('enter-employee-details')){
      nest("rates", "employee");
      nest("employee", "employees");
    }

    for (var key in tempObj){
      sessionStorage.setItem(key, JSON.stringify(tempObj[key]));
    }
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
