import { FC, useState } from "react"
import { Pie } from "aio-dashboard"

const FeelPie: FC = () => {
    const callFeels = useCallFeels()
    return (
        <div className="flex-row- align-v- dashboard-box">
            <div className="dashboard-title">درصد احساس مشتری</div>
            <div className="flex-row-">
                <Pie
                    size={200}
                    ranges={callFeels.ranges}
                    start={0}
                    end={100}
                    offset={0}
                    thickness={100}
                />
                <div className="flex-col- gap-3-">
                    {
                        callFeels.list.map((o, i) => {
                            return (
                                <div key={i} className="flex-row- align-v- gap-6-">
                                    <div className="w-12- h-12-" style={{ background: o.color }}></div>
                                    <div className="msf">{o.text}</div>
                                    <div className="p-3- br-4- w-36- flex-row- align-vh- dashboard-highlight">{o.value}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default FeelPie

const useCallFeels = () => {
    const callSubjexts = [
        { text: 'احساس 1', id: 0, value: 12, color: 'rgb(255,0,0)' },
        { text: 'احساس 2', id: 1, value: 40, color: 'rgb(247,128,0)' },
        { text: 'احساس 3', id: 2, value: 30, color: 'rgb(238,255,0)' },
        { text: 'احساس 4', id: 3, value: 4, color: 'rgb(0,255,4)' },
        { text: 'احساس 5', id: 4, value: 45, color: 'rgb(0,8,255)' },
    ]
    const [total, setTotal] = useState<number>(getTotal)
    const [ranges, setRanges] = useState<{ color: string, value: number }[]>(getRanges)
    const [list, setList] = useState<{ color: string, text: string, value: number }[]>(getList)
    function getTotal() {
        return callSubjexts.reduce((sum, item) => sum + item.value, 0)
    }
    function getRanges() {
        return callSubjexts.map((o) => ({ color: o.color, value: o.value * 100 / total }))
    }
    function getList() {
        return callSubjexts.map((o) => ({ text: o.text, value: o.value, color: o.color }))
    }
    return { total, ranges, list }
}
