import Charts from "@/components/charts";
import Chart from "@/components/chart";
import BarChart from "@/components/barChart";
import type { Region } from "@/components/region";
const Personal = () => {
     
    const regions: Region[] = [
        {region: 'West', value: 100},
        {region: 'East', value: 132},
        {region: 'North', value: 221},
        {region: 'South', value: 87},
    ]

    const dimensions = {
        width: 550,
        height: 350,
        margins: {
            top: 20,
            left: 50,
            right: 5,
            bottom: 25
        }
    }

    

    const xAccessor = (d: Region) => d.value;
    const yAccessor = (d: Region) => d.region;
    
    return ( 
        <div>
            <BarChart/>
        {/* <Charts data={regions} dimensions={dimensions} xAccessor={xAccessor} yAccessor={yAccessor}/> */}
        </div>
     );
}
 
export default Personal;