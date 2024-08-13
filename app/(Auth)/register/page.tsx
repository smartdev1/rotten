"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const  handleSubmit = async (e: any) => {
    e.preventDefault();
    const usernamePattern = /^[A-Za-z-]+$/;
    if (
      !username ||
      !email ||
      !password ||
      !Confirmpassword ||
      password !== Confirmpassword
    ) {
      setError("All fieds are necessary.");
      return;
    }

    if (!usernamePattern.test(username)) {
      setError("Username can only contain letters.");
      return
    }

    try {
      const userExist = await fetch('../api/userExists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email}),
      });

      const { user } = await userExist.json()
  if (user) {
    setError("User already exists")
    return;
  }

       const res = await fetch ('../api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, password 
            })
        });
        if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/login')
        } else {
            console.log("User registration failed.");
            
        }
    } catch (error) {
        console.log("Error during regitration:",error);
        
    }
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-5/12 gap-3">
        <h1 className="text-xl font bold my-4"> Register </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setRole(e.target.value)}
            value={role}
            type="hidden"
            
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Password Confirm"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/login"}>
            {" "}
            Already have an account?{" "}
            <span className="underline"> login </span>
          </Link>
        </form>
     
      </div>
    </div>
  );
}
