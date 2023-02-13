//import React from 'react';
import { getNotes, isDarkBackground } from './functions';
import { groupBy } from './functions';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React, { useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import StatusBtn from './StatusBtn'
import StatusButtons from "./StatusButtons";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';



/*** Creates an individual container for a class to display in the flowchart view ***/
function FlowChartItem(props) {
    // each element for the class description is separated into its own section for future modifications/styling

    const [checked, setChecked] = useState([props.checked]); // holds if class is taken or planned
    // function to handle if taken or planned is clicked
    const handleChange = (selectedValue) => {
        // NOTE: Radio buttons will not allow deselection by clicking on an already selected button, but we only want to allow one button to be clicked. We opted to use checkbox buttons but they allow multiple selection of buttons. To force only one button to be clicked, we just filter out buttons that were clicked previously. We want to represent three options using two checkbox buttons: class is Taken if the Taken button is clicked, class is Planned if the Planned button is clicked, and neither option if both Taken and Planned buttons are unclicked.
        let newValue = selectedValue.filter(v => !checked.includes(v)); // gets all the classes from the selected value list that are not currently in the checked list (NOTE: is list)
        if (newValue.length === 1) { // if a button is selected
            if (newValue[0] == 'Taken') { // call the taken function passed in from App.jsx if its taken
                props.takenFunc();
            } else {
                props.plannedFunc(); // else call the planned function passed in
            }
        } else { // no button is selected
            if (checked[0] == 'Taken') { // call the taken function passed in from App.jsx if its taken
                props.takenFunc();
            } else {
                props.plannedFunc(); // else call the planned function passed in
            }
        }
        setChecked(newValue);
    }
    let classStatus = (props.planned ? 'planned-class' : '') + (props.taken ? 'taken-class' : '');
    if (props.warnPrereqs) {
        classStatus = 'warn-class';
    }

    const popover = (
        <Popover id={"popover" + props.Name}>
            <Popover.Header as="h3">
                {props.Name}
            </Popover.Header>
            <Popover.Body>
                {props.warnPrereqs && <p className="popover-warning">{props.warnPrereqs.replace("dragged ", "")}</p>}
                <p className="popover-fulfills">{!!props.cl && props.cl.Fulfills}</p>
                {!!props.cl && props.cl.Desc}
            </Popover.Body>
        </Popover>
    );

    const POPOVER = () => (
        <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
            <Button className='flowchart-icon' variant="outline-dark">+</Button>

        </OverlayTrigger>

    );



    return (
        // overlay trigger will display additional description about the class once it is clicked
        // The overlay trigger is wrapped around the content/div area that should be clicked to activate the pop up window,
        // root close means that the other pop up will hide when the user clicks somewhere else outside of the box
        // Overlay Reference: https://react-bootstrap.github.io/components/overlays/
        <div style={{
            backgroundColor: props.bgCol,
            color: isDarkBackground(props.bgCol) ? "#000000" : "#ffffff"
        }}
             className={'flow-box ' + classStatus + (props.isPreReq ? ' pre-reqs' : '') /* add css-styling classes to box based on if taken or planned, or if prereq */}
             onMouseEnter={props.enterFunc /* calls change function passed as property when user hovers over a class */}
             onMouseLeave={props.leaveFunc}>
            <div className='flow-header'>
                {classStatus !== '' && <div className='flow-icon'></div>}
                <checkName/>
                <div className='flow-id'>{props.Name}<POPOVER/></div>
            </div>
            <div className='flow-credits'>{props.Credits}</div>
            {!!props.cl && <div className={props.displayAll ? '' : 'flow-desc'}>
                {/* !!props.cl && props.cl.(key) checks that if the element is not null
          and if it is not, then displays this element property (conditional rendering) */}
                <div className='flow-name'>{props.cl.Name}</div>
                <div className='flow-restriction'>{!!props.cl.Restriction && '*' + props.cl.Restriction + '*'}</div>
                <div className='flow-notes'>{getNotes(props.cl.Prereqs)}</div>
                <StatusButtons
                    checked={checked}
                    handleButtonChange={handleChange}
                    uniqueKey={props.uniqueKey /* if no unique key is provided, all status buttons will be linked and changing one will change them all */}
                ></StatusButtons>

            </div>}
        </div>
        //</OverlayTrigger>
    );
}

export default FlowChartItem;