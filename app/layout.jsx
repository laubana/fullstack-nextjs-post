import "./globals.css";
import Header from "@components/Header/Header";

export const metadata = {
  title: "NextPosts",
  description: "Browse and share amazing posts.",
};

export default ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};
