import Teacher from "../component/admin/Teacher";

const initialTeachers = [
  {
    title: "Ruba",
    picture: "#",
    subject: "AI",
    incharge: "1-cs",
    contact: "9876543210",
  },
  {
    title: "Yogesh",
    picture: "#",
    subject: "Blockchain",
    incharge: "2-cs",
    contact: "7894561230",
  },
];

const columns = [
  { key: "title", label: "Name" },
  { key: "subject", label: "Subject" },
  { key: "incharge", label: "Incharge" },
  { key: "contact", label: "Contact" },
  { key: "picture", label: "Picture", isImage: true },
];

const TeachersPage = () => {
  return (
    <div>
      <Teacher
        data={initialTeachers}
        columns={columns}
        role="admin" // Try changing to "student" or "parent"
        entityName="Teacher"
      />
    </div>
  );
};

export default TeachersPage;
