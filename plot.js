function renderPlot() {
    var deprecationWeek = $("#deprecation-week").val();
  
    function calculateCost(devWeeks, maintenanceCostPerWeek, azureSpendPerWeek, riskFactor, externalTeamCostPerWeek, week) {
        var devCostPerWeek = $("#dev-rate").val();
        var riskFactorCost = $("#risk-factor-cost").val();
      
        var devCost = devWeeks * devCostPerWeek * Math.min(devWeeks, week);
        var maintenanceCost = maintenanceCostPerWeek * week;
        var azureSpendCost = azureSpendPerWeek * week;
        var riskCost = riskFactor * riskFactorCost * week;
        var externalTeamCost = externalTeamCostPerWeek * week;
        return devCost + maintenanceCost + azureSpendCost + riskCost + externalTeamCost;
    }

    function migrateWebjob(week) {
        return calculateCost(
            $('#migrate .dev-effort').val(),
            $('#migrate .maintenance').val(),
            $('#migrate .azure-spend').val(),
            $('#migrate .risk-factor').val(),
            $('#migrate .ext-cost').val(),
            Math.min(week, deprecationWeek))
            + migrateLocServices(Math.max(0, week - deprecationWeek));
    }
    
    function maintainWebjob(week) {
        return calculateCost(
            $('#maintain .dev-effort').val(),
            $('#maintain .maintenance').val(),
            $('#maintain .azure-spend').val(),
            $('#maintain .risk-factor').val(),
            $('#maintain .ext-cost').val(),
            Math.min(week, deprecationWeek))
            + migrateLocServices(Math.max(0, week - deprecationWeek));
    }
    
    function migrateLocServices(week) {
        return calculateCost(
            $('#deprecate .dev-effort').val(),
            $('#deprecate .maintenance').val(),
            $('#deprecate .azure-spend').val(),
            $('#deprecate .risk-factor').val(),
            $('#deprecate .ext-cost').val(),
            Math.min(week, deprecationWeek));
    }
    
    var plotWeeks = 52;
  
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
        name: 'Migrate to standard localization workflow'
    }

    var data = [trace1, trace2, trace3];

    Plotly.newPlot('plot', data);
}

window.addEventListener('load', (event) => {
    renderPlot();
    $(":input").change(renderPlot);
});