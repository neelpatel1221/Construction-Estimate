// Account.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make an API request to get user details
        const userResponse = await axios.get("/api/v1/users/account");
        setUserData(userResponse.data.data.user);

        // Make an API request to get user calculations
        const calculationsResponse = await axios.get(
          "/api/v1/users/calculations"
        );
        setCalculations(calculationsResponse.data.data.userCalculations);
      } catch (error) {
        console.error("Error fetching user data or calculations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDownload = async (calculationId) => {
    try {
      const downloadResponse = await axios.post(
        `/api/v1/users/calculation/download/${calculationId}`,
        null,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([downloadResponse.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "calculation_results.xlsx";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (calculationId) => {
    try {
      const response = await axios.post(
        `/api/v1/users/delete/calculation/${calculationId}`
      );
      setCalculations((prevCalculations) =>
        prevCalculations.filter(
          (calculation) => calculation._id !== calculationId
        )
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("API request failed", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-5">
      <h2 className="text-3xl font-bold mb-4">Account Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <hr className="my-4" />
          <h3 className="text-2xl font-bold mb-2">Calculations</h3>
          {calculations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculations.map((calculation) => (
                <div
                  key={calculation._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Carpet Area:</strong> {calculation.carpetArea}
                  </p>
                  <p>
                    <strong>Cost Per Carpet Area:</strong>{" "}
                    {calculation.costPerCarpetArea}
                  </p>
                  <p>
                    <strong>Total Cost:</strong> {calculation.totalCost}
                  </p>
                  <p>
                    <strong>Calculated At:</strong>{" "}
                    {new Date(calculation.createdAt).toLocaleDateString()}
                  </p>
                  <div className="buttons flex align-center justify-between">
                    <button
                      onClick={() => handleDownload(calculation._id)}
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(calculation._id)}
                      className="mt-4 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No calculations found.</p>
          )}
        </div>
      ) : (
        <p>Error fetching user data.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Account;
