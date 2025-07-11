import { useState } from "react";

export type StudentData = {
  gender: any;
  blood_group: any;
  guardian_name: any;
  guardian_contact: any;
  title: string;
  picture: string;
  class: string;
  contact: string;
  reg_number: string;
  email?: string;
  dob?: string;
  address?: string;
};

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  isImage?: boolean;
  render?: (item: T) => React.ReactNode;
};

interface StudentsProps<T> {
  data: T[];
  userRole: "admin" | "teacher" | "student" | "parent";
  columns: ColumnConfig<T>[];
  entityName?: string;
  onChange?: (updated: T[]) => void;
  onViewProfile?: (student: T) => void; // ✅ new
}

export default function Students<T extends Record<string, any>>({
  data,
  userRole,
  columns,
  entityName = "Item",
  onChange,
  onViewProfile, // ✅ new
}: StudentsProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [formData, setFormData] = useState<Partial<T>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const isEditable = userRole === "admin" || userRole === "teacher";
  const canViewProfile = userRole === "admin" || userRole === "teacher";

  const handleAddOrUpdate = () => {
    const updated = [...items];
    if (editingIndex !== null) {
      updated[editingIndex] = formData as T;
    } else {
      updated.push(formData as T);
    }
    setItems(updated);
    setFormData({});
    setEditingIndex(null);
    setShowForm(false);
    onChange?.(updated);
  };

  const handleDelete = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange?.(updated);
  };

  const handleEdit = (index: number) => {
    setFormData(items[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleInputChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key: keyof T, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(key, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const filteredItems = items.filter((item) => {
    const name = (item["title"] || "").toLowerCase();
    const reg = (item["reg_number"] || "").toLowerCase();
    return name.includes(search.toLowerCase()) || reg.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{entityName} List</h2>
        {isEditable && (
          <button
            onClick={() => {
              setFormData({});
              setEditingIndex(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add {entityName}
          </button>
        )}
      </div>

      <div className="max-w-sm mb-4">
        <input
          type="text"
          placeholder="Search by name or reg number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-95">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg border">
            <h3 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit" : "Add"} {entityName}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
              {columns
                .filter((col) => !col.isImage)
                .map((col) => (
                  <div key={col.key as string} className="mb-4">
                    <label className="block mb-1 font-medium">{col.label}</label>
                    <input
                      type="text"
                      value={(formData[col.key] as string) || ""}
                      onChange={(e) => handleInputChange(col.key, e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                ))}

              {columns
                .filter((col) => col.isImage)
                .map((col) => (
                  <div key={col.key as string} className="mb-4">
                    <label className="block mb-1 font-medium">{col.label}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(col.key, e)}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {formData[col.key] && typeof formData[col.key] === "string" && (
                      <img
                        src={formData[col.key] as string}
                        alt="Preview"
                        className="w-24 h-24 mt-2 object-cover rounded shadow"
                      />
                    )}
                  </div>
                ))}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({});
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600"
                >
                  {col.label}
                </th>
              ))}
              {(isEditable || canViewProfile) && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(item) : col.isImage ? (
                      <img
                        src={(item[col.key] as string) || "https://via.placeholder.com/40"}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                {(isEditable || canViewProfile) && (
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {isEditable && (
                      <>
                        <button
                          onClick={() => handleEdit(idx)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {canViewProfile && onViewProfile && (
                      <button
                        onClick={() => onViewProfile(item)}
                        className="text-indigo-600 hover:underline"
                      >
                        Profile
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
