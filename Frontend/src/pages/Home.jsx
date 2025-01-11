import { useEffect, useState } from "react";
import data from "../data";
import Card from "./Card";
import { handleError, handleSuccess } from "../../utils";
import Overlays from '../components/Overlays'
import {useSetAtom} from 'jotai'
import {uiAtom} from '../../state'

function Home() {
  const setUi = useSetAtom(uiAtom);
  const [loggedInUser, setLoggedInUser] = useState("");
  
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user.firstName || "Guest");
      handleSuccess(`Welcome, ${user.firstName || "Guest"}!`);
    } else {
      handleError("User not logged in!");
    }
  }, []);

  return (
    <>
    <Overlays />
    <div className="p-4 bg-slate-500">
      {/* Header Section */}
      <div className="flex items-center justify-around mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {loggedInUser || "Guest"}!
        </h1>
        <button
        className="border-2 border-orange-600 bg-orange-400 p-1 rounded-md hover:bg-orange-500 hover:text-gray-100"
        onClick={() =>
          setUi((prev) => ({  ...prev,  modal: true, })) 
        }
      >
        Toggle Modal
      </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data && data.length > 0 ? (
          data.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No items available.
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Home;
