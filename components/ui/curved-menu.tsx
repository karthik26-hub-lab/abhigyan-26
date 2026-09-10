"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
  onRegisterClick?: () => void;
}

interface iHeaderProps {
  navItems?: iNavItem[];
  onRegisterClick?: () => void;
}

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const defaultNavItems: iNavItem[] = [
  { heading: "Home", href: "#home" },
  { heading: "About", href: "#about" },
  { heading: "Events", href: "#events" },
  { heading: "Venue", href: "#venue" },
  { heading: "FAQ", href: "#faq" },
];

const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = () => {
    setIsActive(false);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/15 py-3 transition-colors duration-300 uppercase"
    >
      <Link ref={ref} onMouseMove={handleMouseMove} href={href} className="w-full">
        <div className="relative flex items-center">
          <span className="text-amber-400 font-mono text-2xl md:text-3xl font-light mr-3">
            {index}.
          </span>
          <div className="flex flex-row gap-1">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 8 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.05,
                delayChildren: 0.1,
              }}
              className="relative z-10 block text-2xl md:text-3xl font-bold tracking-wider text-slate-100 transition-colors duration-300 group-hover:text-amber-400"
            >
              {heading.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: 6 },
                  }}
                  transition={{ type: "spring" }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Curve: React.FC = () => {
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  React.useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full pointer-events-none"
      style={{ fill: "#050a18" }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

const CurvedNavbar: React.FC<iCurvedNavbarProps> = ({
  setIsActive,
  navItems,
  onRegisterClick,
}) => {
  return (
    <>
      {/* Dimmed backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsActive(false)}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      {/* Sliding curved drawer */}
      <motion.div
        variants={MENU_SLIDE_ANIMATION}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-[100dvh] w-[85vw] max-w-sm fixed right-0 top-0 z-50 bg-[#050a18] border-l border-amber-400/20 text-white shadow-2xl flex flex-col justify-between"
      >
        <div className="h-full pt-8 pb-8 px-8 flex flex-col justify-between">
          <div>
            {/* Header with Navigation label & Close button */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                aria-label="Close navigation"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  {...item}
                  setIsActive={setIsActive}
                  index={index + 1}
                />
              ))}
            </nav>
          </div>

          {/* Footer with Register button replacing social icons */}
          <div className="pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsActive(false);
                if (onRegisterClick) onRegisterClick();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold tracking-wide transition-all duration-200 shadow-lg shadow-amber-400/20 active:scale-[0.98]"
            >
              Register
            </button>
          </div>
        </div>

        <Curve />
      </motion.div>
    </>
  );
};

export const Header: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  onRegisterClick,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        aria-label="Toggle navigation"
        className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-1.5 p-2"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            isActive ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
            isActive ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            isActive ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <AnimatePresence mode="wait">
        {isActive && (
          <CurvedNavbar
            setIsActive={setIsActive}
            navItems={navItems}
            onRegisterClick={onRegisterClick}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
