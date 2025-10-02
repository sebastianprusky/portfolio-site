import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4">Sebastian Prusky</h1>
      <p className="text-lg text-gray-500 text-center">
        Welcome to my portfolio!
      </p>
    </main>
  );
}