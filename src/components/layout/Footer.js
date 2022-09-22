import React from "react";
import Facebook from "../../icons/Facebook";
import WhatsApp from "../../icons/WhatsApp";
import ContactUs from "../../icons/ContactUs";
import Twitter from "../../icons/Twitter";
import Button from "../actions/Button";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

function Footer() {
  return (
    <footer className=" left-0 bottom[-1000000000px] w-full">
      <EmailShareButton
        subject="You gonna like it !"
        body="https://shary-meal-front.vercel.app/ is awesome !"
        separator="-"
      >
        <Button icon={<ContactUs />} showIcon></Button>
      </EmailShareButton>

      <FacebookShareButton children="share" url={window.location.href}>
        <Facebook />
      </FacebookShareButton>

      <TwitterShareButton children="share" url={window.location.href}>
        <Twitter />
      </TwitterShareButton>

      <WhatsappShareButton children="share" url={window.location.href}>
        <WhatsApp />
      </WhatsappShareButton>
    </footer>
  );
}

export default Footer;
