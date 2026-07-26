const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =======================
// Register
// =======================
exports.register = async (req, res) => {

  try {

    console.log("===== REGISTER API CALLED =====");
    console.log(req.body);


    const {
      fullName,
      email,
      password,
      role
    } = req.body;


    if(!fullName || !email || !password){
      return res.status(400).json({
        success:false,
        message:"Please provide all required fields"
      });
    }


    const existingUser = await User.findOne({
      email
    });


    if(existingUser){

      return res.status(400).json({
        success:false,
        message:"Email already exists"
      });

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await User.create({

      fullName,
      email,
      password:hashedPassword,
      role: role || "candidate"

    });



    res.status(201).json({

      success:true,
      message:"User registered successfully",

      user:{
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role
      }

    });



  }
  catch(error){

    console.log("REGISTER ERROR:",error);


    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};




// =======================
// Login
// =======================

exports.login = async(req,res)=>{


try{


const {
email,
password
}=req.body;



console.log("LOGIN DATA:",email,password);



if(!email || !password){

return res.status(400).json({

success:false,
message:"Email and password required"

});

}




const user = await User.findOne({
email
});



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}




console.log("USER FOUND:",user.email);



const isMatch = await bcrypt.compare(
password,
user.password
);



console.log("PASSWORD MATCH:",isMatch);



if(!isMatch){

return res.status(401).json({

success:false,
message:"Invalid password"

});

}





if(!process.env.JWT_SECRET){

return res.status(500).json({

success:false,
message:"JWT_SECRET missing"

});

}





const token = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);





res.status(200).json({

success:true,

message:"Login Successful",

token,


user:{

id:user._id,
fullName:user.fullName,
email:user.email,
role:user.role

}


});



}
catch(error){

console.log("LOGIN ERROR:",error);


res.status(500).json({

success:false,
message:error.message

});


}


};






// =======================
// Get Profile
// =======================

exports.getProfile = async(req,res)=>{


try{


const user = await User.findById(
req.user.id
)
.select("-password");



res.status(200).json({

success:true,
user

});


}
catch(error){


res.status(500).json({

success:false,
message:error.message

});


}


};





// =======================
// Admin Dashboard
// =======================

exports.adminDashboard = async(req,res)=>{


try{


res.status(200).json({

success:true,
message:"Welcome Admin 👑"

});


}
catch(error){


res.status(500).json({

success:false,
message:error.message

});


}


};