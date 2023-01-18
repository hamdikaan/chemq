import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { questions } from "./schemas";
import { latex } from "./schemas/latex";

export default defineConfig({
  name: "default",
  title: "studio",

  projectId: "ob846hxo",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [questions, latex],
  },
});
