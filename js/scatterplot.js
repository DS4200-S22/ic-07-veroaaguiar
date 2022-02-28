/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 


// Set dimensions and margins for plots 
const width2 = 900; 
const height2 = 450; 
const margin2 = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset2 = 15; 



let svg1 = d3
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


let maxY = d3.max(data, function(d) { return d.score; });


let yScale = d3.scaleLinear()
            .domain([0,maxY])
            .range([height-margin.bottom,margin.top]); 


let xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    svg1.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("name", (d) => { return d.day; })
        .attr("score", (d) => { return d.score; })


svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale)) 
   .attr("font-size", '20px'); 




svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 



// TODO: What does each line of this code do? 
// code creates a bar with all the previous functions and variables
// used to create a final product 
svg1.selectAll(".scatterplot") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("class", "circle") 
     .attr("x", (d,i) => xScale(i)) 
     .attr("y", (d) => yScale(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale(d.score)) 
     .attr("width", xScale.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

});








const tooltip1 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
// Using tooltip1, function creates event that occurs 
// when mouse hovers over a point 
// (Event: Shows the data in a rectangle))
const mouseover1 = function(event, d) {
  tooltip1.html("Day " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse moves over a point
// (Event: Keeps showing rectangle until mouse moves over certain end point)
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse hovers out of a point
// (Event: stops showing data rectangele)
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}






