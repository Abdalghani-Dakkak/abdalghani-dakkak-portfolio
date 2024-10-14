import { motion } from "framer-motion";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card(props) {
  return (
    <motion.div
      className="card"
      transition={{ duration: 0.5 }}
      initial={{
        x: props.rtl ? 100 : -100,
        opacity: 0,
      }}
      whileInView={{ x: 0, opacity: 1 }}
    >
      <h2 className="work-name">{props.workName}</h2>
      <div className="work-img">
        <img style={{ width: props.width }} src={props.img} alt="" />
      </div>
      <p className="work-desc">
        <span>Descripton:</span> {props.desc}
      </p>
      <p className="work-tools">
        <span>Tools:</span> {props.tools}
      </p>
      <a
        href={props.link}
        target="_blank"
        className="work-link"
        rel="noreferrer"
      >
        <span>
          Go to {props.workName}
          <FontAwesomeIcon icon={faAnglesRight} />
        </span>
      </a>
    </motion.div>
  );
}
