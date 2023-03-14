import React from "react";
import TextField from "./TextField";

export default {
  title: "TextField",
  component: TextField,
};

function Template(args) {
  return <TextField {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
