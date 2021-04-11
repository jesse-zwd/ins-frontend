import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../styles/Button";
import Avatar from "../styles/Avatar";
import useInput from "../hooks/useInput";
import { UserContext } from "../context/UserContext";
import { uploadImage } from "../utils";
import authHeader from "../services/header";
import http from "../services/http";

export const Wrapper = styled.div`
  padding: 1rem;

  img {
    cursor: pointer;
    margin-right: 40px;
  }

  .input-group {
    margin-top: 1.5rem;
  }

  .input-group > label {
    display: inline-block;
    width: 100px;
  }

  input,
  textarea {
    padding: 0.4rem 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
    width: 350px;
  }

  .textarea-group {
    display: flex;
  }

  .change-avatar {
    display: flex;
  }

  input[id="change-avatar"],
  input[id="change-avatar-link"] {
    display: none;
  }

  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }

  button {
    margin-top: 1.5rem;
    margin-left: 6.25rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 550px) {
    width: 98%;

    .input-group {
      display: flex;
      flex-direction: column;
    }

    label {
      padding-bottom: 0.5rem;
      font-size: 1rem;
    }

    button {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 430px) {
    input,
    textarea {
      width: 99%;
    }
  }
`;

const ProfileForm = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [newAvatar, setNewAvatar] = useState("");

  const firstname = useInput(user.first_name);
  const lastname = useInput(user.last_name);
  const nickname = useInput(user.nickname);
  const bio = useInput(user.bio);
  const website = useInput(user.website);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      uploadImage(e.target.files[0]).then((res) =>
        setNewAvatar(res.secure_url)
      );
    }
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    if (!firstname.value) {
      return toast.error("The firstname field should not be empty");
    }

    if (!lastname.value) {
      return toast.error("The lastname field should not be empty");
    }

    if (!nickname.value) {
      return toast.error("The nickname field should not be empty");
    }

    const body = {
      first_name: firstname.value,
      last_name: lastname.value,
      nickname: nickname.value,
      bio: bio.value,
      website: website.value,
      avatar: newAvatar || user.avatar,
    };

    http.put(`users/${user.id}/`, body, {headers: authHeader()})
      .then((res) => {
        user.last_name = res.data.last_name
        user.first_name = res.data.first_name
        user.bio = res.data.bio
        user.website = res.data.website
        user.avatar = res.data.avatar
        user.nickname = res.data.nickname
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        history.push(`/${user.id}`);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Wrapper>
      <form onSubmit={handleEditProfile}>
        <div className="input-group change-avatar">
          <div>
            <label htmlFor="change-avatar">
              <Avatar
                lg
                src={newAvatar ? newAvatar : user.avatar}
                alt="avatar"
              />
            </label>
            <input
              id="change-avatar"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          <div className="change-avatar-meta">
            <h2>{user.nickname}</h2>
            <label htmlFor="change-avatar-link">
              <span>Change Profile Photo</span>
            </label>
            <input
              id="change-avatar-link"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="bold">Firstname</label>
          <input
            type="text"
            value={firstname.value}
            onChange={firstname.onChange}
          />
        </div>
        <div className="input-group">
          <label className="bold">Lastname</label>
          <input
            type="text"
            value={lastname.value}
            onChange={lastname.onChange}
          />
        </div>

        <div className="input-group">
          <label className="bold">Nickname</label>
          <input
            type="text"
            value={nickname.value}
            onChange={nickname.onChange}
          />
        </div>

        <div className="input-group">
          <label className="bold">Website</label>
          <input
            type="text"
            value={website.value}
            onChange={website.onChange}
          />
        </div>

        <div className="input-group textarea-group">
          <label className="bold">Bio</label>
          <textarea
            cols="10"
            value={bio.value}
            onChange={bio.onChange}
          ></textarea>
        </div>

        <Button>Submit</Button>
      </form>
    </Wrapper>
  );
};

export default ProfileForm;
