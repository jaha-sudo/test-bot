import { useState, useEffect } from "react";

const apiUrl = "http://192.168.77.91:9000/admin/create/category/"; // Replace with your backend API URL

const createCategory = async (category) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
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

const updateCategory = async (category) => {
  try {
    const response = await fetch(`${apiUrl}/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
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

function Home() {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });

  const [categorys, setCategorys] = useState([]);

  const [editablecategoryData, setEditablecategoryData] = useState({
    isEdit: false,
    categoryIndex: null,
  });

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []); // Empty dependency array to fetch data once on component mount

  const fetchCategories = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategorys(data); // Set the fetched categories in the state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleRemoveClick = async (index) => {
    const categoryId = categorys[index].id;
    await deleteCategory(categoryId);
    setCategorys((prevCategorys) =>
      prevCategorys.filter((_, categoryIndex) => categoryIndex !== index)
    );
  };

  const isFilledFields = categoryData.categoryName;

  const handleSubmitcategory = async (e) => {
    e.preventDefault();
    if (!isFilledFields) {
      console.error("Please fill in all fields.");
      return;
    }

    if (editablecategoryData.isEdit) {
      try {
        const updatedCategory = await updateCategory({
          id: categorys[editablecategoryData.categoryIndex].id,
          ...categoryData,
        });
        setCategorys((prevCategorys) => {
          const newCategorys = [...prevCategorys];
          newCategorys[editablecategoryData.categoryIndex] = updatedCategory;
          return newCategorys;
        });
        setEditablecategoryData({
          isEdit: false,
          categoryIndex: null,
        });
        setCategoryData({
          categoryName: "",
        });
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      try {
        const createdCategory = await createCategory(categoryData);
        setCategorys((prevCategorys) => [...prevCategorys, createdCategory]);
        setCategoryData({
          categoryName: "",
        });
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
  };

  const handleEditClick = (data, index) => {
    setCategoryData(data);
    setEditablecategoryData({
      isEdit: true,
      categoryIndex: index,
    });
  };

  const handleCleanClick = () => setCategoryData({ categoryName: "" });

  console.log(categorys);

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.categoryName}</td>
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
          <form onSubmit={handleSubmitcategory} onReset={handleCleanClick}>
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryData.categoryName}
              onChange={(e) =>
                setCategoryData({
                  categoryName: e.target.value,
                })
              }
            />
            <div className="buttons-wrapper">
              <button type="reset">
                {editablecategoryData.isEdit ? "Cancel" : "Clean"}
              </button>
              <button type="submit" disabled={!isFilledFields}>
                {editablecategoryData.isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
