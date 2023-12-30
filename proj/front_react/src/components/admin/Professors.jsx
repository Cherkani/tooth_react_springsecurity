import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faX,
  faPlus,
  faUser,
  faEnvelope,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Professor = () => {
  const port = import.meta.env.VITE_PORT_SPRING;
  const [Professors, setProfessors] = useState([]);
  const [selectedgroups, setSelectedgroups] = useState([]);
  const [Professor, setProfessor] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    grade: "",
    group: [],
  });
  const [groups, setgroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [id, setId] = useState(null);
  const url = `http://localhost:${port}/api/v1/professors`;

  const fetchProfessor = async () => {
    setLoading(true);
    try {
      const rep = await axios.get(url);
      setProfessors(rep.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchfetchgroup = async () => {
    const rep = await axios.get(`http://localhost:${port}/api/v1/groupes`);
    setgroups(rep.data);
  };

  useEffect(() => {
    fetchfetchgroup();
    fetchProfessor();
  }, []);

  const handleProfessor = (e) => {
    setProfessor({ ...Professor, [e.target.name]: e.target.value });
    console.log(Professors);
  };

  const handleGroupsChange = (e) => {
    setSelectedgroups(e.value);
  };

  useEffect(() => {
    addProfessorGroups();
  }, [selectedgroups]);

  const handleUpdate = async (id) => {
    const rep = await axios.get(`${url}/${id}`);
    setProfessor(rep.data);
    setUpdateMode(true);
    setSelectedgroups([]);
  };

  // const handlehandlegroupUpdate = () =>{
  //   Professor.groups.forEach((group) => {
  //     setSelectedgroups((prevgroups) => [...prevgroups, group.id]);
  //   })
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach((checkbox) => {
  //     if(selectedgroups.includes(checkbox.id))
  //     checkbox.checked = true;
  //   });

  // }

  const addProfessorGroups = () => {
    setProfessor({
      ...Professor,
      group: selectedgroups.map((group) => ({
        id: group.id,
        code: group.code,
        year: group.year,
      })),
    });
  };

  const reset = () => {
    setProfessor({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      grade: "",
      group: [],
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedgroups([]);
  };

  const addProfessor = async () => {
    const ProfessorData = {
      firstName: Professor.firstName,
      lastName: Professor.lastName,
      email: Professor.email,
      password: Professor.password,
      grade: Professor.grade,
      group: Professor.group.map((group) => ({
        id: group.id,
        code: group.code,
        year: group.year,
      })),
    };

    try {
      const rep = await axios.post(url, ProfessorData);
      notify("added");
      reset();
      fetchProfessor();
    } catch (error) {
      console.error("Error adding Professor:", error);
    }
  };

  const updateProfessor = async () => {
    console.log(Professor);
    const rep = await axios.put(`${url}/${Professor.id}`, Professor);
    reset();
    fetchProfessor();
    notify("updated");
    setUpdateMode(false); // Ajout de cette ligne pour désactiver le mode de mise à jour
  };

  const deleteProfessor = async () => {
    const rep = await axios.delete(`${url}/${id}`);
    fetchProfessor();
    closeModal();
    notify("deleted");
  };

  //////modal toastify
  const [modal, setModal] = useState(false);

  const showModal = (stuid) => {
    setId(stuid);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
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
        <p className=" m-12 text-4xl font-bold bg-white w-full py-4 pl-12 rounded-xl text-black shadow-xl  ">
          <span>
            <FontAwesomeIcon className="mr-4" icon={faUsers} />
          </span>
          Admin Interface
        </p>
        <div className="flex flex-col w-2/3 m-4 bg-white p-5 rounded-xl justify-center items-center shadow-xl">
          <span className="flex items-center justify-center w-11/12">
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="firstName"
              name="firstName"
              value={Professor.firstName}
              onChange={handleProfessor}
            />

            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="lastName"
              name="lastName"
              value={Professor.lastName}
              onChange={handleProfessor}
            />
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@email"
              name="email"
              value={Professor.email}
              onChange={handleProfessor}
            />
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@grade"
              name="grade"
              value={Professor.grade}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <input
              className="flex text-gray-700 outline-none  border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-2"
              placeholder="password"
              name="password"
              type="password"
              disabled={updateMode}
              value={Professor.password}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <span className="flex items-center justify-center w-11/12">
              <MultiSelect
                value={selectedgroups}
                onChange={handleGroupsChange}
                options={groups}
                optionLabel="code"
                placeholder="Select Groups"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
              />
            </span>
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

        {/* studen section */}

        <div className="grid grid-cols-3 gap-5 w-full m-8">
          {loading ? (
            <p>Loading data</p>
          ) : (
            Professors &&
            Professors.map((Professor, index) => (
              <div className="flex flex-col rounded-xl  p-3 bg-white border border-gray-300 border-opacity-70">
                <span className="flex border-b border-gray-500 border-opacity-60 w-full mb-2 items-center pb-2">
                  <p className="text-gray-800 font-semibold text-lg mr-3">
                    {Professor.firstName} {Professor.lastName}
                  </p>

                  {Professor.group.map((r, index) => (
                    <p className="text-sm bg-gray-100 text-gray-500 rounded-xl px-3 py-1 mr-3">
                      {r.code}{" "}
                    </p>
                  ))}
                </span>

                <span className="flex p-1 w-full items-center">
                  <span className="w-2/12 text-center mx-2">
                    <p className="py-4 bg-black rounded-full text-white text-xl font-body">
                      {Professor.firstName
                        ? Professor.firstName[0].toUpperCase()
                        : ""}
                      {Professor.lastName
                        ? Professor.lastName[0].toUpperCase()
                        : ""}
                    </p>
                  </span>

                  <span className="flex flex-col w-9/12 text-sm ml-2">
                    <span className="flex w-full items-center">
                      <span className="flex w-full items-center py-1">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 text-black"
                        />
                        <p>{Professor.email || "null email"}</p>
                      </span>
                    </span>

                    <span className="flex w-full items-center py-1">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="mr-2 text-black"
                      />
                      <p>{Professor.grade || "null grade"}</p>
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

export default Professor;
