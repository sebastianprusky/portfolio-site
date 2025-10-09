"use client";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      <h1
        className="text-2xl font-semibold mb-1 text-center"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        About Me
      </h1>

      <p className="text-base font-normal mb-4 text-left max-w-2xl">
        I am studying Industrial Engineering and Management Sciences with a CS minor
        at Northwestern. I enjoy product design, data analysis, and building tools
        that help people solve real problems. For inquiries, reach me at sebastian@example.com.
      </p>
    </main>
  );
}