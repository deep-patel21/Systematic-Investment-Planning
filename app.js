function openAdvancedMode() {
  if(!document.getElementById('input-1').value || !document.getElementById('input-2').value || !document.getElementById('input-3').value) {
    alert("Please enter values in all input fields before accessing advanced mode.");
    return;
  }

  let popup = document.getElementById('popup');
  popup.classList.add('open-popup');

  var table = document.createElement("table");
  var numRows = parseFloat(document.getElementById('input-2').value);

  var monthlyInvestmentInTable = document.getElementById('input-1').value;
  var yearlyInvestmentInTable = monthlyInvestmentInTable * 12;
  var investmentRateTable = document.getElementById('input-3').value;

  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";
  table.style.width = "1400px";
  table.style.height = "auto";
  table.style.justifyContent = "center";
  table.style.textAlign = "center";
  table.style.display = "table";
  table.style.position = "absolute";

  table.style.marginTop = "225px";
  table.style.marginLeft = "250px";
  table.style.zIndex = "999";
  //table.style.opacity = "0";
  if(numRows > 21) {
    table.style.overflowY = "scroll";
    table.style.maxHeight = "600px";
    table.style.maxWidth = "1450px";
  }
  table.id = "table";

  window.onbeforeunload = function() {
    localStorage.clear();
  };

  for (var i = 0; i < numRows; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < 4; j++) {
      var cell = row.insertCell(j);
      cell.contentEditable = true;
      cell.style.border = "1px solid black";
      cell.style.padding = "5px";
      if(j === 0) {
        cell.innerHTML = i+1;
        cell.style.width = "5%";
        cell.contentEditable = false;
      }
      else if (j === 1) {
        if(monthlyInvestmentInTable != null) {
          cell.innerHTML = yearlyInvestmentInTable;
        }
        else {
          cell.innerHTML = 0;
        }
      }
      else if (j === 2) {
        if(investmentRateTable == 0 || investmentRateTable == " ") {
          cell.innerHTML = 0;
        }
        else {
          cell.innerHTML = investmentRateTable;
        }
        cell.style.width = "15%";
      }
      else if (j === 3) {
        cell.innerHTML = "-------------";
        cell.style.width = "25%";
        cell.contentEditable = false;
      }
      var storedValue = localStorage.getItem(i + "," + j);
      if(storedValue) {
        cell.innerHTML = storedValue;
      }
      cell.addEventListener("input", function(event) {
        var updatedValue = event.target.innerHTML;
        localStorage.setItem(event.target.parentElement.rowIndex + "," + event.target.cellIndex, updatedValue);
        updateV();
      });
    }
  }
  document.body.insertBefore(table, document.body.firstChild);
  table.style.opacity = "1";
}

function closeAdvancedMode() {
  let popup = document.getElementById('popup');
  popup.classList.remove("open-popup");
  var table = document.getElementById("table");
  table.parentNode.removeChild(table);  
  var scrollableTable = document.getElementById("scrollableTable");
  scrollableTable.parentNode.removeChild(scrollableTable);
}

var button = document.getElementById("advancedModeButton");

button.style.position = "absolute";
button.style.marginLeft = "-166px";
button.style.marginTop = "55px"
button.style.padding = "10px 30px";
button.style.border = "black 2px solid";
button.style.borderRadius = "12px";
button.style.fontSize = "20px";
button.style.fontWeight = "600";

button.addEventListener("click", openAdvancedMode);

document.getElementById('input-1').addEventListener('input', getResult);
document.getElementById('input-2').addEventListener('input', getResult);
document.getElementById('input-3').addEventListener('input', getResult);

function updateV() {
  var numRows = document.getElementById('table').rows.length;
  var expectedValue = 0;
  var totalInvestmentAmount = 0;
  for(var i = 0; i < numRows; i++) {
    var investmentAmount = document.getElementById('table').rows[i].cells[1].innerHTML;
    var returnRate = document.getElementById('table').rows[i].cells[2].innerHTML;

    investmentAmount = parseFloat(investmentAmount);
    returnRate = parseFloat(returnRate);
    totalInvestmentAmount += investmentAmount;
    var monthlyInvestmentPerYear = investmentAmount / 12;
  
    expectedValue = (expectedValue+investmentAmount)*(1+(returnRate/(100)));
    document.getElementById('table').rows[i].cells[3].innerHTML = expectedValue.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  } 

  document.getElementById('answerField-1').value = totalInvestmentAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById('answerField-2').value = expectedValue.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2}); 
  document.getElementById('answerField-3').value = (expectedValue - totalInvestmentAmount).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
}

function getResult() { 
  let monthlyInvestmentAmount = parseFloat(document.getElementById('input-1').value);
  let investPeriodYears = parseFloat(document.getElementById('input-2').value);
  let investPeriodMonths = investPeriodYears * 12;
  let expectedAnnualReturnRate = parseFloat(document.getElementById('input-3').value);
  let amountInvestedOverPeriod = monthlyInvestmentAmount * investPeriodMonths;
  
  let v = 0;
  let runningTotal = 0;
  for(let i = 1; i <= investPeriodMonths; i++) {
    runningTotal = monthlyInvestmentAmount + v;
    v = runningTotal*(1+(expectedAnnualReturnRate/(12*100)));
  }  

  let wealthGained = v - amountInvestedOverPeriod;

  document.getElementById('answerField-1').value = amountInvestedOverPeriod.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById('answerField-2').value = v.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
  document.getElementById('answerField-3').value = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});

  var canvas = document.getElementById("investmentGraph");
  var ctx = canvas.getContext("2d"); 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var data = {
      labels: [],
      axisY: {
          title: "Money",
          interlacedColor: "white"
      },
      axisX: {
          title: "Time",
          interlacedColor: "white"
      },
      datasets: [
        {
          label: "Investment Growth Over Time",
          data: [v],
          backgroundColor: "rgba(0, 255, 0, 0.4)",
          borderColor: "rgba(0, 0, 0, 1",
          borderWidth: 3,
          pointRadius: 10
        }
      ]
    };
  for (var i = 1; i <= investPeriodYears; i++) {
  data.labels.push(i);
  data.datasets[0].data.push(data.datasets[0].data[i - 1] * (1 + (expectedAnnualReturnRate / 100)));
  }
  new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Money ($)",
              fontSize: 20,
              fontStyle: 'bold',
              fontColor: 'black'
            },
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Time (years)",
              fontSize: 20,
              fontStyle: 'bold',
              fontColor: 'black'
            }
          }]
        } 
      }
    }); 
    document.getElementById('investmentGraph').style.display = "block";
}

function graphCheck() {
  if(!document.getElementById('input-1').value || !document.getElementById('input-2').value || !document.getElementById('input-3').value) {
    alert("Please enter values in all input fields before generating the graph of your investments. The data is currently blank.");
  }
}

var downloadButton = document.createElement('button');
downloadButton.innerHTML = "Download PDF";

downloadButton.addEventListener("click", function() {
  var table = document.getElementById('table');
  var docPDF = new jsPDF();
  //var data = [];
  for(var i = 0; i < table.rows.length; i++) {
    //var row = [];
    for(var j = 0; j < table.rows[0].cell.length; j++) {
      //var cell = table.rows[i].cells[j];
      //row.push(cell.innerHTML);
      docPDF.cell(10, 10, 10, 10, table.rows[i].cells[j].innerHTML, i);
    }
   // data.push(row);
  }
  /*docPDF.autoTable({
    head: [['Year', 'Investment Amount', 'Return Rate', 'Expected Value']],
    body: data
  }); */
  if(!document.getElementById('input-1').value || !document.getElementById('input-2').value || !document.getElementById('input-3').value) {
    alert("Please enter values in all input fields before downloading the PDF file");
  }
  else {
    docPDF.save("investmentPlan.pdf");
  }
});

document.body.appendChild(downloadButton);
downloadButton.style.position = "absolute";
downloadButton.style.padding = "10px 20px";
downloadButton.style.background = "white";
downloadButton.style.fontSize = "20px";
downloadButton.style.fontWeight = "600";
downloadButton.style.borderRadius = "12px";
downloadButton.style.marginTop = "577px";
downloadButton.style.marginLeft = "1160px";
downloadButton.style.zIndex = "-1";

