import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Text
} from "recharts";

//import "./styles.css";

const blues = [
    ["#457AA6"],
    ["#457AA6", "#E3EBF2"],
    ["#264F73", "#457AA6", "#E3EBF2"],
    ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
    ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"]
];

const getColor = (length, index) => {
    if (length <= blues.length) {
        return blues[length - 1][index];
    }

    return blues[blues.length - 1][index % blues.length];
};

const YAxisLeftTick = ({ y, payload: { value } }) => {
    return (
        <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
            {value}
        </Text>
    );
};

let ctx;

export const measureText14HelveticaNeue = text => {
    if (!ctx) {
        ctx = document.createElement("canvas").getContext("2d");
        ctx.font = "14px 'Helvetica Neue";
    }

    return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 12;

const SimpleBarChart = ({ data, yKey, xKey }) => {
    const maxTextWidth = useMemo(
        () =>
            data.reduce((acc, cur) => {
                const value = cur[yKey];
                const width = measureText14HelveticaNeue(value.toLocaleString());
                if (width > acc) {
                    return width;
                }
                return acc;
            }, 0),
        [data, yKey]
    );

    return (
        <BarChart
            width={450}
            height={250}
            data={data}
            layout="vertical"
            margin={{ left: 10, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
        >
            <XAxis hide axisLine={false} type="number" />
            <YAxis
                yAxisId={0}
                dataKey={xKey}
                type="category"
                axisLine={false}
                tickLine={false}
            //tick={YAxisLeftTick}
            />
            <YAxis
                orientation="right"
                yAxisId={1}
                dataKey={yKey}
                type="category"
                axisLine={false}
                tickLine={false}
                tickFormatter={value => value.toLocaleString()}
                mirror
                tick={{
                    transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
                }}
            />
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
                {data.map((d, idx) => {
                    return <Cell key={d[xKey]} fill='#8AB6F1' />;
                })}
            </Bar>
        </BarChart>
    );
};

export default SimpleBarChart;