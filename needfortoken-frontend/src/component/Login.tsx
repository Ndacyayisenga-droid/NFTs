import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, checkUser, updateUserStatus } from "user-storage";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      // console.log(user, 'ferferfweer')
      if (!user.email && !user.password) return;

      const { isUserAvailable, userData } = checkUser(user.email);

      if (isUserAvailable) {
        return userData.password === user.password
          ? (updateUserStatus({
              ...userData,
              loggedIn: true,
              app: "needfortoken",
            }),
            navigate("/dashboard"))
          : null;
      } else {
        addUser({ ...user, loggedIn: true, app: "needfortoken" });
        return navigate("/dashboard");
      }
    },
    [navigate, user]
  );
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{ backdropFilter: "blur(25px)" }}
    >
      <div
        style={{ height: "60vh" }}
        className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
      >
        <form className="space-y-6" onSubmit={handleLogin}>
          <h5 className="text-xl font-medium text-gray-900">
            Sign in to our platform
          </h5>
          <div>
            <label
              id="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              value={user.email}
              required
            />
          </div>
          <div>
            <label
              id="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              value={user.password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login / Create account
          </button>
          {/* <div className="text-sm font-medium text-gray-500">
            Not registered?{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Create account
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
}
