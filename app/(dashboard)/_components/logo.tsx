import Image from "next/image";

export const Logo = (): JSX.Element => {
    return (
        <Image
            src="/logo.svg"
            height={130}
            width={130}
            alt="/logo"
        />
    );
}