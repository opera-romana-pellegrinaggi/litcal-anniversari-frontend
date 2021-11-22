import React, { useState, useEffect } from 'react'
import { Button, Navbar, Nav, ButtonGroup } from 'react-bootstrap'
import usePersistedState from 'use-persisted-state-hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import AnniversaryEventsTable from './components/AnniversaryEventsTable'

import logo from './assets/images/logo-orp.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/sb-admin-2.css'
import './App.css'

const APP_VERSION = "0.1";

const ANNIVERSARY = {
  "CENTENARIO"    : 100,
  "ONICE"         : 95,
  "GRANITO"       : 90,
  "MARMO"         : 85,
  "QUERCIA"       : 80,
  "PLATINO"       : 75,
  "FERRO"         : 70,
  "PIETRA"        : 65,
  "DIAMANTE"      : 60,
  "SMERALDO"      : 55,
  "ORO"           : 50,
  "ZAFFIRO"       : 45,
  "RUBINO"        : 40,
  "CORALLO"       : 35,
  "PERLA"         : 30,
  "ARGENTO"       : 25,
  "PORCELLANA"    : 20,
  "CRISTALLO"     : 15,
  "STAGNO"        : 10,
  "LEGNO"         : 5,
  "CARTA"         : 1
};

const RECURRING = [
  "STAGNO",
  "PORCELLANA",
  "ARGENTO",
  "PERLA",
  "RUBINO",
  "ORO",
  "DIAMANTE",
  "FERRO",
  "PLATINO",
  "QUERCIA",
  "GRANITO",
  "CENTENARIO"
];


const App = () => {

  const [ sidebarCollapsed, setSidebarCollapsed ] = usePersistedState( 'sidebarCollapsed', false );
  const toggleSidebar = () => setSidebarCollapsed( prevValue => !prevValue );

  const [ currentNavLink, setCurrentNavLink ] = useState( 'CENTENARIO' );
  const updateCurrentNavLink = val => {
    setCurrentNavLink(val);
  };

  const [ anniversaryYear, setAnniversaryYear ] = useState( new Date().getFullYear() + 1 );

  const ENDPOINT_URL = 'https://dorazio.orp.org/anniversaryCalculator/calculator.php';
  const [ responseObj, setResponseObj ] = useState({});
  const [ litEvents, setLitEvents ] = useState([]);
  useEffect(() => {
    fetch(`${ENDPOINT_URL}?YEAR=${anniversaryYear}`)
        .then(response => response.json())
        .then(responseData => {
            setResponseObj(responseData);
            let { LitEvents } = { ...responseData };
            setLitEvents(LitEvents);
        })
    return () => {
      setResponseObj({});
    }
  }, [setResponseObj,anniversaryYear]);


  return (
    <div id="wrapper">
      {/* Sidebar start */}
      <Nav className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarCollapsed ? "toggled" : ""}`} id="accordionSidebar">
          <Navbar.Brand as="div" className="sidebar-brand d-flex align-items-center justify-content-center mb-3" style={{position:"relative",top:"20px",width:'100%',height:'auto'}}>
              <div className="sidebar-brand-icon"><img alt="" src={logo} style={{height:'75px'}}  /></div>
              <div className="sidebar-brand-text mx-3">Centro<br />Pastorale<br />ORP</div>
          </Navbar.Brand>
          <hr className="sidebar-divider my-0" />
          <ButtonGroup className={"w-100"} vertical>
            {Object.keys(ANNIVERSARY).map((key, i) => {
              return(<Button variant="outline-light" size="sm" onClick={(ev) => updateCurrentNavLink(key)} active={key === currentNavLink} key={i}><span className={RECURRING.includes(key) ? "font-weight-bold" : "font-weight-normal"}>{ANNIVERSARY[key]}° - {key} ({litEvents.filter( el => el.anniversario === key ).length})</span></Button>)
            })}
          </ButtonGroup>
          <hr className="sidebar-divider my-2" />
          {/* Sidebar toggle */}
          <Nav.Item className="text-center mr-5">
              <Button variant="outline-light" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={sidebarCollapsed ? faAngleDoubleRight : faAngleDoubleLeft} />
              </Button>
          </Nav.Item>
          <div id="app_version" key="app_version" style={{position:"absolute",bottom:"0px",width:"inherit",padding:".5rem",textAlign:"center",backgroundColor:"darkblue",color:"white",textShadow:"1px 1px 3px black",fontFamily:"Segoe UI"}}>Version {APP_VERSION}</div>
      </Nav>
      {/* Sidebar end */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar className="navbar-light bg-white topbar mb-2 static-top shadow justify-content-between">
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
              <label>
                <span>CALCOLARE GLI ANNIVERSARI PER L'ANNO </span>
                <input type="number" min="1969" max="9999" className="form-control bg-dark text-white border-0 small ml-2" value={anniversaryYear} onChange={ev => setAnniversaryYear(ev.target.value)} />
              </label>
            </form>
          </Navbar>
          <div className="container-fluid anniversary-calculator">
            <h1 className="text-center">Calcolatrice degli Anniversari per i Santi del Calendario Universale</h1>
            <h3 className="text-center">anniversari {currentNavLink} nell'anno {anniversaryYear}</h3>
            <AnniversaryEventsTable responseObj={responseObj} currentNavLink={currentNavLink} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
