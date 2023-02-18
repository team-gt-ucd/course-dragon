import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import StatusButtons from './StatusButtons';

/*** Function to create a modal to add a custom class ***/
function AddCustomClass(props) {
  // setting state using functional react syntax
  const [show, setShow] = useState(false); // show / hide modal itself
  const [semesterYear, setSemesterYear] = useState('');
  const [semesterType, setSemesterType] = useState('');
  const [classNameValue, setClassNameValue] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [creditNumValue, setCreditNumValue] = useState('');
  const [classCategoryValue, setClassCategoryValue] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true); // if submit button disabled
  const [checked, setChecked] = useState([]); // which taken/planned buttons are selected

  /* Simple function that retrieves the current year */
  const currentYear = new Date().getFullYear();

  /* on button change, change "checked" so that it highlights the correct buttons */
  const handleButtonChange = (selectedValue) => {
    let newValue = selectedValue.filter(v => !checked.includes(v)); // gets all the classes from the selected value list that are not currently in the checked list (NOTE: is list)
    setChecked(newValue); 
  }

  useEffect(() => { // runs after every render (state changes) -- adjusts if submit button disabled
    setButtonStatus(!(semesterType !== '' && semesterYear.length > 0 && /^\d+$/.test(semesterYear) 
      && classNameValue.length > 0 && creditNumValue.length > 0 && /^\d+$/.test(creditNumValue) 
      && /^\s*[A-Z]{4}(.*)[\d]{4}\s*$/.test(classNameValue) && classCategoryValue !== '' && checked.length > 0));
  });

  // functions that handle open/close
  const handleShow = () => { setShow(true); };
  const handleClose = () => {
    setShow(false);
    // reset all values for the next time the modal is opened
    setButtonStatus(true);
    setSemesterYear('');
    setSemesterType('');
    setClassNameValue('');
    setClassDescription('');
    setCreditNumValue('');
    setClassCategoryValue('');
    setChecked([]);
  };
  // function to handle submitting the form (adding a new class)
  const addClass = () => {
    handleClose(); // close modal on submit
    // pass information for new class to function passed from App.jsx to update state
    props.onSubmit({ 
      id: classNameValue,
      description: classDescription,
      year: semesterYear,
      season: semesterType,
      credits: creditNumValue + " Credits",
      fulfills: classCategoryValue,
      // instructorScoreList: []
    }, checked[0]); // pass status to onsubmit method
  }

  // create Modal with form
  return (
    <div className="custom-class-button">
      <Button variant="dark" onClick={handleShow}>
        Add Custom Class
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="custom-class-form">
              
              {/* Year Field */}
              <Form.Label>Year:</Form.Label>
              <Form.Control
                id='semesterYear'
                placeholder={currentYear}
                onChange={e => { setSemesterYear(e.target.value); }} />

              {/* Semester Dropdown */}
              <Form.Label>Semester:</Form.Label>
              <Form.Select value={semesterType}
                onChange={e => { setSemesterType(e.target.value); }}>
                <option key='defaultoption' value=''>Select a category</option>
                <option key='summeroption' value='Summer'>Summer</option>
                <option key='falloption' value='Fall'>Fall</option>
                <option key='springoption' value='Spring'>Spring</option>
              </Form.Select>

              {/* Class Name Field */}
              <Form.Label>Class Name:</Form.Label>
              <Form.Control
                id='className'
                placeholder="CSCI 1410"
                onChange={e => { setClassNameValue(e.target.value.toUpperCase()); }} /> 

              {/* Class Description Field */}
              <Form.Label>Class Description:</Form.Label>
              <Form.Control
                id='classDescription'
                placeholder="Custom course description..."
                onChange={e => { setClassDescription(e.target.value); }} /> 

              {/* Credit Field */}
              <Form.Label>Credit Amount:</Form.Label>
              <Form.Control
                id='creditNum'
                placeholder="3"
                onChange={e => { setCreditNumValue(e.target.value); }} />

              {/* Category Dropdown */}
              <Form.Label>Class Category:</Form.Label>
              <Form.Select value={classCategoryValue}
                onChange={e => { setClassCategoryValue(e.target.value); }}>
                <option key='defaultoption' value=''>Select a category</option>
                {/* create list of options based on categories this class could fulfill
                  (passed up from main state in app.jsx) */
                  props.CategoryOpts.map((opt, i) =>
                  (<option key={'option' + i} value={opt}>{opt}</option>))}
              </Form.Select>
              <Form.Label className='taken-label'>Status: </Form.Label>
              <StatusButtons checked={checked} handleButtonChange={handleButtonChange} uniqueKey='Custom'></StatusButtons>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={buttonStatus} variant="dark" onClick={addClass}>
            Add Class
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCustomClass;