import { JSX } from "react";

export default function About(): JSX.Element {
  return (
  <main className="min-h-screen flex flex-col items-center justify-start relative">
    <div className="text-base text-gray-600 mb-4 text-center max-w-2xl">A little about my background, interests, and what drives me.</div>
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