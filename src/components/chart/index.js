import ParentSize from "@visx/responsive/lib/components/ParentSize";

import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip
} from '@visx/xychart';

import { MOCK_DATA} from './utils'

const periodMap = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th'
}

const accessors = {
    yAccessor: d => d.y,
    xAccessor: d => d.x,
    score: d => d.score,
    time: d => `${periodMap[d.period]} ${d.clock}`
};

const Chart = ({type="Moneyline"}) => {
    const data = formatData(MOCK_DATA, type.value)

    return(
        <ParentSize>
            {({ width, height=300, config, ...props }) =>
                <XYChart width={width}  height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                    <AnimatedAxis orientation="right" />
                    <AnimatedGrid columns={false} rows={false} numTicks={2} />
                    <AnimatedLineSeries dataKey={type.display} data={data} {...accessors} />
                    <Tooltip
                        snapTooltipToDatumX
                        showVerticalCrosshair
                        showSeriesGlyphs
                        renderTooltip={({ tooltipData, colorScale }) => {
                            return (
                            <div key={tooltipData.nearestDatum.datum.id}>
                                 <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                                    {tooltipData.nearestDatum.key}
                                </div>
                                <div>Time: {accessors.time(tooltipData.nearestDatum.datum)}</div>
                                <div>Score: {accessors.score(tooltipData.nearestDatum.datum)}</div>
                                <div>Percent: {accessors.yAccessor(tooltipData.nearestDatum.datum)}%</div>
                            </div>
                        )}}
                    />
                </XYChart>
            }
        </ParentSize>
    );
}

export default Chart

function formatData(data, type){
    return data.map(({  home_points, away_points,id, period, clock, ...props }, i) => {
        const dataType = props[type]
        return(
            { period, clock, x: i, y: Math.round(dataType*100, 2), score: `${home_points} - ${away_points},`, id}
    )})
}

