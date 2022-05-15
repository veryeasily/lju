import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { delay } from "~/utils";

const fullConfig = resolveConfig(tailwindConfig);
const COLORS = [
  ...Object.values((fullConfig.theme.colors as any).red as string[]),
  ...Object.values((fullConfig.theme.colors as any).green as string[]),
];

console.log("fullConfig.theme.colors", fullConfig.theme.colors);

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

async function updateColor(
  setter: (color: string) => void,
  signal = new AbortController().signal
) {
  const rand = Math.random() * 1000;
  try {
    await delay(rand, signal);
  } catch {
    return;
  }
  setter(pickColor());
  updateColor(setter, signal);
}

export default function Index() {
  const [color, setColor] = useState(pickColor());
  useEffect(() => {
    const cnt = new AbortController();
    updateColor(setColor, cnt.signal);
    return () => cnt.abort("unmounted");
  }, []);

  return (
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
  );
}
