import React, { Component } from 'react';
import './App.css';
import { compareSemesters } from './functions.js';
import ListView from './ListView.jsx';
import FlowChart from './FlowChart.jsx';
import AddCustomClass from './CustomClassModal.jsx';
import DismissableAlert from './DismissableAlert.jsx';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import saveAs from 'file-saver';
import Dropzone from 'react-dropzone';
import AddCustomSemester from './CustomSemesterModal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoginButton from './LoginButton.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Display: 'Flow', // determines which page to display
      // information from json file
      Colors: {},
      Categories: {},
      Semesters: [],
      Classes: [],
      ClassDesc: {},
      // holds information about which classes have been marked as what
      TakenClasses: [],
      PlannedClasses: [],
      displayAll: false, // checkbox to display all information on the flowchart is clicked
      showAlert: [null, null], // to display alert, holds [Bootstrap type (to color - warn/error), Message]
      AddedClasses: [], // store ids of user-added-classes to save in file 
      Semester_list: [],
      catalog_year: null,
      credits_needed_by_category: [],
      major: "BLANK",
      total_credits_needed: null
    };
    // https://stackoverflow.com/questions/64420345/how-to-click-on-a-ref-in-react
    this.fileUploader = React.createRef(); // ref to upload file dialog
  }

  /*** when component mounts, load data from json, set state with information ***/
  componentDidMount() { // runs when component loads
    let degreeMapID = "63fe3b560c4e5570172b1842"
    let apiURL = `http://localhost:4001/degree-map/${degreeMapID}`
    fetch(apiURL, {method: 'GET', mode: 'cors'}) // get file at csreqs.json asyncronously
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text()
      })
      .then(json => {
        return JSON.parse(json)
      })
      .then(data => {
        console.log(`Received response from the server for get ID's(${degreeMapID}) DegreeMap, `, data);
        return this.setState(data)
      })// set state information
      .catch(e => console.error('Couldn\'t get Degree Map json file. The error was:\n', e)); // print any errors
  }

  onAddSemesterSubmit = (semester) => {
    if (this.state.Semesters.includes(semester)) {
      this.setState({ showAlert: ['danger', 'Semester already exists. Check your flowchart.'] });
      return;
    }
    this.setState({ 
      showAlert: ['success', 'Semester added to flowchart. Drag any classes into the new semester.'], 
      Semesters: [...this.state.Semesters, semester] 
    });
  }

  /*** when user submits new information for a custom class (called by AddCustomClass) ***/
  onAddClassSubmit = (newClassObj, status) => {
    // fix name format by just taking class category and number
    let nameParts = newClassObj.Id.match(/([A-Z]{4})(.*)([\d]{4})/);
    newClassObj.Id = nameParts[1] + ' ' + nameParts[3];
    // add / remove class id to the correct list
    if (status === 'Taken') {
      this.markClassTaken(newClassObj.Id);
    } else {
      this.markClassPlanned(newClassObj.Id);
    }

    // if is already in flowchart, alert the user, but still add it to the list
    if (newClassObj.Id in this.state.ClassDesc) {
      this.setState({ showAlert: ['danger', `Class already exists! It was added to your flowchart as a ${status} class.`] });
      return;
    }

    // modify objects to include new class
    let newClassDesc = { ...this.state.ClassDesc, [newClassObj.Id]: newClassObj };
    this.setState({
      ClassDesc: newClassDesc,
      AddedClasses: [...this.state.AddedClasses, newClassObj.Id]
    });
  }

  /*** function for handling a click on one of the top navbar links ***/
  menuClick(i) {
    if (i === 0) { // if the first button is clicked
      this.setState({ Display: 'Flow' });
    } else if (i === 1 & !this.state.Display.startsWith('Edit')) { // if the second button is clicked
      this.setState({ Display: 'Edit' });
    } else if (i === 2) { //if first submenu of second button is clicked
      this.setState({ Display: 'EditGenEd' });
    } else if (i == 3) { //if second submenu of second button is clicked
      this.setState({ Display: 'EditCS' });
    }
  }

  getDegreeMaps() {
    let apiURL = "http://localhost:4001/degree-map/"
    fetch(apiURL, {
      method: 'GET',
      //headers: {'Content-Type':'application/json'},
      //body: JSON.stringify(jsonReq),
      mode: 'cors'
    }).then( (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      console.log("Received response from the server for get all DegreeMaps, ", response);
      return response.json();
    }).then( (json) => {
      console.log("Response from server: ", json);
    }).catch( (error) => {
      console.log("Error: ", error);
    })
  }

  /*** function for reading an uploaded file and parsing it to JSON ***/
  onUploadFile(files) {
    let reader = new FileReader();
    // when reader reads a file
    reader.onload = (e) => {
      try {
        let newInfo = JSON.parse(e.target.result); // parse upload file
        let newClasses = this.state.Classes.slice();
        // replace every semester in newClasses with value that was saved in file
        newClasses.forEach((cl, i) => cl.Semester = newInfo.DragNDropSems[i]);
        let newClassDesc = {...this.state.ClassDesc};
        newInfo.AddedClasses.forEach(cl => newClassDesc[cl.Id] = cl);
        this.setState({
          Semesters: newInfo.Semesters,
          TakenClasses: newInfo.TakenClasses,
          PlannedClasses: newInfo.PlannedClasses,
          Classes: newClasses,
          AddedClasses: newInfo.AddedClasses.map(cl => cl.Id),
          ClassDesc: newClassDesc,
          showAlert: ['success', 'Your file was uploaded successfully!']
        }); // populate classes, display alert
      } catch (err) { // if error during parsing to json or setting state
        console.log(err); // print to console for debugging
        this.setState({ showAlert: ['error', 'Your file couldn\'t be uploaded because it had the wrong format.'] }); // show dismissable alert
      }
    };
    reader.readAsText(files[0]); // make reader read the first file uploaded
  }

  /*** function for saving information from application to a json file
   * make sure to open the webpage into a new tab to test save click functionality ***/
  saveClick() {
    // adapted from answer to 
    // https://stackoverflow.com/questions/45941684/save-submitted-form-values-in-a-json-file-using-react
    const fileData = JSON.stringify({ 
      'Version': '1.0', 
      'Semesters': this.state.Semesters,
      'TakenClasses': this.state.TakenClasses, 
      'PlannedClasses': this.state.PlannedClasses, 
      'DragNDropSems': this.state.Classes.map(cl => cl.Semester), // get only list of semesters
      'AddedClasses': this.state.AddedClasses.map(id => this.state.ClassDesc[id])
    });
    const blob = new Blob([fileData], { type: "application/json" });
    saveAs(blob, "Course Dragon");
  }

  /*** Calculates amount of credit hours taken in total
   * And the total number of credit hours that have been taken from the classes
   * Takes: list of flowchart classes ***/
  calculateTotalHours() {
    let [total, planned, taken] = [0, 0, 0];
    this.getFlowchartWithClasses().forEach(cl => {
      total += parseInt(cl.Credits);
      if (this.state.TakenClasses.includes(cl.Name)) { // if have taken, add to count
        taken += parseInt(this.state.ClassDesc[cl.Name].Credits);
      }
      if (this.state.PlannedClasses.includes(cl.Name)) { // if have taken, add to count
        planned += parseInt(this.state.ClassDesc[cl.Name].Credits);
      }
    });
    return [taken, planned, total];
  }

  /*** Determines the category the class falls under based on how many credits of each category it could fill have been taken. For example, if a specific breadth category has all the requirements filled, then the class in that category can be moved onto the fallback category, Technical Electives.***/
  getCatForFlowchart(initCat, catCreds) {
    let curCat = initCat;
    let i = 0;
    while ('Fallback' in this.state.Categories[curCat]
    && this.state.Categories[curCat].Fallback.length > i
    && catCreds[curCat] >= this.state.Categories[curCat].Credits) {
      curCat = this.state.Categories[curCat].Fallback[i];
      i += 1;
    }
    if (catCreds[curCat] >= this.state.Categories[curCat].Credits) {
      return null;
    }
    return curCat;
  }

  /** replaces a box with FcName as the name, if it exists, with the classID */
  addClassToFlowchart(classes, classID, catName) {
    const fcName = this.state.Categories[catName].FC_Name;
    // tries to find a flowchart box that thic class can fill
    const index = classes.findIndex((c) => c.Name === fcName);
    if (index >= 0) {
      classes[index].Name = classID;
    }
  }

  /** adds the path of classes to the flowchart
  Note: this is currently releated to adding the correct science classes */
  addPathToFlowchart(classes, classID) {
    let cl = this.state.ClassDesc[classID];
    let FcName = this.state.Categories[cl.Fulfills].FC_Name;
    let newClasses = [];
    // goes through classes in path
    cl.Path.forEach((pathID) => {
      // finds spot where this class can fill
      let index = classes.findIndex((c) => c.Name === FcName
        || (c.Type === FcName && !cl.Path.includes(c.Name)));
      if (index >= 0) {
        // note if need credits to fulfill the requirement
        newClasses.push({ 
          ...classes[index], 
          Credits: parseInt(classes[index].Credits) - parseInt(this.state.ClassDesc[pathID].Credits) 
        });
        // replace class with name
        classes[index].Type = classes[index].Name;
        classes[index].Name = pathID;
      }
    });
    return newClasses.reduce((prev, cur) => {
      return 'Credits' in prev ? { ...prev, Credits: parseInt(prev.Credits) + parseInt(cur.Credits) } : cur;
    }, {} );
  }

  /*** Get flowchart with populated classes ***/
  getFlowchartWithClasses() {
    let classes = [];
    this.state.Semester_list.forEach(semester => {
      semester.Courses_list.forEach(course => {
        classes.push(course);
      })
    });
    return classes;
    //let classes = JSON.parse(JSON.stringify(this.state.Classes)); // deep copy object
    let classesToAdd = {};
    let catCreds = {};
    Object.keys(this.state.Categories).forEach(k => catCreds[k] = 0);
    this.state.TakenClasses.concat(this.state.PlannedClasses).forEach( clID => {
      if (classes.findIndex(c => c.Name === clID) === -1) { // if not in flowchart
        let cl = this.state.ClassDesc[clID];
        if ('Path' in cl) {
          // calculate the number of taken credits of the path
          let takenCreds = cl.Path.map(id => 
            this.state.TakenClasses.includes(id) || this.state.PlannedClasses.includes(id)
            ? parseInt(this.state.ClassDesc[id].Credits) : 0)
            .reduce((a, b) => a + b, 0);
          // if more credits of this path have been taken, replace path with this one
          if (takenCreds > catCreds[cl.Fulfills]) {
            catCreds[cl.Fulfills] = takenCreds;
            let newClass = this.addPathToFlowchart(classes, clID, catCreds);
            if (newClass.Credits) {
              classesToAdd[cl.Fulfills] = { 
                ...newClass, 
                Credits: `${newClass.Credits} hours`, 
                warnPrereqs: `Taking the courses ${cl.Path} means that you'll have to take additional courses to reach the credits needed for ${cl.Fulfills}. Please talk to your counselor about how to get these credits.`,
                Name: newClass.Type || newClass.Name
              };
            } else {
              delete classesToAdd[cl.Fulfills];
            }
          }
        } else {
          const cat = this.getCatForFlowchart(cl.Fulfills, catCreds);
          if (cat) {
            this.addClassToFlowchart(classes, clID, cat);
            catCreds[cat] += parseInt(cl.Credits, 10);
          }
        }
      }
    });
    return classes.concat(Object.values(classesToAdd).flat());
  }


  /*** function for handling a click on a checkbox (Taken classes) ***/
  markClassTaken(classID) {
    if (this.state.TakenClasses.includes(classID)) { // if class is already in taken list
      // removes classid from taken classes list by creating a new list that does not include that classID
      this.setState({ TakenClasses: this.state.TakenClasses.filter(c => c !== classID) });
    } else {
      // sets state to be the list of previously selected taken classes, with the addition of the new classID
      // ... is the spread operator, it makes the elements into elements of the new array
      this.setState({ TakenClasses: [...this.state.TakenClasses, classID], 
                     PlannedClasses: this.state.PlannedClasses.filter(c => c !== classID)});
    }
    let [takenCreds, plannedCreds, totalCreds] = this.calculateTotalHours();
    if (takenCreds >= totalCreds - 30) {
      this.setState({ showAlert: ['warning', 'You\'re within 30 hours of graduation. Please do a 30 hour check with your advisor.'] });
    }
  }

  /*** function for handling a click on a checkbox (Planned classes) ***/
  markClassPlanned(classID) {
    if (this.state.PlannedClasses.includes(classID)) { // if class is already in taken list
      // removes classid from taken classes list by creating a new list that does not include that classID
      this.setState({ PlannedClasses: this.state.PlannedClasses.filter(c => c !== classID) });
    } else {
      // sets state to be the list of previously selected taken classes, with the addition of the new classID
      // ... is the spread operator, it makes the elements into elements of the new array
      this.setState({ PlannedClasses: [...this.state.PlannedClasses, classID],
                    TakenClasses: this.state.TakenClasses.filter(c => c !== classID)});
    }
  }

  /*** creates list/edit view with list of classes to choose ***/

  /*** checks if the prereqs have been violated for a class ***/
  prereqsViolated(newClasses, curClassID, curSemester) {
    if (curClassID in this.state.ClassDesc) { // ensure that class has ID 
      for (let cl of newClasses) { // go through prereqs of class
        if (this.state.ClassDesc[curClassID].Prereqs.includes(cl.Name)) { // if the current class is a prereq of the dragged class
          let output = compareSemesters(cl.Semester, curSemester); // want current semester to be less than the dragged semester
          if (output != 1) { //if the prereq class semester is before the dragged class semester, no need to update state
            return `${curClassID} cannot be dragged before or in the same semester as ${cl.Name}.`;
          } // if END
        }
        else if (cl.Name in this.state.ClassDesc && this.state.ClassDesc[cl.Name].Prereqs.includes(curClassID)) { // if the class dragged is a prereq of the current class
          let output = compareSemesters(cl.Semester, curSemester); // want the current semester to be greater than the dragged semester
          if (output != -1) { // if the current semester is not greater than the dragged semester, exit 
            return `${curClassID} cannot be dragged after or in the same semester as ${cl.Name}.`;
          } // if END
        } // else if END
      } // FOR END
    }
    return null;
  }

  /*** handles the drag-n-drop state updates to the flowchart (so things stay in their place) ***/
  handleOnDragEnd = (result) => {
    this.setState( { showAlert: [null, null] } );
    if (!result.destination) return; // bounds checking: make sure doesn't go out of list
    
    let copySemester_list = this.state.Semester_list.slice(); // duplicate list for re-rendering
    let source = result.source.droppableId.split('-');
    let destination = result.destination.droppableId.split('-');
    
    const [reorderedItem] = copySemester_list.find(semester => {
      return semester.term === source[0] && semester.year === +source[1]; // this gets the specific semester that the class is being dragged from
    }).Courses_list.splice(result.source.index, 1); // this removes the class from the list of classes in that semester and stores it to be placed in the destination list
    
    copySemester_list.find(s => {
      return s.term === destination[0] && s.year === +destination[1]; // this gets the specific semester that the class is being dragged to
    }).Courses_list.splice(result.destination.index, 0, reorderedItem); // this adds the class to the destination list
    
    this.setState({ Semester_list: copySemester_list }, () => { // Replace the old Semester_list with the newly reordered one
       console.log(`Dragging ${reorderedItem.course_subject} ${reorderedItem.course_code}: ${reorderedItem.course_title} from ${source[0]}-${source[1]} to ${destination[0]}-${destination[1]}`);
    });

    // check for prereqs: (current assumption is that all prereqs are included in the core classes)
    
    return;
    //obtain the class name of the class being dragged
    let classDragged = newClasses[parseInt(result.draggableId)].Name;

    if (classDragged in this.state.ClassDesc) { // checking that the class that was dragged has an Id
      //'in' keyword gets the index of the list, 'of' gets the object in the list
      let DnDAlertMsg = this.prereqsViolated(newClasses, classDragged, result.destination.droppableId);
      if (DnDAlertMsg != null) {
        this.setState( {showAlert: ['danger', DnDAlertMsg]} );
        return;
      }
      // ensure that classes with fall/spring restrictions aren't dragged to the wrong semesters
      if ('Restriction' in this.state.ClassDesc[classDragged]) {
        let restriction = this.state.ClassDesc[classDragged].Restriction.split(' ')[0].toLowerCase(); // 'FALL ONLY'
        if (!result.destination.droppableId.toLowerCase().startsWith(restriction)) { // if destination doesn't start with restricted semester
          let DnDAlertMsg = `${classDragged} cannot be dragged to a ${restriction} semester.`;
          this.setState( { showAlert: ['danger', DnDAlertMsg] } );
          return;
        }
      }
    } // IF END

    //parsing through new classes to find the class that is being dragged
    newClasses[parseInt(result.draggableId)].Semester = result.destination.droppableId;
    if ('Coreqs' in this.state.ClassDesc[classDragged]) {
      let coreqs = this.state.ClassDesc[classDragged].Coreqs;
      newClasses.forEach(cl => {
        if (coreqs.includes(cl.Name)) {
          cl.Semester = result.destination.droppableId;
        }
      })
    }
    this.setState({ Classes: newClasses });
  } //handleDragEnd function END

  /*** creates flow chart view with all classes ***/
  displayFlowChart() {
    // pass handleOnDragEnd for changing state when class dragged
    return (
      <FlowChart
        Semesters={this.state.Semester_list}
        onDragEnd={this.handleOnDragEnd}>
      </FlowChart>
    );
  }

  /*** render function under App class is used to tell application to display content ***/
  render() {
    let content; // variable to store the content to render
    // set content to display based on which tab the user is currently in (the mode they currently see)
    if (this.state.Display === 'Flow') {
      content = this.displayFlowChart();
    }
    let [takenHours, plannedHours, neededHours] = this.calculateTotalHours();

    // this return function in the render function will display the content
    // it creates the html code for the navbars and basic layout of the page
    // the {content} segment indicates that the html code from the variable above should be inserted
    // react bootstrap nav dropdown menu link: https://react-bootstrap.github.io/components/dropdowns/
    return (
      <div className="App">
        {/* General Alert function, allows us to show success/fail of a file upload, class restrictions, etc. */}
        <DismissableAlert
          type={this.state.showAlert[0]}
          show={this.state.showAlert[1]}
          onClose={() => this.setState({ showAlert: [null, null] })}>
        </DismissableAlert>
        <div className='sticky-top'>
        <Navbar variant='dark' bg='dark'>
          <Navbar.Brand> <img src="src/dragonlogo.png" height="50px" width="50px"></img>Course Dragon</Navbar.Brand>
          <Nav>
            <Nav.Link>
              <Button onClick={() => this.getDegreeMaps()}>Get all Degree Maps </Button>
            </Nav.Link>
            <Nav.Link>
              <LoginButton/>
            </Nav.Link>
            <Nav.Link
              className={(this.state.Display === 'Flow') ? 'active' : 'inactive'}
              onClick={() => this.menuClick(0)}>
                Flowchart
            </Nav.Link>
          </Nav>
        </Navbar>
        <ProgressBar>
          <ProgressBar variant="success" now={takenHours/neededHours*100} />
          <ProgressBar variant="warning" now={plannedHours/neededHours*100} />
        </ProgressBar>
        </div>
        <div className='header-options'>
          <div className="credit-count">{`${takenHours}/${neededHours} taken credits`}</div>
          <div className='spacer'></div>
          <AddCustomSemester onSubmit={this.onAddSemesterSubmit} />
          <AddCustomClass
            onSubmit={this.onAddClassSubmit}
            // gets category names that can fill in multiple boxes on the flowchart
            CategoryOpts={Object.keys(this.state.Categories).filter(k => 'FC_Name' in this.state.Categories[k])}
          />
        </div>
        <div className="flow-warn">
          *3000 & 4000 level CSCI courses are semester dependent. Courses may be offered
          more frequently as resources allow, but students cannot expect them to be
          offered off‐semester. Students should use the rotation shown on this flowchart
          as a guide for planning their upper level courses.
        </div>
        {content}
        <Navbar variant='dark' bg='dark' fixed='bottom'>
          <div>
            <input
              ref={this.fileUploader}
              id="uploadFileButton"
              accept=".json" type="file"
              onClick={(e) => { e.target.value = '' }} // ensures uploading file with same name is done
              onChange={(e) => this.onUploadFile(e.target.files)} />
            <Button variant="outline-primary" id="upload-button"
              onClick={() => this.fileUploader.current.click()}>Upload</Button>
          </div>
          <div className="dropzone d-none d-sm-block">
            <Dropzone onDrop={acceptedFiles => this.onUploadFile(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop your Course Dragon .json file here</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <Button variant="outline-primary" id="save-button" onClick={() => this.saveClick()}>Save</Button>
          <Button variant="outline-primary" id="print-button" onClick={() => window.print()}>Print</Button>
        </Navbar>
      </div>
    );
  }
}

export default App;
