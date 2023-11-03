import Link from "next/link";
import React from "react";
import { Instagram, Facebook, Home, Phone } from "react-feather";
import Image from "next/image";
import logo from "../../../assets/logo_color.png";

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer
      className={`footer ${className ?? ""} bg-ll-black px-10 py-5 text-white`}
    >
      <div className="">
        <span className="footer-title">About us</span>
        <div className="flex gap-3">
          <Image src={logo} alt="website logo" className="w-10" />
          <p>
            Learned Local
            <br />
            Creating experiences since 2023
          </p>
        </div>
      </div>
      <div>
        <span className="footer-title">Address and Phone</span>
        <div className="flex items-center gap-2">
          <Home />
          <p>
            11124 N 6000 W
            <br />
            Highland, UT 84003
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Phone />
          <p>(385) 309-3194</p>
        </div>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/learnedlocal/" target="_blank">
            <Instagram />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100092194838632"
            target="_blank"
          >
            <Facebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
