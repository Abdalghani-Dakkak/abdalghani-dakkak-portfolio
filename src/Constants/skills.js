import {
  FaBootstrap,
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaReact,
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiRedux, SiTypescript } from "react-icons/si";

export const skills = [
  {
    icon: <FaHtml5 />,
    title: "HTML5",
    progress: 70,
  },
  {
    icon: <FaCss3Alt />,
    title: "CSS3",
    progress: 80,
  },
  {
    icon: <FaBootstrap />,
    title: "Bootstrap",
    progress: 100,
  },
  {
    icon: <RiTailwindCssFill />,
    title: "Tailwind",
    progress: 70,
  },
  {
    icon: <FaJs />,
    title: "JS + ES6",
    progress: 75,
  },
  {
    icon: <SiTypescript />,
    title: "TypeScript",
    progress: 60,
  },
  {
    icon: <FaReact />,
    title: "React",
    progress: 75,
  },
  {
    icon: <RiNextjsFill />,
    title: "Next",
    progress: 75,
  },
  {
    icon: <SiRedux />,
    title: "Redux",
    progress: 90,
  },
  {
    icon: <FaGitAlt />,
    title: "Git",
    progress: 90,
  },
];
