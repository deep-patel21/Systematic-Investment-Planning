if(performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  localStorage.clear();
}

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
    updateCurrencyFormatting();

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
    chart.style.display = "block";
    table.style.display = "block";
    chart.style.display = "none";
    viewChartBtn.innerHTML = "View Chart";
  } 
  else {
    chart.style.display = "none";
    table.style.display = "none";
    chart.style.display = "block";
    viewChartBtn.innerHTML = "View Table";
  }
 // createChart();
});

document.getElementById('comingSoonMessage').style.opacity = "0";
document.getElementById('comingSoonMessage').style.position = "absolute";
function swapVisuals() {
  if(document.getElementById('investment-table').style.opacity == 1) {
    document.getElementById('investment-table').style.opacity = "0";
    //document.getElementById('chart').style.opacity = "1";
    document.getElementById('comingSoonMessage').style.opacity = "1";
    for(var i = 0;  i < numberOfRows; i++) {
      var fourthColumnData = document.getElementById('investment-table').rows[i].cells[3].innerHTML;
      fourthColumnData.push(fourthColumnData);
    }
    document.getElementById('view-chart-btn').innerHTML = "View Table";
  }
  else {
    document.getElementById('investment-table').style.opacity = "1";
    //document.getElementById('chart').style.opacity = "0";
    document.getElementById('view-chart-btn').innerHTML = "View Graph";
    document.getElementById('comingSoonMessage').style.opacity = "0";
  }
}

let currenctCurrency = "USD";
//let calculationCompleted = false;

function updateCurrencyFormatting() {
  //calculationCompleted = true;
  const selectedCurrency = document.getElementById("currency-select").value;
  currenctCurrency = selectedCurrency;
  let amountInvested = parseFloat(document.getElementById("amountInvested").value.replace(/[^0-9.-]+/g,""));
  let expectedAmount = parseFloat(document.getElementById("expectedAmount").value.replace(/[^0-9.-]+/g,""));
  let wealthGained = parseFloat(document.getElementById("wealthGained").value.replace(/[^0-9.-]+/g,""));

  // Format the numeric values in the input elements based on the selected currency
  switch(selectedCurrency) {
    case "USD":
      //calculationCompleted = true;
      amountInvested = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      break;
    case "CAD":
      //calculationCompleted = true;
      amountInvested = amountInvested.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      break;
    case "INR":
      //calculationCompleted = true;
      amountInvested = amountInvested.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      break;
  }
  //calculationCompleted = true;
  document.getElementById("amountInvested").value = amountInvested;
  document.getElementById("expectedAmount").value = expectedAmount;
  document.getElementById("wealthGained").value = wealthGained;
}

document.getElementById("currency-select").addEventListener("change", updateCurrencyFormatting);

/*let currencySelect = document.getElementById("currency-select");
currencySelect.addEventListener("change", function() {
  let selectedCurrency = this.value;
  amountInvestedSwap = parseFloat(document.getElementById("amountInvested").value);
  expectedAmountSwap = parseFloat(document.getElementById("expectedAmount").value);
  wealthGainedSwap = parseFloat(document.getElementById("wealthGained").value);
  //updateCurrency(selectedCurrency);
  updateCurrency(selectedCurrency, amountInvestedSwap, expectedAmountSwap, wealthGainedSwap);
});

function updateCurrency(selectedCurrency, amountInvestedSwap, expectedAmountSwap, wealthGainedSwap) {
  /*if(selectedCurrency == "USD") {
    document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
    document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});  
  }
  else if(selectedCurrency == "INR") {
    document.getElementById("amountInvested").value = amountInvested.toLocaledString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
    document.getElementById("expectedAmount").value = expectedAmount.toLocaledString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});;
    document.getElementById("wealthGained").value = wealthGained.toLocaledString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});;  
  } 
  switch(selectedCurrency) {
    case "USD":
      //document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      amountInvestedSwap.value = amountInvestedSwap.value.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      //document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
      document.getElementById("expectedAmount").value = expectedAmountSwap;
      //document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      document.getElementById("wealthGained").value = wealthGainedSwap;
      break;
    case "INR":
      document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});;
      document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});;  
      break;
    case "CAD":
      document.getElementById("amountInvested").value = amountInvested;
      document.getElementById("expectedAmount").value = expectedAmount;
      document.getElementById("wealthGained").value = wealthGained;
      break;
  }
} */

/*function createChart() {
  var ctx = document.getElementById("chart").getContext("2d");
  var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
  var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);
  var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  var chartData = [];
  var expectedAmount = 0;
  var runningTotal = 0;

  for (let i = 0; i <= (investmentPeriod * 12); i++) {
    runningTotal = monthlyInvestment + expectedAmount;
    expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
    chartData.push({ x: i, y: expectedAmount });
  }

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Expected Value",
          data: chartData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          scaleLabel: {
            display: true,
            labelString: "Investment Period (in months)",
          },
        },
        y: {
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: "Expected Value (in USD)",
          },
        },
      },
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              return value.y.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
            }
        }
      },
      responsive: true,
    },
  });
}
createChart(investmentPeriod, expectedAmount);
document.getElementById("advanced-btn").addEventListener("click", swapVisuals);
document.getElementById("view-graph-btn").addEventListener("click", function() {
  document.getElementById("chart-container").style.display = "block";
}); */
