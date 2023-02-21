

// First, we need a frame  
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};



const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 



const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// Next, open file 
d3.csv("data/scatter-data.csv").then((data) => { 

	
	const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
	          // Note: data read from csv is a string, so you need to
	          // cast it to a number if needed 
	  
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });

	  // Define scale functions that maps our data values 
	  // (domain) to pixel values (range)
	  const X_SCALE = d3.scaleLinear() 
	                    .domain([0, (MAX_X)]) 
	                    .range([0, VIS_WIDTH]); 
	  const Y_SCALE = d3.scaleLinear() 
	                    .domain([0, (MAX_Y)]) 
	                    .range([VIS_HEIGHT, 0]); 

      
  FRAME1.selectAll("points")  
      .data(data) 
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.bottom); })
        .attr("r", 8)
        .attr("class", "point"); 

 	FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE).ticks(10)) 
          .attr("font-size", '20px'); 

	FRAME1.append("g") 
	      .attr("transform", "translate(" + (MARGINS.left) + 
	            "," + (MARGINS.top) + ")") 
	      .call(d3.axisLeft(Y_SCALE).ticks(10)) 
	        .attr("font-size", '20px'); 
 
}); 

d3.selectAll("point")
      .on("mouseover", function(){
          d3.select(this)
            .style("background-color", "orange");
      })
      .on("mouseout", function(){
          d3.select(this)
            .style("background-color", "black")
      });
