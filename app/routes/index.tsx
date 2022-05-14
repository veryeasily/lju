import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fullConfig = resolveConfig(tailwindConfig);
const COLORS = [
  ...Object.values((fullConfig.theme.colors as any).red as string[]),
  ...Object.values((fullConfig.theme.colors as any).green as string[]),
];

console.log("fullConfig.theme.colors", fullConfig.theme.colors);

function randColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function Index() {
  const [color, setColor] = useState(randColor());
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function updateColor() {
      setColor(randColor());
      const rand = Math.floor(Math.random() * 1000);
      timeout = setTimeout(updateColor, rand);
    }
    updateColor();
    return () => timeout && clearTimeout(timeout);
  }, []);

  return (
    <motion.main
      className="relative min-h-screen sm:flex sm:items-center sm:justify-center"
      animate={{
        backgroundColor: color,
      }}
    >
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl py-2 px-4 text-5xl font-bold text-white sm:px-6 lg:px-8">
          LJU
        </div>
      </div>
    </motion.main>
  );
}
