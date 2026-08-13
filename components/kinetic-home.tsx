"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  AtSign,
  CalendarDays,
  Check,
  Dumbbell,
  Flame,
  Globe2,
  Instagram,
  Mail,
  Menu,
  MoveVertical,
  Play,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { Link } from "@/lib/navigation";
import styles from "./kinetic-home.module.css";

const chapters = [
  {
    label: "Identity",
    title: ["David", "Knežević"],
    manifesto: "Consistency over talent",
    body: "Elite coaching for ambitious professionals. Personalized training programs built around your life and engineered for measurable results.",
    primary: "Find your training path",
    primaryHref: "/quiz" as const,
    secondary: "Watch the method",
    secondaryHref: "#method",
    accent: "#ff4b2f",
    metricOne: ["10+", "years coaching"],
    metricTwo: ["1:1", "built around you"],
    proofLabel: "Identity / no templates",
    signals: [["Coaching", "1:1"], ["Location", "DXB"], ["Standard", "Elite"]],
  },
  {
    label: "Method",
    title: ["Pressure,", "directed."],
    manifesto: "Precision over noise",
    body: "Every session has a reason. Training load, recovery and nutrition adapt to your schedule instead of competing with it.",
    primary: "Explore the method",
    primaryHref: "/programs" as const,
    secondary: "See the system",
    secondaryHref: "#method",
    accent: "#2ee6c2",
    metricOne: ["04", "adaptive pillars"],
    metricTwo: ["7D", "weekly review"],
    proofLabel: "Method / signal over noise",
    signals: [["Load", "Adaptive"], ["Review", "7 days"], ["Focus", "Precision"]],
  },
  {
    label: "Proof",
    title: ["Proof.", "Not promises."],
    manifesto: "Measured, then improved",
    body: "More than 500 clients guided through a repeatable system—with strength, energy and consistency tracked in the real world.",
    primary: "See the results",
    primaryHref: "/programs" as const,
    secondary: "View the evidence",
    secondaryHref: "#proof-story",
    accent: "#ff4b2f",
    metricOne: ["500+", "clients guided"],
    metricTwo: ["98%", "success signal"],
    proofLabel: "Proof / not promises",
    signals: [["Clients", "500+"], ["Signal", "98%"], ["Tracking", "Weekly"]],
  },
  {
    label: "Start",
    title: ["Your move.", "Start now."],
    manifesto: "Clarity in 60 seconds",
    body: "Answer a few focused questions and get matched with the training path built for your goals, schedule and current level.",
    primary: "Start the assessment",
    primaryHref: "/quiz" as const,
    secondary: "Explore programs",
    secondaryHref: "#method",
    accent: "#f2f1ec",
    metricOne: ["60s", "assessment"],
    metricTwo: ["01", "clear direction"],
    proofLabel: "Start / your next move",
    signals: [["Assessment", "60 sec"], ["Path", "Personal"], ["Action", "Now"]],
  },
];
const ticker = [
  "FOUNDER · DUBAI",
  "EXECUTIVE · LONDON",
  "ATHLETE · NEW YORK",
  "ENTREPRENEUR · SINGAPORE",
  "FOUNDER · BELGRADE",
  "EXECUTIVE · DUBAI",
];

const methodSteps = [
  {
    id: "01",
    label: "Before",
    stage: "The friction",
    title: "Long hours.\nLow energy.",
    copy: "Inconsistent routines, reactive training and progress that never compounds.",
    stat: "0%",
    statLabel: "Momentum",
    accent: "#ff4b2f",
    signals: [["Routine", "Reactive"], ["Training load", "Random"], ["Recovery", "Ignored"]],
  },
  {
    id: "02",
    label: "Method",
    stage: "The system",
    title: "A system that\nbuilds momentum.",
    copy: "Progressive overload, weekly adaptation and habits designed around real life.",
    stat: "04",
    statLabel: "Adaptive pillars",
    accent: "#2ee6c2",
    signals: [["Training", "Progressive"], ["Review", "Weekly"], ["Recovery", "Programmed"]],
  },
  {
    id: "03",
    label: "After",
    stage: "The outcome",
    title: "Strength that\nstays with you.",
    copy: "A measurable strength gain over 12 weeks, built to last beyond the program.",
    stat: "+27.4 kg",
    statLabel: "Strength / 12 weeks",
    accent: "#ff4b2f",
    signals: [["Adherence", "92%"], ["Energy", "Compounding"], ["System", "Repeatable"]],
  },
];

const methodIcons = [Activity, SlidersHorizontal, TrendingUp];

const quizGoals = [
  { value: "fat-loss", label: "Fat loss", detail: "Lean out without losing performance", icon: Flame },
  { value: "muscle", label: "Build muscle", detail: "Add strength, size and structure", icon: Dumbbell },
  { value: "performance", label: "Performance", detail: "Move faster and perform longer", icon: Zap },
];

const quizProfiles = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const navItems = [
  { id: "method", label: "Method", number: "01" },
  { id: "proof-story", label: "Results", number: "02" },
  { id: "assessment", label: "Assessment", number: "03" },
  { id: "contact", label: "Contact", number: "04" },
];

export function KineticHome() {
  const heroRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const methodRef = useRef<HTMLElement>(null);
  const methodTriggerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [heroPercent, setHeroPercent] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizGoal, setQuizGoal] = useState("muscle");
  const [quizDays, setQuizDays] = useState(3);
  const [quizProfile, setQuizProfile] = useState("male");
  const [contactState, setContactState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeNav, setActiveNav] = useState("method");
  const [headerCompact, setHeaderCompact] = useState(false);

  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const imageDriftY = useTransform(heroScrollProgress, [0, 1], [0, -90]);
  const kineticWordX = useTransform(heroScrollProgress, [0, 1], [120, -260]);
  const scanY = useTransform(heroScrollProgress, [0, 1], ["-15%", "115%"]);
  const copyFloatY = useTransform(
    heroScrollProgress,
    [0, .125, .25, .375, .5, .625, .75, .875, 1],
    [0, -22, 0, -22, 0, -22, 0, -22, 0]
  );
  const { scrollYProgress: methodScrollProgress } = useScroll({
    target: methodRef,
    offset: ["start start", "end end"],
  });
  const methodWordX = useTransform(methodScrollProgress, [0, 1], [80, -180]);

  useMotionValueEvent(heroScrollProgress, "change", (value) => {
    const nextPercent = Math.round(value * 100);
    setHeroPercent((current) => current === nextPercent ? current : nextPercent);
  });
  useMotionValueEvent(pageProgress, "change", (value) => {
    const compact = value > 0.012;
    setHeaderCompact((current) => current === compact ? current : compact);
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.chapter);
        if (Number.isFinite(index)) setActiveChapter(index);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, .25, .5, .75, 1] }
    );

    triggerRefs.current.forEach((trigger) => trigger && observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateActiveNav = () => {
      const marker = window.innerHeight * .42;
      let current = "method";
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      });
      setActiveNav((active) => active === current ? active : current);
    };
    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.method);
        if (Number.isFinite(index)) setActiveMethod(index);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, .25, .5, .75, 1] }
    );
    methodTriggerRefs.current.forEach((trigger) => trigger && observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  const chapter = chapters[activeChapter] ?? chapters[0]!;
  const nextChapter = chapters[activeChapter + 1];
  const methodStep = methodSteps[activeMethod] ?? methodSteps[0]!;
  const MethodIcon = methodIcons[activeMethod] ?? Activity;

  const goToChapter = (index: number) => {
    const stage = heroRef.current;
    if (!stage) return;
    setActiveChapter(index);
    window.scrollTo({
      top: stage.offsetTop + index * window.innerHeight + 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const goToMethodStep = (index: number) => {
    const stage = methodRef.current;
    if (!stage) return;
    setActiveMethod(index);
    window.scrollTo({
      top: stage.offsetTop + index * window.innerHeight + 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const assessmentResult = quizGoal === "fat-loss"
    ? "Lean strength protocol"
    : quizGoal === "performance"
      ? "Performance engine"
      : "Progressive strength build";

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactState("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      event.currentTarget.reset();
      setContactState("sent");
    } catch {
      setContactState("error");
    }
  };

  return (
    <div className={`${styles.page} kinetic-home`}>
      <motion.div
        className={styles.pageProgress}
        style={{ scaleX: smoothPageProgress }}
        aria-hidden="true"
      />

      <header className={`${styles.header} ${headerCompact ? styles.headerCompact : ""}`}>
        <Link href="/" className={styles.wordmark} aria-label="David Knežević home">
          <span>David Knežević</span>
          <small>Strength / DXB</small>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeNav === item.id ? styles.navActive : undefined} aria-current={activeNav === item.id ? "location" : undefined}>
              <small>{item.number}</small><span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <span className={styles.navLive}><Activity /><span>Now / <b>{navItems.find(item => item.id === activeNav)?.label}</b></span></span>
          <span className={styles.locale}><Globe2 /> EN</span>
          <a href="#assessment" className={styles.headerCta}>
            <span><small>60-sec assessment</small><b>Find your training path</b></span><ArrowRight />
          </a>
          <details className={styles.mobileMenu}>
            <summary className={styles.menuButton} aria-label="Toggle navigation">
              <Menu className={styles.menuOpenIcon} /><X className={styles.menuCloseIcon} />
            </summary>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              <p><span>Navigation system</span><b>04 sections</b></p>
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={activeNav === item.id ? styles.mobileNavActive : undefined} aria-current={activeNav === item.id ? "location" : undefined} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>
                  <small>{item.number}</small><span>{item.label}</span><ArrowRight />
                </a>
              ))}
              <a href="#assessment" className={styles.mobileNavCta} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}><small>60s</small><span>Find your training path</span><ArrowRight /></a>
              <div><span>Dubai / Online</span><b>EN</b></div>
            </nav>
          </details>
        </div>
      </header>

      <section ref={heroRef} className={styles.heroStage}>
        <div
          className={styles.heroSticky}
          style={{ "--chapter-accent": chapter.accent } as CSSProperties}
        >
          <div className={styles.heroVisual} aria-hidden="true">
            <motion.div className={styles.heroImageParallax} style={prefersReducedMotion ? undefined : { y: imageDriftY }}>
              <motion.div
                className={styles.heroImageWrap}
                animate={prefersReducedMotion ? undefined : {
                  scale: [1.03, 1.12, 1.18, 1.07][activeChapter],
                  x: ["0%", "-7%", "-14%", "-4%"][activeChapter],
                }}
                transition={{ duration: .95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/kinetic/hero-training-sequence.png"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className={styles.heroImage}
                />
              </motion.div>
            </motion.div>
            <div className={styles.heroShade} />
            <motion.div
              key={`wash-${activeChapter}`}
              className={styles.sceneWash}
              style={{ background: chapter.accent }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: activeChapter === 1 ? .11 : activeChapter === 3 ? .07 : .04 }}
              transition={{ duration: .7 }}
            />
            <motion.div
              className={styles.panelGlint}
              animate={prefersReducedMotion ? undefined : { x: [0, 70, 150, 36][activeChapter] }}
              transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div className={styles.scanBeam} style={prefersReducedMotion ? undefined : { y: scanY }} />
          </div>

          <motion.div
            className={styles.kineticWord}
            style={prefersReducedMotion ? undefined : { x: kineticWordX }}
            aria-hidden="true"
          >
            {chapter.label} / {chapter.label} / {chapter.label}
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`scene-${activeChapter}`}
              className={styles.sceneIndex}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.08 }}
              transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}
            >
              0{activeChapter + 1}
            </motion.div>
          </AnimatePresence>

          <aside className={styles.chapterRail} aria-label="Page chapters">
            {chapters.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={index === activeChapter ? styles.chapterActive : undefined}
                onClick={() => goToChapter(index)}
                aria-current={index === activeChapter ? "step" : undefined}
              >
                <span>0{index + 1}</span>
                {item.label}
              </button>
            ))}
            <motion.span
              className={styles.chapterProgress}
              animate={{ scaleY: (activeChapter + 1) / chapters.length }}
              transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}
            />
          </aside>

          <motion.div
            id="identity"
            className={styles.heroCopy}
            data-chapter={activeChapter}
            style={prefersReducedMotion ? undefined : { y: copyFloatY }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeChapter}
                className={styles.chapterCopy}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -24, filter: "blur(6px)" }}
                transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.eyebrow}>
                  <span>Chapter</span><i /> <b>0{activeChapter + 1}</b><span>/ 04</span>
                </div>
                <h1>{chapter.title.map((line) => <span key={line}>{line}</span>)}</h1>
                <p className={styles.manifesto}><i /> {chapter.manifesto}</p>
                <p className={styles.heroBody}>{chapter.body}</p>
                <div className={styles.heroButtons}>
                  <Link href={chapter.primaryHref} className={styles.primaryCta}>
                    {chapter.primary} <ArrowRight />
                  </Link>
                  <a href={chapter.secondaryHref} className={styles.textCta}>
                    <Play /> {chapter.secondary}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className={styles.scrollStatus} aria-hidden="true">
            <span>{nextChapter ? `Next / ${nextChapter.label}` : "Continue / The system"}</span>
            <b>{heroPercent.toString().padStart(2, "0")}%</b>
          </div>

          <div className={styles.scrollRail} aria-hidden="true">
            <span className={styles.scrollRailLabel}>Keep scrolling</span>
            <i><motion.b style={{ scaleY: heroScrollProgress }} /></i>
          </div>

          <motion.div
            className={styles.scrollNavigator}
            animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <MoveVertical />
            <span>
              <b className={styles.desktopScrollLabel}>Scroll</b>
              <b className={styles.mobileScrollLabel}>Swipe</b>
              <small>0{activeChapter + 1} / 04</small>
            </span>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`signals-${activeChapter}`}
              className={styles.sceneTelemetry}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p><span>Live protocol</span><b>0{activeChapter + 1}</b></p>
              {chapter.signals.map(([label, value], index) => (
                <div key={label}>
                  <span>0{index + 1} / {label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className={styles.location}><span /> Dubai / Online</div>

          <div id="proof" className={styles.proofBar}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={`label-${activeChapter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {chapter.proofLabel.split(" / ")[0]} /<br /><strong>{chapter.proofLabel.split(" / ")[1]}</strong>
              </motion.p>
            </AnimatePresence>
            <motion.div key={`metric-a-${activeChapter}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <strong>{chapter.metricOne[0]}</strong><span>{chapter.metricOne[1]}</span>
            </motion.div>
            <motion.div key={`metric-b-${activeChapter}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <strong>{chapter.metricTwo[0]}</strong><span>{chapter.metricTwo[1]}</span>
            </motion.div>
            <p className={styles.proofCopy}>
              <Check /> Programs built around training load, recovery, nutrition &amp; accountability.
            </p>
          </div>
        </div>
        <div className={styles.chapterTriggers} aria-hidden="true">
          {chapters.map((item, index) => (
            <div
              key={item.label}
              ref={(node) => { triggerRefs.current[index] = node; }}
              data-chapter={index}
            />
          ))}
        </div>
      </section>

      <div className={styles.ticker} aria-label="Clients across global cities">
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      <section ref={methodRef} id="method" className={styles.methodSection}>
        <div
          className={styles.methodSticky}
          style={{ "--method-accent": methodStep.accent } as CSSProperties}
        >
          <motion.div
            aria-hidden="true"
            className={styles.methodGhost}
            style={prefersReducedMotion ? undefined : { x: methodWordX }}
          >
            {methodStep.label} / {methodStep.label} / {methodStep.label}
          </motion.div>

          <header className={styles.methodHeader}>
            <p>02 / The system</p>
            <h2>Pressure,<br />directed.</h2>
            <div className={styles.methodHeaderCopy}>
              <span>Not more noise. A training system that responds to the person doing the work.</span>
              <div><b>0{activeMethod + 1} / 03</b><small>Scroll to advance</small></div>
            </div>
          </header>

          <div className={styles.methodEngine}>
            <nav className={styles.methodPhases} aria-label="Method phases">
              {methodSteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={index === activeMethod ? styles.methodPhaseActive : undefined}
                  aria-current={index === activeMethod ? "step" : undefined}
                  onClick={() => goToMethodStep(index)}
                >
                  <span>{step.id}</span>
                  <b>{step.label}</b>
                  <small>{step.stage}</small>
                </button>
              ))}
              <i aria-hidden="true"><motion.span animate={{ scaleY: (activeMethod + 1) / 3 }} /></i>
            </nav>

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={methodStep.id}
                className={styles.methodFocus}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.methodFocusMeta}><MethodIcon aria-hidden="true" /><span>{methodStep.stage}</span></div>
                <h3>{methodStep.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{methodStep.copy}</p>
                <div className={styles.methodStat}>
                  <strong>{methodStep.stat}</strong>
                  <span>{methodStep.statLabel}</span>
                </div>
              </motion.article>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.aside
                key={`readout-${methodStep.id}`}
                className={styles.methodReadout}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: 0.38 }}
              >
                <p><span>System readout</span><b><i /> Live</b></p>
                {methodStep.signals.map(([label, value], index) => (
                  <div key={label}>
                    <span>0{index + 1} / {label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
                <div className={styles.methodOutcome}><span>Current phase</span><strong>{methodStep.label}</strong></div>
              </motion.aside>
            </AnimatePresence>
          </div>

          <div className={styles.methodProgress} aria-hidden="true">
            <motion.i style={{ scaleX: methodScrollProgress }} />
            {methodSteps.map((step, index) => <span key={step.id} className={index <= activeMethod ? styles.methodDotActive : undefined} />)}
          </div>
        </div>

        <div className={styles.methodTriggers} aria-hidden="true">
          {methodSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(node) => { methodTriggerRefs.current[index] = node; }}
              data-method={index}
            />
          ))}
        </div>
      </section>

      <section id="proof-story" className={styles.resultStory}>
        <motion.div
          className={styles.resultImage}
          initial={prefersReducedMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
          whileInView={prefersReducedMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src="/images/kinetic/recovery-proof.png" alt="Athlete after a focused training session" fill sizes="100vw" className={styles.resultPhoto} />
        </motion.div>
        <div className={styles.resultGrid}>
          <motion.div className={styles.resultCopy} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8 }}>
            <p>03 / Measurable change</p>
            <h2><span>12 weeks.</span> One higher standard.</h2>
            <div className={styles.bigResult}>+27.4<small>kg</small></div>
            <p className={styles.resultBody}>Realistic inputs. Visible progress. A repeatable standard that survives busy weeks.</p>
            <a href="#assessment" className={styles.outlineCta}>Find your protocol <ArrowRight /></a>
          </motion.div>
          <motion.aside className={styles.resultReadout} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .25, duration: .7 }}>
            <p><span>Case 027</span><b><i /> Verified</b></p>
            <div><span>01 / Duration</span><strong>12 weeks</strong></div>
            <div><span>02 / Adherence</span><strong>92%</strong></div>
            <div><span>03 / Review</span><strong>Weekly</strong></div>
            <div className={styles.resultSignal}><TrendingUp /><span>Change that compounds</span></div>
          </motion.aside>
        </div>
        <div className={styles.resultMarquee} aria-hidden="true"><span>MEASURE / ADAPT / BUILD / REPEAT / MEASURE / ADAPT / BUILD / REPEAT</span></div>
      </section>

      <section id="assessment" className={styles.assessmentSection}>
        <div className={styles.assessmentIntro}>
          <p>04 / Training path</p>
          <h2>60 seconds.<br /><span>One clear direction.</span></h2>
          <div className={styles.assessmentMeta}><span>No generic template</span><span>3 focused questions</span><span>Instant direction</span></div>
        </div>

        <div className={styles.quizShell}>
          <div className={styles.quizTopline}>
            <span>Pathfinder / Live assessment</span>
            <b>{String(Math.min(quizStep + 1, 3)).padStart(2, "0")} / 03</b>
          </div>
          <div className={styles.quizProgress}><motion.span animate={{ scaleX: Math.min((quizStep + 1) / 3, 1) }} /></div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={quizStep} className={styles.quizPanel} initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .32 }}>
              {quizStep === 0 && <>
                <div className={styles.quizQuestion}><small>Question 01</small><h3>What do you want your training to change?</h3></div>
                <div className={styles.goalOptions}>{quizGoals.map(({ value, label, detail, icon: Icon }) => <button type="button" key={value} className={quizGoal === value ? styles.optionActive : undefined} onClick={() => setQuizGoal(value)}><Icon /><span><b>{label}</b><small>{detail}</small></span><Check /></button>)}</div>
              </>}
              {quizStep === 1 && <>
                <div className={styles.quizQuestion}><small>Question 02</small><h3>How many training days can you protect?</h3></div>
                <div className={styles.dayOptions}>{[2, 3, 4, 5, 6].map(day => <button type="button" key={day} className={quizDays === day ? styles.optionActive : undefined} onClick={() => setQuizDays(day)}><CalendarDays /><b>{day}</b><span>days / week</span></button>)}</div>
              </>}
              {quizStep === 2 && <>
                <div className={styles.quizQuestion}><small>Question 03</small><h3>Which profile should the plan account for?</h3></div>
                <div className={styles.profileOptions}>{quizProfiles.map(profile => <button type="button" key={profile.value} className={quizProfile === profile.value ? styles.optionActive : undefined} onClick={() => setQuizProfile(profile.value)}><UserRound /><b>{profile.label}</b><Check /></button>)}</div>
              </>}
              {quizStep === 3 && <div className={styles.quizResult}>
                <div><span>Recommended direction</span><b>01 / Matched</b></div>
                <h3>{assessmentResult}</h3>
                <p>Built around {quizDays} training days per week, a {quizProfile} profile, and your primary goal. David will confirm the exact starting point with you.</p>
                <a href="#contact" className={styles.primaryCta}>Discuss this path <ArrowRight /></a>
              </div>}
            </motion.div>
          </AnimatePresence>
          <div className={styles.quizControls}>
            <button type="button" onClick={() => setQuizStep(step => Math.max(0, step - 1))} disabled={quizStep === 0}><ArrowLeft /> Back</button>
            {quizStep < 3 ? <button type="button" className={styles.quizNext} onClick={() => setQuizStep(step => Math.min(3, step + 1))}>{quizStep === 2 ? "Build my direction" : "Continue"} <ArrowRight /></button> : <button type="button" className={styles.quizNext} onClick={() => setQuizStep(0)}>Retake <Activity /></button>}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactHeading}>
          <p>05 / Direct contact</p>
          <h2>Ready when<br />you are.</h2>
          <div className={styles.contactChannels}>
            <a href="mailto:david@fitnesscoach.com"><Mail /><span>Email David<small>david@fitnesscoach.com</small></span><ArrowRight /></a>
            <a href="https://instagram.com/knezeviicdavid" target="_blank" rel="noreferrer"><Instagram /><span>Instagram<small>@knezeviicdavid</small></span><ArrowRight /></a>
            <a href="https://threads.com/@knezeviicdavid" target="_blank" rel="noreferrer"><AtSign /><span>Threads<small>@knezeviicdavid</small></span><ArrowRight /></a>
          </div>
        </div>
        <form className={styles.contactForm} onSubmit={submitContact}>
          <div className={styles.formTopline}><span>New coaching request</span><b><i /> Secure</b></div>
          <label><span>01 / Your name</span><input name="name" minLength={2} maxLength={100} required placeholder="Name and surname" /></label>
          <label><span>02 / Email</span><input name="email" type="email" maxLength={255} required placeholder="you@email.com" /></label>
          <label><span>03 / What should change?</span><textarea name="message" minLength={10} maxLength={2000} required rows={5} placeholder="Tell David about your goal, current routine and biggest obstacle." /></label>
          <button type="submit" disabled={contactState === "sending"}>{contactState === "sending" ? "Sending..." : contactState === "sent" ? "Request received" : "Send coaching request"}<ArrowRight /></button>
          {contactState === "sent" && <p className={styles.formSuccess}><Check /> Message sent. Expect a direct reply soon.</p>}
          {contactState === "error" && <p className={styles.formError}>The request could not be sent. Please use the direct email link.</p>}
        </form>
      </section>

      <footer className={styles.kineticFooter}>
        <div><Link href="/" className={styles.footerBrand}>David Knežević</Link><span>Elite strength coaching / Dubai + online</span></div>
        <nav aria-label="Footer navigation"><a href="#method">Method</a><a href="#proof-story">Results</a><a href="#assessment">Assessment</a><a href="#contact">Contact</a></nav>
        <p>© {new Date().getFullYear()} David Knežević<br />Consistency over talent.</p>
      </footer>
    </div>
  );
}
