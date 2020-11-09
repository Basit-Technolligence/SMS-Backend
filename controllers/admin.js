const db = require("../database/admin");

const addLogin = async (req, res) => {
  try {
    console.log('login ',req.body)
    const response = await db.collection("admins").doc(req.body.username).get();
    const data = await response.data();
    console.log('data',data)
    if(!data){
    await db.collection("admins").doc(req.body.username).set(req.body);
    res.send("DATA_ADDED");
    }else{
      res.send('USERNAME_EXIST')
    }
  } catch (e) {
    res.send(e);
  }
  //  try {
//     await admin.auth().createUser(req.body.email,req.body.password)
//     .catch((error)=>{
//       switch(error.code){
//         case "auth/invalid-email":
//           res.send("Invalid Email");
//         case "auth/email-already-in-use":
//           res.send("Email already exist");
//         case "auth/weak-password":
//           res.send("Weak password")
//       }
//     })
//       res.status(200).send("Inserted Successfully");
//   } catch (e) {
//     res.send("Fail to Insert " + e);
//   }
};



const login = async (req, res)=>{
  try {
    const response = await db.collection("admins").doc(req.body.username).get();
    const data = await response.data();
    if(data.password === req.body.password)
     res.send("LOGIN_SUCCESS");
    else
      res.send("LOGIN_FAIL");
  } catch (e) {
    res.send(e);
  }
  // try {
  //   await admin.auth().getUser(req.body.email,req.body.password)
  //   .catch((error)=>{
  //     switch(error.code){
  //       case "auth/invalid-email":
  //         res.send("Invalid Email");
  //       case "auth/user-not-found":
  //         res.send("Not valid login credentials");
  //       case "auth/wrong-password":
  //         res.send("Wrong password")
  //     }
  //   })
  //     res.status(200).send("Login success");
  // } catch (e) {
  //   res.send("Error" + e);
  // }
}
const logout = async (req,res)=>{
  try{
    await db.auth().signOut();
    res.send('Logout success');
  }catch(e){
    res.send('Error')
  }
};

const changePassword = async (req, res) => {
  try {
    await db.collection("admins").doc('asd').update(req.body);
    res.send("UPDATED_DATA");
  } catch (e) {
    res.send(e);
  }
};

const authListen=async (req,res)=>{
  try{
    await db.auth().onAuthStateChanged((user)=>{
      if(user)
        res.send(user)
      else
        res.send('Not logged in')
    })
  }catch(e){
    res.send('Error')
  }
}

// const updateAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndUpdate(req.params.id, req.body);
//     if (!admin) {
//       return res.send("Invalid Data");
//     }
//     res.send("Updated Successfully");
//   } catch (e) {
//     res.send("Fail to Update");
//   }
// };

// const deleteAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndDelete(req.params.id);
//     if (!admin) {
//       return res.send("Invalid Data");
//     }
//     res.send("Deleted Successfully");
//   } catch (e) {
//     res.send("Fail to Delete");
//   }
// };

exports.login = login;
exports.addLogin = addLogin;
exports.logout=logout;
exports.changePassword = changePassword;
exports.authListen = authListen;
