import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const OrganisationList = () => {
  const [data, setData] = useState([]);
  const [OrgCount, setCount] = useState(0);
  //find organisation list records
  const organisations = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      // console.log(data);
      if (data?.success) {
        setCount(data?.orgData.length);
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      let response = window.prompt(`Are you "Sure" want to delete this organisation record`, "Sure");
      if(!response) return;
      await API.delete(`/admin/delete-user/${userId}`);
      alert("Organisation record deleted successfully");
      window.location.reload();
      // navigate("/hospital-list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    organisations();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3>
          Total Number of Organisations = <b>{OrgCount}</b>
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
              <td>{record.organisationName}</td>
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

export default OrganisationList;
