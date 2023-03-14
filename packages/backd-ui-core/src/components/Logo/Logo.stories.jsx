import React from "react";
import Logo from "./Logo";

export default {
  title: "Logo",
  component: Logo,
};

function Template(args) {
  return <Logo {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
