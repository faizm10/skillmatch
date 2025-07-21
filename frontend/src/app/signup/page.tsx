"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $bio: String, $skills: [String!]!, $interests: [String!]!) {
    createUser(name: $name, email: $email, bio: $bio, skills: $skills, interests: $interests) {
      id
      name
      email
      bio
      skills
      interests
      createdAt
    }
  }
`;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [createdUser, setCreatedUser] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      setCreatedUser(data.createUser);
      setErrorMsg("");
      setName("");
      setEmail("");
      setBio("");
      setSkills("");
      setInterests("");
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setCreatedUser(null);
    if (!name || !email) {
      setErrorMsg("Please enter both name and email.");
      return;
    }
    await createUser({
      variables: {
        name,
        email,
        bio: bio || null,
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        interests: interests.split(",").map(i => i.trim()).filter(Boolean),
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Skills <span className="text-xs text-gray-500">(comma separated)</span></label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. JavaScript, React, Node.js"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Interests <span className="text-xs text-gray-500">(comma separated)</span></label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. AI, Web Development, Design"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
      </form>
      {createdUser && (
        <div className="mt-6 p-4 bg-green-100 rounded shadow text-green-800">
          <h2 className="font-bold mb-2">Signup Successful!</h2>
          <p>Name: {createdUser.name}</p>
          <p>Email: {createdUser.email}</p>
          {createdUser.bio && <p>Bio: {createdUser.bio}</p>}
          {createdUser.skills && createdUser.skills.length > 0 && (
            <p>Skills: {createdUser.skills.join(", ")}</p>
          )}
          {createdUser.interests && createdUser.interests.length > 0 && (
            <p>Interests: {createdUser.interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
} 