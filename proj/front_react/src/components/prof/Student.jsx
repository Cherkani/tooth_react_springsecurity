
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
   
      faUsers,
    } from "@fortawesome/free-solid-svg-icons";

    import Modal from "react-modal";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    
    const Student = () => {
        const port = import.meta.env.VITE_PORT_SPRING;
       
      const [students, setStudents] = useState([]);
    
      const [student, setStudent] = useState({
        id: "",
    
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    userName:"",
        group: {
          id: "",
          code: "",
          year: "",
        },
      });
      const [majors, setMajors] = useState([]);
      const [loading, setLoading] = useState(false);
      const [updateMode, setUpdateMode] = useState(false);
      const [id, setId] = useState(null);
      const url = `http://localhost:${port}/api/v1/students`;
    
      const fetchStudent = async () => {
        setLoading(true);
        const rep = await axios.get(url);
        setStudents(rep.data);
        setLoading(false);
      };
    
      const fetchMajor = async () => {
        const rep = await axios.get(`http://localhost:${port}/api/v1/groupes`);
        setMajors(rep.data);
      };
    
      useEffect(() => {
        fetchMajor();
        fetchStudent();
      }, []);
    
      const handleStudent = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
        console.log(students);
      };
    
      const handleMajor = (e) => {
        const selectedMajorId = e.target.value;
        setStudent({
          ...student,
          group: {
            ...student.group,
            id: selectedMajorId,
          },
        });
      };
    
      const handleUpdate = async (id) => {
        const rep = await axios.get(`${url}/${id}`);
        setStudent(rep.data);
        setUpdateMode(true);
      };
    
      const reset = () => {
        setStudent({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          grade: "",
     userName: "", 
   
          group: {
            id: "",
            code: "",
            year: "",
          },
        });
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      };
    
      const addStudent = async () => {
        console.log(student);
        const rep = axios.post(url, student);
        notify("added");
        reset();
        fetchStudent();
        fetchStudent();
        fetchStudent();
      };
    
      const updateStudent = async () => {
        console.log(student);
        const rep = await axios.put(`${url}/${student.id}`, student);
        reset();
        fetchStudent();
        notify("updated");
      };
    
      const deleteStudent = async () => {
        const rep = await axios.delete(`${url}/${id}`);
        fetchStudent();
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
        toast.success(`Student ${op} successfully`, {
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
              Student management
            </p>
    
            {/* add_update section */}
            <div className="flex flex-col w-2/3 m-4 bg-white p-5 rounded-xl justify-center items-center shadow-xl">
              <span className="flex items-center justify-center w-11/12">
              <input
                  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
                  placeholder="userName"
                  name="userName"
                  value={student.userName}
                  onChange={handleStudent}
                />
                <input
                  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
                  placeholder="firstName"
                  name="firstName"
                  value={student.firstName}
                  onChange={handleStudent}
                />
                <input
                  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
                  placeholder="lastName"
                  name="lastName"
                  value={student.lastName}
                  onChange={handleStudent}
                />
                <input
                  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
                  placeholder="@email"
                  name="email"
                  value={student.email}
                  onChange={handleStudent}
                />
              </span>
              <span className="flex items-center justify-center w-11/12">
                <input
                  className="flex text-gray-700 outline-none  border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-2"
                  placeholder="password"
                  name="password"
                  type="password"
                  disabled={updateMode}
                  value={student.password}
                  onChange={handleStudent}
                />
              </span>
              <span className="flex items-center justify-center w-11/12">
                <select
                  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
                  value={student.group.id}
                  onChange={handleMajor}
                >
                  <option className="text-gray-700">
                    Select group for student
                  </option>
                  {majors.map((major, index) => (
                    <option value={major.id}>{major.year}</option>
                  ))}
                </select>
              </span>
    
              {!updateMode ? (
                <button className="w-1/4 ml-10" onClick={addStudent}>
                  <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-black hover:bg-gray-600">
                    <FontAwesomeIcon icon={faPlus} beat className="mr-4" />
                    <p className="text-lg font-semibold">Add</p>
                  </div>
                </button>
              ) : (
                <button className="w-1/4 ml-10" onClick={updateStudent}>
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
                <p>loading data</p>
              ) : (
                students.map((student, index) => (
                  <div className="flex flex-col rounded-xl  p-3 bg-white border border-black border-opacity-70">
                    <span className="flex border-b border-black border-opacity-60 w-full mb-2 items-center pb-2">
                      <p className="text-gray-800 font-semibold text-lg mr-3">
                        {student.firstName} {student.lastName}
                      </p>
                      <p>
                        <p>Groupe : {student.group.code}</p>
                      </p>
                    </span>
    
                    <span className="flex p-1 w-full items-center">
                    <span className="w-2/12 text-center mx-2">
  {student.photo === null ? (
    <p className="py-4 bg-black rounded-full text-white text-xl font-body">
      {student.firstName[0].toUpperCase()}
      {student.lastName[0].toUpperCase()}
    </p>
  ) : (
    <img
      src={student.photo === null ? Prof : `data:image/png;base64, ${student.photo}`}
      alt={`Photo of ${student.firstName} ${student.lastName}`}
      className="mx-2 my-1 text-start w-12 h-12 rounded-full object-cover"
    />
  )}
</span>

    
                      <span className="flex flex-col w-9/12 text-sm ml-2">
                        <span className="flex w-full items-center">
                          <span className="flex w-full items-center py-1">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="mr-2 text-black"
                            />
                            <p>{student.email}</p>
                          </span>
                          
                        </span>
                        <span className="flex w-full items-center">
                          <span className="flex w-full items-center py-1">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="mr-2 text-black"
                            />
                            <p>{student.userName}</p>
                          </span>
                          
                        </span>
                      </span>
                     
    
                      <span className="flex flex-col w-1/12 ">
                        <button onClick={() => handleUpdate(student.id)}>
                          <FontAwesomeIcon
                            icon={faPen}
                            className="text-gray-300 mb-8 hover:text-green-500 hover:scale-125"
                          />
                        </button>
                        <button onClick={() => showModal(student.id)}>
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
              Do you want to delete this student ?
            </p>
            <div className="flex justify-center mb-10 ">
              <button
                onClick={closeModal}
                className="text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteStudent}
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
    
    export default Student;
    