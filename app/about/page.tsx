import { JSX } from "react";react";
"use client"; // Needed to use hooks like usePathname
export default function About(): JSX.Element {
  return (k from "next/link";
  <main className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">tive overflow-hidden">
    <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>About Me</h1>
    <p className="text-lg text-center mb-2">
  <p className="text-base font-normal mb-4 text-left max-w-2xl">ct.ReactNode }) {
        <br />I&apos;m from Miami, FL and currently studying Industrial Engineering, Mathematical Methods in the Social Sciences, and CS at Northwestern University.<br /><br />
  I&apos;m passionate about anything that combines math and tech to solve design, engineering, and business problems. I&apos;m currently working on developing my technical skills through personal projects and getting hands-on business experience by working on projects with startups.<br /><br />
        In my free time, I love painting, lifting and running, spending time at the beach, and watching thriller movies.<br /><br />oreground hover:opacity-70 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>ut Me", href: "/about" },
        </a>"Projects", href: "/projects" },
        <a href="https://linkedin.com/in/sebastian-prusky" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:opacity-70 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">className="text-foreground min-h-screen overflow-auto">    <div className="w-full">      <div className="flex justify-center gap-6 mt-5 mb-8">        {navItems.map((item) => (          <Link            key={item.href}            href={item.href}            className={`text-sm font-medium hover:underline ${              pathname === item.href ? "text-blue-500 underline" : ""            }`}          >            {item.name}          </Link>        ))}      </div>      {children}    </div>      </body>    </html>  );}            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>            <rect x="2" y="9" width="4" height="12"/>          </svg>        </a>      </div>    </main>  );}