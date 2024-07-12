"use client";

export default ({ error }) => {
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
    </>
  );
};
