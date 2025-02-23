import { Box, Fade, Flex } from "@chakra-ui/react";
import WordCloud from "react-wordcloud";
import './style.scss';
import { toFarsiNumber } from "../../utils/utils";
import PieChartBox from "../Charts/PieChart";

const Dashboard = () => {
    // Word frequency data for the word cloud
    const wordFrequencies = [
        { text: "تماس", value: 20 },
        { text: "مشتری", value: 15 },
        { text: "مشکل", value: 10 },
        { text: "راهکار", value: 8 },
        { text: "پشتیبانی", value: 7 },
        { text: "هوش مصنوعی", value: 12 },
        { text: "سیستم", value: 9 },
        { text: "پاسخ", value: 11 },
        { text: "کارشناس", value: 13 },
        { text: "مدت", value: 6 },
        { text: "کیفیت", value: 14 },
        { text: "نارضایتی", value: 5 },
        { text: "زمان", value: 16 },
        { text: "اطلاعات", value: 17 },
        { text: "بازخورد", value: 4 },
        { text: "رضایت", value: 18 },
        { text: "گزارش", value: 7 },
        { text: "پیشنهاد", value: 6 },
        { text: "عملیات", value: 10 },
        { text: "مشاوره", value: 3 },
        { text: "ارتباط", value: 8 },
        { text: "پشتیبان", value: 5 },
        { text: "تحلیل", value: 9 },
        { text: "موضوع", value: 15 },
        { text: "واحد", value: 6 },
        { text: "ارزیابی", value: 11 },
        { text: "مراحل", value: 7 },
        { text: "پاسخگویی", value: 12 },
        { text: "مشاهده", value: 14 },
        { text: "رفع", value: 8 },
        { text: "پیگیری", value: 10 },
        { text: "راه‌اندازی", value: 6 },
        { text: "پروسه", value: 5 },
        { text: "مدیریت", value: 13 },
        { text: "دسترسی", value: 7 },
        { text: "سوال", value: 9 },
        { text: "تماس‌ها", value: 4 },
        { text: "بهبود", value: 8 },
        { text: "سیگنال", value: 3 },
    ];


    return (
        <Fade
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box className="Dashboard" p="5">
                <Flex className="DashboardCallMetrics" justify={"space-between"} alignItems={"center"} flexDirection={"column"}>
                    <Box width={"100%"}>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد تماس ها</span>
                            <span className="value">{toFarsiNumber(121)}</span>
                        </Flex>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد تماس پایش شده</span>
                            <span className="value">{toFarsiNumber(140)}</span>
                        </Flex>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد تماس پایش نشده</span>
                            <span className="value">{toFarsiNumber(95)}</span>
                        </Flex>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد تماس تخصیص داده شده</span>
                            <span className="value">{toFarsiNumber(223)}</span>
                        </Flex>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد تماس تخصیص داده نشده</span>
                            <span className="value">{toFarsiNumber(121)}</span>
                        </Flex>
                        <Flex justify={'space-between'} alignItems={'end'} className="DashboardCallMetricsItem">
                            <span className="text">تعداد فیدبک ثبت شده</span>
                            <span className="value">{toFarsiNumber(121)}</span>
                        </Flex>
                    </Box>
                    <Box width={"100%"} height={"45%"} className="DashboardCallMetrics_AI">
                        <Box mb={"10"} className="title">موضوعات بررسی شده توسط هوش مصنوعی</Box>
                        <PieChartBox />
                    </Box>
                </Flex>
                <Box className="DashboardChartsWrapper">
                    <Box className="DashboardClientProblem">
                        <Box className="title">نمودار مشکلات مشتری</Box>
                    </Box>
                    <Box className="DashboardClientExperience">
                        {/* Word Cloud */}
                        <WordCloud
                            words={wordFrequencies}
                            options={{
                                fontSizes: [12, 50], // Minimum and maximum font size
                                rotations: 2,       // Number of rotations
                                rotationAngles: [-90, 0], // Rotation angles
                                scale: "sqrt",      // Scale for word sizes
                                spiral: "archimedean", // Spiral type
                                enableTooltip: true, // Show tooltip on hover
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Fade>
    );
};

export default Dashboard;
