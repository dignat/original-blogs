import { useRef, useEffect } from "react";
import {select} from 'd3-selection';
import type { Region } from "./region";
import * as d3 from 'd3';
import {max, scaleBand, scaleLinear } from "d3";

type Props = {
    data: Region [],
    dimensions: {
        width: number,
        height: number,
        margins: {
            top: number,
            right: number,
            left: number,
            bottom: number
        }
    },
    xAccessor(d: Region): number ,
    yAccessor(d: Region): string
}

export const Charts = ({data, dimensions, xAccessor, yAccessor}: Props) => {

    const {width, height, margins} = dimensions;

    const svg = useRef<SVGSVGElement>(null);
    
    const drawChart = (svgRef: React.RefObject<SVGSVGElement>) => {
        
        const maxVal = Math.max(...data.map(({value}): number => value));
        const X = d3.map(data, (i) => i.region);
        const Y = d3.map(data, d => d.value as number);
        const yDomain = [0, d3.max(Y)];
        const xScale = scaleBand().domain(X)
        .range([margins.left, width - margins.right]).padding(0.1)
        const yScale = scaleLinear()
        .domain([0, maxVal])
        .range([height - margins.bottom, margins.top])

        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 40);
        const I = d3.range(X.length).filter(i => (X[i]));

    const svg = select(svgRef.current);
      svg.attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: 100%; height: intrinsic;");

        
      svg.append("g")
      .attr("transform", `translate(${margins.left},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - margins.left - margins.right)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -margins.left)
          .attr("y", 12)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text('Regions'));


   const bar = svg.append("g")
      .attr("fill", 'steelblue')
        .selectAll("rect")
        .data(data)
        .join("rect")
      .attr("x", (d, i) => xScale(X[i]) as number)
      .attr("y", (d, i) => yScale(Y[i]))
      .attr("height", (d, i) => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth());


  svg.append("g")
      .attr("transform", `translate(0,${height - margins.bottom})`)
      .call(xAxis);

       

    }

    useEffect(() => {
        drawChart(svg);
    },)

  return (
            <div>
            <svg ref={svg}/>
            </div>
  )
}

export default Charts;