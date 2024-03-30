import Image from "next/image";

export const Logo = (): JSX.Element => {
  return <Image src="/logo.svg" height={50} width={50} alt="/logo" />;
};
