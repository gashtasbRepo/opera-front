import { Box, Fade, Flex } from "@chakra-ui/react";
import WordCloud from "react-wordcloud";
import { toFarsiNumber } from "../../utils/utils";
import PieChartBox from "../Charts/PieChart";
import { FC, useState } from "react";
import { Pie, Chart } from "aio-dashboard";
import './index.css'
import FeelPie from "./feel/pie";
import FeelChart from "./feel/chart";
import CallPie from "./call/pie";
import CallChart from "./call/chart";
const Dashboard: FC = () => {
    return (
        <div className="rtl- flex-col- p-12- gap-12-">
            <div className="flex-row- gap-12-">
                <CallPie />
                <FeelPie/>
            </div>
            <div className="flex-row-">
                <CallChart />
            </div>
            <div className="flex-row-">
                <FeelChart />
            </div>
        </div>
    )
};

export default Dashboard;






