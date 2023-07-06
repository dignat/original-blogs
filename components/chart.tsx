import { useRef, useEffect } from 'react';
import {select} from 'd3-selection';
import * as d3 from 'd3';

export const Chart = () => {
    const svg = useRef<SVGSVGElement>(null);
     const drawChart = (svgRef: React.RefObject<SVGSVGElement>) => {
        const data = [
            {group: 'A', value: 12},
            {group: 'B', value: 5},
            {group: 'C', value: 6},
            {group: 'D', value: 6},
            {group: 'E', value: 10},
        ];
        const margin = {top: 10, right: 30, bottom: 30, left: 60};
        const width = 260 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom
        const svg = select(svgRef.current);
        svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    
        svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d ,i) => i * 40)
        .attr('y', (d, i) => height - 10 * d.value)
        .attr('width', 20)
        .attr('height', (d, i) => d.value * 10)
        .attr('fill', 'steelblue');

        svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => i * 40)
        .attr('y', (d, i) => (height - 10 * d.value)/2)
        .attr('dx', 8)
        .attr('dy', ".35em")
        .attr('fill', 'white')
        .text((d, i) => d.value);
    

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

export default Chart;