import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Question from "@/components/Question";
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
    <div className="flex items-center justify-center w-screen h-screen bg-secondary flex-col">
      <Question {...data[c]} s={s} setS={setS} />
      <div className="w-[45%] h-[7.2%] flex justify-between m-4">
        <button className="button" onClick={() => change(true)}>
          Önceki
        </button>
        <button className="button" onClick={() => change(false)}>
          Sonraki
        </button>
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
