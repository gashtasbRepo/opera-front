import { Chart } from "aio-dashboard"
import { FC, useState } from "react"

const CallChart: FC = () => {
    const callChart = useCallChart()
    return (
        <div className="dashboard-box flex-col-">
            <div className="flex-row- align-v- gap-16- p-12-">
                {callChart.datas.map((o)=>{
                    return (
                        <div className="flex-row- align-v- gap-3-">
                            <div className="w-12- h-12-" style={{background:o.color}}></div>
                            <div className="msf">{o.title}</div>
                        </div>
                    )
                })}
            </div>
            <Chart
                attrs={{ style: { height: 300 } }}
                pointOption={({ point, dataIndex }) => {
                    return {
                        key: point.date,
                        value: point.count,
                        style: { fill: callChart.datas[dataIndex].color }
                    }
                }}
                datas={callChart.data || []}
                keyAxis={{
                    gridLineColor: '#ddd',
                    size: 36,
                    getLabel: (index) => callChart.labels[index],
                    count: callChart.labels.length,
                    padding: [12, 12]
                }}
                valueAxis={{
                    start: 0,
                    end: callChart.maxValue,
                    size: 48,
                    getLabel: (v) => v.toString()
                }}
            />
        </div>
    )
}
export default CallChart


const useCallChart = () => {
    const maxValue = 20
    const datas = [
        {title:'موضوع 1',color:'rgb(255,0,0)'}, 
        {title:'موضوع 2',color:'rgb(247,128,0)'}, 
        {title:'موضوع 3',color:'rgb(238,255,0)'}, 
        {title:'موضوع 4',color:'rgb(0,255,4)'}, 
        {title:'موضوع 5',color:'rgb(0,8,255)'}
    ]
    const [labels,setLabels] = useState<string[]>(getLabels)
    const [data, setData] = useState<any>(getData)
    function getLabels(){
        return [
            '1403/4/1','1403/4/1','1403/4/2','1403/4/3','1403/4/4','1403/4/5','1403/4/6','1403/4/7','1403/4/8','1403/4/9','1403/4/10',
            '1403/4/10','1403/4/11','1403/4/12','1403/4/13','1403/4/14','1403/4/15','1403/4/16','1403/4/17','1403/4/18','1403/4/19','1403/4/20',
            '1403/4/20','1403/4/21','1403/4/22','1403/4/23','1403/4/24','1403/4/25','1403/4/26','1403/4/27','1403/4/28','1403/4/29','1403/4/30',
        ]
    }
    function getData() {
        const res = []
        for (let i = 0; i < 5; i++) {
            const points: any[] = []
            for (let j = 0; j < labels.length; j++) {
                points.push({
                    date: `1403/4/${j + 1}`,
                    count: Math.round(Math.random() * maxValue)
                })
            }
            res.push({
                title: `موضوع ${i + 1}`,
                color: datas[i].color,
                type: 'bar',
                points
            })
        }
        return res
    }
    console.log(data)
    return { data, labels, maxValue,datas }
}
