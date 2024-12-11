/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutUs } from "../constant/data";
import AboutUsCard from "../ui/AboutUs/AboutUsCard";
import { useInView } from "react-intersection-observer";

const StackedCardsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a state to track the current card index
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Animation variants for the stacked card effect
  const cardVariants = {
    initial: (index) => ({
      y: index * 20, // Slight vertical offset
      scale: 1 - index * 0.05, // Scaling down for cards behind
      zIndex: aboutUs.length - index,
      opacity: index === 0 ? 1 : 0.7,
    }),
    stacked: (index) => {
      const yOffset =
        index === activeCardIndex
          ? -index * 20
          : index > activeCardIndex
          ? (index - activeCardIndex) * 20
          : -index * 20;

      return {
        y: yOffset,
        scale: 1 - Math.abs(index - activeCardIndex) * 0.05,
        zIndex: aboutUs.length - Math.abs(index - activeCardIndex),
        opacity:
          index === activeCardIndex
            ? 1
            : Math.max(0.5, 1 - Math.abs(index - activeCardIndex) * 0.2),
      };
    },
  };

  // Handle mouse wheel interaction
  const handleWheel = (event) => {
    if (event.deltaY > 0 && activeCardIndex < aboutUs.length - 1) {
      // Scroll down
      setActiveCardIndex((prev) => Math.min(prev + 1, aboutUs.length - 1));
    } else if (event.deltaY < 0 && activeCardIndex > 0) {
      // Scroll up
      setActiveCardIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col gap-5 relative">
      {aboutUs.map((item, index) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        });

        return (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <AboutUsCard aboutDetails={item} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StackedCardsSection;
