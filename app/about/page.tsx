import { JSX } from "react";

export default function About(): JSX.Element {
  return (
    <main className="p-8 min-h-screen">
      <h2 className="text-2xl font-semibold mb-2 text-center">About Me</h2>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 text-left max-w-2xl">
        I'm from Miami, FL and currently studying Industrial Engineering, MMSS, and CS at Northwestern University.<br />
        I'm passionate about product design, process optimization, technology, and AI.<br />
        In my free time, I love painting, lifting and running, going to the beach, and watching thriller and horror movies.<br />
        You can reach me at sebastianprusky2028@u.northwestern.edu
        </h1>
      </div>
    </main>
  );
}