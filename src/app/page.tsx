"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; 

export default function Home() {
  const[email, setEmail] = useState("");
  const[name, setName] = useState("");
  const[password, setPassword] = useState("");

  const onSubmit=() => {
    authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
    },{
      onError:() =>{
      window.alert("Error creating user, please try again.");
    },
    onSuccess:() => {
      window.alert("User created successfully!");
    }
    
    });
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit} className="w-full">
          Create User
        </Button>
    </div>
  )
}