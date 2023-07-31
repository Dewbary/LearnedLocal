import React from "react";
import { Instagram, Facebook, Home, Phone } from "react-feather";

const Footer = () => {
  return (
    <footer className="footer bg-slate-700 px-10 py-5 text-white">
      <div className="">
        <span className="footer-title">About us</span>
        <div className="flex gap-3">
          <img src="logo_color.png" alt="website logo" className="w-10" />
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
            580 S 100 W St
            <br />
            Provo, UT 84601
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Phone />
          <p>(385) 268-0372</p>
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
