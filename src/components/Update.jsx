// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Update = () => {
//   const [student, setStudent] = useState();
//   const [loading, setLoading] = useState(true);
//   const [updateData, setUpdateData] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/students/" + id)
//       .then((response) => {
//         setStudent(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (!student) {
//     return <h2>No student found</h2>;
//   }

//   function updateData() {
//     // axios.put("http://localhost:3000/students/" + id);

//   }

//   return (
//     <div className="read-container">
//       <h1 className="title">Update Student details (ID: {id})</h1>
//       <div className="card">
//         <p>
//           <strong>Name:</strong>{" "}
//           <input
//             type="text"
//             placeholder={student?.name}
//             value={updateData.name}
//           />
//         </p>
//         <p>
//           <strong>Email:</strong>{" "}
//           <input
//             type="text"
//             placeholder={student?.email}
//             value={updateData.email}
//           />
//         </p>
//         <p>
//           <strong>Address:</strong>{" "}
//           <input
//             type="text"
//             placeholder={student?.address}
//             value={updateData.address}
//           />
//         </p>
//         <div className="button">
//           <button
//             onClick={() => {
//               updateData();
//             }}
//           >
//             Update details
//           </button>
//         </div>
//       </div>

//       {/* ✅ CSS directly yahi likh diya */}
//       <style>
//         {`
//           .read-container {
//             max-width: 600px;
//             margin: 20px auto;
//             padding: 20px;
//             font-family: Arial, sans-serif;
//           }

//           .title {
//             text-align: center;
//             margin-bottom: 20px;
//             color: #333;
//           }

//           .card {
//             background: #f9f9f9;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//           }

//           .card p {
//             font-size: 16px;
//             margin: 10px 0;
//           }

//           strong {
//             color: #007bff;
//           }

//           input {
//             width: 50%;
//             padding: 4px 5px;
//           }

//           .button {
//             width: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           /* ✅ Responsive */
//           @media (max-width: 768px) {
//             .read-container {
//               padding: 10px;
//             }
//             .card {
//               padding: 15px;
//             }
//             .card p {
//               font-size: 14px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Update;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/students/" + id)
      .then((response) => {
        setStudent(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/students/" + id, formData)
      .then(() => {
        alert("Student updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  if (loading) return <h2>Loading...</h2>;
  if (!student) return <h2>No student found</h2>;

  return (
    <div className="read-container">
      <h1 className="title">Update Student details (ID: {id})</h1>
      <div className="card">
        <p>
          <strong>Name:</strong>{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <strong>Address:</strong>{" "}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </p>
        <div className="button">
          <button onClick={handleUpdate}>Update details</button>
        </div>
      </div>

      {/* ✅ CSS */}
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

export default Update;
