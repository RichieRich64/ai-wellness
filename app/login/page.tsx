"use client";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google"; // Trigger login with Google
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        AI Wellness Calendar Assistant
      </h1>
      <button
        className="py-4 px-8 bg-green-500 text-white border-none rounded-[10px] text-xl font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600"
        onClick={handleLogin}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
