const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../config/db");

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  //   console.log(fullname, email, password);

  const hashpass = await bcryptjs.hash(password, 10);
  //   console.log(hashpass);

  db.query("select * from login where email = ?", [email], (err, result) => {
    if (err) console.log(err);
    else {
      // console.log(result.length);
      if (result.length > 0) {
        return res.send({
          status: "err",
          msg: "Email Already Exist !!!",
          class: "err",
        });
      }
      db.query(
        "insert into login(name,email,password) values(?,?,?)",
        [fullname, email, hashpass],
        (err, result) => {
          if (err) console.log(err);
          else {
            //   console.log(result);
          }
        }
      );
      return res.send({
        status: "noerr",
        msg: "Registration Completed :)",
        class: "noerr",
      });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    db.query(
      "select * from login where email = ?",
      [email],
      async (err, result) => {
        if (err) console.log(err);
        else {
          // console.log(result);
          if (result.length == 0) {
            return res.send({
              status: "err",
              msg: "Enter Valid Email and Password !!!",
              class: "err",
            });
          }
          const isValid = await bcryptjs.compare(password, result[0].password);
          if (!isValid) {
            return res.send({
              status: "err",
              msg: "Enter Valid Email and Password !!!",
              class: "err",
            });
          }

          //After Login

          const userdata = result[0];
          console.log(userdata);
          const token = jwt.sign(
            { userdata: userdata },
            process.env.jwtSecretCode,
            {
              expiresIn: process.env.jwtExpireTime,
            }
          );

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.jwtCookieExpire * 1000 * 60 * 60 * 24
            ),
            httpOnly: true,
            // domain: "127.0.0.1",
            sameSite: "none",
            path: "/",
            secure: true,
          };
          console.log(token, cookieOptions);
          res.cookie("jai", token, cookieOptions);

          // console.log(req.cookies);
          res.send({
            status: "noerr",
            msg: "Login Successful :)",
            class: "noerr",
          });
          // window.location = "./home.html";
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.logout = (req, res) => {
  console.log("dafaga");
  try {
    res.clearCookie("jai", {
      // httpOnly: true,
      // domain: "127.0.0.1",
      // sameSite: "none",
      // path: "/",
      // secure: true,
    });

    // res.cookie("jai", "dummy", {
    //   expires: new Date(Date.now() + 10000),
    //   // domain: "127.0.0.1 ",
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   path: "/",
    // });

    // res.clearCookie("jai");
    res.send("good");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.coo = (req, res) => {
  // console.log(req.cookies);
  const cookiedata = req.cookies;
  res.send({ cookiedata: cookiedata });
};
