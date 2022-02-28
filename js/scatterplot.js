/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 


// Set dimensions and margins for plots 
const widthS = 900; 
const heightS = 450; 
const marginS = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffsetS = 15; 



let svg = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatterplot.csv").then((data) => {

    console.log(data); 


    /*

  Axes

*/ 


let maxYS = d3.max(data, function(d) { return d.score; });


let yScaleS = d3.scaleLinear()
            .domain([0,maxY])
            .range([height-margin.bottom,margin.top]); 


let xScaleS = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("name", (d) => { return d.day; })
        .attr("score", (d) => { return d.score; })


svg.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScaleS)) 
   .attr("font-size", '20px'); 




svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScaleS) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 



// TODO: What does each line of this code do? 
// code creates a bar with all the previous functions and variables
// used to create a final product 
svg.selectAll(".scatterplot") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("class", "circle") 
     .attr("x", (d,i) => xScaleS(i)) 
     .attr("y", (d) => yScaleS(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScaleS(d.score)) 
     .attr("width", xScaleS.bandwidth()) 
     .on("mouseover", mouseoverS) 
     .on("mousemove", mousemoveS)
     .on("mouseleave", mouseleaveS);

});








const tooltipS = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltipS") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
// Using tooltip1, function creates event that occurs 
// when mouse hovers over a point 
// (Event: Shows the data in a rectangle))
const mouseoverS = function(event, d) {
  tooltipS.html("Day " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse moves over a point
// (Event: Keeps showing rectangle until mouse moves over certain end point)
const mousemoveS = function(event, d) {
  tooltipS.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffsetS) +"px"); 
}

// TODO: What does this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse hovers out of a point
// (Event: stops showing data rectangele)
const mouseleaveS = function(event, d) { 
  tooltipS.style("opacity", 0); 
}






