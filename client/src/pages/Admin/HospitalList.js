import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [hospitalCount, setCount] = useState(0);
  //find hospital list records
  const hospitals = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      // console.log(data);
      if (data?.success) {
        setCount(data?.hospitalData.length);
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      let response = window.prompt(`Are you "Sure" want to delete this Hospital record`, "Sure");
      if(!response) return;
      await API.delete(`/admin/delete-user/${userId}`);
      alert("Hospital record deleted successfully");
      window.location.reload();
      // navigate("/hospital-list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hospitals();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3>
          Total Number of Hospitals = <b>{hospitalCount}</b>
        </h3>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>
                <div
                  className="btn btn-danger"
                  onClick={() => deleteUser(record._id)}
                >
                  DELETE
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HospitalList;
