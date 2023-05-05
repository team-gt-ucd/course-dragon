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
      loggedIn: false,
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
      catalog_year: new Date().getFullYear(),
      credits_needed_by_category: [],
      major: "BLANK",
      total_credits_needed: null
    };
    // https://stackoverflow.com/questions/64420345/how-to-click-on-a-ref-in-react
    this.fileUploader = React.createRef(); // ref to upload file dialog
  }

  /*** when component mounts, load data from json, set state with information ***/
  componentDidMount() { // runs when component loads
    if(!this.state.loggedIn)
    {
      let terms = ["fall", "spring"]
      let Semester_list = []
      for(let year = 1; year <= 4; year++) {
        for(let term = 0; term < 2; term++) {
          Semester_list.push({
            year: year, 
            term: terms[term],
            Courses_list: []
          })
        }
      }
      this.setState({ Semester_list: Semester_list, Categories: ["CS Core"] })
    } 
    
    else {
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
          this.setState(this.generateColors(data.Semester_list));

          return this.setState(data)
        })// set state information
        .catch(e => console.error('Couldn\'t get Degree Map json file. The error was:\n', e)); // print any errors
    }
  }

  generateColors = (Semester_list) => {
    let colors = {};
    Semester_list.forEach(semester => {
      semester.Courses_list.forEach(course => {
        colors[course.Credits.category] = this.getRandomColor();
      })
    });
    return { Colors: colors, Categories: Object.keys(colors)};
  }

  getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateTemplateDegreeMap = () => {
    const templateDegreeMap = {
        "major": "CSBS",
        "catalog_year": "2019",
        "total_credits_needed": 128,
        "credits_needed_by_category": [
            {
                "category": "CS Core",
                "credits_needed": 31
            },
            {
                "category": "CS Systems Core",
                "credits_needed": 21
            },
            {
                "category": "CS Breadth",
                "credits_needed": 15
            },
            {
                "category": "CS Elective",
                "credits_needed": 12
            },
            {
                "category": "ENGR",
                "credits_needed": 3
            },
            {
                "category": "MATH",
                "credits_needed": 12
            },
            {
                "category": "Science",
                "credits_needed": 10
            },
            {
                "category": "Gen Ed Core",
                "credits_needed": 30
            }
        ],
        "Semester_list": [
            {
                "term": "fall",
                "year": 1,
                "Courses_list": [
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "CSCI",
                        "course_code" : 1410,
                        "course_title" : "Fundamentals of Computing",
                        "course_description" : "First course in computing for those who will take additional computer science courses. Covers the capabilities of a computer, the elements of a modern programming language, and basic techniques for solving problems using a computer. Coreq: CSCI\u00a01411. Max Hours: 3 Credits.\nGrading Basis: Letter Grade\nCoreq: CSCI\u00a01411.",
                        "Credits" : {
                            "category": "CS Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "CSCI",
                        "course_code" : 1411,
                        "course_title" : "Fundamentals of Computing Laboratory",
                        "course_description" : "This laboratory is taken with CSCI\u00a01410 and will provide students with additional help with problem solving and computer exercises to compliment the course material covered in CSCI\u00a01410. Coreq: CSCI\u00a01410. Max Hours: 1 Credit.\nGrading Basis: Letter Grade\nD-En CO: CSCI\u00a01410 coreq",
                        "Credits" : {
                            "category": "CS Core",
                            "credits_count": 1
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "CSCI",
                        "course_code" : 1510,
                        "course_title" : "Logic Design",
                        "course_description" : "The design and analysis of combinational and sequential logic circuits. Topics include binary and hexadecimal number systems, Boolean algebra and Boolean function minimization, and algorithmic state machines. Lecture/lab includes experiments with computer-aided design tools. This course requires the level of mathematical maturity of students ready for Calculus I. Max hours: 3 Credits.\nGrading Basis: Letter Grade",
                        "Credits" : {
                            "category": "CS Systems Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"MATH",
                                "course_code":1120
                            },
                            {
                                "course_subject":"MATH",
                                "course_code":1130
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "ENGR",
                        "course_code" : 1200,
                        "course_title" : "Fundamentals of Engineering Design Innovation",
                        "course_description" : "This course introduces concepts of engineering design innovation at a variety of scales and disciplines. Participants will experience and explore core technology and design themes including design principles, processes, methods, modes of thinking, and social and cultural aspects or design. Max hours: 3 Credits.\nGrading Basis: Letter Grade",
                        "Credits" : {
                            "category": "ENGR",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "MATH",
                        "course_code" : 1401,
                        "course_title" : "Calculus I",
                        "course_description" : "First course of a three-semester sequence (MATH\u00a01401, 2411, 2421) in calculus. Topics covered include limits, derivatives, applications of derivatives, and the definite integral. Note: No co-credit with MATH\u00a01080. Prereq:MATH\u00a01109 or MATH\u00a01070 or MATH\u00a01110 with a C- or higher and MATH\u00a01120 with a C- or higher or MATH\u00a01130 with a C- or higher or MATH\u00a01401 with a C- or higher OR entry into the MA01 Student Group OR ALEKS PPL score 76-100. If you have any questions or concerns about this requisite, please notify MATH.Placement@ucdenver.edu. Max Hours: 4 Credits.\nGrading Basis: Letter Grade\nMATH\u00a01109 or MATH\u00a01070 or MATH\u00a01110 with a C- or higher and MATH\u00a01120 with a C- or higher or MATH\u00a01130 with a C- or higher or MATH\u00a01401 with a C- or higher OR entry into the MA01 Student Group OR ALEKS PPL score 76-100.\nAdditional Information: Denver Core Requirement, Mathematics; GT courses GT Pathways, GT-MA1, Mathematics.",
                        "Credits" : {
                            "category": "MATH",
                            "credits_count": 4
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"MATH",
                                "course_code":1109
                            },
                            {
                                "course_subject":"MATH",
                                "course_code":1070
                            },
                            {
                                "course_subject":"MATH",
                                "course_code":1110
                            },
                            {
                                "course_subject":"MATH",
                                "course_code":1120
                            },
                            {
                                "course_subject":"MATH",
                                "course_code":1130
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 1,
                        "course_subject": "GEN",
                        "course_code" : 1000,
                        "course_title" : "Gen Ed Core",
                        "course_description" : "Fill in Gen Ed Core class here.",
                        "Credits" : {
                            "category": "GEN",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    }
                ]
            },
            {
                "term": "spring",
                "year": 1,
                "Courses_list": [
                    {
                        "term": "spring",
                        "year": 1,
                        "course_subject": "CSCI",
                        "course_code" : 2312,
                        "course_title" : "Object Oriented Programming",
                        "course_description" : "Programming topics in a modern programming language. The emphasis is on problem solving using object oriented and Generic Programming. Topics include advanced I/O, classes, inheritance, polymorphism and virtual functions, abstract base classes, exception handling, templates, and the Standard Template Library. Prereq: Grade of C- or higher in the following courses: CSCI\u00a01410 and CSCI\u00a01411. Max Hours: 3 Credits.\nGrading Basis: Letter Grade\nPrereq: Grade of C- or higher in the following courses: CSCI\u00a01410 and CSCI\u00a01411",
                        "Credits" : {
                            "category": "CS Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"CSCI",
                                "course_code":1410
                            },
                            {
                                "course_subject":"CSCI",
                                "course_code":1411
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "spring",
                        "year": 1,
                        "course_subject": "CSCI",
                        "course_code" : 2525,
                        "course_title" : "Assembly Language and Computer Organization",
                        "course_description" : "Topics include computer architecture, program execution at the hardware level, programming in assembly language, the assembly process, hardware support of some high-level language features, and a program's interface to the operating system. Programming exercises are assigned in this course. These exercises involve the use of specific hardware in designated laboratories. Prereq: Grade of C- or higher in the following courses: CSCI\u00a01410, CSCI\u00a01411 and CSCI\u00a01510. Max Hours: 3 Credits.\nGrading Basis: Letter Grade\nPrereq: Grade of C- or higher in the following courses: CSCI\u00a01410, CSCI\u00a01411 and CSCI\u00a01510.",
                        "Credits" : {
                            "category": "CS Systems Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"CSCI",
                                "course_code":1410
                            },
                            {
                                "course_subject":"CSCI",
                                "course_code":1411
                            },
                            {
                                "course_subject":"CSCI",
                                "course_code":1510
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "spring",
                        "year": 1,
                        "course_subject": "MATH",
                        "course_code" : 2411,
                        "course_title" : "Calculus II",
                        "course_description" : "The second of a three-semester sequence (MATH\u00a01401, 2411, 2421) in calculus. Topics covered include exponential, logarithmic, and trigonometric functions, techniques of integration, indeterminate forms, improper integrals and infinite series. Prereq: C- or better in MATH\u00a01401. Note: Students with a grade of B- or better in MATH\u00a01401 pass this course at a much higher rate. Term offered: fall, spring, summer. Max hours: 4 Credits. GT: Course is approved by the Colorado Dept of Higher Education for statewide guaranteed transfer, GT-MA1.\nGrading Basis: Letter Grade\nPrereq: C- or better in MATH\u00a01401\nAdditional Information: GT courses GT Pathways, GT-MA1, Mathematics; Denver Core Requirement, Mathematics.",
                        "Credits" : {
                            "category": "MATH",
                            "credits_count": 4
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"MATH",
                                "course_code":1401
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "spring",
                        "year": 1,
                        "course_subject": "ENGL",
                        "course_code" : 1020,
                        "course_title" : "Core Composition I",
                        "course_description" : "Provides opportunities to write for different purposes and audiences, with an emphasis on learning how to respond to various rhetorical situations; improving critical thinking, reading, and writing abilities; understanding various writing processes; and gaining a deeper knowledge of language conventions. Term offered: fall, spring, summer. Max hours: 3 Credits. GT: Course is approved by the Colorado Dept of Higher Education for statewide guaranteed transfer, GT-C01.\nGrading Basis: Letter Grade\nAdditional Information: GT courses GT Pathways, GT-CO1, Communication; Denver Core Requirement, English Composition.",
                        "Credits" : {
                            "category": "Gen Ed Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "spring",
                        "year": 1,
                        "course_subject": "GEN",
                        "course_code" : 1001,
                        "course_title" : "Gen Ed Core",
                        "course_description" : "Fill in Gen Ed Core class here.",
                        "Credits" : {
                            "category": "GEN",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    }
                ]
            },
            {
                "term": "fall",
                "year": 2,
                "Courses_list": [
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "CSCI",
                        "course_code" : 2421,
                        "course_title" : "Data Structures and Program Design",
                        "course_description" : "Topics include a first look at an algorithm, data structures, abstract data types, and basic techniques such as sorting, searching, and recursion. Programming exercises are assigned through the semester. Prereq: CSCI\u00a02312 with a grade of C- or higher. Max hours: 3 Credits.\nGrading Basis: Letter Grade\nPrereq: CSCI\u00a02312 with a grade of C- or higher.",
                        "Credits" : {
                            "category": "CS Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"CSCI",
                                "course_code":2312
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "CSCI",
                        "course_code" : 2511,
                        "course_title" : "Discrete Structures",
                        "course_description" : "Covers the fundamentals of discrete mathematics, including: logic, sets, functions, asymptotics, mathematical reasoning, induction, combinatorics, discrete probability, relations and graphs. Emphasis on how discrete mathematics applies to computer science in general and algorithm analysis in particular. Prereq: MATH\u00a01401 with a C- or higher (Calculus I). Max Hours: 3 Credits.\nGrading Basis: Letter Grade\nPrereq: MATH\u00a01401 with a C- or higher",
                        "Credits" : {
                            "category": "CS Core",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"MATH",
                                "course_code":1401
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "SCIE",
                        "course_code" : 1000,
                        "course_title" : "Science",
                        "course_description" : "Science course",
                        "Credits" : {
                            "category": "Science",
                            "credits_count": 4
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "SCIE",
                        "course_code" : 1001,
                        "course_title" : "Science",
                        "course_description" : "Science lab",
                        "Credits" : {
                            "category": "Science",
                            "credits_count": 1
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "ENGL",
                        "course_code" : 2030,
                        "course_title" : "Core Composition II",
                        "course_description" : "Focuses on academic and other types of research-based writing and builds on the work completed in ENGL\u00a01020. Focuses on critical thinking, reading and writing as well as working with primary and secondary source material to produce a variety of research-based essays. Emphasis on using both print-based and electronic-based information. Prereq: ENGL\u00a01020. Term offered: fall, spring, summer. Max hours: 3 Credits. GT: Course is approved by the Colorado Dept of Higher Education for statewide guaranteed transfer, GT-C02.\nGrading Basis: Letter Grade\nPrereq:  ENGL\u00a01020\nAdditional Information: Denver Core Requirement, English Composition; GT courses GT Pathways, GT-CO2, Communication.",
                        "Credits" : {
                            "category": "Gen Ed Core",
                            "credits_count":3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                            {
                                "course_subject":"ENGL",
                                "course_code":1020
                            }
                        ],
                        "Instructor_score_list": [
                        ]
                    },
                    {
                        "term": "fall",
                        "year": 2,
                        "course_subject": "GEN",
                        "course_code" : 1002,
                        "course_title" : "Gen Ed Core",
                        "course_description" : "Fill in Gen Ed Core class here.",
                        "Credits" : {
                            "category": "GEN",
                            "credits_count": 3
                        },
                        "taken": "false",
                        "prerequisites_list" : [
                        ],
                        "Instructor_score_list": [
                        ]
                    }
                ]
            }
        ]
    }
    let updatedSemester_list = this.state.Semester_list;
    templateDegreeMap.Semester_list.forEach((semester) => {
      let semesterIndex = updatedSemester_list.findIndex(obj => obj.year == semester.year && obj.term == semester.term);
      if (semesterIndex != -1) {
        updatedSemester_list[semesterIndex].Courses_list = updatedSemester_list[semesterIndex].Courses_list.concat(semester.Courses_list);
      } else {
        updatedSemester_list.push(semester);
      }
    });
    console.log("Adding template degree map ", updatedSemester_list);
    this.setState({ Semester_list: updatedSemester_list });
    this.setState(this.generateColors(this.state.Semester_list));
    return;
  }

  onAddSemesterSubmit = (semester) => {
    let updatedSemester_list = this.state.Semester_list;
    let term = semester.split("-")[0].toLowerCase();
    let year = parseInt(semester.split("-")[1]);
    let semesterIndex = this.state.Semester_list.findIndex(obj => obj.year == year && obj.term == term);
    if (semesterIndex != -1) {
      this.setState({ showAlert: ['danger', 'Semester already exists. Check your flowchart.'] });
      return;
    }
    updatedSemester_list.push({
      term: term,
      year: year,
      Courses_list: [],
    })
    updatedSemester_list.sort((a, b) => {
      if (a.year == b.year) {
        if (a.term == "fall" && (b.term == "winter" || b.term == "spring" || b.term == "summer")
        || a.term == "winter" && (b.term == "spring" || b.term == "summer")
        || a.term == "spring" && b.term == "summer") {
          return -1;
        } else {
          return 1;
        }
      } else {
        return a.year - b.year;
      }
    })
    this.setState({ 
      showAlert: ['success', 'Semester added to flowchart. Drag any classes into the new semester.'], 
      Semester_list: updatedSemester_list 
    });
    /*/ 
      This is where the "Add Semseter" API call exists 
    /*/

    // Use the split() function to split the string into an array
    // based on the '-' delimiter
    var semesterArray = semester.split('-');
    // Store the first element of the array (i.e., "Summer") as lowercase into a variable
    var season = semesterArray[0].toLowerCase();
    // Store the second element of the array (i.e., "1") into a variable and cast it to an integer
    var number = parseInt(semesterArray[1]);

    console.log(season)
    console.log("\n")
    console.log(number)
    console.log("\n")

    let apiURL = "http://localhost:4001/semester"
    let jsonReq = {
        "term": season,
        "year": number,
        "Courses_list": []
    }
    fetch(apiURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(jsonReq),
      mode: 'cors'
    }).then( (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log("Recieved response from the server for new semester", response)
      return response.json();
    }).then( (res) => {
      console.log("Semester JSON: ", res);
    }).catch( (e) => console.error(e) );

  }

  /*** when user submits new information for a custom class (called by AddCustomClass) ***/
  onAddClassSubmit = (newClassObj, status) => {
    console.log("Adding class ", newClassObj, " with status ", status);
    let newSemesterIndex = this.state.Semester_list.findIndex(obj => obj.year == newClassObj.year && obj.term == newClassObj.season);
    let newCourse = {
      term: newClassObj.season,
      year: parseInt(newClassObj.year),
      course_subject: newClassObj.id.split(' ')[0],
      course_code: parseInt(newClassObj.id.split(' ')[1]),
      course_title: newClassObj.title,
      course_description: newClassObj.description,
      Credits: { category: newClassObj.fulfills, credits_count: parseInt(newClassObj.credits.split(' ')[0]) },
      taken: false,
      prerequisites_list: [],
      Instructor_score_list: []
    }
    if (newSemesterIndex !== -1) {
      const updatedSemester_list = [...this.state.Semester_list];
      updatedSemester_list[newSemesterIndex].Courses_list.push(newCourse);
      this.setState({ Semester_list: updatedSemester_list });
    } else {
      this.setState({ Semester_list: [...this.state.Semester_list, newCourse] });
    }

    this.setState(this.generateColors(this.state.Semester_list));

    return;

    this.setState({
      Semester_list: [...this.state.Semester_list, newSemester]
    })

    // fix name format by just taking class category and number
    let nameParts = newClassObj.id.match(/([A-Z]{4})(.*)([\d]{4})/);
    newClassObj.id = nameParts[1] + ' ' + nameParts[3];
    // add / remove class id to the correct list
    if (status === 'Taken') {
      this.markClassTaken(newClassObj.id);
    } else {
      this.markClassPlanned(newClassObj.id);
    }

    // if is already in flowchart, alert the user, but still add it to the list
    if (newClassObj.id in this.state.classDesc) {
      this.setState({ showAlert: ['danger', `Class already exists! It was added to your flowchart as a ${status} class.`] });
      return;
    }

    // modify objects to include new class
    let newClassDesc = { ...this.state.ClassDesc, [newClassObj.id]: newClassObj };
    this.setState({
      ClassDesc: newClassDesc,
      AddedClasses: [...this.state.AddedClasses, newClassObj.id]

    });
    /*/ 
      This is where the "Add Custom Class" API call exists 
    /*/

    // Use the split() function to split the string into an array based on the ' ' (space) delimiter
    var classNameArray = newClassObj.id.split(' ');
    // Store the first element of the array (i.e., "Summer") as lowercase into a variable
    var classPrefix = classNameArray[0];
    // Store the second element of the array (i.e., "1") into a variable and cast it to an integer
    var classCode = parseInt(classNameArray[1]);
    // Retreieves the integer from the Credit Amount and stores it as its own variable
    var credits = parseInt(newClassObj.credits[0].split(" Credits"))

    // Converts status (i.e. "Taken" or "Planned") into a boolean value
    var courseStatus;
    if (status === 'Taken') {
      courseStatus = true;
    } else {
      courseStatus = false;
    }

    let apiURL = "http://localhost:4001/course"
    let jsonReq = {
      "course_title": newClassObj.title,
      "course_subject": classPrefix,
      "course_code": classCode,
      "year": newClassObj.year,
      "term": newClassObj.season.toLowerCase(),
      "course_description": newClassObj.description,
      "Credits": {
        "category": newClassObj.fulfills,
        "credits_count": credits
      },
      "taken": courseStatus,
      "prerequisites_list": [],
      "Instructor_score_list": []
  }
    fetch(apiURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(jsonReq),
      mode: 'cors'
    }).then( (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log("Received response from the server for CreateCustomCourse: ", response)
      console.log("Course object info: ", response.json());
      return response.json();
    }).catch( (e) => console.error(e) );

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
        //
        //setState={this.setState.bind(this)}
        Categories={this.state.Categories}
        onAddClassSubmit={this.onAddClassSubmit}
        Semesters={this.state.Semester_list}
        //Classes={classInfo}
        ColorOrder={this.state.ColorOrder}
        Colors={this.state.Colors}
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
          <Navbar.Brand> <img src="public/Logo1.png" height="50px" width="50px"></img>Course Dragon</Navbar.Brand>
          <Nav>
            <Nav.Link>
              <LoginButton onLogin={() => this.generateTemplateDegreeMap()}/>
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
        </div>
        <div className="flow-warn">
          *3000 & 4000 level CSCI courses are semester dependent. Courses may be offered
          more frequently as resources allow, but students cannot expect them to be
          offered off‐semester. Students should use the rotation shown on this flowchart
          as a guide for planning their upper level courses.
        </div>
        {content}
        {/* <Navbar variant='dark' bg='dark' fixed='bottom'>
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
        </Navbar> */}
      </div>
    );
  }
}

export default App;
