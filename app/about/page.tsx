import { JSX } from "react";

export default function About(): JSX.Element {
  return (
    <main className="p-25 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>About Me</h1>
      <div className="flex justify-center">
  <p className="text-base font-normal mb-4 text-left max-w-2xl">
        <br />I&apos;m from Miami, FL and currently studying Industrial Engineering, Mathematical Methods in the Social Sciences, and CS at Northwestern University.<br /><br />
  I&apos;m passionate about anything that combines math and tech to solve design, engineering, and business problems. I&apos;m currently working on developing my technical skills through personal projects and getting hands-on business experience by working on projects with startups.<br /><br />
        In my free time, I love painting, lifting and running, spending time at the beach, and watching thriller movies.<br /><br />
        You can reach me at sebastianprusky2028@u.northwestern.edu.
        </p>
      </div>
    </main>
  );
}