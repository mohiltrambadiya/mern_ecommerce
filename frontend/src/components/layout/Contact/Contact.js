import React from "react";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mohiltrambadiya@gmail.com">
        <Button>Contact: mohiltrambadiya@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;