import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal, Col, Row } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is Created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Input Form");
    }
  };
  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //update catagory
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete catagory
  const handleDelete = async (cId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${cId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Manage Category - Cartify"}>
      <div className="container flex min-h-[90vh] font-Jost-Regular">
        <div>
          <AdminMenu />
        </div>
        <div>
          <>
            <div className="my-4 ml-28 flex flex-col justify-center items-center">
              <h1 className="text-2xl mb-4">Manage Category</h1>
              <div className="py-3 w-[400px]">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="relative ">
                <table className="w-full text-sm text-center text-gray-400 font-Jost-Regular">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-10 py-5 text-[16px] font-Jost-Medium"
                      >
                        Category name
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-5 border-l border-gray-600 text-[16px] font-Jost-Medium"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c, index) => (
                      <tr
                        key={c._id}
                        className={`${
                          index % 2 === 0 ? "bg-[#cecece]" : "bg-[#f1f1f1]"
                        } rounded-lg`}
                      >
                        <td className="px-28 py-3 text-gray-700 capitalize font-Jost-Bold whitespace-nowrap">
                          {c.name}
                        </td>
                        <td className="flex px-12 py-3 space-x-8 text-gray-700 capitalize border-l border-gray-500">
                          <button
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                            className="bg-[#374151] px-2 py-1 text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                            className="bg-red-600 px-2 py-1 text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
