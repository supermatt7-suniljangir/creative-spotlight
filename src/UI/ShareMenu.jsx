import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { twMerge } from "tailwind-merge";

const ShareMenu = ({ destinationurl, reference, styles }) => {
  return (
    <div
      ref={reference}
      className={twMerge(
        "fixed flex space-x-4 w-auto md:p-12 p-4 z-[1] shadow-lg rounded-md",
        styles
      )}
    >
      <h3 className="text-xl">share via: </h3>
      <FacebookShareButton url={destinationurl}>
        <FacebookIcon size={28} round />
      </FacebookShareButton>
      <TwitterShareButton url={destinationurl}>
        <TwitterIcon size={28} round />
      </TwitterShareButton>
      <WhatsappShareButton url={destinationurl}>
        <WhatsappIcon size={28} round />
      </WhatsappShareButton>
      <EmailShareButton url={destinationurl}>
        <EmailIcon size={28} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareMenu;
