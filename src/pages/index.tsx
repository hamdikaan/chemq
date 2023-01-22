import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Question from "@/components/Question";
import Timer from "@/components/Timer";
import Counter from "@/components/Counter";
import { TQuestion } from "@/types";
import { client } from "../../lib/sanity";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

interface Props {
  data: TQuestion[];
}

export default function Home({ data }: Props) {
  const [c, setC] = useState<number>(0);
  const [s, setS] = useState<number>();

  function change(prev: boolean) {
    setS(undefined);
    if (prev) setC(c === 0 ? data.length - 1 : c - 1);
    else setC(c === data.length - 1 ? 0 : c + 1);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary">
      <div className="w-[40%] h-[60%]">
        <Question {...data[c]} s={s} setS={setS} />
        <div className="w-full h-[10%] flex justify-between mt-4">
          <button className="button" onClick={() => change(true)}>
            Önceki
          </button>
          <button className="button" onClick={() => change(false)}>
            Sonraki
          </button>
        </div>
      </div>
      <div className="ml-16 w-[15%] h-[60%] flex justify-between flex-col">
        <Timer />
        <Counter />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await client.fetch('*[_type == "questions"]');
  return {
    props: {
      data,
    },
  };
}
