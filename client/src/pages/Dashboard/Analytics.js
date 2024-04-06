import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [OrgCount, setCount] = useState(0);
  const [orgData, setOrgData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    if (user?.role !== "donar" && user?.role !== "hospital") {
      getBloodGroupData();
    } else {
      alert("You are not authorized to this page");
      navigate("/organisation");
    }
  }, []);

  return (
    <div className="analytics-page">
      <Header />
      {user?.role === "donar" ||
        (user?.role === "hospital" && (
          <div className="container">
            <h1>Only Organisation can access this page</h1>
          </div>
        ))}
      {user?.role === "organisation" && (
        <div
          className="d-flex flex-row flex-wrap"
          style={{ justifyContent: "center" }}
        >
          {data?.map((record, i) => (
            <div
              className="card m-3 p-1"
              key={i}
              style={{ width: "18rem", backgroundColor: `#FFC26F` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center" style={{border: "2px solid black", borderRadius:"1rem"}}>
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.availableBlood}</b> (ML)
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
