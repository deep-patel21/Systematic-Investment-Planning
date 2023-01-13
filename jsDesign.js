document.getElementById("calculateBtn").addEventListener("click", function() {
  if(!document.getElementById('monthlyInvestment').value || !document.getElementById('investmentPeriod').value || !document.getElementById('annualReturnRate').value) {
    alert("Please enter values in all input fields before calculating.");
    return;
  } 
    // Read the values of the input fields
    var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
    var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);
    
    // Perform calculations
    var amountInvested = monthlyInvestment * (investmentPeriod * 12);

    let expectedAmount = 0;
    let runningTotal = 0;
    for(let i = 0; i <= (investmentPeriod * 12); i++) {
        runningTotal = monthlyInvestment + expectedAmount;
        expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
    }

    var wealthGained = expectedAmount - amountInvested;

    // Update the answer fields with the results
    document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
    document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  });

  function updateExpectedValue() {
    var numberOfRows = getElementById("investment-table").rows.length;
    var expectedValueUpdated = 0;
    var totalInvestmentAmount = 0;
    for(var i = 0; i < numberOfRows; i++) {
      var investmentAmountTable = document.getElementById('investment.table').rows[i].cell[1].innerHTML;
      var returnRateTable = document.getElementById('investment-table').rows[i].cell[2].innerHTML;
      investmentAmountTable = parseFloat(investmentAmountTable);
      returnRateTable = parseFloat(returnRateTable);
      totalInvestmentAmount += investmentAmountTable;
      
      expectedValueUpdated = (expectedValueUpdated + investmentAmountTable) * (1 + (returnRateTable/100));
      document.getElementById('corpusCell').innerHTML = expectedValueUpdated.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    }
  }
  
  var advancedBtn = document.getElementById("advanced-btn");
  var advancedBox = document.getElementById("advanced-box");
  var closeBtn = document.getElementById("close-btn");
  
  advancedBtn.addEventListener("click", function() {
    if(!document.getElementById('monthlyInvestment').value || !document.getElementById('investmentPeriod').value || !document.getElementById('annualReturnRate').value) {
      alert("Please enter values in all input fields before accessing advanced mode.");
      advancedBox.style.display = "none";
      return;
    } 
    else {
      var table = document.getElementById("investment-table");
      if(!table) {
        var investmentPeriod = document.getElementById("investmentPeriod").value;
        var table = document.createElement("table");
        table.setAttribute("id", "investment-table");
        
        var headerRow = table.insertRow();
        var yearHeader = headerRow.insertCell();
        yearHeader.innerHTML = "Year";
        var investmentHeader = headerRow.insertCell();
        investmentHeader.innerHTML = "Investment This Year";
        var returnHeader = headerRow.insertCell();
        returnHeader.innerHTML = "Return Rate";
        var corpusHeader = headerRow.insertCell();
        corpusHeader.innerHTML = "Corpus Amount";

        var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
        var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);
      
        for (var i = 1; i <= investmentPeriod; i++) {
          var row = table.insertRow();
          var yearCell = row.insertCell();
          yearCell.innerHTML = i;
          var investmentCell = row.insertCell();
          investmentCell.innerHTML = "<input type='text' class='investment' contenteditable='true' value='" + (monthlyInvestment * 12) + "'>";
          var returnCell = row.insertCell();
          returnCell.innerHTML = "<input type='text' class='return' contenteditable='true' value='" + annualReturnRate + "'>";
          var corpusCell = row.insertCell();
          corpusCell.innerHTML = "<input type='text' id='corpusCell' class='corpus' contenteditable='false'>";
        }
      advancedBox.appendChild(table);
      advancedBox.style.display = "block";
      }
    }
  });

closeBtn.addEventListener("click", function() {
  var data = {
    investment: [],
    return: []
  };
  for (var i = 0; i < investmentPeriod; i++) {
    data.investment.push(document.getElementsByClassName("investment")[i].value);
    data.return.push(document.getElementsByClassName("return")[i].value);
  }
  localStorage.setItem("investmentData", JSON.stringify(data));
  advancedBox.style.display = "none";
  advancedBox.classList.remove("show");
});

advancedBtn.addEventListener("click", function() {
  var data = JSON.parse(localStorage.getItem("investmentData"));
  if(data) {
      for (var i = 0; i < investmentPeriod; i++) {
          document.getElementsByClassName("investment")[i].value = data.investment[i];
          document.getElementsByClassName("return")[i].value = data.return[i];
      }
  }
  advancedBox.style.display = "block";
  advancedBox.classList.add("show"); 
});

var investmentCells = document.getElementsByClassName("investment");
var returnCells = document.getElementsByClassName("return");

// Add event listeners to the cells in the 2nd column
for (var i = 0; i < investmentCells.length; i++) {
  investmentCells[i].addEventListener("input", function() {
    updateExpectedValue();
    // Perform calculations and update the 4th column
  });
}

// Add event listeners to the cells in the 3rd column
for (var i = 0; i < returnCells.length; i++) {
  returnCells[i].addEventListener("input", function() {
    updateExpectedValue();
    // Perform calculations and update the 4th column
  });
}

/*var advancedBtn = document.getElementById("advanced-btn");
var advancedBox = document.getElementById("advanced-box");
var closeBtn = document.getElementById("close-btn");

advancedBtn.addEventListener("click", function() {
  advancedBox.style.display = "block";

  var investmentPeriod = document.getElementById("investmentPeriod").value;
  var table = document.createElement("table");
  table.setAttribute("id", "investment-table");

  var headerRow = table.insertRow();
  var yearHeader = headerRow.insertCell();
  yearHeader.innerHTML = "Year";
  var investmentHeader = headerRow.insertCell();
  investmentHeader.innerHTML = "Investment This Year";
  var returnHeader = headerRow.insertCell();
  returnHeader.innerHTML = "Return Rate";
  var corpusHeader = headerRow.insertCell();
  corpusHeader.innerHTML = "Corpus Amount";

  for (var i = 1; i <= investmentPeriod; i++) {
    var row = table.insertRow();
    var yearCell = row.insertCell();
    yearCell.innerHTML = i;
    var investmentCell = row.insertCell();
    investmentCell.innerHTML = "<input type='text' class='investment' contenteditable='true'>";
    var returnCell = row.insertCell();
    returnCell.innerHTML = "<input type='text' class='return' contenteditable='true'>";
    var corpusCell = row.insertCell();
    corpusCell.innerHTML = "<input type='text' class='corpus' contenteditable='false'>";
  }

  advancedBox.appendChild(table);
}); */


/*var tableCreated = false;
advancedBtn.addEventListener("click", function() {
    advancedBox.classList.remove("hidden");
    var investmentTable = document.getElementById("investment-table");

    if(investmentTable == null) {
      var table = document.createElement("table");
      table.setAttribute("id", "investment-table");
    
      //create table header
      var headerRow = table.insertRow();
      var yearHeader = headerRow.insertCell();
      yearHeader.innerHTML = "Year";
      var investmentHeader = headerRow.insertCell();
      investmentHeader.innerHTML = "Investment This Year";
      var returnHeader = headerRow.insertCell();
      returnHeader.innerHTML = "Return Rate";
      var corpusHeader = headerRow.insertCell();
      corpusHeader.innerHTML = "Corpus Amount";

      //create table rows

      var investmentPeriod = document.getElementById("investmentPeriod").value;
     // var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
      //var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);
      //var data = JSON.parse(localStorage.getItem("investmentData"));
     // var index = 0;
      for (var i = 1; i <= investmentPeriod; i++) {
          var row = table.insertRow();
          var yearCell = row.insertCell();
          yearCell.innerHTML = i;
          var investmentCell = row.insertCell();
          investmentCell.innerHTML = "<input type='text' contenteditable='true' value='" + (data && data[index] ? data[index++] : (monthlyInvestment * 12)) + "'>";
          var returnCell = row.insertCell();
          returnCell.innerHTML = "<input type='text' contenteditable='true' value='" + (data && data[index] ? data[index++] : annualReturnRate) + "'>";
          var corpusCell = row.insertCell();
          corpusCell.innerHTML = "<input type='text' contenteditable='false' value='" + (data && data[index] ? data[index++] : "") + "'>";
      }
      //append the table to the advanced-box container
      advancedBox.appendChild(table);

      //get all the input elements in the table
      var inputs = document.querySelectorAll("#investment-table input");
      var data = {};
      //iterate over the input elements and save their value to the data object
      inputs.forEach(function(input, index){
          data[index] = input.value;
      });
      //save the data object to local storage
      localStorage.setItem("investmentData", JSON.stringify(data));
    }
    else {
      investmentTable.classList.remove("hidden");
      var data = JSON.parse(localStorage.getItem("investmentData"));
      var inputs = document.querySelectorAll("#invement-table input");
      //iterate over the input elements and update their value from the data object
      inputs.forEach(function(input, index){
      input.value = data[index];
    });
  }
});

  closeBtn.addEventListener("click", function() {
     advancedBox.classList.add("hidden");
     var investmenttable = document.getElementById("invest-table");
     investmenttable.classList.add("hidden");
  });
  
  /*var inputs = document.querySelectorAll("#investment-table input:not(:last-child)");
  inputs.forEach(function(input){
    input.addEventListener("input", function(){
      //get the row of the current input element
      var row = input.parentNode.parentNode;
      //get the investment and return cells of the row
      var investmentCell = row.querySelector("td:nth-child(2) input");
      var returnCell = row.querySelector("td:nth-child(3) input");
      //get the investment and return values
      var investment = parseFloat(investmentCell.value);
      var returnRate = parseFloat(returnCell.value);
      //calculate the corpus amount
      var corpus = investment * (1 + (returnRate / 100));
      //get the corpus cell of the row
      var corpusCell = row.querySelector("td:nth-child(4) input");
      //update the corpus cell value
      corpusCell.value = corpus.toFixed(2);
    });
  }); 
  
  closeBtn.addEventListener("click", function() {
    var data = [];
    for (var i = 0; i < investmentPeriod; i++) {
      var investment = document.getElementsByClassName("investment")[i].value;
      var returnRate = document.getElementsByClassName("return")[i].value;
      var corpus = document.getElementsByClassName("corpus")[i].value;
      data.push([investment, returnRate, corpus]);
    }
    localStorage.setItem("investmentData", JSON.stringify(data));
    advancedBox.style.display = "none";
    advancedBox.classList.remove("show");
  });
  
  advancedBtn.addEventListener("click", function() {
  var data = JSON.parse(localStorage.getItem("investmentData"));
  var index = 0;
  for (var i = 1; i <= investmentPeriod; i++) {
    var row = table.insertRow();
    var yearCell = row.insertCell();
    yearCell.innerHTML = i;
    var investmentCell = row.insertCell();
    investmentCell.innerHTML = "<input type='text' class='investment' contenteditable='true' value='" + (data && data[index] ? data[index++] : (monthlyInvestment * 12)) + "'>";
    var returnCell = row.insertCell();
    returnCell.innerHTML = "<input type='text' class='return' contenteditable='true' value='" + (data && data[index] ? data[index++] : annualReturnRate) + "'>";
    var corpusCell = row.insertCell();
    corpusCell.innerHTML = "<input type='text' class='corpus' contenteditable='false' value='" + (data && data[index] ? data[index++] : "") + "'>";
  }
  advancedBox.appendChild(table);
  advancedBox.style.display = "block";
  advancedBox.classList.add("show");
}); */
