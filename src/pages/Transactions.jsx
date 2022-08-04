import React, { useEffect, useState } from "react";
import "../components/Home.css";
import { IconContext } from "react-icons";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import CrudModal from "./CrudModal";

const Transactions = () => {
  const [modalState, setModalState] = useState({
    addTransaction: false,
  });

  const [transactionsData, setTransactionsData] = useState([]);

  const [users, setUsers] = useState([]);

  const getTransactionArray = async () => {
    const response = await axios.get("http://localhost:3001/transactions");
    setTransactionsData(response.data);
  };

  const updateTransaction = async () => {
    for (let i = 0; i < transactionsData.length; i++) {
      await axios.put(
        `http://localhost:3001/transactions/${transactionsData[i].id}`,
        transactionsData[i]
      );
    }
    getTransactionArray();
  };

  const usersArray = async () => {
    const userAdmin = await JSON.parse(sessionStorage.getItem("data"));
    let dd = [];
    dd.push(userAdmin);
    setUsers(dd);
  };

  useEffect(() => {
    setModalState(false);
    getTransactionArray();
    usersArray();
  }, []);

  const handleModal = (modalType) => {
    if (modalType === "addTransaction") {
      setModalState({
        addTransaction: true,
      });
    }
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:3001/transactions/${id}`);
    getTransactionArray();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "red" }}>
        <Button type="button" onClick={() => handleModal("addTransaction")}>
          Add Transaction
        </Button>
        <Table hover variant="light">
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="row">Id</th>
              <th scope="row">Account No</th>
              <th scope="row">IBAN</th>
              <th scope="row">Account Title</th>
              <th scope="row">Account Type</th>
              <th scope="row">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((item, index) =>
              users.map((item) => (item.role === "admin" ? true : false)) ? (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.accountNo}</td>
                  <td>
                    <input
                      type="text"
                      name="iban"
                      value={item.iban}
                      className="select-users"
                      onChange={(e) => {
                        transactionsData[index].iban = e.target.value;
                        setTransactionsData([...transactionsData]);
                      }}
                    />
                  </td>
                  <td>{item.accountTitle}</td>
                  <td>
                    <select
                      name="accountType"
                      value={item.accountType}
                      className="select-users"
                      onChange={(e) => {
                        transactionsData[index].accountType = e.target.value;
                        setTransactionsData([...transactionsData]);
                      }}
                    >
                      <option>select account type</option>
                      <option value="saving">Saving</option>
                      <option value="current">Current</option>
                    </select>
                  </td>
                  <td>
                    <Button onClick={updateTransaction} variant="white">
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
            getTransactionArray={getTransactionArray}
          />
        )}
      </IconContext.Provider>
    </>
  );
};

export default Transactions;
