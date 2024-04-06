import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4 p-5">
          <h1>
            Welcome admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank Record</h3>
          <hr />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            sapiente itaque quos cumque, officiis assumenda consequatur aut ad
            dolorem quia recusandae labore, aperiam facilis. Quo, tempore, optio
            excepturi doloremque maxime aliquid eius ut libero, totam omnis
            ducimus soluta commodi quae nemo dolor consectetur quam animi
            accusantium similique dicta vitae adipisci praesentium fugit! Quae
            quo architecto, consectetur repudiandae magni pariatur porro, dicta
            voluptatem nulla in at quasi repellendus obcaecati, nisi error fugit
            minus dolore est. Animi vitae quis, qui explicabo reprehenderit
            libero repellendus accusantium veniam culpa expedita maxime vero
            amet magni eveniet fuga. Nam excepturi nisi tempora necessitatibus
            mollitia dolorum.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
