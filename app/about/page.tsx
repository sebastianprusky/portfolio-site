"use client";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative px-4">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: "Times New Roman, Times, serif" }}>
        about
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">about me</div>
      <p className="text-base font-normal mb-4 text-left max-w-2xl">
        <br></br>I&apos;m from Miami, FL and currently studying Industrial Engineering, Mathematical Methods in the Social Sciences, and Computer Science at Northwestern University.<br /><br />
        I&apos;m passionate about combining math and tech to solve design, engineering, and business problems. I&apos;m currently working on developing my technical skills through personal projects and getting hands-on business experience by working on projects with startups.<br /><br />
        In my free time, I love painting, lifting and running, spending time at the beach, and watching thriller movies.<br /><br />
        You can reach me at sebastianprusky2028@u.northwestern.edu.
      </p>
    </main>
  );
}