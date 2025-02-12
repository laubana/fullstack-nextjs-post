import Image from "next/image";
import Link from "next/link";

export default () => {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={600}
          height={600}
          sizes="10vw"
          alt="logo"
          priority
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
