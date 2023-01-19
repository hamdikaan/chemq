import { PortableTextProps } from "@portabletext/react";

export interface TQuestion {
  answer: number;
  choices: string[];
  equations: {
    body: string;
    _key: string;
  }[];
  question: PortableTextProps["value"];
  _createdAt: Date;
  _id: string;
}
