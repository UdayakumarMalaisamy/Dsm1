
export interface teachers {
  title: string;
  link: string;
  picture: string;
  subject: string;
  incharge: string;
  contact: string;
}

// {
//     title: "Yogesh",
//     subject: "Blockchain",
//     incharge: "2-cs",
//     contact: "7894561230",
//     picture: "",
//   },


const teachers = [
    {
        title:"Ruba",
        picture:"#",
        subject:"AI",
        incharge:"1-cs",
        contact:"9876543210"
    },
 {
        title:"Yogesh",
        picture:"#",
        subject:"Blockchain",
        incharge:"2-cs",
        contact:"7894561230",

},
 {
        title:"Manoj",
        picture:"#",
        subject:"C",
        incharge:"3-cs",
        contact:"6958471230",
        
},
 {
        title:"Vishnu",
        picture:"#",
        subject:"C++",
        incharge:"3-Bsa",
        contact:"6321456987",
        
},
 {
        title:"Barath",
        picture:"#",
        subject:"Python",
        incharge:"2-cs",
        contact:"63789456123",
        
},
 {
        title:"Udayakumar",
        picture:"#",
        subject:"Java",
        incharge:"1-cs",
        Contact:"669748249",
        
},
]



// studentsd data

const students = [
    {
        title:"joshna",
        picture:"#",
        class:"1-Cs",
        contact:"9876543210",
        reg_number:"C001"
    },
    {
        title:"Divya",
        picture:"#",
        class:"1-Cs",
        contact:"9876543210",
        reg_number:"C002"
    },
     {
        title:"Rohinth",
        picture:"#",
        class:"2-Cs",
        contact:"9876543210",
        reg_number:"C003"
    }, {
        title:"Surya",
        picture:"#",
        class:"3-Cs",
        contact:"9876543210",
        reg_number:"C004"
    }, {
        title:"Prakash",
        picture:"#",
        class:"3-Bsa",
        contact:"9876543210",
        reg_number:"C001"
    }, {
        title:"Priya",
        picture:"#",
        class:"3-Bcs",
        contact:"9876543210",
        reg_number:"C001"
    },
];
export interface students{
  title: string;
  picture: string;
  class: string;
  contact: string;
  reg_number: string;
}



        /// parents data///
 

 
export interface parents {
  title: string;
  picture: string;
  class: string;
  contact: string;
  reg_number: string;
}

export const parentsList: parents[] = [
  {
    title: "Mr. Aravind Kumar",
    picture: "/images/parents/aravind.jpg",
    class: "2-A",
    contact: "9876543210",
    reg_number: "REG2025001"
  },
  {
    title: "Mrs. Deepa Rani",
    picture: "/images/parents/deepa.jpg",
    class: "3-B",
    contact: "9876543211",
    reg_number: "REG2025002"
  },
  {
    title: "Mr. Senthil Raj",
    picture: "/images/parents/senthil.jpg",
    class: "1-C",
    contact: "9876543212",
    reg_number: "REG2025003"
  },
  {
    title: "Mrs. Kavitha",
    picture: "/images/parents/kavitha.jpg",
    class: "4-D",
    contact: "9876543213",
    reg_number: "REG2025004"
  },
  {
    title: "Mr. Manoj",
    picture: "/images/parents/manoj.jpg",
    class: "5-E",
    contact: "9876543214",
    reg_number: "REG2025005"
  },
  {
    title: "Mrs. Priya Sharma",
    picture: "/images/parents/priya.jpg",
    class: "2-B",
    contact: "9876543215",
    reg_number: "REG2025006"
  },
  {
    title: "Mr. Rajesh Nair",
    picture: "/images/parents/rajesh.jpg",
    class: "3-C",
    contact: "9876543216",
    reg_number: "REG2025007"
  },
  {
    title: "Mrs. Anitha Das",
    picture: "/images/parents/anitha.jpg",
    class: "1-A",
    contact: "9876543217",
    reg_number: "REG2025008"
  },
  {
    title: "Mr. Varun Mehta",
    picture: "/images/parents/varun.jpg",
    class: "4-A",
    contact: "9876543218",
    reg_number: "REG2025009"
  },
  {
    title: "Mrs. Sangeetha",
    picture: "/images/parents/sangeetha.jpg",
    class: "5-B",
    contact: "9876543219",
    reg_number: "REG2025010"
  }
];
