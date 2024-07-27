const fs = require("fs");
const path = require("path");
const apiKey = "ALOC-e8c3b74c5bf3ae4d69a4";

const createExam = (res, receivedExamData) => {
  const examPaper = { examInfo: receivedExamData, questions: [] };
  const subjectsList = Object.values(receivedExamData.subjects);

  // Read the JSON file
  const filePath = path.join(__dirname, "examPaperJamb.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      res.status(500).json({ message: "Error reading file" });
    } else {
      try {
        const examPaper = JSON.parse(data);
        res.status(200).json(examPaper);
      } catch (parseErr) {
        console.error("Error parsing JSON", parseErr);
        res.status(500).json({ message: "Error parsing JSON" });
      }
    }
  });

  // getAllQuestions()
  //   .then(() => {
  //     res.status(200).json(examPaper);
  //     console.log(examPaper);

  //     // STARTS
  //     // Define the file path

  //     // Write the examPaper data to a JSON file
  //     const filePath = path.join(__dirname, "examPaperJamb.json");
  //     fs.writeFile(filePath, JSON.stringify(examPaper, null, 2), (err) => {
  //       if (err) {
  //         console.error("Error writing file", err);
  //       } else {
  //         console.log("File written successfully");
  //       }
  //     });

  //     // ENDS
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "There was a problem with the fetch operation to get questions in - 'createExam service': ",
  //       error
  //     );
  //     if (!res.headersSent) {
  //       res.status(501).json({
  //         errorMessage:
  //           "There was a problem with the fetch operation to get questions in - 'createExam service':",
  //         error,
  //       });
  //     }
  //   });

  // async function getAllQuestions() {
  //   try {
  //     switch (receivedExamData.examType) {
  //       case "JAMB":
  //         for (const subject of subjectsList) {
  //           await populateQuestions(subject, receivedExamData.examYear);
  //         }
  //         break;
  //       case "WAEC":
  //         for (let i = 0; i < 2; i++) {
  //           await populateQuestions(subjectsList[0], receivedExamData.examYear);
  //         }
  //         break;
  //       case "A-LEVEL":
  //         console.log("exam not available");
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     throw new Error(
  //       "There was a problem with the fetch operation to get questions in - 'createExam service': " +
  //         error.message
  //     );
  //   }
  // }

  // async function populateQuestions(subject, year) {
  //   const response = await fetch(
  //     `https://questions.aloc.com.ng/api/v2/q/20?subject=${subject}&year=${year}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         AccessToken: `${apiKey}`,
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     throw new Error(
  //       "error occurred when fetching questions in - 'createExam service'"
  //     );
  //   }
  //   const data = await response.json();
  //   examPaper.questions.push(data);
  // }
};

module.exports = createExam;
