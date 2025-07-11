// src/pages/ParentList.tsx

import Parents from "../component/admin/Parents";
import { parentsList } from "../helper/person";

const ParentList = () => {
  const userRole = "admin"; // Replace with actual role logic

  const columns = [
    { key: "title", label: "Name" },
    { key: "class", label: "Child's Class" },
    { key: "contact", label: "Contact" },
    { key: "reg_number", label: "Registration No" },
    { key: "picture", label: "Photo", isImage: true },
  ];

  return (
    <div>
      <Parents
          data={parentsList}
        userRole={userRole}
        columns={columns}
        entityName="Parent"
      />
    </div>
  );
};

export default ParentList;