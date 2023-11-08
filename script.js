// Get the SVG canvas dimensions based on the viewport
const width = window.innerWidth;
const height = window.innerHeight;

// Set up the SVG canvas
const svg = d3.select("#animation")
  .attr("width", width)
  .attr("height", height);

// Define data for nodes (squares, circles, and triangles)
const nodesData = [
  { id: "triangle", x: width / 2, y: 0, type: "triangle" },
  { id: "square1", x: width / 2, y: 200, type: "square" },
  { id: "square2", x: width / 2 - 400, y: 200, type: "square" },
  { id: "square3", x: width / 2 + 400, y: 200, type: "square" }
];

// Create nodes (squares, circles, and triangles)
const nodes = svg.selectAll(".node")
  .data(nodesData)
  .enter()
  .append("g")
  .attr("class", d => `node ${d.type}`);

// Create and style triangles
nodes.filter(d => d.type === "triangle")
  .append("polygon")
  .attr("points", `${-100},0 0,100 100,0`)
  .attr("fill", "grey");

// Create and style squares
nodes.filter(d => d.type === "square")
  .append("rect")
  .attr("x", -15)
  .attr("y", -15)
  .attr("width", 30)
  .attr("height", 30)
  .attr("fill", "green")
  .attr("stroke", "black")
  .attr("stroke-width", 2.5);

// Create and style circles (similar to squares)
nodes.filter(d => d.type === "circle")
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 10)
  .attr("fill", "green");

// Position nodes based on data
nodes.attr("transform", d => `translate(${d.x},${d.y})`);



nodes.filter(d => d.type === "square")
  .each(function (squareData) {
    svg.append("line")
      .attr("class", `square-link ${squareData.id}`) // Common class for square links
      .attr("x1", squareData.x)
      .attr("y1", squareData.y)
      .attr("x2", width / 2) // Triangle x-coordinate
      .attr("y2", 0) // Triangle y-coordinate
      .attr("stroke", "purple")
      .lower();
  });

// Function to create circles in the lower half of the screen
function createCirclesInLowerHalf(numCircles) {
  const circleData = [];

  for (let i = 0; i < numCircles; i++) {
    const cx = Math.random() * width;
    const cy = (0.5 + Math.random() * 0.5) * height; // Random position in the lower half
    circleData.push({ id: `circle${i}`, cx, cy, r: 10, fill: "green" });
  }

  const circles = svg.selectAll(".node.circle")
    .data(circleData)
    .enter()
    .append("g")
    .attr("class", d => `node circle`);

  circles.append("circle")
    .attr("id", d => d.id) // Unique ID for each circle
    .attr("cx", d => d.cx)
    .attr("cy", d => d.cy)
    .attr("r", d => d.r)
    .attr("fill", d => d.fill);

  // Create links from circles to the triangle
  circles.each(function (circleData) {
    svg.append("line")
      .attr("class", `circle-link ${circleData.id}`) // Common class for circle links
      .attr("x1", circleData.cx)
      .attr("y1", circleData.cy)
      .attr("x2", width / 2) // Triangle x-coordinate
      .attr("y2", 0) // Triangle y-coordinate
      .attr("stroke", "purple")
      .lower();
  });
}

// Create 50 circles in the lower half of the screen
createCirclesInLowerHalf(600);

const linkLine = svg.append("line")
  .attr("class", "circle-link")
  .attr("stroke", "purple");
  linkLine.attr("id", "circle20-link");

// Command to select and animate circle20
function animateCircle20() {
  // Select circle20 by its ID
  const circle20 = d3.select("#circle20");

  if (circle20.empty()) {
    console.error("Circle20 not found");
    return;
  }

  // Get the initial position of the triangle
  const triangleX = parseFloat(width / 2);
  const triangleY = parseFloat(250);

  // Highlight the stroke of circle20
  circle20.transition()
    .duration(500)
    .attr("stroke", "red")
    .attr("stroke-width", 3);

  // Animate circle20 to move towards the triangle
  circle20.transition()
    .duration(2000) // 2 seconds
    .attr("cx", triangleX)
    .attr("cy", triangleY)
    .ease(d3.easeLinear)
    .on("end", () => {
      // Reset the stroke and stroke-width after the animation
      circle20.attr("stroke", "none")
        .attr("stroke-width", 0);
    });

  // Update the link position during the animation
  d3.timer(function () {
    const circle20X = parseFloat(circle20.attr("cx"));
    const circle20Y = parseFloat(circle20.attr("cy"));

    // Update the main link position
    linkLine
      .attr("x1", width/2)
      .attr("y1", 0)
      .attr("x2", circle20X)
      .attr("y2", circle20Y)
      .lower();

    return false; // Continue the animation loop
  });
}

function animateCircle202() {
  // Select circle20 by its ID
  const circle20 = d3.select("#circle20");

  if (circle20.empty()) {
    console.error("Circle20 not found");
    return;
  }

  // Get the initial position of the triangle
  const NewX = parseFloat(width / 2 - 50);
  const NewY = parseFloat(160);

  // Highlight the stroke of circle20
  circle20.transition()
    .duration(500)
    .attr("stroke", "red")
    .attr("stroke-width", 3);

  // Animate circle20 to move towards the triangle
  circle20.transition()
    .duration(2000) // 2 seconds
    .attr("cx", NewX)
    .attr("cy", NewY)
    .ease(d3.easeLinear)
    .on("end", () => {
      // Reset the stroke and stroke-width after the animation
      circle20.attr("stroke", "none")
        .attr("stroke-width", 0);
    });

  // Update the link position during the animation
  d3.timer(function () {
    const circle20X = parseFloat(circle20.attr("cx"));
    const circle20Y = parseFloat(circle20.attr("cy"));

    // Update the main link position
    linkLine
      .attr("x1", width/2)
      .attr("y1", 0)
      .attr("x2", circle20X)
      .attr("y2", circle20Y)
      .lower();

    return false; // Continue the animation loop
  });
}

// Call the command to animate circle20
//document.getElementById("clickButton").addEventListener("click", animateCircle20);
//document.getElementById("clickButton2").addEventListener("click", animateCircle202);

// Add an event listener to the "moveSquaresButton" button
// Add an event listener to the "moveSquaresButton" button



const nodeElements = document.querySelectorAll('.node');
const nodeOverlay = document.getElementById('nodeOverlay');

// Update the event listeners for all nodes
nodeElements.forEach(node => {
  node.addEventListener('mouseover', () => {
    const nodeId = node.getAttribute('id');
    const tooltipContent = getTooltipContent(nodeId);
    showNodeTooltip(node, tooltipContent);
  });

  node.addEventListener('mouseout', () => {
    hideNodeTooltip();
  });
});

function showNodeTooltip(node, content) {
  // Create a tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = content;

  // Position the tooltip relative to the node
  const rect = node.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - tooltip.clientHeight}px`;

  // Append the tooltip to the body
  document.body.appendChild(tooltip);
}

function hideNodeTooltip() {
  // Remove any existing tooltips
  const existingTooltip = document.querySelector(".tooltip");
  if (existingTooltip) {
    existingTooltip.parentNode.removeChild(existingTooltip);
  }
}

function getTooltipContent(nodeId) {
  // Customize the tooltip content based on the ID of the node
  switch (nodeId) {
    case 'square1':
      return "This is Square 1's custom tooltip content.";
    case 'circle1':
      return "This is Circle 1's custom tooltip content.";
    case 'triangle':
      return "This is Triangle's custom tooltip content.";
    default:
      return 'Default tooltip content for other nodes';
  }
}


const lineElements = document.querySelectorAll('line');
const lineOverlay = document.getElementById('lineOverlay');

lineElements.forEach(line => {
  line.addEventListener('mouseover', () => {
    const tooltipContent = getLineTooltipContent(line);
    lineOverlay.textContent = tooltipContent;
    lineOverlay.style.display = 'block';
    positionLineOverlay(line, lineOverlay);
  });

  line.addEventListener('mouseout', () => {
    lineOverlay.style.display = 'none';
  });
});

function getLineTooltipContent(line) {
  // Customize the tooltip content for lines
  // You can use data attributes or other methods to associate tooltips with specific lines
  // For this example, a generic message is shown.
  return "The Multivac draws information from People";
}

function positionLineOverlay(line, overlay) {
  // Calculate the position of the overlay relative to the line
  const x1 = parseFloat(line.getAttribute('x1'));
  const x2 = parseFloat(line.getAttribute('x2'));
  const y1 = parseFloat(line.getAttribute('y1'));
  const y2 = parseFloat(line.getAttribute('y2'));
  
  const left = (x1 + x2) / 2;
  const top = (y1 + y2) / 2;

  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
}

// Function to open/close the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
  } else {
    sidebar.style.left = '0px';
  }
}

// Attach the toggleSidebar function to the toggle button
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);

// Initialize a variable to keep track of the current value
let currentValue = 0;

// Function to handle the button click
function handleButtonClick() {
  currentValue++; // Increment the value

  // Call the appropriate function based on the value
  switch (currentValue) {
    case 1:
      step1();
      break
    case 2:
      animateCircle20();
      break;
    case 3:
      animateCircle202();
      break;
    case 4:
      Step3(width/2,200);
      break;
    // Add more cases as needed for other values
    default:
      // Handle cases beyond the defined ones
      break;
  }
}

// Attach the handleButtonClick function to the button
document.getElementById('clickButton').addEventListener('click', handleButtonClick);

function resetProgram() {
  // Reload the page to reset the entire program
  location.reload();
}
document.getElementById('resetProgramButton').addEventListener('click', resetProgram);

//----------------------------------------------------------------------------------------------------------------------------------------
// Function to toggle the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
  } else {
    sidebar.style.left = '0px';
  }
}

// Attach the toggleSidebar function to the button
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
//------------------------------------------------------------------------------------------------
function Step3(x, y) {
  // Select the SVG element
  const svg = d3.select("#animation");

  // Get the position of circle20
  const circle20 = d3.select("#circle20");
  const circle20X = parseFloat(circle20.attr("cx"));
  const circle20Y = parseFloat(circle20.attr("cy"));

  // Create a line element from (x, y) to circle20's position
  svg.append("line")
    .attr("class", "thirdline")
    .attr("x1", x)
    .attr("y1", y)
    .attr("x2", circle20X)
    .attr("y2", circle20Y)
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .lower();

  svg.append("line")
  .attr("class", "thirdline")
  .attr("x1", width/2)
  .attr("y1", 100)
  .attr("x2", x)
  .attr("y2", y-15)
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .upper();
}

// Example usage: Draw a line from (100, 100) to circle20
function step1() {
  // Select circle20 by its ID
  const circle20 = d3.select("#circle20");

  if (!circle20.empty()) {
    // Highlight the circle by changing its stroke color and width
    circle20.attr("stroke", "red") // Set the highlight color
      .attr("fill", "red")
      .attr("stroke-width", 3); // Set the highlight stroke width
  }
}



