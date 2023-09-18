import { useState, useEffect } from "react";

const apiUrl = "http://192.168.77.91:9000/admin/create/category/";

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

const updateCategory = async (formData, categoryId) => {
  try {
    const response = await fetch(`${apiUrl}/${categoryId}`, {
      method: "PUT",
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
    const response = await fetch(`${apiUrl}/${categoryId}`, {
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

function PostCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [categorys, setCategorys] = useState([]);

  const [editableCategoryData, setEditableCategoryData] = useState({
    isEdit: false,
    categoryIndex: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategorys(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleRemoveClick = async (index) => {
    const categoryId = categorys[index].id;
    await deleteCategory(categoryId);
    setCategorys((prevCategories) =>
      prevCategories.filter((_, categoryIndex) => categoryIndex !== index)
    );
  };

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
          categorys[editableCategoryData.categoryIndex].id
        );

        setCategorys((prevCategories) => {
          const newCategories = [...prevCategories];
          newCategories[editableCategoryData.categoryIndex] = updatedCategory;
          return newCategories;
        });

        setEditableCategoryData({
          isEdit: false,
          categoryIndex: null,
        });

        setCategoryData({
          name: "",
        });

        setImageFile(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      try {
        const createdCategory = await createCategory(formData);
        setCategorys((prevCategories) => [...prevCategories, createdCategory]);
        setCategoryData({
          name: "",
        });
        setImageFile(null);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const handleEditClick = (data, index) => {
    setCategoryData(data);
    setEditableCategoryData({
      isEdit: true,
      categoryIndex: index,
    });
  };

  const handleCleanClick = () => {
    setCategoryData({ name: "" });
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    {category.imageUrl && (
                      <img
                        src={`http://192.168.77.91:9000/${category.imageUrl}`}
                        alt={category.name}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(category, index)}>
                      Edit
                    </button>
                    <button onClick={() => handleRemoveClick(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="buttons-wrapper">
              <button type="reset">
                {editableCategoryData.isEdit ? "Cancel" : "Clean"}
              </button>
              <button type="submit" disabled={!isFilledFields}>
                {editableCategoryData.isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostCategory;
