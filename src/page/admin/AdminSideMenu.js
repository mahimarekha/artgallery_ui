// SideMenu.js
import React, { useState } from 'react';
import { Accordion, Card, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp,faAddressBook , faPalette, faPenNib, faCogs, faWrench, faChartLine, faStar } from '@fortawesome/free-solid-svg-icons';

const SideMenu = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className="bg-dark text-white vh-100 p-3">
      <div className="d-flex flex-column align-items-start">
        <div className="mb-3">
          <FontAwesomeIcon icon={faAddressBook} /> Dashboard
        </div>
        <Accordion className="w-100" activeKey={activeKey}>
          <Card className="bg-dark border-0">
            <Card.Header>
              <Button
                variant="link"
                className="text-white text-left w-100"
                onClick={() => handleToggle('0')}
                aria-controls="theme-collapse"
                aria-expanded={activeKey === '0'}
              >
                <FontAwesomeIcon icon={faPalette} /> Theme
                <FontAwesomeIcon icon={activeKey === '0' ? faChevronUp : faChevronDown} className="float-right" />
              </Button>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="bg-secondary">
                <Nav className="flex-column">
                  <Nav.Link className="text-white" href="#colors">Colors</Nav.Link>
                  <Nav.Link className="text-white" href="#typography">Typography</Nav.Link>
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="bg-dark border-0">
            <Card.Header>
              <Button
                variant="link"
                className="text-white text-left w-100"
                onClick={() => handleToggle('1')}
                aria-controls="components-collapse"
                aria-expanded={activeKey === '1'}
              >
                <FontAwesomeIcon icon={faCogs} /> Components
                <FontAwesomeIcon icon={activeKey === '1' ? faChevronUp : faChevronDown} className="float-right" />
              </Button>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="bg-secondary">
                <Nav className="flex-column">
                  <Nav.Link className="text-white" href="#base">Base</Nav.Link>
                  <Nav.Link className="text-white" href="#buttons">Buttons</Nav.Link>
                  <Nav.Link className="text-white" href="#forms">Forms</Nav.Link>
                  <Nav.Link className="text-white" href="#charts">Charts</Nav.Link>
                  <Nav.Link className="text-white" href="#icons">Icons</Nav.Link>
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default SideMenu;
