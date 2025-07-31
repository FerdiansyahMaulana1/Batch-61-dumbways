import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pool from './src/asset/config/db.js';
import fs from "fs";
import multer from "multer";
import hbs from 'hbs';
import moment from 'moment';

//helper untuk handlebars

// hbs.registerHelper('formatDate', function(date) {
//   return moment(date).format('MMM YYYY');
// });

hbs.registerHelper('splitTags', function(techString) {
  return techString.split(',').map(tag => tag.trim());
});

hbs.registerHelper('splitLines', function(desc) {
  return desc.split('\n').filter(line => line.trim() !== '');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



// Pastikan folder 'public/uploads' ada
const uploadPath = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "uploads"));

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // simpan dengan timestamp 
  },
});

export const upload = multer({ storage: storage });

export const addProject = async (req, res) => {
  try {
    const { name, live_demo, description } = req.body;
    let technologies = req.body.technologies;

    if (!technologies) {
      technologies = "";
    } else if (Array.isArray(technologies)) {
      technologies = technologies.join(", ");
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    await pool.query(
      `INSERT INTO project (nama_project, live_demo, description, technologies, image) 
       VALUES ($1, $2, $3, $4, $5)`,
      [name, live_demo, description, technologies, image]
    );

    res.redirect("/");
  } catch (error) {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.error("Gagal insert ke DB:", error.message);
    res.status(500).send("Terjadi kesalahan saat menambahkan project");
  }
};


// Set view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));


// Serve static files dari folder /src/asset
app.use("/asset", express.static(path.join(__dirname, "src", "asset")));

//Routing untuk menyimpan data ke Database
// app.post("/project", async (req, res) => {
//   try {
//     const { name, description, technologies, image } = req.body;

//     await pool.query(
//       "INSERT INTO project (nama_project, live_demo, description, technologies) VALUES ($1, $2, $3, $4)",
//       [name, description, technologies, image]
//  );

//     res.redirect("/"); // Kembali ke halaman utama
//   } catch (err) {
//     console.error("Gagal menyimpan project:", err);
//     res.status(500).send("Gagal menyimpan project");
//   }
// });

// Routing untuk halaman index
app.get("/", async (req, res) => {
  try {
    let result;

    if (req.query.filter === "live-demo") {
      result = await pool.query("SELECT * FROM project WHERE live_demo IS NOT NULL");
    } else {
      result = await pool.query("SELECT * FROM project");
    }

    res.render("index", { project: result.rows });
  } catch (err) {
    console.error("Gagal mengambil data project:", err);
    res.status(500).send("Gagal mengambil data project");
  }
});




//Routing untuk halaman work
app.get("/work", (req, res) => { 
  res.render("work");
});
//Route untuk halaman project
app.get("/project", (req, res) => { 
  res.render("project");
});



// Route POST untuk submit form
app.post("/add-project", upload.single("image"), addProject);



// Contoh route untuk test koneksi database
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM project');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query error');
  }x
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
