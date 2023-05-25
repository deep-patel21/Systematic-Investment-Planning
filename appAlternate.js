//Storage Management
if(performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  localStorage.clear();
}

//Dynamic Output Generation, based on real-time user inputs
document.getElementById("monthlyInvestment").addEventListener("input", function() {
  var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
  var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value); 

  var amountInvested = monthlyInvestment * (investmentPeriod * 12);

  let expectedAmount = 0;
  let runningTotal = 0;
  for(let i = 0; i <= (investmentPeriod * 12); i++) {
      runningTotal = monthlyInvestment + expectedAmount;
      expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
  }

  var wealthGained = expectedAmount - amountInvested;

  document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
  document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});

  var additionalInvestmentPeriod = investmentPeriod + 10;
  let additionalExpectedAmount = 0;
  let addtionalRunningTotal = 0;
  document.getElementById("output-text").style.opacity = "1";
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

document.getElementById("investmentPeriod").addEventListener("input", function() {
  var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
  var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value); 

  var amountInvested = monthlyInvestment * (investmentPeriod * 12);

  let expectedAmount = 0;
  let runningTotal = 0;
  for(let i = 0; i <= (investmentPeriod * 12); i++) {
      runningTotal = monthlyInvestment + expectedAmount;
      expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
  }

  var wealthGained = expectedAmount - amountInvested;

  document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
  document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});

  var additionalInvestmentPeriod = investmentPeriod + 10;
  let additionalExpectedAmount = 0;
  let addtionalRunningTotal = 0;
  document.getElementById("output-text").style.opacity = "1";
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

document.getElementById("annualReturnRate").addEventListener("input", function() { 
  var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
  var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value); 

  var amountInvested = monthlyInvestment * (investmentPeriod * 12);

  let expectedAmount = 0;
  let runningTotal = 0;
  for(let i = 0; i <= (investmentPeriod * 12); i++) {
      runningTotal = monthlyInvestment + expectedAmount;
      expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
  }

  var wealthGained = expectedAmount - amountInvested;

  document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
  document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});

  var additionalInvestmentPeriod = investmentPeriod + 10;
  let additionalExpectedAmount = 0;
  let addtionalRunningTotal = 0;
  document.getElementById("output-text").style.opacity = "1";
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

document.getElementById("calculateBtn").addEventListener("click", function() {
  if(!document.getElementById('monthlyInvestment').value || !document.getElementById('investmentPeriod').value || !document.getElementById('annualReturnRate').value) {
    alert("Please enter values in all input fields before calculating.");
    return;
  } 
  else {
    var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    var investmentPeriod = parseFloat(document.getElementById("investmentPeriod").value);
    var annualReturnRate = parseFloat(document.getElementById("annualReturnRate").value);

    var amountInvested = monthlyInvestment * (investmentPeriod * 12);

    let expectedAmount = 0;
    let runningTotal = 0;
    for(let i = 0; i <= (investmentPeriod * 12); i++) {
        runningTotal = monthlyInvestment + expectedAmount;
        expectedAmount = runningTotal * (1 + (annualReturnRate / (12 * 100)));
    }

    var wealthGained = expectedAmount - amountInvested;

    document.getElementById("amountInvested").value = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    document.getElementById("expectedAmount").value = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
    document.getElementById("wealthGained").value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    updateCurrencyFormatting();

    var additionalInvestmentPeriod = investmentPeriod + 10;
    let additionalExpectedAmount = 0;
    let addtionalRunningTotal = 0;
    document.getElementById("output-text").style.opacity = "1";
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
  }});
  
//Advanced Mode real-time updates, based on user inputs
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

//Declarations related to advanced mode popup box
var advancedBtn = document.getElementById("advanced-btn");
var advancedBox = document.getElementById("advanced-box");
var closeBtn = document.getElementById("close-btn");

//Logic regarding advanced mode GUI details
advancedBtn.addEventListener("click", function() {
  if(!document.getElementById('monthlyInvestment').value || !document.getElementById('investmentPeriod').value || !document.getElementById('annualReturnRate').value) {
    alert("Please enter values in all input fields before accessing advanced mode.");
    advancedBox.style.display = "none";
    advancedBox.style.opacity = "0";
    return;
  } 
  else {
    advancedBox.style.opacity = "1";
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
      }
      advancedBox.appendChild(table);
      updateExpectedValue();

      //Begin New 
      /*let inputFields = document.querySelectorAll('#investment-table input[type="text"]');
      inputFields.forEach(inputField => {
        inputFields.addEventListener('input', function() {
          if(this.value == '') {
            this.value = 0;
          }
          updateExpectedValue();
      })}); */
      //End New

      for(var i = 0; i < numberOfRows; i++) {
        document.getElementById('investment-table').rows[i].cells[1].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
        document.getElementById('investment-table').rows[i].cells[2].getElementsByTagName('input')[0].addEventListener('input', updateExpectedValue);
      }
    }
    advancedBox.style.display = "block";
  }
});

//Closes advanced mode, while saving data
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

//Opens advanced mode, while loading data
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

let viewChartBtn = document.getElementById("view-chart-btn");
let chart = document.getElementById("chart");
let table = document.getElementById("investment-table");

//Generating graph based on value of expected value and year in table
function generateGraph() {
  data.labels = [];
  data.datasets[0].data = [];
  var numberOfRows = document.getElementById("investment-table").rows.length;
  for(let i = 1; i < numberOfRows; i++) {
    var expectedValue = document.getElementById('investment-table').rows[i].cells[3].innerHTML;
    var year = document.getElementById('investment-table').rows[i].cells[0].innerHTML;
    expectedValue = parseFloat(expectedValue.replace(/[^0-9.-]+/g,""));
    data.labels.push(year);
    data.datasets[0].data.push(expectedValue);
  }
  myChart.update();
  table.style.position = "absolute";
}

var data = {
  labels: [],
  datasets: [{
    label: "Expected Value",
    data: [],
    backgroundColor: "rgba(76, 175, 80, 0.7)",
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    fill: true
  }]
};
var ctx = chart.getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    title: {
    display: true,
    text: "S.I.P. Visualization Tool",
    fontSize: 30,
  },
  tooltips: {
    backgroundColor: "#FAFAFA",
    borderColor: "black",
    borderWidth: 1,
    titleFontColor: "black",
    titleFontStyle: "normal",
    displayColors: true,
    bodyFontColor: "black"
  },
  legend: {
    display: false
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
        speed: 100,
        threshold: 10
      },
      zoom: {
        enabled: true,
        mode: "y"
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    title: {
      display: true,
      text: (ctx) => {
        const {axis = 'xy', intersect, mode} = ctx.chart.options.interaction;
        return 'Mode: ' + mode + ', axis: ' + axis + ', intersect: ' + intersect;
      }
    },
  }}
});
chart.style.opacity = "0";

//Switches between table and chart upon button click
function swapTableGraph() {
  if(viewChartBtn.innerHTML == "View Graph") {
    viewChartBtn.innerHTML = "View Table";
    document.getElementById("chart").style.opacity = "1";
    document.getElementById("chart").style.zIndex = "1000";
    document.getElementById("investment-table").style.zIndex = "0";
    document.getElementById("investment-table").style.opacity = "0";
    
    generateGraph();
  }
  else if(viewChartBtn.innerHTML == "View Table") {
    viewChartBtn.innerHTML = "View Graph";
    document.getElementById("investment-table").style.opacity = "1";
    document.getElementById("chart").style.opacity = "0";
    document.getElementById("investment-table").style.zIndex = "1000";
    document.getElementById("chart").style.zIndex = "0";
  }
}

// Set chart and table elements to overlap
chart.style.position = "absolute";
chart.style.top = table.offsetTop + "px";
chart.style.left = table.offsetLeft + "px";

// Initially hide chart
chart.style.opacity = "0";

//Currency manipulation based on user input
let currentCurrency = "USD";

function updateCurrencyFormatting() {
  const selectedCurrency = document.getElementById("currency-select").value;
  currentCurrency = selectedCurrency;
  let amountInvested = parseFloat(document.getElementById("amountInvested").value.replace(/[^0-9.-]+/g,""));
  let expectedAmount = parseFloat(document.getElementById("expectedAmount").value.replace(/[^0-9.-]+/g,""));
  let wealthGained = parseFloat(document.getElementById("wealthGained").value.replace(/[^0-9.-]+/g,""));

  switch(selectedCurrency) {
    case "USD":
      amountInvested = amountInvested.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
      break;
    case "CAD":
      amountInvested = amountInvested.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-CA', {style: 'currency', currency: 'CAD', maximumFractionDigits: 2});
      break;
    case "INR":
      amountInvested = amountInvested.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      expectedAmount = expectedAmount.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});      
      wealthGained = wealthGained.toLocaleString('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 2});
      break;
  }
  document.getElementById("amountInvested").value = amountInvested;
  document.getElementById("expectedAmount").value = expectedAmount;
  document.getElementById("wealthGained").value = wealthGained;
}
document.getElementById("currency-select").addEventListener("change", updateCurrencyFormatting);


