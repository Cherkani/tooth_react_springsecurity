import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HiMenuAlt3 } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { PiStudentThin } from "react-icons/pi";
import { PiToothThin } from "react-icons/pi";
import { FaRegFile } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";

const Sidebar = () => {
  const port = import.meta.env.VITE_PORT_SPRING;
  const handleLogout = () =>{
    localStorage.removeItem("userlogin")
    window.location = "/"
}
  const [prof, setProf] = useState({});
  const [loading, setLoading] = useState(false);
  const userlogin = JSON.parse(localStorage.getItem("userlogin"));
  const url = `http://localhost:${port}/api/users/${userlogin.id}`;

  const getProfessor = async () => {
    const res = await axios.get(`${url}`);
    console.log(res.data);
    setProf(res.data);
  };

  useEffect(() => {
    setLoading(true);
    getProfessor();
    setLoading(false);
  }, []);

  const menus = [
    { name: "Profile", link: "/professor/profil", icon: BsListTask },
    {
      name: "Professor Management",
      link: "/professor",
      icon: FaChalkboardTeacher,
    },
    { name: "Groups", link: "/professor/groupe", icon: AiOutlineTeam },
    { name: "Students", link: "/professor/student", icon: PiStudentThin },
    { name: "Group Students", link: "/groupestudent", icon: AiOutlineTeam },
    { name: "Teeth", link: "/professor/teeth", icon: PiToothThin },
   
   
    { name: "Pw", link: "/professor/pw", icon: FaRegFile },
 
  
  
  ];

  const [open, setOpen] = useState(true);

  return (
    <div>
     <div
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-80 bg-[#0e0e0e] border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-80" : "w-16"
        } duration-500 text-gray-100 px-6`}
      >
         <button
          onClick={handleLogout}
          className="ml-4 text-gray-300 hover:text-white"
        >
          Logout
        </button>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div >
            <span class="flex flex-col items-center justify-center mb-5">
              <div className="px-6 mb-10">
                
              </div>
              {!loading && (
                <>
                  <img
                    src={`data:photo/png;base64, ${prof.photo}`}
                    className="w-24 h-24 rounded-full  "
                  />
                  <p className="text-lg pt-2 text-gray-700 font-medium">
                    {" "}
                    {prof.firstName} {prof.lastName}
                  </p>
                </>
              )}
             
            </span>
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
              
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
