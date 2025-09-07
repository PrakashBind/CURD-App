import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/students")
  //     .then((response) => {
  //       setStudents(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);
  function getData() {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  const handlePrint = () => {
    window.print();
  };

  function deleteData(id) {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/students/" + id)
        .then((response) => {
          console.log("responce ", response);
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Print Styles */}
      <style>
        {`
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      /* Hide Actions column */
      th:nth-child(5),
      td:nth-child(5) {
        display: none !important;
      }

      /* Print button hide */
      button[onclick*="window.print"] {
        display: none;
      }
      .addNew {
        display: none;
      }
    }
  `}
      </style>

      <h2
        style={{
          width: "100%",
          backgroundColor: "#2d6a4f",
          color: "white",
          padding: "15px",
          textAlign: "center",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        👥 Students Management
        {/* <button
          onClick={handlePrint}
          style={{
            marginLeft: "20px",
            padding: "8px 16px",
            backgroundColor: "darkblue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Print
        </button> */}
      </h2>
      <div
        className="addNew"
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          // background: "#ffffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/create" style={{ width: "40%" }}>
          <button
            style={{
              ...btnStyle,
              background: "#2a9d8f",
              fontSize: "20px",
              width: "100%",
              border: "2px solid black",
            }}
          >
            ➕ Add New Students
          </button>
        </Link>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Loading students...</p>
      ) : students.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#40916c", color: "white" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                  }}
                >
                  <td style={tdStyle}>{student.id}</td>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.email}</td>
                  <td style={tdStyle}>{student.address}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <Link to={`/read/${student.id}`}>
                      <button style={{ ...btnStyle, background: "#f4a261" }}>
                        🔍 Read
                      </button>
                    </Link>
                    <Link to={`/update/${student.id}`}>
                      <button style={{ ...btnStyle, background: "#457b9d" }}>
                        ✏️ Update
                      </button>
                    </Link>
                    <Link>
                      <button
                        style={{ ...btnStyle, background: "#e63946" }}
                        onClick={() => deleteData(student.id)}
                      >
                        🗑 Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          😕 No students found. Please add some users.
        </p>
      )}
    </div>
  );
};

// Reusable styles
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const btnStyle = {
  margin: "2px",
  padding: "6px 10px",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
};

export default Home;
