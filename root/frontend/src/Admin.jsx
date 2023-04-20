import { groupBy, isDarkBackground, compareSemesters } from './functions.js';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import saveAs from 'file-saver';
import Dropzone from 'react-dropzone';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoginButton from './LoginButton.jsx'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

/*** Displays the flowchart view of the web app ***/
function Admin() {
    const [show, setShow] = useState(false);
    const [catalogYear, setCatalogYear] = useState('');
    const [degree, setDegree] = useState('');

    const handleSelectDegree = (event) => {
      const selectedRow = event.target.closest("tr");
      const selectedDegree = event.target.value;
    
      // Remove the "highlighted" class from all rows except the selected one
      const rows = document.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        if (row !== selectedRow) {
          row.classList.remove("table_highlight");
        }
      });
      // Add the "highlighted" class to the selected row
      selectedRow.classList.add("table_highlight");
      setDegree(selectedDegree);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [catalogItems, setCatalogItems] = useState([]);
  
    useEffect(() => {
      // fetch the catalog items from the server
      fetch('http://localhost:4001/add-catalog/')
        .then(response => response.json())
        .then(data => {
          setCatalogItems(data);
        })
        .catch(error => {
          console.error('Error fetching catalog items:', error);
        });
    }, []);
  
    const createCatalogItem = () => {
      let apiURL = "http://localhost:4001/add-catalog/"
      // Validate that degree and catalogYear fields are not empty
      if (!degree || !catalogYear) {
        console.log('Degree and Catalog Year are required');
        return;
      }
      //make sure that there is no duplicate catalog year for the specific degree 
      const existingItem = catalogItems.find(item => item.catalogYear === catalogYear && item.degree === degree);
      if (existingItem) {
        alert(`A catalog item for ${degree} ${catalogYear} already exists.`);
        return;
      }

    
      // create the new catalog item object
      let newItem = {
        "degree": degree,
        "catalogYear": catalogYear
      };
    
      // send a POST request to the server to save the new item
      fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
        mode: 'cors'
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((savedItem) => {
        //add the new item to the catalogItems state
        setCatalogItems([...catalogItems, savedItem]);
        //clear the catalogYear state and close the modal
        setCatalogYear('');
        handleClose();
    
        // Display a success message to the user
        //alert(`Catalog item with ID ${savedItem._id} has been created successfully.`);
      })
      .catch((error) => {
        console.error(`Error creating catalog item: ${error}. Degree: ${degree}, Catalog Year: ${catalogYear}`);
        // Display an error message to the user
        alert(`Error creating catalog item for ${degree} ${catalogYear}. Please try again later.`);
      });
    };
    
    // deleting the catalog item
    const deleteCatalogItem = (id) => {
      let apiURL = `http://localhost:4001/add-catalog/${id}`;
    
      // send a DELETE request to the server to delete the item
      fetch(apiURL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          // remove the deleted item from the catalogItems state
          setCatalogItems(catalogItems.filter((item) => item._id !== id));
          // Display a success message to the user
          //alert(`Catalog item with ID ${id} has been deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting catalog item: ${error}. ID: ${id}`);
          // Display an error message to the user
          alert(`Error deleting catalog item with ID ${id}. Please try again later.`);
        });
    };
    
    
  
    return (
        <div>
        
      <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>MAJOR</th>
            <th>CAREER</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BS in Computer Science</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BS in Computer Science" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
          <tr>
            <td>BA in Computer Science</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BA in Computer Science" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
          <tr>
            <td>BS in Cybersecurity</td>
            <td>Undergraduate</td>
            <td><Button variant="outline-success" value="BS in Cybersecurity" onClick={handleSelectDegree}>Select</Button></td>
          </tr>
        </tbody>
      </table>
    </div>
      <hr className="my-4" />
        {degree && (
          <>
            <Button variant="success" onClick={handleShow} style={{ margin: '0 0 20px 0',position: 'fixed',right: '20px',}}>
              Add Catalog Year
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Catalog Year</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={createCatalogItem}>
                  <label>
                    Catalog Year:
                    <input type="text" placeholder="2023-24" value={catalogYear} onChange={(e) => setCatalogYear(e.target.value)} />
                  </label>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="success" onClick={createCatalogItem}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
      
            <div className="row">
            {catalogItems
                .filter((item) => item.degree === degree)
                .sort((a, b) => b.catalogYear.localeCompare(a.catalogYear))
                .map((item) => (
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-3" key={item.id}>
                  <div className="card">
                    <div className="card-header p-3 pt-2">
                      <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                        {/* <i className="material-icons opacity-10">BSCS</i> */}
                      </div>
                      <div className="text-end pt-1">
                        <p className="text-sm mb-0 text-capitalize">{item.degree}</p>
                        <h4 className="mb-0">Catalog Year {item.catalogYear}</h4>
                      </div>
                    </div>
                    <hr className="dark horizontal my-0"></hr>
                    <div className="card-footer p-3">
                      <Button className="buttonSpace" variant="success">
                        View
                      </Button>
                      <Button className="buttonSpace" variant="warning">
                        Modify
                      </Button>
                      <Button className="buttonSpace" variant="danger" onClick={() => deleteCatalogItem(item._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

export default Admin;

