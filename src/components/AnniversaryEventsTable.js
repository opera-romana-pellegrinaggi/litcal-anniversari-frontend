import ReadMoreReact from 'read-more-react'
import { useTranslation } from 'react-i18next'

const MONTH = [
    "null_value",
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
];

const AnniversaryEventsTable = props => {
    const { t, i18n } = useTranslation(['translation', 'anniversary']);
    const { responseObj, currentNavLink } = props;
    const { LitEvents } = { ...responseObj };
    if( LitEvents !== undefined ) {
        console.log("currentNavLink = " + currentNavLink);
        return(
            <div className="ricorrenzeTblWrapper">
            <table className="ricorrenzeTbl position-relative">
                <thead>
                    <tr>
                        <th>{t("subject").toUpperCase()}</th>
                        <th>{t("anniversary").toUpperCase()}</th>
                        <th>{t("year").toUpperCase()}</th>
                        <th>{t("festivity-day").toUpperCase()}</th>
                        <th>{t("places").toUpperCase()}</th>
                        <th>{t("orp-sections").toUpperCase()}</th>
                        <th>{t("notes").toUpperCase()}</th>
                        <th>{t("patronage").toUpperCase()}</th>
                    </tr>
                </thead>
                <tbody>
            { LitEvents.filter( el => el.anniversary === currentNavLink.toUpperCase() ).map((el,i) => {
                return (
                    <tr key={i}>
                        <td>{el.soggetto}</td>
                        <td>{el.ricorrenza}</td>
                        <td>
                            <div>{el.anno}</div>
                            <div>({el.yearDiff + ' ' + (el.yearDiff > 1 ? "anni" : "anno")})</div>
                        </td>
                        <td>{el.giorno + ' ' + MONTH[el.mese]}</td>
                        <td>
                            <div><b>{t("birth").toUpperCase()}:</b> {el.luogoNascita || ""}</div>
                            <div><b>{t("death").toUpperCase()}:</b> {el.luogoMorte || ""}</div>
                            <div><b>{t("burial").toUpperCase()}:</b> {el.luogoSepoltura || ""}</div>
                            <div><b>{t("main-shrine").toUpperCase()}:</b> {el.santuarioPrincipale || ""}</div>
                            <div><b>{t("nations").toUpperCase()}:</b> {el.luoghi || ""}</div>
                        </td>
                        <td>{el.ambito.map((el,i) => { return <div key={i} className="text-center">{el}</div>})}</td>
                        <td><ReadMoreReact key={el.idx} text={el.note || ""} /></td>
                        <td>{el.patrono}</td>
                    </tr>
                )
            }) }
                </tbody>
            </table>
            </div>
        );
    } else {
        return (
            <div style={{color:"DarkRed",fontWeight:"bold",padding:"20px",textAlign:"center"}}>Non ci sono risultati</div>
        )
    }
}

export default AnniversaryEventsTable;
