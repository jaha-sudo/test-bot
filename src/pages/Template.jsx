import { useState } from "react";

const initialValues = {
  userName: "",
  userSurname: "",
  userSalary: "",
};
function Template() {
  const [userData, setUserData] = useState(initialValues);

  const [users, setUsers] = useState([]);

  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const isFilledFields =
    userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
    if (isFilledFields) {
      e.preventDefault();
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);
        setUsers(editedData);
        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => [...prevState, userData]);
      }
      setUserData(initialValues);
    }
  };

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  const handleCleanClick = () => setUserData(initialValues);

  console.log(users);

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.userSurname}</td>
                    <td>{user.userSalary}</td>
                    <td>
                      <button onClick={() => handleEditClick(user, index)}>
                        Edit
                      </button>
                      <button onClick={() => handleRemoveClick(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input
              type="text"
              placeholder="Enter ur Name"
              value={userData.userName}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Enter ur Surname"
              value={userData.userSurname}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSurname: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Enter ur Salary"
              value={userData.userSalary}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSalary: e.target.value,
                }))
              }
            />
            <div className="buttons-wrapper">
              <button type="reset">
                {" "}
                {editableUserData.isEdit ? "Cancel" : "Clean"}
              </button>
              <button type="submit" disabled={!isFilledFields}>
                {editableUserData.isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Template;
