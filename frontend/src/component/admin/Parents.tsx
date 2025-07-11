// src/component/admin/Parents.tsx

import { useState } from "react";

// Define types
interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
  isImage?: boolean;
}

interface ParentsProps<T> {
  data: T[];
  userRole: "admin" | "teacher" | "student" | "parent";
  columns: ColumnConfig<T>[];
  entityName?: string;
}

export default function Parents<T extends Record<string, any>>({
  data,
  userRole,
  columns,
  entityName = "Item",
}: ParentsProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [formData, setFormData] = useState<Partial<T>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isEditable = userRole === "admin" || userRole === "teacher";

  const handleAddOrUpdate = () => {
    const updated = [...items];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as T;
    } else {
      updated.push(formData as T);
    }
    setItems(updated);
    setShowForm(false);
    setEditingIndex(null);
    setFormData({});
  };

  const handleEdit = (index: number) => {
    if (!isEditable) return;
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (!isEditable) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
    }
  };

  const handleInputChange = <K extends keyof T>(key: K, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = <K extends keyof T>(
    key: K,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {entityName} List - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </h2>

      {/* Add Button */}
      {isEditable && (
        <button
          onClick={() => {
            setFormData({});
            setEditingIndex(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
        >
          + Add {entityName}
        </button>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit" : "Add"} {entityName}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
              {columns.map((col) => (
                <div key={col.key as string} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {col.label}
                  </label>
                  {col.isImage ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(col.key, e)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={`Enter ${col.label}`}
                      value={(formData[col.key] as string) || ""}
                      onChange={(e) => handleInputChange(col.key, e.target.value)}
                      disabled={!isEditable}
                      className={`w-full border rounded px-3 py-2 ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                {isEditable && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {isEditable && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                  No {entityName.toLowerCase()}s found.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  {columns.map((col) => (
                    <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
                      {col.isImage ? (
                        <img
                          src={(item[col.key] as string) || "https://via.placeholder.com/50 "}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  {isEditable && (
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}