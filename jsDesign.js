if(performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  localStorage.clear();
}

//var slider = document.getElementById("yearSlider");
//slider.style.opacity = "0";
//var outputTextIdentifier = document.getElementById('output-text');
//outputTextIdentifier.style.opacity = "0";

/*function updateSentence() {
  const sentence = `Wow! That's good compounding. You know what's better? If you invest for another ${selectedYears} years, your portfolio value would be `;
  document.getElementById("outputTextIdentifier").innerHTML = sentence + additionalExpectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
} */

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


    var additionalInvestmentPeriod = investmentPeriod + 10;
    let additionalExpectedAmount = 0;
    let addtionalRunningTotal = 0;
    for(let i = 0; i < (additionalInvestmentPeriod * 12); i++) {
      addtionalRunningTotal = monthlyInvestment + additionalExpectedAmount;
      additionalExpectedAmount = addtionalRunningTotal * (1 + (annualReturnRate / (12 * 100)));
    }
    var outputTextIdentifier = document.getElementById('output-text');
    var outputAdditionalExpectedAmount = additionalExpectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    outputTextIdentifier.innerHTML = "<b>Extended Analysis:</b> <br> Wow! That's good compounding. You know what's better?" + 
    " If you invest for another <b>10 years</b>, your portfolio value would be " + 
    outputAdditionalExpectedAmount;
    outputTextIdentifier.style.opacity = "1";

   /* const slider= document.getElementById("yearSlider");
    const output = document.getElementById("output-text");
    slider.addEventListener("input", function() {
      const selectedYears = this.value;
      updateSentence(selectedYears);
    }); */
  }); 
  
  function updateExpectedValue() {
    var numberOfRows = document.getElementById("investment-table").rows.length;
    var totalInvestmentAmount = 0;
    var expectedValueUpdated = 0;
    for(let i = 1; i < numberOfRows; i++) {
      var investmentAmountTable = document.getElementById('investment-table').rows[i].cells[1].getElementsByTagName('input')[0].value;
      var returnRateTable = document.getElementById('investment-table').rows[i].cells[2].getElementsByTagName('input')[0].value;
      investmentAmountTable = parseFloat(investmentAmountTable);
      returnRateTable = parseFloat(returnRateTable);
      totalInvestmentAmount += investmentAmountTable;
      
      expectedValueUpdated = (expectedValueUpdated + investmentAmountTable) * (1 + (returnRateTable/100));
      document.getElementById('investment-table').rows[i].cells[3].innerHTML = expectedValueUpdated.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      document.getElementById('investment-table').rows[i].cells[1].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
      document.getElementById('investment-table').rows[i].cells[2].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
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
        var expectedHeader = headerRow.insertCell();
        expectedHeader.innerHTML = "Expected Value";

        table.classList.add("table-scrollbar");

        var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
        var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);

        for (let i = 1; i <= investmentPeriod; i++) {
          let row = table.insertRow();
          let yearCell = row.insertCell();
          yearCell.innerHTML = i;
          let investmentCell = row.insertCell();
          investmentCell.innerHTML = "<input type='text' class='investment' contenteditable='true' value='" + (monthlyInvestment * 12) + "'>";
          let returnCell = row.insertCell();
          returnCell.innerHTML = "<input type='text' class='return' contenteditable='true' value='" + annualReturnRate + "'>";
          let expectedCell = row.insertCell();
          //expectedCell.innerHTML = "<input type='text' class='corpus' contenteditable='false' value='" + updateExpectedValue() + "'">";
        }
        advancedBox.appendChild(table);
        updateExpectedValue();
        for(var i = 0; i < numberOfRows; i++) {
          document.getElementById('investment-table').rows[i].cells[1].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
          document.getElementById('investment-table').rows[i].cells[2].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
        }
      }
      advancedBox.style.display = "block";
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
  });
}

// Add event listeners to the cells in the 3rd column
for (var i = 0; i < returnCells.length; i++) {
  returnCells[i].addEventListener("input", function() {
    updateExpectedValue();
  });
}

var viewChartBtn = document.getElementById("view-chart-btn");
var table = document.getElementById("investment-table");
var chart = document.getElementById("chart");

viewChartBtn.addEventListener("click", function() {
  if (table.style.display === "none") {
    table.style.display = "block";
    chart.style.display = "none";
    viewChartBtn.innerHTML = "View Chart";
  } else {
    table.style.display = "none";
    chart.style.display = "block";
    viewChartBtn.innerHTML = "View Table";
  }
  createChart();
});

document.getElementById('comingSoonMessage').style.opacity = "0";
document.getElementById('comingSoonMessage').style.position = "absolute";
function swapVisuals() {
  if(document.getElementById('investment-table').style.opacity == 1) {
    document.getElementById('investment-table').style.opacity = "0";
    //document.getElementById('myChart').style.opacity = "1";
    document.getElementById('comingSoonMessage').style.opacity = "1";
    for(var i = 0;  i < numberOfRows; i++) {
      var fourthColumnData = document.getElementById('investment-table').rows[i].cells[3].innerHTML;
      fourthColumnData.push(fourthColumnData);
    }
    document.getElementById('view-chart-btn').innerHTML = "View Table";
  }
  else {
    document.getElementById('investment-table').style.opacity = "1";
    //document.getElementById('myChart').style.opacity = "0";
    document.getElementById('view-chart-btn').innerHTML = "View Graph";
    document.getElementById('comingSoonMessage').style.opacity = "0";
  }
}

const currencySelect = document.getElementById("currency-select");
currencySelect.addEventListener("change", function() {
  const selectedCurrency = this.value;
  amountInvestedSwap = parseFloat(document.getElementById("amountInvested").value);
  expectedAmountSwap = parseFloat(document.getElementById("expectedAmount").value);
  wealthGainedSwap = parseFloat(document.getElementById("wealthGained").value);
  updateCurrency(selectedCurrency);
});

function updateCurrency(selectedCurrency) {
  switch(selectedCurrency) {
    case "USD":
      document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
      document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      break;
    case "CAD":
      document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});      
      document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      break;
    case "INR":
      document.getElementById("amountInvested").value = parseFloat(amountInvested).toLocaleString("en-IN", {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      document.getElementById("expectedAmount").value = parseFloat(expectedAmount).toLocaleString("en-IN", {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      document.getElementById("wealthGained").value = parseFloat(wealthGained).toLocaleString("en-IN", {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      break;
  }
}