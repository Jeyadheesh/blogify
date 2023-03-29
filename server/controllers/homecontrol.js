const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../config/db");

exports.sinUserdata = (req, res) => {
  //   res.send("fd");
  const id = req.body.id;
  //   console.log(id);
  db.query(
    "select * from userBlogs  where id = ? order by likes desc",
    [id],
    (err, result) => {
      if (result.length == 0) {
        return res.send({
          staus: "err",
          msg: "Create New Blog",
        });
      }
      res.send({
        status: "noerr",
        result: result,
      });
    }
  );
};

exports.createBlog = (req, res) => {
  //   res.send("sdf");
  const { id, title, msg, name } = req.body;
  console.log(id);
  db.query(
    "insert into userBlogs(id,title,msg,name) values(?,?,?,?)",
    [id, title, msg, name],
    (err, result) => {
      if (err) console.log(err.message);
      else {
        return res.send({
          status: "noerr",
          msg: "Blog Created ",
          result: result,
        });
      }
    }
  );
};

exports.allUserdata = (req, res) => {
  // console.log(id);
  db.query("select * from userBlogs order by likes desc", (err, result) => {
    if (err) console.log(err);
    else {
      if (result.length == 0) {
        return res.send({
          staus: "err",
          msg: "Create New Blog",
        });
      }
      res.send({
        status: "noerr",
        result: result,
      });
    }
  });
};

exports.deleteBlog = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  db.query("delete from userBlogs where blogId = ?", [id], (err, result) => {
    if (err) console.log(err);
    else {
      return res.send({
        status: "noerr",
        msg: "Blog Deleted",
      });
    }
  });
};

exports.getDataById = (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("select * from login where id = ?", [id], (err, result) => {
    if (err) console.log(err);
    else {
      return res.send({
        status: "noerr",
        result: result[0],
      });
    }
  });
};

exports.getdataByblogid = (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("select *  from userBlogs where blogId = ?", [id], (err, result) => {
    if (err) console.log(err);
    else {
      return res.send({
        status: "noerr",
        result: result[0],
      });
    }
  });
};

exports.changeData = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const { title, msg } = req.body;
  db.query(
    "update userBlogs set title = ? , msg = ? where blogId = ?",
    [title, msg, id],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          status: "noerr",
          msg: "Blog Updated",
        });
      }
    }
  );
};

exports.logout = (req, res) => {
  console.log("dafaga");
  try {
    // res.cookie("jai", "dummy", {
    //   expires: new Date(Date.now() + 1000),
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   path: "/",
    // });

    // res.clearCookie("jai", {
    //   expires: new Date(Date.now() + 1000),
    //   httpOnly: true,
    //   sameSite: "none",
    //   path: "/",
    //   secure: true,
    // });

    res.clearCookie("jai");
    res.send("good");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getcookieData = (req, res) => {
  const cookiee = req.cookies.jai;
  console.log(cookiee);
  if (!cookiee) return res.send(false);
  const cookieeData = jwt.verify(cookiee, process.env.jwtSecretCode);
  // console.log(cookieeData);
  res.send({ CookieData: cookieeData });
};

exports.changeImg = (req, res) => {
  const { imgno, id } = req.body;
  // console.log(imgno, id);

  db.query(
    "update login l , userBlogs u set l.profileno = ?,u.profileno = ? where l.id = u.id and l.id = ?;",
    [imgno, imgno, id],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          status: "noerr",
          msg: "Image Changed",
        });
      }
    }
  );
};

exports.changeName = (req, res) => {
  const { name, id } = req.body;
  // console.log(name, id);

  db.query(
    "update login l , userBlogs u set l.name = ?, u.name = ? where l.id = u.id and l.id = ?",
    [name, name, id],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          status: "noerr",
          msg: "Name Changed",
        });
      }
    }
  );
};

exports.coo = (req, res) => {
  // console.log(req.cookies);
  const cookiedata = req.cookies;
  res.send({ cookiedata: cookiedata });
};

exports.setnamefromdb = (req, res) => {
  const id = req.body.id;
  // console.log(id);
  db.query("select * from login where id = ?", [id], (err, result) => {
    if (err) console.log(err);
    else {
      return res.send({
        status: "noerr",
        result: result[0],
      });
    }
  });
};

exports.addLike = (req, res) => {
  const { userId, likerId, blogId } = req.body;
  db.query(
    " insert into likes(userId ,likerId,blogId) values(?,?,?)",
    [userId, likerId, blogId],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          msg: "Like Added",
        });
      }
    }
  );
};

exports.removeLike = (req, res) => {
  // res.send("fasd");
  const { likerId, blogId } = req.body;
  db.query(
    "delete from likes where likerId = ? and blogId = ?",
    [likerId, blogId],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          msg: "Like Removed",
        });
      }
    }
  );
};

exports.updateUrLikes = (req, res) => {
  const { blogId } = req.body;
  // res.send("fd");
  db.query(
    "update userBlogs set likes = (select count(likerId) from likes where blogId = ?) where blogId = ?",
    [blogId, blogId],
    (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({
          msg: "Like Updated to User DB",
        });
      }
    }
  );
};

exports.getlikesData = (req, res) => {
  db.query("select * from likes", (err, result) => {
    if (err) console.log(err);
    else {
      return res.send({
        msg: "Likes Data",
        result: result,
      });
    }
  });
};

exports.checkEdit = (req, res) => {
  const { id, blogId } = req.body;
  console.log(id, blogId);
  db.query(
    "select * from userBlogs where id = ? and blogId = ?",
    [id, blogId],
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        if (result.length == 0) {
          res.send({ msg: "Unable To Edit", status: "err" });
        } else {
          res.send({ msg: "Able To Edit", status: "noerr" });
        }
      }
    }
  );
};
