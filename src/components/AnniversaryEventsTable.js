import ReadMoreReact from 'read-more-react'

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

    const { responseObj, currentNavLink } = props;
    const { LitEvents } = { ...responseObj };
    if( LitEvents !== undefined ) {
        console.log("currentNavLink = " + currentNavLink);
        return(
            <div className="ricorrenzeTblWrapper">
            <table className="ricorrenzeTbl position-relative">
                <thead><tr><th>SOGGETTO</th><th>RICORRENZA</th><th>ANNO</th><th>MEMORIA LITURGICA</th><th>LUOGHI</th><th>SETTORI ORP</th><th>NOTE</th><th>PATRONATO</th></tr></thead>
                <tbody>
            { LitEvents.filter( el => el.anniversario === currentNavLink ).map((el,i) => {
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
                            <div><b>NASCITA:</b> {el.luogoNascita || ""}</div>
                            <div><b>MORTE:</b> {el.luogoMorte || ""}</div>
                            <div><b>SEPOLTURA:</b> {el.luogoSepoltura || ""}</div>
                            <div><b>SANTUARIO PRINCIPALE:</b> {el.santuarioPrincipale || ""}</div>
                            <div><b>NAZIONI:</b> {el.luoghi || ""}</div>
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
