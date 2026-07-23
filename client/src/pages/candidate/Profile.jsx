import { useState } from "react";
import { uploadResume } from "../../services/userService";

const Profile = () => {

    const [resume,setResume]=useState(null);

    const handleUpload=async(e)=>{

        e.preventDefault();

        if(!resume){
            return alert("Select Resume");
        }

        try{

            const data=await uploadResume(resume);

            alert(data.message);

        }catch(error){

            alert(error.response?.data?.message);

        }

    }

    return(

        <div className="max-w-xl">

            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

            <form onSubmit={handleUpload}>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e)=>setResume(e.target.files[0])}
                />

                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
                >
                    Upload Resume
                </button>

            </form>

        </div>

    )

}

export default Profile;