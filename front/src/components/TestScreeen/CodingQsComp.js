import React from "react";

function CodingQsComp({ qs }) {
  return (
    <div
      className="scrollbar"
      id="style-4"
      style={{ backgroundColor: "white", height: "480px" }}
    >
      {qs !== undefined && (
        <>
          {qs.question}
          <h5>
            <b>Input Format</b>
          </h5>
          {qs.input_format}
          <h5>
            <b>Output Format</b>
          </h5>
          {qs.output_format}
          <h5>
            <b>Constraints</b>
          </h5>
          {qs.constraints}
          <h5>
            <b>Sample Input 1 </b>
          </h5>
          <textarea
            defaultValue={qs.sample_input_1}
            style={{ height: "fit-content" }}
            disabled
          ></textarea>
          <h5>
            <b>Sample Output 1 </b>
          </h5>
          <textarea
            defaultValue={qs.sample_output_1}
            style={{ height: "fit-content" }}
            disabled
          ></textarea>
          <h5>
            <b>Explanation</b>
          </h5>
          {qs.explanation !== undefined &&
            qs.explanation.map((expl, index) => {
              return (
                <>
                  <h6>
                    <b>Test Case {index + 1}:</b>
                  </h6>
                  {expl}
                </>
              );
            })}
        </>
      )}
    </div>
  );
}

export default CodingQsComp;
