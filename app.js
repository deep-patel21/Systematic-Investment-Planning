function openAdvancedMode() {
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
  table.style.height = "325px";
  table.style.justifyContent = "center";
  table.style.textAlign = "center";
  table.style.display = "table";
  table.style.position = "absolute";
  table.style.marginTop = "225px";
  table.style.marginLeft = "250px";
  table.style.zIndex = "999";
  table.style.opacity = "0";
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
        cell.innerHTML = yearlyInvestmentInTable;
      }
      else if (j === 2) {
        cell.innerHTML = investmentRateTable;
        cell.style.width = "15%";
      }
      else if (j === 3) {
        cell.innerHTML = "-------------";
        cell.style.width = "25%";
        cell.contentEditable = true;
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
}

var button = document.getElementById("advancedModeButton");
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
}

/*function getPDF() {
  const tableForPDF = document.getElementById('table');
  if(!tableForPDF) {
    return;
  }
  const pdf = new jsPDF();
  pdf.setFontSize(12);
  pdf.setFontStyle('normal');
  for (let i = 0; i < tableForPDF.rows.length; i++) {
    for (let j = 0; j < tableForPDF.rows[i].cells.length; j++) {
      const cellText = tableForPDF.rows[i].cells[j].textContent;
      const cellRect = tableForPDF.rows[i].cells[j].getBoundingClientRect();
      pdf.text(cellText, cellRect.left, cellRect.top + 12);
    }
  }
  const tableRect = tableForPDF.getBoundingClientRect();
  pdf.rect(tableRect.left, tableRect.top, tableRect.width, tableRect.height);
}

const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', () => {
  getPDF();
  pdf.save('investment-plan.pdf')
}); */

/*function checkTableValues() {
  for(let i = 0; i < numRows; i++) {
    for(let j = 0; j < 4; j++) {
      let tableValueTest = localStorage.getItem(i + "," + j);
      document.write(tableValueTest + " ");
    }
    document.write("<br>");
  }
} */

