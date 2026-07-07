import { useEffect, useState } from 'react'

export function useTypewriter(words: string[], speed = 70) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(word.slice(0, charIndex + 1))
          if (charIndex + 1 === word.length) {
            setTimeout(() => setDeleting(true), 2200)
          } else {
            setCharIndex((c) => c + 1)
          }
        } else {
          setDisplay(word.slice(0, charIndex - 1))
          if (charIndex - 1 === 0) {
            setDeleting(false)
            setWordIndex((w) => w + 1)
            setCharIndex(0)
          } else {
            setCharIndex((c) => c - 1)
          }
        }
      },
      deleting ? speed / 2.5 : speed,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, speed, wordIndex, words])

  return display
}
