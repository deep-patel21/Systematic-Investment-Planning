function openAdvancedMode() {
  let popup = document.getElementById('popup');
  popup.classList.add('open-popup');

  var container = document.createElement('div');
  container.style.position = "fixed"
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.overflow = "scroll";
  container.style.width = "1400px";
  container.style.height = "325px";

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
  table.style.transition = "opacity 0.25s";
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
      }
      else if (j === 3) {
        cell.innerHTML = "↓";
        cell.style.width = "5%";
      }

      var storedValue = localStorage.getItem(i + "," + j);
      /*if(storedValue) {
        cell.innerHTML = storedValue;
        cell.contentEditable = false;
      } */
      cell.addEventListener("input", function(event) {
        var updatedValue = event.target.innerHTML;
        //var cellValues = {};
        //cellValues[i + "," + j] = updatedValue;
        localStorage.setItem(event.target.parentElement.rowIndex + "," + event.target.cellIndex, updatedValue);
        //localStorage.setItem(event.target.cellValues)
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
button.addEventListener("click", openAdvancedMode)

document.getElementById('input-1').addEventListener('input', getResult);
document.getElementById('input-2').addEventListener('input', getResult);
document.getElementById('input-3').addEventListener('input', getResult);

for(var i = 0; i < numRows; i++) {
  for(var j = 0; j < 4; j++) {
    var cell = table.rows[i].cells[j];
    cell.addEventListener("input", getResult);
  }
}

function getResult() { 
  //let monthlyInvestmentAmount = (parseFloat(document.getElementById('input-1').value)).addEventListener('input', getResult);
  let monthlyInvestmentAmount = parseFloat(document.getElementById('input-1').value)
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

  let v2 = 0;
  let runningTotal2 = 0;
  for(let i = 0; i < investPeriodYears; i++) {
    runningTotal2 = Number(localStorage.getItem(i + ",1")) + v;
    let investmentRate2 = Number(localStorage.getItem(i + ",2"));
    v2 = runningTotal2*(1+((investmentRate2)/(12*100)));
    //document.write(runningTotal);
    //document.write(investmentRate);
    //document.write(v);
  }
  let wealthGained = v - amountInvestedOverPeriod;
  //let amountInvestedOverPeriodFormattedUS = amountInvestedOverPeriod.toLocaleString('en-US', {style: 'currency', currency: 'US', maximumFractionDigits: 2});
  //let vFormattedUS = v.toLocaleString('en-US', {style: 'currency', currency: 'US', maximumFractionDigits: 2});
  //let wealthGainedFormattedUS = wealthGained.toLocaleString('en-US', {style: 'currency', currency: 'US', maximumFractionDigits: 2});

  document.getElementById('answerField-1').value = amountInvestedOverPeriod;
  document.getElementById('answerField-2').value = v2.toFixed(2);
  document.getElementById('answerField-3').value = wealthGained.toFixed(2);

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
          //borderColor: "rgba(255, 99, 132, 1)",
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
              //fontColor: "rgba(255, 255, 255, 1)"
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
              //fontColor: "rgba(255, 255, 255, 1)"
              fontColor: 'black'
            }
          }]
        },
        toolTips: {
          mode: "nearest",
          intersect: true,
          position: "nearest",
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              //var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              if(label) {
                label += ': $';
              }
              label += tooltipItem.yLabel.toFixed(2);
              return label;
            }
          }
        },
        hover: {
          intersect: false,
          mode: "nearest",
        },
        elements: {
          point: {
            hoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)',
            pointRadius: 30
          }
        }
      }
    }); 

   /* const lineElement = document.createElement('lineDiv');
    lineElement.classList.add('vertical-line');
    canvas.appendChild(lineElement);
    lineElement.style.position = 'absolute';
    lineElement.style.top = '0';
    lineElement.style.bottom ='0';
    lineElement.style.width = '3px';
    lineElement.style.backgroundColor = 'black';
    lineElement.style.opacity = '0.7';
    lineElement.style.zIndex = '9999';

    canvas.addEventListener('mousemove', (event) => {
      const chartRect = canvas.getBoundingClientRect();
      const x = event.clientX - chartRect.left;
      lineElement.style.left = '${x}px';
      const points = canvas.getElementsAtXAxis(x);
      if(points.length > 0) {
        const point = points[0];
      }
    }) */
}
