"use client";

import { useFormState, useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

import { handlePost } from "@services/actions";

export default () => {
  const [state, action] = useFormState(handlePost, {
    status: "ready",
    message: null,
  });
  const status = useFormStatus();

  return (
    <form action={action}>
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p className="form-control">
        <label htmlFor="authorName">Name</label>
        <input type="text" id="authorName" name="authorName" required />
      </p>
      <p className="form-control">
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
          required
        />
      </p>
      <p className="form-control">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      {state.status === "error" && <p>{state.message}</p>}
      <p className="form-actions">
        <button type="reset">Reset</button>
        <button type="submit" disabled={status.pending}>
          {status.pending ? <BeatLoader color="#F9572A" /> : "Create Post"}
        </button>
      </p>
    </form>
  );
};
