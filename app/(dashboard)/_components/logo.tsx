import Image from "next/image";
import Link from "next/link";

export const Logo = (): JSX.Element => {
  return (
    <Link href="/">
      <Image src="/logo.svg" height={50} width={50} alt="/logo" />
    </Link>
  );
};
