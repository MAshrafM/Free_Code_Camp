// constants
const w = 900,
      h = 450,
      xg = 40,
      yg = 30;

let chart = d3.select("#chart")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

let tooltip = d3.select("#chart")
                .append("div")
                .attr("id", "tooltip")
                .style("opacity", 0);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then( (data) => {
  // constants
  const barWidth = w / data.data.length;
  // filter data
  // X-Axis Years Data
  let years = data.data.map((i) => {
    return new Date(i[0]);
  });
  // X-axis 
  let xMin = d3.min(years),
      xMax = d3.max(years);
  let xScale = d3.scaleTime()
                 .domain([xMin, xMax])
                 .range([0, w]);
  let xAxis = d3.axisBottom()
                .scale(xScale);
  // Draw X-axis
  chart.append("g")
       .call(xAxis)
       .attr("id", "x-axis")
       .attr("transform", `translate(${xg}, ${h - yg})`);
  
  // Y-Axis GDP Data
  let GDP = data.data.map((i) => i[1]);
  
  // Y-Axis
  //let gMin = d3.min(GDP);
  let gMax = d3.max(GDP);
  let yScale = d3.scaleLinear()
                 .domain([0, gMax])
                 .range([h, 0]);
  let yAxis = d3.axisLeft(yScale);
  //              .scale(yScale);
  
  // Draw Y-axis
  chart.append("g")
       .call(yAxis)
       .attr("id", "y-axis")
       .attr("transform", `translate(${xg}, ${-1*yg})`);
  
  // scale gdp data
  // define scale
  let scaleData = d3.scaleLinear()
                    .domain([0, gMax])
                    .range([0, h]);
  
  let sGDP = GDP.map((i) => scaleData(i));
  // Draw Bars
  d3.select("svg")
    .selectAll("rect")
    .data(sGDP)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d, i) => data.data[i][0])
    .attr("data-gdp", (d, i) => data.data[i][1])
    .attr("x", (d, i) => xScale(years[i]))
    .attr("y", (d, i) => h - d)
    .attr("width", barWidth)
    .attr("height", (d) => d)
    .attr("fill", "blue")
    .attr("transform", `translate(${xg}, ${-1*yg})`)
    // tooltip
    .on("mouseover", function(d, i){
      d3.select(this)
        .attr("fill", "red");
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
      tooltip.html(data.data[i][0] + '<br>' + '$' + GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion')
        .attr('data-date', data.data[i][0])
        .style('left', (i * barWidth) + 30 + 'px')
        .style('top', h - 100 + 'px')
        .style('transform', 'translateX(60px)');
    })
    .on("mouseout", function(d){
       d3.select(this)
         .attr("fill", "blue");
       tooltip.transition()
        .duration(200)
        .style('opacity', 0);
    });
});