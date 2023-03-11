"use client"

import { useEffect, useState } from "react"
import { ThemeConfig } from "tailwindcss/types/config"
import { delay } from "@/app/utils"
import { motion } from "framer-motion"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "@/tailwind.config"

const theme = resolveConfig(tailwindConfig).theme as ThemeConfig
const COLORS = [
  ...Object.values((theme.colors as any).red as string[]),
  ...Object.values((theme.colors as any).green as string[]),
  ...Object.values((theme.colors as any).sky as string[]),
  ...Object.values((theme.colors as any).orange as string[]),
]

function pickPercentage() {
  return Math.random() * 100 + "%"
}

function Circle() {
  const [cx, setCx] = useState(pickPercentage())
  const [cy, setCy] = useState(pickPercentage())
  useEffect(() => {
    const cancel = new AbortController()
    async function loop() {
      while (true) {
        const rand = Math.random() * 5000
        try {
          await delay(rand, cancel.signal)
        } catch {
          return
        }

        setCx(pickPercentage())
        setCy(pickPercentage())
      }
    }
    loop()
    return () => cancel.abort("unmounted")
  }, [])
  return <circle cx={cx} cy={cy} r="2.25rem" fill="rgba(255, 255, 255, 1)" />
}

function Background() {
  const circles = []
  for (let i = 0; i < 400; i++) {
    circles.push(<Circle key={i} />)
  }
  return <svg className="absolute inset-0 z-10 h-full w-full">{circles}</svg>
}

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export default function Index() {
  const [color, setColor] = useState(pickColor())
  useEffect(() => {
    const cancel = new AbortController()
    async function loop() {
      while (true) {
        const rand = Math.random() * 2000 + 750
        try {
          await delay(rand, cancel.signal)
        } catch {
          return
        }

        setColor(pickColor())
      }
    }
    loop()
    return () => cancel.abort("unmounted")
  }, [])

  return (
    <>
      <Background />
      <motion.main
        animate={{ backgroundColor: color }}
        className="c-page relative min-h-screen sm:flex sm:items-center sm:justify-center"
      >
        <div className="absolute top-0 left-0 py-2 px-2 text-5xl font-bold text-white sm:px-6 sm:py-4">
          LJU
        </div>
        <div className="relative sm:pb-16 sm:pt-8"></div>
      </motion.main>
    </>
  )
}
