import React from 'react';
import { getNotes, isDarkBackground } from './functions';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

/*** Creates an individual container for a class to display in the flowchart view ***/
function FlowChartItem(props) {
  // each element for the class description is separated into its own section for future modifications/styling 

  let classStatus = 'planned-class'; //(props.planned ? 'planned-class' : '') + (props.taken ? 'taken-class' : '');
  if (props.warnPrereqs) {
    classStatus = 'warn-class';
  }

  return (
    // overlay trigger will display additional description about the class once it is clicked
    // The overlay trigger is wrapped around the content/div area that should be clicked to activate the pop up window, 
    // root close means that the other pop up will hide when the user clicks somewhere else outside of the box
    // Overlay Reference: https://react-bootstrap.github.io/components/overlays/
    <OverlayTrigger trigger="click" rootClose={true} placement="auto" overlay={
      <Popover id={"popover" + `${props.course_subject} ${props.course_code}`}>
        <Popover.Header as="h3">{`${props.course_subject} ${props.course_code}`}</Popover.Header>
        <Popover.Body>
          {props.warnPrereqs && <p className="popover-warning">{props.warnPrereqs.replace("dragged ", "")}</p>}
          <p className="popover-fulfills">{!!props.cl && props.cl.Fulfills}</p>
          {!!props && props.course_description}
        </Popover.Body>
      </Popover>}>
      <div style={{
        backgroundColor: props.color,
        color: isDarkBackground(props.color) ? "#000000" : "#ffffff"
      }}
        className={'flow-box ' + classStatus/* + (props.prerequisites_list.length > 0 ? ' pre-reqs' : '')*/ /* add css-styling classes to box based on if taken or planned, or if prereq */}
        onMouseEnter={props.enterFunc /* calls change function passed as property when user hovers over a class */}
        onMouseLeave={props.leaveFunc}>
        <div className='flow-header'>
          {/*classStatus !== '' && <div className='flow-icon'></div>*/}
          <div className='flow-id'>{`${props.course_subject} ${props.course_code}`}</div>
        </div>
        <div className='flow-credits'>{props.Credits.credits_count + " hours"}</div>
        {!!props && <div className={'flow-desc'}>
          {/* !!props.cl && props.cl.(key) checks that if the element is not null 
          and if it is not, then displays this element property (conditional rendering) */}
          <div className='flow-name'>{props.course_title}</div>
          <div className='flow-restriction'></div>
          <div className='flow-notes'></div>
        </div>}
      </div>
    </OverlayTrigger>
  );
}

export default FlowChartItem;