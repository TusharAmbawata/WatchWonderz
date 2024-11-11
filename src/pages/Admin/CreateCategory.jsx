import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/category/create-category`, { name });

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      }
      else {
        toast.error(data?.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  }

  const handleDelete = async (cId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/category/delete-category/${cId}`);
      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/category/get-category`)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/category//update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage Category</h1>
            <div className="p-3 w-full text-center">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75 w-full">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((i) => {
                    return (
                        <tr key={i._id}>
                          <td className="text-center">{i.name}</td>
                          <td className="d-flex justify-content-center">
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(i.name);
                                setSelected(i);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(i._id)
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => { setVisible(false) }}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;