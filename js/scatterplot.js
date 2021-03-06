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


d3.csv("data/scatter.csv").then((data) => {

    console.log(data); 



	let maxYS = d3.max(data, function(d) { return d.score; });


	let yScaleS = d3.scaleLinear()
	            .domain([0,maxYS])
	            .range([height-margin.bottom,margin.top]); 


	let xScaleS = d3.scaleBand()
	            .domain(d3.range(data.length))
	            .range([margin.left, width - margin.right])
	            .padding(0.1); 

	    svg.selectAll("circle")
	    .data(data)
	    .enter()
	    .append("circle")
	        .attr("cx", (d) => xScaleS(d.day)) 
	        .attr("cy", (d) => yScaleS(d.score)) 
	        .attr("r", 10)  

	//add Y axis
	svg.append("g")
	   .attr("transform", `translate(${margin.left}, 0)`) 
	   .call(d3.axisLeft(yScaleS)) 
	   .attr("font-size", '20px'); 



	//add X axis 
	svg.append("g")
	    .attr("transform", `translate(0,${height - margin.bottom})`) 
	    .call(d3.axisBottom(xScaleS) 
	            .tickFormat(i => data[i].day))  
	    .attr("font-size", '20px'); 





	const tooltipS = d3.select("#csv-scatter") 
                     .append("div") 
                     .attr('id', "tooltipS") 
                     .style("opacity", 0) 
                     .attr("class", "tooltip"); 



	const mouseoverS = function(event, d) {
	      tooltipS.html("Day " + d.day + "<br> Score: " + d.score + "<br>") 
	          .style("opacity", 1);  
	}

	
	const mousemoveS = function(event, d) {
	  tooltipS.style("left", (event.day)+"px") 
	          .style("top", (event.score + yTooltipOffsetS) +"px"); 
	}


	const mouseleaveS = function(event, d) { 
	  tooltipS.style("opacity", 0); 
	}




    svg.selectAll("circle") 
	   .data(data) 
	   .enter()  
	   .append("circle") 
	     .attr("cx", (d) => xScaleS(d.day)) 
	     .attr("cy", (d) => yScaleS(d.score)) 
	     .attr("r", 10)  
	     .on("mouseover", mouseoverS) 
	     .on("mousemove", mousemoveS)
	     .on("mouseleave", mouseleaveS);






    
});















