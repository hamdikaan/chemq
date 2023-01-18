import { defineType } from "sanity";
import { LatexPreview } from "../components/LatexPreview";

export const latex = defineType({
  title: "latex",
  type: "object",
  name: "latex",
  components: { preview: LatexPreview },
  fields: [
    {
      title: "Formül",
      name: "body",
      type: "text",
      initialValue: "\\ce{}",
    },
  ],
  preview: {
    select: {
      body: "body",
    },
  },
});
