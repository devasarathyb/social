import React, { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const queryClient = useQueryClient();
  const [value, setValue] = useState({
    name: "",
    city: "",
    website: "",
  });

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  console.log(user);
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverpic;
    profileUrl = profile ? await upload(profile) : user.profilepic;
    mutation.mutate({ ...value, coverpic: coverUrl, profilepic: profileUrl });

    setOpenUpdate(false);
  };

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverpic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilepic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input type="name" name="name" onChange={handleChange} />
          <label>Country / City</label>
          <input type="city" name="city" onChange={handleChange} />
          <label>Website</label>
          <input type="website" name="website" onChange={handleChange} />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
