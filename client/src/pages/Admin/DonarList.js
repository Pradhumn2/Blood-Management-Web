import { React, useState, useEffect } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import API from "../../services/API";
// import { useNavigate } from 'react-router-dom';

const DonarList = () => {
  const [data, setData] = useState([]);
  const [donarCount, setCount] = useState(0);
  // const navigate = useNavigate();
  //find donar list records
  const donars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      // console.log(data);
      if (data?.success) {
        setCount(data?.donarData.length);
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async(userId) => {
    try {
      let response = window.prompt(`Are you "Sure" want to delete this donar`, "Sure");
      if(!response) return;
      console.log("res is ", response);
      await API.delete(`/admin/delete-user/${userId}`);
      alert("Donar deleted successfully");
      window.location.reload();
      // navigate("/hospital-list");      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    donars();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3>Total Number of Donars = <b>{donarCount}</b></h3>
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
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td><div className="btn btn-danger" onClick={() => deleteUser(record._id)} >DELETE</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DonarList;
