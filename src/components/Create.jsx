import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/students").then((res) => {
      if (res.data.length > 0) {
        const lastId = res.data[res.data.length - 1].id;
        setFormData((prev) => ({ ...prev, id: Number(lastId) + 1 }));
      } else {
        setFormData((prev) => ({ ...prev, id: 1 }));
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:3000/students/", formData)
      .then(() => {
        alert("Student post successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="read-container">
      <h1 className="title">Create New Student</h1>
      <div className="card">
        <p>
          <strong>Name:</strong>{" "}
          <input type="text" name="name" onChange={handleChange} />
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <input type="text" name="email" onChange={handleChange} />
        </p>
        <p>
          <strong>Address:</strong>{" "}
          <input type="text" name="address" onChange={handleChange} />
        </p>
        <div className="button">
          <button onClick={handleCreate}>Update details</button>
        </div>
      </div>

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
          
          input {
            width: 50%;
            padding: 4px 5px;
          }

          .button {
            width: 100%;
            display: flex;
            align-items: center;  
            justify-content: center;  
          }

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

export default Create;
