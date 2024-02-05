import { useState } from "react";

const UserInfoWithUseState = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    hobbies: [] as string[],
  });

  console.log(user);

  return (
    <form className="border border-sky-500">
      <input
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="name"
        id="name"
        placeholder="name"
      />
      <input
        onChange={(e) => setUser({ ...user, age: e.target.value })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="age"
        id="age"
        placeholder="age"
      />
      <input
        onBlur={(e) => setUser({ ...user, hobbies: [...user.hobbies, e.target.value] })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="hobbies"
        id="hobbies"
        placeholder="hobbies"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Submit
      </button>
    </form>
  );
};

export default UserInfoWithUseState;
