import React, { useEffect, useState } from "react";
import ResultTableStudent, { type Result } from "../component/Student/Result";

// Simulated data source
const allResults: Result[] = [
  { studentName: "John Doe", reg_number: "2021CS101", class: "III-CS", mark: "85", taskTitle: "Test" },
  { studentName: "John Doe", reg_number: "2021CS101", class: "III-CS", mark: "90", taskTitle: "Assignment" },
];

const StudentResultPage: React.FC = () => {
  const [studentResults, setStudentResults] = useState<Result[]>([]);

  useEffect(() => {
    const studentName = "John Doe"; // simulate login user
    const filtered = allResults.filter((r) => r.studentName === studentName);
    setStudentResults(filtered);
  }, []);

  return (
    <div className="p-6">
      <ResultTableStudent data={studentResults} />
    </div>
  );
};

export default StudentResultPage;
