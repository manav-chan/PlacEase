// StudentDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './StudentDetails.css'; // Import CSS file

function StudentDetails() {
  const { rollNumber } = useParams(); // Extract rollNumber from URL params
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student details based on rollNumber
    db.collection('students')
      .doc(rollNumber)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStudent(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [rollNumber]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-details-container">
      <h1>Student Details</h1>
      <div className="student-details-item">
        <strong>Name:</strong> {student.name}
      </div>
      <div className="student-details-item">
        <strong>Roll Number:</strong> {student.rollNumber}
      </div>
      <div className="student-details-item">
        <strong>Semester:</strong> {student.semester}
      </div>
      <div className="student-details-item">
        <strong>CGPA:</strong> {student.cgpa}
      </div>
      <div className="student-details-item">
        <strong>Specialization:</strong> {student.specialization}
      </div>
      <div className="student-details-item">
        <strong>Official email id:</strong> {student.email}
      </div>
      
    </div>
  );
}

export default StudentDetails;
