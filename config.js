require("dotenv").config();
module.exports = {
  //port
  PORT: process.env.PORT || 5000,

  //secret key for API
  SECRET_KEY: "SECRET_KEY",

  //gmail credentials for send email
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",

  //secret key for jwt
  JWT_SECRET: "JWT_SECRET",

  //baseURL
  baseURL: "http://localhost:5000/",

  //firebase server key for send notification
  SERVER_KEY: "SERVER_KEY",

  role:{
    super_admin:"1",
    admin: '2',
    user: '3'
  },
  user_type:{
    super_admin: 'super-admin',
    admin: 'admin',
    user: 'user'
  },
  server: {
    name: "",
    title: "",
    url: "",
  },
  db_uri: "",
  db_string: process.env.MONGODB_URI,
  cloudinary_config:{
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

// export.configurations = {
//   server: {
//     name: "",
//     title: "",
//     url: "",
//   },
//   db_uri: "",
//   port: process.env.PORT || 3000,
//   jwt_secret: process.env.JWT_SECRET,
//   db_string: process.env.MONGODB_URI,
//   cloudinary_config:{
//     cloud_name: process.env.CLOUDNAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   },
//   role:{
//     super_admin:"1",
//     admin: '2',
//     user: '3'
//   },
//   user_type:{
//     super_admin: 'super-admin',
//     admin: 'admin',
//     user: 'user'
//   }
// };
