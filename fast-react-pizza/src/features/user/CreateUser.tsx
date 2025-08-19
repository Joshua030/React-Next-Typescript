import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import { ButtonTypes } from "../../../types";
import { useAppDispatch } from "../../hooks";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu"); // Redirect to the menu page after setting the username
    setUsername(""); // Clear the input field after submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-72"
      />

      {username !== "" && (
        <div>
          <Button type={ButtonTypes.primary}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
