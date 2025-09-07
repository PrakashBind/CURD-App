import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/students/" + id)
      .then((response) => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!student) {
    return <h2>No student found</h2>;
  }

  return (
    <div className="read-container">
      <h1 className="title">Student details (ID: {id})</h1>
      <div className="card">
        <p>
          <strong>Name:</strong> {student?.name}
        </p>
        <p>
          <strong>Email:</strong> {student?.email}
        </p>
        <p>
          <strong>Address:</strong> {student?.address}
        </p>

        <div className="button">
          <Link to={"/"}>
            <button>back</button>
          </Link>
        </div>
      </div>

      {/* ✅ CSS directly yahi likh diya */}
      <style>
        {`
          .read-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .title {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .card p {
            font-size: 16px;
            margin: 10px 0;
          }

          strong {
            color: #007bff;
          }

          .button {
            width: 100%;
            display: flex;
            align-items: center;  
            justify-content: center;  
          }

          .button button {
            padding: 4px 15px;
          }

          /* ✅ Responsive */
          @media (max-width: 768px) {
            .read-container {
              padding: 10px;
            }
            .card {
              padding: 15px;
            }
            .card p {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Read;
