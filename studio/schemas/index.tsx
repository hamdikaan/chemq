import { defineType, defineField } from "@sanity/types";

export const questions = defineType({
  title: "Sorular",
  name: "questions",
  type: "document",
  fields: [
    defineField({
      title: "Tepkime",
      name: "equation",
      type: "array",
      of: [{ type: "latex" }],
      validation: rule => rule.required(),
    }),
    defineField({
      title: "Soru",
      name: "question",
      type: "array",
      of: [{ type: "block" }],
      validation: rule => rule.required(),
    }),
    defineField({
      title: "Seçenekler",
      name: "choices",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      initialValue: ["A", "B", "C", "D", "E"],
      validation: rule => rule.required().length(5),
    }),
    defineField({
      title: "Cevap",
      name: "answer",
      type: "number",
      validation: rule => rule.required().max(5).min(1),
    }),
  ],
  preview: {
    prepare() {
      const today = new Date();
      return {
        title: today.toLocaleDateString(),
        subtitle: today.toLocaleTimeString(),
        media: (
          <span
            style={{
              fontSize: "1.2rem",
              background: "#000",
              width: "100%",
              height: "100%",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ??
          </span>
        ),
      };
    },
  },
});
