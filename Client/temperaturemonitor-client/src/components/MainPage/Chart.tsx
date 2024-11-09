import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DateTemperature } from '../../Models/DateTemperature';
import am5index from "@amcharts/amcharts5/index";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { chartColors, getChartColor, getYmax, scaleValues } from '../../ChartHelper';
import { MainPageScope } from './MainPage';


export interface ChartProps {
    temperatures: DateTemperature[]

}

function Chart(props: ChartProps) {

    const [allTemperatures, setAllTemperatures] = useState(props.temperatures);
    const [chartTemperatures, setChartTemperatures] = useState<DateTemperature[]>([]);

    useEffect(() => {
        if (props.temperatures.length > 0) {
            let sclv = scaleValues(props.temperatures, 6);
            setChartTemperatures(sclv);
        }
    }, [props]);

    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);



        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            pinchZoomX: true,
            paddingLeft: 0
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        let colorSet = am5.ColorSet.new(root, {});

        // The data
        let data: any[] = [];
        if (chartTemperatures.length > 0)
            chartTemperatures.forEach((tp, index) => {
                data.push({
                    hour: tp.createdAt.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
                    value: Number.parseFloat(tp.temperature.toFixed(1)),
                    bulletSettings: {
                        fill: getChartColor(tp.temperature)
                    },
                    strokeSettings: {
                        // stroke: getChartColor(index < props.temperatures.length - 1 ? props.temperatures[index + 1].temperature : tp.temperature)
                        stroke: getChartColor(tp.temperature)
                    },
                    fillSettings: {
                        // fill: getChartColor(index < props.temperatures.length - 1 ? props.temperatures[index + 1].temperature : tp.temperature)
                        fill: getChartColor(tp.temperature)

                    }

                })
            });

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 80
        });
        xRenderer.grid.template.set("location", 0.5);
        xRenderer.labels.template.setAll({
            location: 0.5,
            multiLocation: 0.5
        });

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "hour",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(data);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxPrecision: 0,
            max: getYmax(props.temperatures.map(_ => _.temperature)),
            // renderer: am5xy.AxisRendererY.new(root, {})
            renderer: am5xy.AxisRendererY.new(root, {
                ariaValueMax: '50'
            })
        }));

        let series = chart.series.push(am5xy.LineSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "hour",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",
                dy: -5
            })
        }));

        series.strokes.template.setAll({
            templateField: "strokeSettings",
            strokeWidth: 2
        });

        series.fills.template.setAll({
            visible: true,
            fillOpacity: 0.5,
            templateField: "fillSettings"
        });


        // series.bullets.push(function () {
        //     return am5.Bullet.new(root, {
        //         sprite: am5.Circle.new(root, {
        //             templateField: "bulletSettings",
        //             radius: 5
        //         })
        //     });
        // });

        series.bullets.push(function (root, series) {
            return am5.Bullet.new(root, {
                locationY: 0.5,
                stacked: "up",
                sprite: am5.Circle.new(root, {
                    radius: 8,
                    stroke: series.get("fill"),
                    // strokeWidth: 3,
                    templateField: "bulletSettings"
                    // fill: am5.color(0xffffff),
                })
            });
        });


        series.bullets.push(function (root, series) {
            // Bullet container
            var container = am5.Container.new(root, {
                rotation: 0,
            });

            // Circle
            var circle = container.children.push(am5.Container.new(root, {
                centerX: am5.p50,
                centerY: am5.p100,
                dy: -10,
                width: 40,
                height: 40,
                background: am5.RoundedRectangle.new(root, {
                    // stroke: am5.color(0x000000),
                    // strokeOpacity: 1,
                    // strokeWidth: 1,
                    fill: am5.color(0xffffff),
                    fillOpacity: 0.8,
                    cornerRadiusTL: 20,
                    cornerRadiusTR: 20,
                    cornerRadiusBR: 20,
                    cornerRadiusBL: 20,
                })
            }));

            // Label
            circle.children.push(am5.Label.new(root, {
                text: "{valueY}",
                oversizedBehavior: "wrap",
                maxWidth: 40,
                fontSize: 15,
                fontWeight: "bold",
                x: am5.p50,
                centerX: am5.p50,
                y: am5.p50,
                centerY: am5.p50,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                populateText: true
            }));

            // Stem
            // container.children.push(am5.Line.new(root, {
            //     stroke: am5.color(0x000000),
            //     strokeOpacity: 1,
            //     strokeWidth: 1,
            //     points: [
            //         { x: 0, y: 0 },
            //         { x: 0, y: -15 }
            //     ]
            // }));

            return am5.Bullet.new(root, {
                locationY: 0.5,
                stacked: "up",
                sprite: container
            })
        });


        series.data.setAll(data);
        series.appear(1000);

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set("scrollbarX", am5.Scrollbar.new(root, {
        //     orientation: "horizontal",
        //     marginBottom: 20
        // }));

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        return () => {
            root.dispose();
        };
    }, [chartTemperatures]);

    return (
        <div id="chartdiv" style={{ width: "100vw", height: "30vh" }}></div>
    );
}

export default Chart;