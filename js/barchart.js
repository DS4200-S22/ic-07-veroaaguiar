/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
//this code adds a shape (svg1) into the file and sets its attributes
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
//This code finds the maximum y range for data1 values
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do? 
// this code is defining scale functions that
// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)
//line 1: sets the scale as linear since we have linear data 
//line 2: defines inputs for function (vars)
//line 3: defines the output of the function 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// constructs a new band scale with the domain specified 
// as an array of values and the range as the minimum and maximum 
// extents of the bands.  splits the range into n bands where n 
// is the number of values in the domain array.
// line 1: sets the scale as band scale
// line 2: sets domain as array of values of data1's length
// line 3: defines range of ouput of function 
// line 4: adds space between tick bars 
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
// add left (y) axis to svg1
// line 1: append (g var is placeholder)
// line 2: moves axis inside of left margin 
// line 3: built in function for left axis given 
// a scale function 
// line 4: set font size
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 



// TODO: What does each line of this code do? 
// add bottom (x) axis to svg1
// line 1: append (g var is placeholder)
// line 2: moves axis to bottom of svg 
// line 3: built in function for bottom (tick format shows name of current row )
// axis given a scale function 
// line 4: set font size 
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// creates a variable called tooltip1 that sets up
// attributes to be used in subsequent interaction functions
// line 1: selects html id
// line 2: sets html tag
// line 3: defines the attributes
// line 4: sets the style 
// line 5: sets the class 
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
// Using tooltip1, function creates event that occurs 
// when mouse hovers over a point 
// (Event: Shows the data in a rectangle))
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
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

/* 

  Bars 

*/


// TODO: What does each line of this code do? 
// code creates a bar with all the previous functions and variables
// used to create a final product 
// line 1: empty selection 
// line 2: selects (binds) data
// line 3:
// line 4: add attribute class, make it bar 
// line 5: setting x position, x position is gonna be x scale of y
// line 6: setting y position, y pos is gonna be y scale of the score 
// line 7: sets height as a function of score 
// line 8: sets width using built in function of bandwidth
// 

svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);









/* 

New chart 

CHART 2 



*/

// Set dimensions and margins for plots 
const width2 = 900; 
const height2 = 450; 
const margin2 = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset2 = 15; 



let svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/barchart.csv").then((data) => {

    console.log(data); 


    /*

  Axes

*/ 


let maxY2 = d3.max(data, function(d) { return d.score; });


let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 


let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

    svg2.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("name", (d) => { return d.name; })
        .attr("score", (d) => { return d.score; })


svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 




svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 



// TODO: What does each line of this code do? 
// code creates a bar with all the previous functions and variables
// used to create a final product 
svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

});








const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
// Using tooltip1, function creates event that occurs 
// when mouse hovers over a point 
// (Event: Shows the data in a rectangle))
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse moves over a point
// (Event: Keeps showing rectangle until mouse moves over certain end point)
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// Using tooltip1, function creates event that occurs 
// when mouse hovers out of a point
// (Event: stops showing data rectangele)
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}





