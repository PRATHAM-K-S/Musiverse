import React, { useContext } from "react";
import { Userdetails } from "../context/Context";

const Profile = () => {
  const userdetails = useContext(Userdetails);
  console.log(userdetails.userdetails);
  return (
    <div className="relative w-full h-[91vh] flex justify-center items-center">
      {userdetails.userdetails == undefined ? (
        <h1 className="text-white font-bold text-2xl">Login to see Your Profile</h1>
      ) : (
        <div className="border-2 border-white/5 w-[60vw] h-[60vh] rounded-lg bg-white/5 filter backdrop-blur-2xl">
          <div className="w-full flex gap-8 flex-col h-3/4 justify-center items-center mt-10">
            <img
              className="rounded-full border-4 border-pink-700"
              src={userdetails.userdetails.picture}
              alt=""
            />
            <div className="flex flex-col gap-1 items-center">
              <h3 className="text-white text-2xl font-semibold">
                {userdetails.userdetails.given_name}{" "}
                {userdetails.userdetails.family_name}
              </h3>
              <p className="text-gray-400">{userdetails.userdetails.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
