import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card(props) {
  return (
    <div className="card">
      <h2 className="work-name">{props.workName}</h2>
      <div className="work-img">
        <img style={{width: props.width}} src={props.img} alt="" />
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
    </div>
  );
}
