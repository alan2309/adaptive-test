import React from "react";
import { ChartAxis, ChartBullet } from "@patternfly/react-charts";

function BulletChartSection({ score = 30 }) {
  return (
    <div style={{ height: "120px", width: "100%" }}>
      <ChartBullet
        axisComponent={
          <ChartAxis
            tickValues={[0, 25, 50, 75, 100]}
            tickFormat={(val) => {
              switch (val) {
                case 0:
                  return "Need training";
                case 50:
                  return "Need practise";
                case 75:
                  return "Good to go";
              }
            }}
          />
        }
        constrainToVisibleArea
        height={150}
        labels={({ datum }) => `${datum.name}`}
        maxDomain={{ y: 100 }}
        primarySegmentedMeasureData={[{ name: "Measure", y: score }]}
        qualitativeRangeData={[
          { name: "Need training", y: 50 },
          { name: "Need practise", y: 75 },
          { name: "Good to go", y: 100 },
        ]}
        width={800}
      />
    </div>
  );
}
export default BulletChartSection;
