import React from "react";

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <div>
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Create New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-black bg-[#b5b5b5] hover:bg-[#939393] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
