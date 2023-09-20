import { useState, useEffect } from "react";

const apiUrl = "http://192.168.77.91:9000/admin/create/category/";
const categoryDelete = "http://192.168.77.91:9000/admin/category/delete/";
const categoryUpdate = "http://192.168.77.91:9000/admin/update/category";

const createCategory = async (formData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error creating category");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const updateCategory = async (formData, uuid) => {
  try {
    // Append the 'uuid' field to your formData
    formData.append("uuid", uuid);

    const response = await fetch(`${categoryUpdate}`, {
      method: "PUT", // Use PUT to update the resource
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error updating category");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${categoryDelete}${categoryId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting category");
    }
    console.log("Category deleted successfully.");
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

function PostGetDeleteCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [categorys, setCategorys] = useState([]);

  const [editableCategoryData, setEditableCategoryData] = useState({
    isEdit: false,
    categoryIndex: null,
  });

  const [operationSuccess, setOperationSuccess] = useState(null); // Состояние для уведомления

  useEffect(() => {
    fetch("http://192.168.77.91:9000/admin/categories")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.data) {
          setCategorys(responseData.data);
        } else {
          console.error("Ошибка: Неверный формат данных");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const isFilledFields = categoryData.name;

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (!isFilledFields) {
      console.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (editableCategoryData.isEdit) {
      try {
        const updatedCategory = await updateCategory(
          formData,
          editableCategoryData.categoryIndex
        );

        setCategorys((prevCategories) =>
          prevCategories.map((category) =>
            category.uuid === editableCategoryData.categoryIndex
              ? updatedCategory
              : category
          )
        );

        setEditableCategoryData({
          isEdit: false,
          categoryIndex: null,
        });

        setCategoryData({
          name: "",
        });

        setImageFile(null);

        setOperationSuccess("Updated successfully");
      } catch (error) {
        console.error("Error updating category:", error);
        setOperationSuccess("Update failed");
      }
    } else {
      try {
        const createdCategory = await createCategory(formData);
        setCategorys((prevCategories) => [...prevCategories, createdCategory]);
        setCategoryData({
          name: "",
        });
        setImageFile(null);

        setOperationSuccess("Created successfully");
      } catch (error) {
        console.error("Error creating category:", error);
        setOperationSuccess("Creation failed");
      }
    }

    setTimeout(() => {
      setOperationSuccess(null);
    }, 5000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleCleanClick = (data, uuid) => {
    setCategoryData(data);
    setEditableCategoryData({
      isEdit: true,
      categoryIndex: uuid,
    });
  };

  const handleEditClick = async (uuid) => {
    try {
      const response = await fetch(
        `http://192.168.77.91:9000/admin/category/${uuid}`
      );
      if (!response.ok) {
        throw new Error("Error fetching category for editing");
      }
      const categoryData = await response.json();

      setCategoryData({
        name: categoryData.data.categoryName,
      });

      setEditableCategoryData({
        isEdit: true,
        categoryIndex: uuid,
      });
    } catch (error) {
      console.error("Error fetching category for editing:", error);
    }
  };

  const handleRemoveClick = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
        setCategorys((prevCategories) =>
          prevCategories.filter((_, categoryId) => categoryId !== categoryId)
        );
        setOperationSuccess("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        setOperationSuccess("Error deleting category");
      }
    }
  };

  return (
    <div className="wrapper" style={{ marginTop: "2rem" }}>
      <div className="wrapper-content">
        <div>
          <form onSubmit={handleSubmitCategory} onReset={handleCleanClick}>
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({
                  name: e.target.value,
                })
              }
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="buttons-wrapper">
              <button type="reset">
                {editableCategoryData.isEdit ? "Cancel" : "Clean"}
              </button>
              <button type="submit" disabled={!isFilledFields}>
                {editableCategoryData.isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
          {operationSuccess && (
            <div
              className={`alert ${
                operationSuccess.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {operationSuccess}
            </div>
          )}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((category, index) => (
                <tr key={category.uuid}>
                  <td>{index + 1}</td>
                  <td>{category.categoryName}</td>
                  <td>
                    {category.image && (
                      <img
                        src={`http://192.168.77.91:9000/images/categories/${category.image}`}
                        alt={category.categoryName}
                        style={{ height: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      // type="submit"
                      onClick={() => handleEditClick(category.uuid)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleRemoveClick(category.uuid)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PostGetDeleteCategory;
