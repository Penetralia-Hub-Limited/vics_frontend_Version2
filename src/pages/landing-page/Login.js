'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-800 text-white py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/src/assets/icons/call_icon.svg" alt="Call" width={20} height={20} />
          <span>+234 801 234 5678, +234 901 234 5678</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/src/assets/icons/message_icon.svg" alt="Email" width={20} height={20} />
          <span>support@kw-ivas.gov.ng, helpdesk@kw-ivas.gov.ng</span>
        </div>
      </header>

      {/* Navbar */}
      <nav className="bg-green-900 text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <Image src="/src/assets/logo/icon_white.svg" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold">KWARA STATE</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">Verification</a>
          <button className="bg-white text-green-900 px-4 py-2 rounded">Login</button>
        </div>
      </nav>

      {/* Background Image */}
      <div className="relative flex-grow flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/landing-page/login_hero.jpg')" }}>
        <div className="bg-white p-8 shadow-lg rounded w-96">
          <h2 className="text-center text-xl font-bold mb-2">Account Login</h2>
          <p className="text-center text-gray-500 mb-4">Login with your Email address and password</p>
          
          <label className="block mb-2 text-gray-700">Email Address</label>
          <input type="email" className="w-full p-2 border rounded mb-4" placeholder="userexample@gmail.com" />

          <label className="block mb-2 text-gray-700">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} className="w-full p-2 border rounded" placeholder="placeholder" />
            <button className="absolute right-3 top-3 text-sm text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-between items-center mt-2 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Show password
            </label>
            <a href="#" className="text-green-800">Forgot Password?</a>
          </div>

          <button className="bg-green-800 text-white w-full py-2 rounded">Login</button>
          <p className="text-center text-sm mt-4">Need help? <a href="#" className="text-green-800 font-bold">Contact Support</a></p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white text-center py-6">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Image src="/src/assets/logo/icon_green.svg" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold">KWARA STATE</span>
        </div>
        <p>Hotline: +234 801 234 5678 | +234 901 234 5678</p>
        <p>Support & Info: info@kw-ivas.gov.ng | support@kw-ivas.gov.ng</p>
        <p className="mt-4">&copy; All Right Reserved - 2025</p>
      </footer>
    </div>
  );
}
