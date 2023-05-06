import logo from "../../assets/logo_color.png";
import Image from "next/image";

import React from "react";
import { Instagram } from "react-feather";

const Footer = () => {
  return (
    <footer className="footer flex-1 bg-neutral p-10 text-neutral-content">
      <div>
        <Image src={logo} alt="website logo" className="w-10" />
        <p>
          Learned Local
          <br />
          Creating experiences since 2023
        </p>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/learnedlocal/">
            <Instagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
