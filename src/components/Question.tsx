import { Inter } from "@next/font/google";
import { useState, Dispatch, SetStateAction } from "react";
import { PortableText } from "@portabletext/react";
import { TQuestion } from "@/types";
import katex from "katex";
import "katex/contrib/mhchem";
import "katex/dist/katex.min.css";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

interface Props extends TQuestion {
  setS: Dispatch<SetStateAction<number | undefined>>;
  s: number | undefined;
}

const Question = (props: Props) => {
  const prefix = ["A", "B", "C", "D", "E"];

  return (
    <div className="w-full h-full bg-light rounded-3xl p-6">
      <div className="h-2/5 flex flex-col">
        {props.equations.map(v => (
          <span
            key={v._key}
            className="flex items-center justify-center text-xl mb-5"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(v.body),
            }}
          ></span>
        ))}
        <div className={inter.className + "p-4 text-xl"}>
          <PortableText value={props.question} />
        </div>
      </div>
      <div className="h-3/5">
        {props.choices.map((v, i) => {
          let color = "";
          if (props.s === i && props.s === props.answer - 1) {
            color = "#4b7364";
          } else if (props.s === i && props.s !== props.answer - 1) {
            color = "#bc4d3e";
          } else if (props.s !== undefined && i === props.answer - 1) {
            color = "#4b7364";
          }

          const style = {
            backgroundColor: color,
          };

          return (
            <div
              className={"flex h-1/5 w-full group cursor-pointer"}
              key={`choice-${i}`}
              onClick={() => props.setS(i)}
            >
              <div
                className="choice w-14 justify-center text-white text-2xl font-bold"
                style={style.backgroundColor === "" ? {} : style}
              >
                {prefix[i]}
              </div>
              <div className="choice w-full p-4 ml-4 text-lg group-hover:text-white">
                {v}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//bc4d3e #4b7364

export default Question;
