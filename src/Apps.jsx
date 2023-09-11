import { useState } from "react";

const initialValues = {
  userName: "",
  userNSurname: "",
  userSalary: "",
};
function Apps() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const handleSubmitUser = (e) => {
    e.preventDefault();
    setUsers((prevState) => [...prevState, userData]);
    setUserData(initialValues);
  };
  console.log(users);
  return (
    <div>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div>
          <form onSubmit={handleSubmitUser}></form>
          <input
            type="text"
            placeholder="Enter ur Name"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userData: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Enter ur Surname"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userData: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Enter ur Salary"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                userData: e.target.value,
              }))
            }
          />
          <div>
            <button type="reset">Clear</button>
            <button type="submit">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apps;
