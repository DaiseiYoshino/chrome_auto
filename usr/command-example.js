import {CommandFunc} from "../lib/CommandFunc.js";

const takeSS = new CommandFunc({
  description: 'Take Screenshot.',
  func() {return 'In progress...'},
  option: 'ss'
})

const root = new CommandFunc({
  option: ''
});

root.addCommand(takeSS);

export const commands = root;
