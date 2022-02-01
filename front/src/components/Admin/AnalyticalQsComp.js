import React, { useEffect, useState } from "react";
import AnalyticalOptComp from "../../components/Admin/AnalyticalOptComp";

function AnalyticalQsComp({
  para_qs,
  currentQsID,
  isUpdate,
  addOptInSubQs,
  delOptInSubQs,
  set_rerenderState,
  rerenderState,
}) {
  useEffect(() => {
    set_rerenderState(false);
  }, [rerenderState]);
  return (
    <>
      {para_qs !== undefined &&
        para_qs.map((ques, index) => {
          return (
            <AnalyticalOptComp
              ques={ques}
              index={index}
              currentQsID={currentQsID}
              isUpdate={isUpdate}
              addOptInSubQs={addOptInSubQs}
              delOptInSubQs={delOptInSubQs}
              set_rerenderState={set_rerenderState}
              rerenderState={rerenderState}
            ></AnalyticalOptComp>
          );
        })}
    </>
  );
}

export default AnalyticalQsComp;
