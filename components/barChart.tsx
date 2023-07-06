import { useRef, useEffect } from 'react';
import {select} from 'd3-selection';
import * as d3 from 'd3';


export const BarChart = () => {
    const svg = useRef<SVGSVGElement>(null);
    const drawChart = (svgRef: React.RefObject<SVGSVGElement>) => {
        // data set
        const data = [
            {name: 'Foo', value: 33},
            {name: 'Rishab', value: 12},
            {name: 'Alexis', value: 41},
            {name: 'Tom', value: 16},
            {name: 'Jack', value: 59},
            {name: 'Courtney', value: 21},
            {name: 'Christina', value: 38},
            {name: 'Jack', value: 59},
            {name: 'Mickey', value: 25},
            {name: 'Paul', value: 30},
        ];
        //set dimensions and margins
        const maxVal = Math.max(...data.map(({value}): number => value));
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        const X = d3.map(data, (i) => i.name);
        const Y = d3.map(data, d => d.value as number);
        const svg = select(svgRef.current);
        // append svg element
        svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
        // scale domains
        const x = d3.scaleBand()
            .domain(X)
            .range([margin.left, width - margin.right])
          .padding(0.1);
        const y = d3.scaleLinear()
          .domain([0, maxVal])
          .range([height, 0]);
          

          // add bars

          svg.selectAll(".bar")
         .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) { return x(d.name)!; })
        .attr("width", x.bandwidth())
        .attr("y", function (d, i) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); });
        // Add x axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add y axis
        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10))
            svg.selectAll("text") // customize text on both axis - this example changes text on y axis
          .attr("x", -25)
          .attr("fill", "currentColor")
    }


    useEffect(() => {
        drawChart(svg)
    }, [svg])

    return (
        <div>
            <svg ref={svg}/>
            </div>
    )
}

export default BarChart;