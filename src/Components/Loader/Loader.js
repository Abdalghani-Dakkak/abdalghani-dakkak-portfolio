import "./loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="planets">
        <div className="sun">
          <span className="sun-in" />
          <span className="sun-in2" />
        </div>

        <div className="orbits">
          <div id="or1" className="orbit">
            <div className="planet mercury">
              <span className="mercury-in1" />
              <span className="mercury-in2" />
              <span className="mercury-in3" />
              <span className="mercury-in4" />
            </div>
          </div>
          <div id="or2" className="orbit">
            <div className="planet venus">
              <span className="venus-in1" />
              <span className="venus-in2" />
              <span className="venus-in3" />
              <span className="venus-in4" />
              <span className="venus-in5" />
            </div>
          </div>
          <div id="or3" className="orbit">
            <div className="planet earth">
              <span className="earth-in1" />
              <span className="earth-in2" />
            </div>
          </div>
          <div id="or4" className="orbit">
            <div className="planet mars">
              <span className="mars-in1" />
              <span className="mars-in2" />
              <span className="mars-in3" />
              <span className="mars-in4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
