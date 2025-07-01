import React, { useState } from "react";
import StepKeywordInput from "./StepKeywordInput";
import KeywordStep2 from "./KeywordStep2";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix"; 
import StepSeven from "./StepSeven";

const SmartWriterFlow = () => {
  const [step, setStep] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("Vietnamese");
  const [keywordOption, setKeywordOption] = useState("");
  const [title, setTitle] = useState("");
  const [dataOption, setDataOption] = useState("");
  const [semanticOption, setSemanticOption] = useState(""); 
const [postData, setPostData] = useState(null);

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = (selectedOption) => {
    setKeywordOption(selectedOption);
    setStep(3);
  };

  const handleStep3Next = (outlineData) => {
    setStep(4);
  };

  const handleStep4Next = (selectedTitle) => {
    setTitle(selectedTitle);
    setStep(5);
  };

  const handleStep5Next = (selectedDataOption) => {
    setDataOption(selectedDataOption);
    setStep(6); // ✅ Move to Step 6
  };

  const handleStep6Next = (selectedSemanticOption) => {
    setSemanticOption(selectedSemanticOption);
    console.log("Semantic Option:", selectedSemanticOption);
    setStep(7); // Uncomment if more steps
  };

  const handleStep7WritePost = (data) => {
  setPostData(data);
  console.log("Post Data:", data);
  // Bạn có thể xử lý gửi dữ liệu lên server ở đây
};


  return (
    <>
      {step === 1 && (
        <StepKeywordInput
          keyword={keyword}
          setKeyword={setKeyword}
          language={language}
          setLanguage={setLanguage}
          onNext={handleStep1Next}
        />
      )}

      {step === 2 && (
        <KeywordStep2 mainKeyword={keyword} onNextStep={handleStep2Next} />
      )}

      {step === 3 && (
        <StepThree
          keyword={keyword}
          keywordOption={keywordOption}
          onNextStep={handleStep3Next}
        />
      )}

      {step === 4 && (
        <StepFour keyword={keyword} onNext={handleStep4Next} />
      )}

      {step === 5 && (
        <StepFive keyword={keyword} onNext={handleStep5Next} />
      )}

      {step === 6 && (
        <StepSix keyword={keyword} onNext={handleStep6Next} />
      )}

      {step === 7 && (
  <StepSeven keyword={keyword} onWritePost={handleStep7WritePost} />
)}

    </>
  );
};

export default SmartWriterFlow;
