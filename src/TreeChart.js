import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function ThreeChart({ data }) {
    const ref = useD3(
        (svg) => {

            // set the dimensions and margins of the diagram
            const margin = { top: 40, right: 150, bottom: 50, left: 90 };
            const height = 900 - margin.top - margin.bottom;
            const width = 1200 - margin.left - margin.right;

            // set svg 'width' and 'height'
            //d3.select("body").append("svg")
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            let g = svg.append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

            // declares a tree layout and assigns the size
            //  assigns the data to a hierarchy using parent-child relationships
            // maps the node data to the tree layout
            const treemap = d3.tree().size([height, width]);
            var nodes = d3.hierarchy(data);
            nodes = treemap(nodes);

            // adds the links between the nodes
            g.selectAll(".link")
                .data(nodes.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .attr("d", function (d) {
                    return "M" + d.y + "," + d.x
                        + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                        + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                        + " " + d.parent.y + "," + d.parent.x;
                });

            // adds each node as a group
            var node = g.selectAll(".node")
                .data(nodes.descendants())
                .enter().append("g")
                .attr("class", function (d) {
                    return "node" +
                        (d.children ? " node--internal" : " node--leaf");
                })
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

              // adds the circle to the node
              node.append("circle")
              .attr("r", function(d) { return d.children ? d.data.instances + 10 : 5; })
              .style("stroke", function(d) { 
                switch (d.data.type) {
                    case "fi":
                        return "#000B0D";
                    case "fd":
                        return "#000B0D";
                    case "instance":
                        return "#000B0D"
                    case "service":
                        return "#000B0D"
                    default:
                        return "#000B0D"
                }
               })
              .style("fill", function(d) { 
                switch (d.data.environment) {
                    case "dev":
                        return "#20D1F0";
                    case "perf":
                        return "#F6E927";
                    case "stage":
                        return "#EC9C21"
                    default:
                        return "#FFFFFF"
                }
               });

            // node.append("path")
            //     .style("stroke", function (d) {
            //         switch (d.data.type) {
            //             case "fi":
            //                 return "#000B0D";
            //             case "fd":
            //                 return "#000B0D";
            //             case "instance":
            //                 return "#000B0D"
            //             case "service":
            //                 return "#000B0D"
            //             default:
            //                 return "#000B0D"
            //         }
            //     })
            //     .style("fill", function (d) {
            //         switch (d.data.environment) {
            //             case "ben":
            //                 return "#F70000";
            //             case "dev":
            //                 return "#F75600";
            //             case "perf":
            //                 return "#F6E927";
            //             case "stage":
            //                 return "#EC9C21"
            //             default:
            //                 return "#FFFFFF"
            //         }
            //     })
            //     .attr("d", d3.symbol()
            //         .size(function (d) { return d.children ? d.data.instances * 500 : 50; })
            //         .type(function (d) {
            //             if
            //                 (d.data.type === "instance") { return d3.symbolDiamond; } else { return d3.symbolCircle; }
            //         }));

            // adds the text to the node
            node.append("text")
                .attr("dy", ".35em")
                .attr("x", function (d) { return d.children ? 0 : 10 })
                .attr("y", function (d) { return d.children ? (d.data.instances + 20) : 0 })
                .style("text-anchor", function (d) { return d.children ? "middle" : "left"; })
                .text(function (d) { return d.data.name; });
        },
        3
    );

    return (
        <svg
            ref={ref}
            style={{
                // height: "100%",
                // width: "100%",
                // marginRight: "0px",
                // marginLeft: "0px",
            }}
        ></svg>
    );
}

export default ThreeChart;