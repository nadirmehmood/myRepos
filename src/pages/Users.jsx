import React, { useEffect, useState } from "react";
import "../components/Home.css";
import { IconContext } from "react-icons";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import CrudModal from "./CrudModal";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Users = (props) => {
  const [userData, setUserData] = useState([]);

  const [users, setUsers] = useState([]);

  const [modalState, setModalState] = useState({
    addUser: false,
  });

  const getDataArray = async () => {
    const response = await axios.get("http://localhost:3001/data");
    setUserData(response.data);
  };

  const updateStatus = async () => {
    for (let i = 0; i < userData.length; i++) {
      await axios.put(
        `http://localhost:3001/data/${userData[i].id}`,
        userData[i]
      );
    }
    getDataArray();
  };

  const usersArray = async () => {
    const userAdmin = await JSON.parse(sessionStorage.getItem("data"));
    let dd = [];
    dd.push(userAdmin);
    setUsers(dd);
  };

  useEffect(() => {
    setModalState(false);
    getDataArray();
    usersArray();
  }, []);

  const handleModal = (modalType) => {
    if (modalType === "addUser") {
      setModalState({
        addUser: true,
      });
    }
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:3001/data/${id}`);
    getDataArray();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <Button type="button" onClick={() => handleModal("addUser")}>
          Add User
        </Button>
        <Table hover variant="light">
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="row">Id</th>
              <th scope="row">Name</th>
              <th scope="row">Status</th>
              <th scope="row">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) =>
              users.map((item) => (item.role === "admin" ? true : false)) ? (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <select
                      name="status"
                      value={item.status}
                      className="select-users"
                      onChange={(e) => {
                        userData[index].status = e.target.value;
                        setUserData([...userData]);
                      }}
                    >
                      <option value="active">active</option>
                      <option value="de-active">de-active</option>
                    </select>
                  </td>

                  <td>
                    <Button onClick={updateStatus} variant="white">
                      <AiFillEdit color="royalblue" size={30}></AiFillEdit>
                    </Button>

                    <Button onClick={() => removeItem(item.id)} variant="white">
                      <AiFillDelete color="red" size={30}></AiFillDelete>
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
        {modalState && (
          <CrudModal
            modalState={modalState}
            handleClose={() => setModalState(false)}
            getDataArray={getDataArray}
          />
        )}
      </IconContext.Provider>
    </>
  );
};

export default Users;
