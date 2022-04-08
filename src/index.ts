#!/usr/bin/env node

import { Command } from "commander";
import { showRandomHighlight } from "./showRandom";
import { syncHighlights } from "./syncHiglights";

const program = new Command();

program
  .name("kindle-highlights")
  .version("0.0.1")
  .description("Show a random Kindle Highlight");

program
  .command("highlight")
  .action(() => {
    showRandomHighlight();
  })
  .description("Show a random Kindle Highlight");

program
  .command("update")
  .description("Update Kindle Highlights")
  .argument("<username>", "Amazon username")
  .argument("[password]", "Amazon password")
  .option("--exec <exec>", "Executable path for custom browser", "")
  .action(async (username, password, option) => {
    await syncHighlights(username, password, option.exec);
  });

program.parse(process.argv);
