import React from "react";
import Facebook from "../../icons/Facebook";
import Instagram from "../../icons/Instagram";
import ContactUs from "../../icons/ContactUs";
import Twitter from "../../icons/Twitter";
import Button from "../actions/Button";

function Footer() {
  return (
    <footer className=" left-0 bottom-0 w-full">
      <a href="mailto:contact@sharymeal.com">
        <Button icon={<ContactUs />} showIcon></Button>
      </a>
      <Facebook />
      <Twitter />
      <Instagram />
    </footer>
  );
}

export default Footer;
