import { groupBy, isDarkBackground, compareSemesters } from './functions.js';
import React, { useState } from 'react';
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
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [catalogItems, setCatalogItems] = useState([]);
  
    const createCatalogItem = () => {
      setCatalogItems([...catalogItems, {
        id: catalogItems.length + 1,
        degree: degree,
        catalogYear: catalogYear,
      }]);
      setCatalogYear('');
      handleClose();
    };

    const deleteCatalogItem = (id) => {
        setCatalogItems(catalogItems.filter((item) => item.id !== id));
      };
  
    return (
        <div>
        
        <DropdownButton
        as={ButtonGroup}
        id="dropdown-item-button"
        title={degree || "Select a major"}
        className="format"
        variant="dark"
        menuVariant="dark"
      >
        <Dropdown.Item onClick={(e) => setDegree("BS in Computer Science")}>
          BS in Computer Science
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => setDegree("BA in Computer Science")}>
          BA in Computer Science
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => setDegree("BS in Cybersecurity")}>
          BS in Cybersecurity
        </Dropdown.Item>
      </DropdownButton>
      <hr className="my-4" />
        {degree && (
          <>
            <Button variant="success" onClick={handleShow}>
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
                      <Button className="buttonSpace" variant="danger" onClick={() => deleteCatalogItem(item.id)}>
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
