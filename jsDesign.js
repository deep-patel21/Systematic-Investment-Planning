document.getElementById("calculateBtn").addEventListener("click", function() {
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
  
var advancedBtn = document.getElementById("advanced-btn");
var advancedBox = document.getElementById("advanced-box");
var closeBtn = document.getElementById("close-btn");

advancedBtn.addEventListener("click", function() {
  advancedBox.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  advancedBox.style.display = "none";
});

advancedBtn.addEventListener("click", function() {
    advancedBox.classList.remove("hidden");

    var investmentTable = document.getElementById("investment-table");
    if(investmentTable) {
        investmentTable.remove();
    }
   
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
    var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);
    var data = JSON.parse(localStorage.getItem("investmentData"));
    var index = 0;
    for (var i = 1; i <= investmentPeriod; i++) {
        var row = table.insertRow();
        var yearCell = row.insertCell();
        yearCell.innerHTML = i;
        var investmentCell = row.insertCell();
        investmentCell.innerHTML = "<input type='text' contenteditable='true' value='" + (data && data[index] ? data[index++] : (monthlyInvestment * 12)) + "'>";
        var returnCell = row.insertCell();
        returnCell.innerHTML = "<input type='text' contenteditable='true' value='" + (data && data[index] ? data[index++] : annualReturnRate) + "'>";
        var corpusCell = row.insertCell();
        corpusCell.innerHTML = "<input type='text' contenteditable='true' value='" + (data && data[index] ? data[index++] : "") + "'>";
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
});
  
  closeBtn.addEventListener("click", function() {
     advancedBox.classList.add("hidden");
  });
  


  