import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faX,
  faPlus,
  faUser,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tooth = () => {
  const port = import.meta.env.VITE_PORT_SPRING;
  const [Professors, setProfessors] = useState([]);
  const [Professor, setProfessor] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [id, setId] = useState(null);
  const url = `http://localhost:8020/api/teeth`;

  const fetchProfessor = async () => {
    setLoading(true);
    try {
      const rep = await axios.get(url + "/all");
      setProfessors(rep.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessor();
  }, []);

  const handleProfessor = (e) => {
    setProfessor({ ...Professor, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setProfessor({
      id: "",
      name: "",
    });
  };

  const addProfessor = async () => {
    const professorData = {
      name: Professor.name,
    };

    try {
      await axios.post(url + "/add", professorData);
      notify("added");
      reset();
      fetchProfessor();
    } catch (error) {
      console.error("Error adding Professor:", error);
    }
  };

  const updateProfessor = async () => {
    try {
      await axios.put(`${url}/update/${Professor.id}`, Professor);
      reset();
      fetchProfessor();
      notify("updated");
    } catch (error) {
      console.error("Error updating Professor:", error);
    }
  };

  const deleteProfessor = async () => {
    try {
      await axios.delete(`${url}/delete/${id}`);
      fetchProfessor();
      notify("deleted");
      closeModal();
    } catch (error) {
      console.error("Error deleting Professor:", error);
    }
  };

  const [modal, setModal] = useState(false);

  const showModal = (stuid) => {
    setId(stuid);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const handleUpdate = (id) => {
    // Fetch the professor details by ID
    const selectedProfessor = Professors.find((professor) => professor.id === id);
  
    // Set the update mode and populate the Professor state
    setUpdateMode(true);
    setProfessor({
      id: selectedProfessor.id,
      name: selectedProfessor.name,
    });
  };
  

  const notify = (op) =>
    toast.success(`Professor ${op} successfully`, {
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
      <div className="flex flex-col ml-[90px] items-center w-5/6 ">
        <p className=" m-12 text-4xl font-bold bg-white w-full py-4 pl-12 rounded-xl text-black-500 shadow-xl  ">
          <span>
            <FontAwesomeIcon className="mr-4" icon={faTooth} />
          </span>
          Tooth Interface
        </p>
        <div className="flex flex-col w-2/3 m-4 bg-white p-5 rounded-xl justify-center items-center shadow-xl">
          <span className="flex items-center justify-center w-11/12">
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@name"
              name="name"
              value={Professor.name}
              onChange={handleProfessor}
            />
          </span>

          {!updateMode ? (
            <button className="w-1/4 ml-10" onClick={addProfessor}>
              <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-black hover:bg-gray-600">
                <FontAwesomeIcon icon={faPlus} beat className="mr-4" />
                <p className="text-lg font-semibold">Add</p>
              </div>
            </button>
          ) : (
            <button className="w-1/4 ml-10" onClick={updateProfessor}>
              <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-black hover:bg-gray-600">
                <FontAwesomeIcon icon={faPen} beat className="mr-4" />
                <p className="text-lg font-semibold">Update</p>
              </div>
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-5 w-full m-8">
          {loading ? (
            <p>Loading data</p>
          ) : (
            Professors &&
            Professors.map((Professor, index) => (
              <div className="flex flex-col rounded-xl  p-3 bg-white border border-black-300 border-opacity-70">
                <span className="flex border-b border-black-500 border-opacity-60 w-full mb-2 items-center pb-2">
                  <p className="text-gray-800 font-semibold text-lg mr-3">
                    {Professor.name}
                  </p>
                </span>

                <span className="flex p-1 w-full items-center">
                  <span className="w-2/12 text-center mx-2">
                    <p className="py-4 bg-black rounded-full text-white text-xl font-body">
                      {Professor.name ? Professor.name[0].toUpperCase() : ""}
                    </p>
                  </span>

                  <span className="flex flex-col w-9/12 text-sm ml-2">
                    <span className="flex w-full items-center">
                      <span className="flex w-full items-center py-1">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 text-black"
                        />
                        <p>{Professor.name || "null name"}</p>
                      </span>
                    </span>
                  </span>

                  <span className="flex flex-col w-1/12 ">
                    <button onClick={() => handleUpdate(Professor.id)}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-gray-300 mb-8 hover:text-green-500 hover:scale-125"
                      />
                    </button>
                    <button onClick={() => showModal(Professor.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-300 hover:text-red-500 hover:scale-125"
                      />
                    </button>
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
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
          Do you want to delete this Professor ?
        </p>
        <div className="flex justify-center mb-10 ">
          <button
            onClick={closeModal}
            className="text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteProfessor}
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

export default Tooth;
