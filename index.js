const express = require("express");

const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB();

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset"],
  })
);

app.get("/courses", getAllCourses);
app.post("/courses", createCourse);
app.put("/courses/:id", updateCourse);
app.delete("/courses/:id", removeCourse);

app.listen(3000, () => console.log(`Server starter at port 3000`));