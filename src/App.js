import { faAngleDoubleLeft, faAngleDoubleRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Nav, Navbar, Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import usePersistedState from 'use-persisted-state-hook'

import 'bootstrap/dist/css/bootstrap.min.css'
import Anniversary from './Anniversary'
import './App.css'
import './assets/css/sb-admin-2.css'
import logo from './assets/images/logo-orp.png'
import AnniversaryEventsTable from './components/AnniversaryEventsTable'
import './i18n'

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION;

const App = () => {

  const { t, i18n } = useTranslation(['translation', 'anniversary']);
  const changeLanguage = ev => {
    /* Sends i18n the code of the language to change and the function in i18n.js takes this code and sets
      it to the local storage variable. The language detector detects this and translates the text that
      is either in a "t" function or inside a "Trans" component */
    i18n.changeLanguage(ev.target.value);
    setCurrentLang(ev.target.value);
    setLanguageNames(new Intl.DisplayNames([ev.target.value], { type: "language" }));
  };

  const [ sidebarCollapsed, setSidebarCollapsed ] = usePersistedState( 'sidebarCollapsed', false );
  const toggleSidebar = () => setSidebarCollapsed( prevValue => !prevValue );

  const [ currentNavLink, setCurrentNavLink ] = useState( "Centenary" );
  const [ currentLang, setCurrentLang ] = useState( i18n.language );
  const [ languageNames, setLanguageNames ] = useState(new Intl.DisplayNames([i18n.language], { type: "language" }));
  const englishLanguageNames = new Intl.DisplayNames(['en'], { type: "language" });
  const supportedLngs = ['en', 'es', 'it', 'fr', 'de', 'pt', 'nl'];
  const [ anniversaryYear, setAnniversaryYear ] = useState( new Date().getFullYear() + 1 );

  const [ responseObj, setResponseObj ] = useState({});
  const [ litEvents, setLitEvents ] = useState([]);
  const [ englishResultsForPartialTranslation, setEnglishResultsForPartialTranslation ] = useState(false);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}?YEAR=${anniversaryYear}&LOCALE=${currentLang}`)
        .then(response => response.json())
        .then(responseData => {
          if(responseData.hasOwnProperty('incomplete_translation')) {
            setEnglishResultsForPartialTranslation(responseData.incomplete_translation);
          } else {
            setEnglishResultsForPartialTranslation(false);
          }
          setResponseObj(responseData);
          // The actual events array is under the anniversary_events key in the response object
          let { anniversary_events } = responseData;
          setLitEvents(anniversary_events);
        })
    return () => {
      setResponseObj({});
    }
  }, [setResponseObj,anniversaryYear,currentLang]);


  return (
    <div id="wrapper">
      {/* Sidebar start */}
      <Nav className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarCollapsed ? "toggled" : ""}`} id="accordionSidebar">
          <Navbar.Brand as="div" className="sidebar-brand d-flex align-items-center justify-content-center" style={{position:"relative",top:"0",width:'100%',height:'auto'}}>
              <div className="sidebar-brand-icon"><Image alt="" src={logo.src} height="75" width="65" /></div>
              <div className="sidebar-brand-text mx-3">Centro<br />Pastorale<br />ORP</div>
          </Navbar.Brand>
          <ButtonGroup className={"w-100 anniversaryCategories mb-2"} vertical>
            {Object.keys(Anniversary).map((key, i) => {
              const anniv = Anniversary[key];
              const lclName = t(anniv.name, { ns: 'anniversary' });
              const latinTerm = t(anniv.latinTerm, { ns: 'anniversary' });
              return(
                <Button variant="outline-light" size="sm" onClick={() => setCurrentNavLink(key)} title={`latinTerm = ${latinTerm}, key = ${key}, currentNavLink = ${currentNavLink}`} active={key === currentNavLink} disabled={litEvents.filter( el => (el.anniversary.toUpperCase() === anniv.name.toUpperCase() || el.anniversary.toUpperCase() === lclName.toUpperCase() ) ).length === 0} key={i} className={litEvents.filter( el => (el.anniversary.toUpperCase() === anniv.name.toUpperCase() || el.anniversary.toUpperCase() === lclName.toUpperCase() ) ).length === 0 ? 'bg-gradient-secondary' : ''}>
                  <div className={anniv.recurring ? "font-weight-bold" : "font-weight-normal"}>
                    <span>{anniv.year}°</span>
                    <span className={sidebarCollapsed ? "d-none" : ""}> - {lclName}</span>
                    <span> ({litEvents.filter( el => (
                        el.anniversary.toUpperCase() === anniv.name.toUpperCase()
                        || el.anniversary.toUpperCase() === lclName.toUpperCase()
                      )).length})</span>
                  </div>
                </Button>
              )
            })}
          </ButtonGroup>
          {/* Sidebar toggle */}
          <Nav.Item className="text-center mr-4">
              <Button variant="outline-light" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={sidebarCollapsed ? faAngleDoubleRight : faAngleDoubleLeft} />
              </Button>
          </Nav.Item>
          <div id="app_version" key="app_version">Version {APP_VERSION}</div>
      </Nav>
      {/* Sidebar end */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar className="navbar-light bg-white topbar mb-2 static-top shadow justify-content-between">
            <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
              <label>
                <span className="d-none d-md-inline">{t("calculate-anniversaries-for-year")} </span>
                <span className="d-sm-inline d-md-none">{t("year").toUpperCase()} </span>
                <input type="number" min="1969" max="9999" className="form-control bg-dark text-white border-0 small ml-2" value={anniversaryYear} onChange={ev => setAnniversaryYear(ev.target.value)} />
              </label>
            </form>
            <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
              <label>
                <span key="chooseLanguageLabel">{t("choose-language")}</span>
                <select key="languageSelect" onChange={changeLanguage} value={currentLang} className="form-control bg-dark text-white border-0 small ml-2">
                  {supportedLngs.map((value, key) => {
                    return <option key={key} value={value} title={englishLanguageNames.of(value)}>{languageNames.of(value)}</option>
                  })}
                </select>
              </label>
            </form>
          </Navbar>
          <div className="container-fluid anniversary-calculator">
            <h2 className="text-center">{t("anniversary-calculator-saints-universal-calendar")}</h2>
            <h4 className="text-center">{t("anniversaries-for-year", { currentNavLink: t(currentNavLink.toLowerCase(), { ns: 'anniversary' }).toUpperCase(), anniversaryYear: anniversaryYear })}</h4>
            <AnniversaryEventsTable responseObj={responseObj} currentNavLink={currentNavLink} />
          </div>
        </div>
      </div>

      <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
        <Toast show={englishResultsForPartialTranslation} onClose={() => setEnglishResultsForPartialTranslation(false)} className="text-bg-warning">
          <Toast.Header>
            <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
            <strong className="me-auto">{t('notice')}</strong>
          </Toast.Header>
          <Toast.Body>{t('english-strings-used')}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
