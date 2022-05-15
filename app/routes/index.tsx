import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { delay } from "~/utils";

const fullConfig = resolveConfig(tailwindConfig);
const COLORS = [
  ...Object.values((fullConfig.theme.colors as any).red as string[]),
  ...Object.values((fullConfig.theme.colors as any).green as string[]),
  ...Object.values((fullConfig.theme.colors as any).sky as string[]),
  ...Object.values((fullConfig.theme.colors as any).orange as string[]),
];

function pickPercentage() {
  return Math.random() * 100 + "%";
}

function Circle() {
  const [cx, setCx] = useState(pickPercentage());
  const [cy, setCy] = useState(pickPercentage());
  useEffect(() => {
    const ctrl = new AbortController();
    async function loop() {
      while (true) {
        const rand = Math.random() * 5000;
        try {
          await delay(rand, ctrl.signal);
        } catch {
          return;
        }

        setCx(pickPercentage());
        setCy(pickPercentage());
      }
    }
    loop();
  }, []);
  return <circle cx={cx} cy={cy} r="3%" fill="white" />;
}

function Background() {
  const circles = [];
  for (let i = 0; i < 100; i++) {
    circles.push(<Circle key={i} />);
  }
  return <svg className="absolute inset-0 z-10 h-full w-full">{circles}</svg>;
}

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

async function loopChanges(
  setColor: (color: string) => void,
  signal = new AbortController().signal
) {
  while (true) {
    const rand = Math.random() * 2000 + 750;
    try {
      await delay(rand, signal);
    } catch {
      return;
    }

    setColor(pickColor());
  }
}

export default function Index() {
  const [color, setColor] = useState(pickColor());
  useEffect(() => {
    const cnt = new AbortController();
    loopChanges(setColor, cnt.signal);
    return () => cnt.abort("unmounted");
  }, []);

  return (
    <>
      <Background />
      <motion.main
        animate={{ backgroundColor: color }}
        className="c-page relative min-h-screen sm:flex sm:items-center sm:justify-center"
      >
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-7xl py-2 px-4 text-5xl font-bold text-white sm:px-6 lg:px-8">
            LJU
          </div>
        </div>
      </motion.main>
    </>
  );
}
