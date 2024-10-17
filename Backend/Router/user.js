const express = require("express");
const router = express.Router();
const User = require("../model/userSchema"); // Corrected path to userSchema
const multer = require("multer");  // Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files
const moment = require("moment");  // simplifies date manipulation in Node. js by providing a powerful library for parsing, validating, manipulating, and formatting dates

// Image path configuration (assuming 'uploads' folder is in the root directory)
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads"); // Use absolute path for consistency
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Image filter (improved for clarity and security)
const isImage = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed. Please upload a JPEG, PNG, or GIF image."
      )
    );
  }
};

const upload = multer({ storage: imgconfig, fileFilter: isImage });

// User registration route
router.post("/register", upload.single("photo"), async (req, res) => {
  const filename = req.file ? req.file.filename : null;
  const { name } = req.body;

  if (!name || !filename) {
    return res.status(400).json({ error: "Please fill all required fields." }); // Improved error message
  }

  try {
    const date = moment().format("YYYY-MM-DD"); // Use moment for date formatting
    const userdata = new User({ name, imgpath: filename, date }); // Create new User object
    await userdata.save(); // Save user data to database

    res.status(201).json({ message: "User registered successfully!", userdata });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Improved error message
  }
});

// Creating an api to fetch data from database 
router.get("/getuser", async (req, res) => {
  try {
    const user = await User.find(); // Fetch all users
    res.status(200).json({ status: 200, user }); // Return 200 for successful GET request
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: "Internal Server Error" }); // Use 500 for server errors
  }
});

// Delete user data

router.delete("/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const dltUser = await User.findOneAndDelete({_id: id}); // _id is the id in database and id is the id in of the prams 
    res.status(200).json({status: 200,dltUser})
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
})

module.exports = router;