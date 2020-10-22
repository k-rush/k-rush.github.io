const devCostPerWeek = 2000;
const riskFactorCost = 1000;

function calculateCost(devWeeks, maintenanceCostPerWeek, azureSpendPerWeek, riskFactor, externalTeamCostPerWeek, week)
{
  var devCost = devWeeks * devCostPerWeek * Math.min(devWeeks, week);
  var maintenanceCost = maintenanceCostPerWeek * week;
  var azureSpendCost = azureSpendPerWeek * week;
  var riskCost = riskFactor * riskFactorCost * week;
  var externalTeamCost = externalTeamCostPerWeek * week;
  return devCost + maintenanceCost + azureSpendCost + riskCost + externalTeamCost;
}

function f(week)
{
  return calculateCost(6, 500, 100, 1, 100, week)
}

function g(week)
{
  return calculateCost(8, 0, 0, 5, 0, week)
}

function h(week)
{
  return calculateCost(0, 1000, 500, 1, 100, week)
}

var xAxis = Array(24).fill().map((element, index) => index)

var trace1 = {
  x: xAxis,
  y: Array(24).fill().map((element, index) => f(index)),
  mode: 'lines',
  name: 'Option 1'
};

var trace2 = {
  x: xAxis,
  y: Array(24).fill().map((element, index) => g(index)),
  mode: 'lines',
  name: 'Option 2'
}

var trace3 = {
  x: xAxis,
  y: Array(24).fill().map((element, index) => h(index)),
  mode: 'lines',
  name: 'Option 3'
}


var data = [ trace1, trace2, trace3 ];

window.addEventListener('load', (event) => {
    Plotly.newPlot('CBAPlot', data);
});