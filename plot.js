function renderPlot() {
    var deprecationWeek = $("#deprecation-week").val();
  
    function calculateCost(devWeeks, costPerWeek, week) {
        var devCostPerWeek = $("#dev-rate").val();
        var currentCostPerWeek = $("#current-cost-per-week").val();

        var devCost = devCostPerWeek * Math.min(devWeeks, week);
        var currentMaintenanceCost = currentCostPerWeek * Math.min(devWeeks, week);
        var maintenanceCost = costPerWeek * Math.max(0, week - devWeeks);
        return devCost + maintenanceCost + currentMaintenanceCost + maintenanceCost;
    }

    function migrateWebjob(week) {
        return calculateCost(
            $('#migrate .dev-effort').val(),
            $('#migrate .cost-per-week').val(),
            Math.min(week, deprecationWeek))
            + migrateLocServices(Math.max(0, week - deprecationWeek));
    }
    
    function migrateLocServices(week) {
        return calculateCost(
            $('#deprecate .dev-effort').val(),
            $('#deprecate .cost-per-week').val(),
            week);
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
        y: Array(plotWeeks).fill().map((element, index) => migrateLocServices(index)),
        mode: 'lines',
        name: 'Migrate to standard localization workflow'
    }

    var data = [trace1, trace2];

    Plotly.newPlot('plot', data);
}

window.addEventListener('load', (event) => {
    renderPlot();
    $(":input").change(renderPlot);
});