const devCostPerWeek = 3000;
const riskFactorCost = 1000;
const deprecationWeek = 24;
const plotWeeks = 52;

function calculateCost(devWeeks, maintenanceCostPerWeek, azureSpendPerWeek, riskFactor, externalTeamCostPerWeek, week)
{
  var devCost = devWeeks * devCostPerWeek * Math.min(devWeeks, week);
  var maintenanceCost = maintenanceCostPerWeek * week;
  var azureSpendCost = azureSpendPerWeek * week;
  var riskCost = riskFactor * riskFactorCost * week;
  var externalTeamCost = externalTeamCostPerWeek * week;
  return devCost + maintenanceCost + azureSpendCost + riskCost + externalTeamCost;
}

function migrateWebjob(week)
{
  var weekNumberBeforeDepracation = Math.min(week, deprecationWeek);
  var weekNumberAfterDeprecation = Math.max(0, week - deprecationWeek);
  return calculateCost(3, 500, 100, 5, 100, weekNumberBeforeDepracation) + migrateLocServices(weekNumberAfterDeprecation);
}

function maintainWebjob(week)
{
  var weekNumberBeforeDepracation = Math.min(week, deprecationWeek);
  var weekNumberAfterDeprecation = Math.max(0, week - deprecationWeek);
  return calculateCost(0, 1000, 500, 1, 100, weekNumberBeforeDepracation) + migrateLocServices(weekNumberAfterDeprecation);
}

function migrateLocServices(week)
{
  return calculateCost(12, 0, 0, 1, 0, week);
}

var xAxis = Array(plotWeeks).fill().map((element, index) => index)

var trace1 = {
  x: xAxis,
  y: Array(plotWeeks).fill().map((element, index) => migrateWebjob(index)),
  mode: 'lines',
  name: 'Migrate webjob to function'
};

var trace2 = {
  x: xAxis,
  y: Array(plotWeeks).fill().map((element, index) => maintainWebjob(index)),
  mode: 'lines',
  name: 'Maintain webjob'
}

var trace3 = {
  x: xAxis,
  y: Array(plotWeeks).fill().map((element, index) => migrateLocServices(index)),
  mode: 'lines',
  name: 'Migrate to standard localization'
}


var data = [ trace1, trace2, trace3 ];

window.addEventListener('load', (event) => {
    Plotly.newPlot('plot', data);
});