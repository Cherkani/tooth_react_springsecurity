import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SidebarAdmin from "./SidebarAdmin";

const Groupe = () => {
  const [Groupes, setGroupes] = useState([]);
  const [Groupe, setGroupe] = useState({
    id: "",
    code: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const url = "http://localhost:8020/api/v1/groupes";

  const fetshGroupes = async () => {
    setLoading(true);
    const rep = await axios.get(url);
    setGroupes(rep.data);
    setLoading(false);
  };
  useEffect(() => {
    fetshGroupes();
  }, []);

  const handleGroupe = (e) => {
    setGroupe({ ...Groupe, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id, code, year) => {
    setUpdateMode(true);
    setGroupe({ id: id, code: code, year: year });
  };

  const addGroupe = async () => {
    try {
      const rep = await axios.post(url, Groupe);
      fetshGroupes();
      setGroupe({
        id: "",
        code: "",
        year: "",
      });
      notify("added");
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroupe = async () => {
    try {
      const rep = await axios.put(`${url}/${Groupe.id}`, Groupe);
      fetshGroupes();
      setGroupe({
        id: "",
        code: "",
        year: "",
      });
      setUpdateMode(false);
      notify("updated");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteGroupe = async () => {
    try {
      const rep = await axios.delete(`${url}/${id}`);
      fetshGroupes();
      setGroupe({
        id: "",
        code: "",
        year: "",
      });
      setUpdateMode(false);
      closeModal();
      notify("deleted");
    } catch (error) {
      console.log(error);
    }
  };
  /////////////////////modal toastify
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);

  const showModal = (id) => {
    setId(id);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const notify = (op) =>
    toast.success(`Groupe ${op} successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="flex">
      <SidebarAdmin name={"g"} />
      <div className="flex flex-col items-center w-5/6 ml-[90px]">
        <p className=" m-12 text-4xl font-bold bg-white w-full py-4 pl-12 rounded-xl text-black shadow-xl  ">
          Groups management
        </p>
        <div className="flex w-1/2 m-4 bg-white p-5 rounded-xl justify-center  shadow-xl">
          <input
            className="flex text-gray-700 outline-none border-gray-300 border py-1 pl-4 rounded-xl focus:ring-1 w-2/4"
            placeholder="Enter Groupe code"
            name="code"
            onChange={handleGroupe}
            value={Groupe.code}
          />{" "}
          <input
            className="flex text-gray-700 outline-none border-gray-300 border py-1 pl-4 rounded-xl focus:ring-1 w-2/4"
            placeholder="Enter Groupe year"
            name="year"
            onChange={handleGroupe}
            value={Groupe.year}
          />
          {!updateMode ? (
            <button className="w-1/4 ml-10" onClick={addGroupe}>
              <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-black hover:bg-gray-600">
                <FontAwesomeIcon icon={faPlus} beat className="mr-4" />
                <p className="text-lg font-semibold">Add</p>
              </div>
            </button>
          ) : (
            <button className="w-1/4 ml-10" onClick={updateGroupe}>
              <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-black hover:bg-gray-600">
                <FontAwesomeIcon icon={faPen} beat className="mr-4" />
                <p className="text-lg font-semibold">Update</p>
              </div>
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading data</p>
        ) : (
          <div className="flex flex-col p-10 w-1/2  shadow-xl justify-center items-center rounded-xl bg-white">
            <div className="flex flex-col w-full">
              <div className="flex items-center w-full font-semibold text-white text-lg rounded-t-md border-b bg-black py-3 ">
                <p className="text-center w-1/2">Id</p>
                <p className="text-center w-1/2">Code</p>
                <p className="text-center w-1/2">Year</p>
                <p className="text-center w-1/2">Action</p>
              </div>
              {Groupes.map((Groupe, index) => (
                <div className="flex items-center w-full text-lg text-gray-700 bg-gray-50 border-b py-3">
                  <p className="text-center w-1/3">{Groupe.id}</p>
                  <p className="text-center w-1/3">{Groupe.code}</p>
                  <p className="text-center w-1/3">{Groupe.year}</p>
                  <div className="flex justify-center w-1/3">
                    <button
                      onClick={() =>
                        handleUpdate(Groupe.id, Groupe.code, Groupe.year)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        className="mr-4 hover:text-indigo-500 hover:scale-125"
                      />
                    </button>
                    <button onClick={() => showModal(Groupe.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mr-4 hover:text-red-500 hover:scale-125"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        className="flex flex-col  bg-white w-1/4 mx-auto mt-48 rounded-md shadow border-2"
      >
        <button
          className="flex items-center justify-end mt-3 mr-3"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <p className="text-center text-2xl font-bold mt-10 mb-8 ">
          Do you want to delete this Groupe ?
        </p>
        <div className="flex justify-center mb-10 ">
          <button
            onClick={closeModal}
            className="text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteGroupe}
            className="text-lg mx-2 font-semibold py-2 px-5 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Groupe;
