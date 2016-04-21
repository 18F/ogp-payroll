var setup = {
  page: document.getElementsByTagName('body')[0].className,
  createProject: function(){
    return [{
      "contract_number": "ACE-CE-4126",
      "address": "230 S. Dearborn",
      "city": "Chicago",
      "state": "IL",
      "zip": "60604"
    }]
  },
  createWorkClassifications: function(){
    var classificationsList = document.getElementById('work-classification');
    var classifications = [{
        "classification": "Bricklayer",
        "rate": "43.78",
        "fringes": "24.81"
      },
      {
        "classification": "Marble Finisher",
        "rate": "32.40",
        "fringes": "23.85"
      },
      {
        "classification": "Carpenter (Carpenter, Lather, Millwright, Piledriver, and Soft Floor Layer)",
        "rate": "44.35",
        "fringes": "28.81"
      },
      {
        "classification": "Carpenter (Excluding structures with elevators and structures over 3 1/2 stories)",
        "rate": "35.11",
        "fringes": "28.81"
      },
      {
        "classification": "Electrician",
        "rate": "45.00",
        "fringes": "30.10"
      },
      {
        "classification": "Painter",
        "rate": "43.05",
        "fringes": "23.47"
      }]
    for (var index in classifications) {
      var opt = document.createElement('option');
      opt.value = classifications[index]["classification"].toLowerCase();
      opt.text = classifications[index]["classification"];
      opt.setAttribute('data-rate', classifications[index]["rate"]);
      opt.setAttribute('data-fringes', classifications[index]["fringes"]);
      classificationsList.add(opt, null);
    }
  },
  addClickHandlers: function(){
    var self = this;
    [].forEach.call(document.getElementsByClassName('usa-button'), function(el){
      // Only add the event listener to capture input if user didn't click cancel.
      if (el.className.indexOf('cancel') == -1) {
        el.addEventListener('click', function(evt) {
          self.inputToSessionStorage();
        });
      }
      if (el.href.indexOf('create-or-choose-new-payroll') > 0){
        el.addEventListener('click', function(evt) {
          sessionStorage.clear();
        });
      }
    });
  },
  inputToSessionStorage: function(){
    var tempObj = {};

    function verifyOrCreateKey(el, key){
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
        verifyOrCreateKey(el, key);
        if (el.value){
          tempObj[key][el.id] = el.value;
        }
      });

      if (document.getElementsByClassName('enter-employee-details').length > 0){
        nest("rates", "employee");
        nest("employee", "employees");
      }

      // Attach user input, now stored in tempObj, to the correct sessionStorage key
      // Can later be parsed like so: JSON.parse(sessionStorage.payroll_start_week)
      for (var key in tempObj){
        sessionStorage.setItem(key, JSON.stringify(tempObj[key]));
      }
    } catch (e){
      console.log("No values found.");
    }
  }
}

setup.addClickHandlers();

switch (setup.page) {
  case "enter-worker-details":
    setup.createWorkClassifications();
    document.getElementById('work-classification').addEventListener('change', function(evt) {
      //update db rate and fringes here
      document.getElementById('rate').innerHTML = '$' + this.selectedOptions[0].attributes['data-rate'].value;
      document.getElementById('fringes').innerHTML = '$' + this.selectedOptions[0].attributes['data-fringes'].value;
    });
    break;
}
