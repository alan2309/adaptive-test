function SampleCSVFormat() {
  const CSVDownloadheaders = [
    { label: "Question", key: "Question" },
    { label: "Type", key: "Type" },
    { label: "CorrectOption", key: "CorrectOption" },
    { label: "Option1", key: "Option1" },
    { label: "Option2", key: "Option2" },
  ];

  const CSVDownloadData = [
    {
      Question: "Question-1",
      Type: 1,
      CorrectOption: 1,
      Option1: "This is right option",
      Option2: "This is wrong option",
    },
    {
      Question: "Question-2",
      Type: 2,
      CorrectOption: 2,
      Option1: "This is wrong option",
      Option2: "This is right option",
    },
    {
      Question: "Question-3",
      Type: 3,
      CorrectOption: 1,
      Option1: "This is right option",
      Option2: "This is wrong option",
    },
  ];

  return { header: CSVDownloadheaders, data: CSVDownloadData };
}
export default SampleCSVFormat;
