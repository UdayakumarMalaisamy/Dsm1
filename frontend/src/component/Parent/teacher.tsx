import { useState, type ChangeEvent } from "react";

export interface ColumnConfig<T> {
  label: string;
  key: keyof T | string;
  editable?: boolean;
  isImage?: boolean;
}

interface TeachersProps<T extends Record<string, any>> {
  data: T[];
  role: "admin" | "student" | "parent";
  columns: ColumnConfig<T>[];
  onChange?: (newData: T[]) => void;
  entityName?: string;
}

const Teachers = <T extends Record<string, any>>({
  data,
  role,
  columns,
  onChange,
  entityName = "Item",
}: TeachersProps<T>) => {
  const [items, setItems] = useState<T[]>(data);
  const [formData, setFormData] = useState<Partial<T>>({});
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    const updated = [...items];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as T;
    } else {
      updated.push(formData as T);
    }
    setItems(updated);
    onChange?.(updated);
    setShowForm(false);
    setEditingIndex(null);
    setFormData({});
  };

  const handleEdit = (index: number) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
      onChange?.(updated);
    }
  };

  const handleInputChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key: keyof T, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [key]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Filter columns for "parent"
  const visibleColumns =
    role === "parent"
      ? columns.filter((col) => col.key === "title" || col.key === "contact")
      : columns;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold text-gray-800">
        {entityName} List ({role})
      </h2>

      {/* ✅ Only admin can add */}
      {role === "admin" && (
        <button
          onClick={() => {
            setFormData({});
            setEditingIndex(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add {entityName}
        </button>
      )}

      {/* ✅ Only admin can see form */}
      {role === "admin" && showForm && (
        <div className="bg-gray-100 p-4 rounded shadow-md max-w-md">
          <h3 className="font-semibold mb-2">
            {editingIndex !== null ? "Edit" : "Add"} {entityName}
          </h3>
          {columns.map((col) => (
            <div key={col.key as string} className="mb-2">
              {col.isImage ? (
                <input type="file" onChange={(e) => handleImageChange(col.key, e)} />
              ) : (
                <input
                  className="border p-2 rounded w-full"
                  placeholder={col.label}
                  value={formData[col.key] ?? ""}
                  onChange={(e) => handleInputChange(col.key, e.target.value)}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingIndex(null);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button onClick={handleAddOrUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
              {editingIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse border text-left">
        <thead className="bg-gray-200">
          <tr>
            {visibleColumns.map((col) => (
              <th key={col.key as string} className="border p-2">
                {col.label}
              </th>
            ))}
            {/* ✅ Only admin can edit/delete */}
            {role === "admin" && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {visibleColumns.map((col) => (
                <td key={col.key as string} className="border p-2">
                  {col.isImage ? (
                    <img
                      src={item[col.key] || "https://via.placeholder.com/50"}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
              {role === "admin" && (
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(index)} className="text-yellow-600 underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 underline">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
