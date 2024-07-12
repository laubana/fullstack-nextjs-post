"use client";

import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { handlePost } from "@services/forms";

export default () => {
  // TODO
  // 169
  // const [state, action] = useFormState(handlePost, {
  //   status: "ready",
  //   message: null,
  // });
  // const status = useFormStatus();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({ status: "ready", message: null });

  return (
    <form
      action={async (formData) => {
        try {
          const response = await handlePost(formData);

          if (response) {
            setState(response);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }}
      // TODO
      // 169
      // action={action}
      onSubmit={() => setIsSubmitting(true)}
    >
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <BeatLoader color="#EEE7EA" /> : "Create Post"}
        </button>
        {/* TODO */}
        {/* 169 */}
        {/* <button type="submit" disabled={status.pending}>
          {status.pending ? <BeatLoader color="#F9572A" /> : "Share Meal"}
        </button> */}
      </p>
    </form>
  );
};
