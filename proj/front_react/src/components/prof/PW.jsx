import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen, faX,faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { faTooth, faFileAlt,faUsers } from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
const PW = () => {
    const port = import.meta.env.VITE_PORT_SPRING;
    const [pws, setPWs] = useState([]);
    const [pw, setPW] = useState({
        id: '',
        title: '',
        objectif: '',
        docs: '',
        tooth: {
            id: ''
        }
    });
    const notify = (mssg) => {
        toast.success(`${mssg}`, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const [teeth, setTeeth] = useState({});
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const url = `http://localhost:${port}/api`;
    const userlogin = JSON.parse(localStorage.getItem("userlogin"));

    const fetchPWs = async () => {
        setLoading(true);
        const rep = await axios.get(`${url}/pws/all`);
        setPWs(rep.data);
        setLoading(false);
    };
    const fetchTeeth = async () => {
        setLoading(true);
        const rep = await axios.get(`${url}/teeth/all`);
        setTeeth(rep.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPWs();
        fetchTeeth();
    }, []);

    const handleTooth = (e) => {
        setPW({
            ...pw,
            tooth: {
                ...pw.tooth,
                id: e.target.value
            }
        });
    };

    const restPw = () => {
        setPW({
            id: '',
            title: '',
            objectif: '',
            docs: '',
            tooth: {
                id: ''
            }
        });
    };

    const handlePW = (e) => {
        setPW({ ...pw, [e.target.name]: e.target.value });
    };

    const handleUpdate = (pwup) => {
        setPW(pwup);
        setUpdateMode(true);
        openModal();
    };

    const handleDelete = (id) => {
        pw.id = id;
        openModaldel();
    };

    const addPW = async () => {
        const rep = await axios.post(`${url}/pws/add`, pw);
        notify(rep.data.message);
        restPw();
        fetchPWs();
        closeModal();
    };

    const updatePW = async () => {
        const rep = await axios.put(`${url}/pws/update/${pw.id}`, pw);
        notify(rep.data.message);
        restPw();
        fetchPWs();
        closeModal();
        setUpdateMode(false);
    };

    const deletePW = async () => {
        const rep = await axios.delete(`${url}/pws/delete/${pw.id}`);
        notify(rep.data.message);
        restPw();
        fetchPWs();
        closeModaldel();
    };

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        restPw();
        setUpdateMode(false);
    };

    const openModaldel = () => {
        setModalDel(true);
    };

    const closeModaldel = () => {
        setModalDel(false);
        restPw();
    };

    const handleFileChange = (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result.split(",")[1];
                setPW({ ...pw, docs: base64Data });
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full mt-20">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div >
                    <p className="m-12 text-4xl font-bold bg-white w-full py-4 pl-12 rounded-xl text-black-500 shadow-xl relative">
  <span>
    <FontAwesomeIcon className="mr-4" icon={faFileAlt} />
  </span>
  PW Interface
  <button
    type="button"
    className="absolute top-1/2 transform -translate-y-1/2 right-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
    onClick={openModal}
  >
    <FontAwesomeIcon icon={faPlus} />
  </button>
</p>

                       

                        <div className="flex flex-wrap -m-1.5">
  {pws.map((pw, index) => (
    <div key={index} className="flex flex-col rounded-xl p-3 bg-white border border-gray-700 border-opacity-70 mb-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="flex border-b border-gray-800 border-opacity-60 w-full mb-2 items-center pb-2">


      <div className="flex w-full items-center py-1">
            <FontAwesomeIcon icon={faFilePdf} className="mr-2 text-gray-800" />
            <a href={`data:application/pdf;base64,${pw.docs}`} download={`Document_PW_${pw.title}.pdf`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
              Download
            </a>
          </div>
      
      </div>

      <div className="flex p-1 w-full items-center">
        <div className="w-2/12 text-center mx-2">
          <p className="py-4 bg-black rounded-full text-white text-xl font-body">
            {pw.title ? pw.title[0].toUpperCase() : ""}
          </p>
        </div>

        <div className="flex flex-col w-9/12 text-sm ml-2">
          <div className="flex w-full items-center py-1">
            <FontAwesomeIcon icon={faTooth} className="mr-2 text-gray-800" />
            <p >
          {pw.tooth.name}
        </p>
          </div>
       
     
          <div className="flex w-full items-center py-1">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-gray-800" />
            <p >
            {pw.title}
        </p>
          </div>
        </div>

        <div className="flex flex-col w-1/12">
          <button onClick={() => handleUpdate(pw)}>
            <FontAwesomeIcon icon={faPen} className="text-gray-300 mb-8 hover:text-green-500 hover:scale-125" />
          </button>
          <button onClick={() => handleDelete(pw.id)}>
            <FontAwesomeIcon icon={faTrash} className="text-gray-300 hover:text-red-500 hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

                        











                     
{modal && (
  <div className="w-full h-full fixed top-0 left-0 z-[60] bg-gray-800 bg-opacity-75 flex justify-center items-center">
    <div className="bg-white w-full max-w-md p-4 rounded-xl p-5">
      <h3 className="font-bold text-gray-800 mb-3 text-center">
        {updateMode ? 'Update' : 'Add'} pw
      </h3>
      <label htmlFor="input-label" className="block text-sm font-medium mb-2 text-gray-600">
        Title
      </label>
      <input
        type="text"
        id="input-label"
        name="title"
        value={pw.title}
        onChange={handlePW}
        className="py-3 w-full px-4 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:text-gray-300 dark:focus:ring-gray-600"
        placeholder="title"
      />
      <label htmlFor="input-objectif" className="block text-sm font-medium mb-2 mt-1 text-gray-600">
        Objectif
      </label>
      <input
        type="text"
        id="input-objectif"
        name="objectif"
        value={pw.objectif}
        onChange={handlePW}
        className="py-3 w-full px-4 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:text-gray-300 dark:focus:ring-gray-600"
        placeholder="objectif"
      />
      <label htmlFor="fileInput" className="block text-sm font-medium mb-2 mt-1 text-gray-600">
        Docs (PDF)
      </label>
      <input
        type="file"
        id="fileInput"
        name="docs"
        accept=".pdf"
        onChange={(e) => handleFileChange(e)}
        className="py-3 w-full px-4 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:text-gray-300 dark:focus:ring-gray-600"
      />
      <label htmlFor="input-tooth" className="block text-sm font-medium mb-2 text-gray-600">
        Tooth
      </label>
      <select
        value={pw.tooth.id}
        onChange={handleTooth}
        className="py-3 px-4 pe-9 block w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:text-gray-300 dark:focus:ring-gray-600"
      >
        <option disabled>Select tooth</option>
        {teeth.map((tooth, index) => (
          <option key={index} value={tooth.id}>
            {tooth.name}
          </option>
        ))}
      </select>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="py-2 px-3 mr-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-gray-700 text-white shadow-sm hover:bg-gray-600"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-gray-800"
          onClick={updateMode ? updatePW : addPW}
        >
          {updateMode ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  </div>
)}


<Modal
    isOpen={modalDel}
    onRequestClose={closeModaldel}
    className="flex flex-col  bg-white w-1/4 mx-auto mt-48 rounded-md shadow border-2"
>
    <button
        className="flex items-center justify-end mt-3 mr-3"
        onClick={closeModaldel}
    >
        <FontAwesomeIcon icon={faX} />
    </button>
    <p className="text-center text-2xl font-bold mt-10 mb-8 ">
        Do you want to delete this Professor ?
    </p>
    <div className="flex justify-center mb-10 ">
        <button
            onClick={closeModaldel}
            className="text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200"
        >
            Cancel
        </button>
        <button
            onClick={deletePW}
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

                    {/* Rest of your code remains unchanged */}
                </>
            )}
            
        </div>

    );
};

export default PW;
