/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class PieChart extends Component {
    render() {
        const options = {
            backgroundColor: "transparent",
            animationEnabled: false,
            // title: {
            //     text: "Blidning "
            // },
            subtitles: [{
                // text: "Blinding Lights",
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: false
            }],
            data: [{
                type: "doughnut",
                // showInLegend: true,
                indexLabel: "{name}: {y}",
                indexLabelFontSize: 26,
                yValueFormatString: "#,###'%'",
                dataPoints: [
                    { name: "Lit", y: 5 },
                    { name: "Silly and Goofy", y: 31 },
                    { name: "Amazing", y: 40 },
                    { name: "Cool", y: 17 },
                    { name: "Code Jam", y: 7 }
                ]
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div >
        );
    }
}
export default PieChart