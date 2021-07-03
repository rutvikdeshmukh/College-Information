const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://localhost:27017/studentDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection open");
  })
  .catch(() => {
    console.log("connection is rejected", err);
  });

// const userModel = require("../model/user");
// const { collegeModel } = require("../model/college");
// const { reviewModel } = require("../model/review");
// collegeModel.find({}).then((data) => {
//   console.log(data);
// });
// const save_db = async function () {
//   for (let i = 0; i < 50; i++) {
//     const record = new collegeModel({
//       geometry: { coordinates: [72.83333, 18.96667], type: "Point" },
//       college: "College of Engineering Pune (COEP)",
//       location: "mumbai",
//       description:
//         "College of Engineering Pune (COEP), is a college affiliated to Savitribai Phule Pune University in Pune, Maharashtra, India. Established in 1854, it is the 3rd oldest engineering college in India, after College of Engineering, Guindy, Chennai (1794) and IIT Roorkee (1847).[2][3][4] The students and alumni of College of Engineering, Pune are colloquially referred to as COEPians",
//     });
//     record.image.push({
//       path: "https://res.cloudinary.com/dupzg68po/image/upload/v1625222810/College/htamq6erwrrwjcjfu1sp.jpg",
//       filename: "College/htamq6erwrrwjcjfu1sp",
//     });
//     await record.save();
//   }
// };
// save_db();
