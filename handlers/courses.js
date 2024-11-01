const getAllCourses = async (req, res) => {
    try {
      const data = await getAll(req.auth.id);
      return res.status(200).send(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error!");
    }
  };
  
  const createCourse = async (req, res) => {
    try {
      const data = {
        ...req.body,
        user_id: req.auth.id,
      };
  
      const newCourse = await create(data);
  
      return res.status(200).send(newCourse);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error!");
    }
  };
  
  const updateCourse = async (req, res) => {
    try {
      const data = {
        ...req.body,
        user_id: req.auth.id,
      };
  
      const checkCourse = await getSingle(req.params.id);
  
      if (!checkCourse) {
        return res.status(400).send("Post not found!");
      }
  
      if (checkCourse.user_id.toString() !== req.auth.id.toString()) {
        return res.status(400).send("User is not owner of this post!");
      }
  
      const updatedCourse = await update(req.params.id, data);
  
      return res.status(200).send(updatedCourse);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error!");
    }
  };
  
  const removeCourse = async (req, res) => {
    try {
      const removeCourse = await getSingle(req.params.id);
  
      if (!checkCourse) {
        return res.status(400).send("Post not found!");
      }
  
      if (checkCourse.user_id.toString() !== req.auth.id.toString()) {
        return res.status(400).send("User is not owner of this post!");
      }
  
      const removedCourse = await remove(req.params.id);
      return res.status(200).send(removedCourse);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error!");
    }
  };
  
  module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    removeCourse,
  };