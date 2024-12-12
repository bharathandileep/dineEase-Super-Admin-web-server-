import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import classNames from "classnames";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

interface StatisticsWidgetProps {
  title: string;
  stats: string;
  trend: {
    label: string;
    value: string;
    icon: string;
    trendStats: string;
    variant: string;
    navigatePath: string;
  };
  counterOptions?: any;
}

const StatisticsWidget3: React.FC<StatisticsWidgetProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.trend.navigatePath);
  };

  return (
    <Card onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Body>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={props.title}>More Info</Tooltip>}
        >
          <i className="fa fa-info-circle text-muted float-end"></i>
        </OverlayTrigger>
        <h4 className="mt-0 font-16">{props.title}</h4>
        <h2 className="text-primary my-3 text-center">
          <span>
            <CountUp
              duration={1}
              end={parseFloat(props.stats)}
              {...props.counterOptions}
            />
          </span>
        </h2>
        <p className="text-muted mb-0">
          {props.trend.label}: {props.trend.value}{" "}
          <span className="float-end">
            <i
              className={classNames(
                "me-1",
                "fa",
                props.trend.icon,
                "text-" + props.trend.variant
              )}
            ></i>
            {props.trend.trendStats}
          </span>
        </p>
      </Card.Body>
    </Card>
  );
};

export default StatisticsWidget3;
