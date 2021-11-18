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
            <table className="ricorrenzeTbl">
                <thead><tr><th>SOGGETTO</th><th>RICORRENZA</th><th>ANNO</th><th>MEMORIA LITURGICA</th><th>LUOGHI</th><th>SETTORI ORP</th><th>NOTE</th></tr></thead>
                <tbody>
            { LitEvents.filter( el => el.anniversario === currentNavLink ).map((el,i) => {
                return (
                    <tr key={i}>
                        <td>{el.soggetto}</td>
                        <td>{el.ricorrenza}</td>
                        <td>{el.anno}</td>
                        <td>{el.giorno + ' ' + MONTH[el.mese]}</td>
                        <td>
                            <div><b>NASCITA:</b> {el.luogoNascita}</div>
                            <div><b>MORTE:</b> {el.luogoMorte}</div>
                            <div><b>SEPOLTURA:</b> {el.luogoSepoltura}</div>
                            <div><b>SANTUARIO PRINCIPALE:</b> {el.santuarioPrincipale}</div>
                            <div><b>NAZIONI:</b> {el.luoghi}</div>
                        </td>
                        <td>{el.ambito.join(" | ") }</td>
                        <td><ReadMoreReact key={el.idx} text={el.note} /></td>
                    </tr>
                )
            }) }
                </tbody>
            </table>
        );
    } else {
        return (
            <div style={{color:"DarkRed",fontWeight:"bold",padding:"20px",textAlign:"center"}}>Non ci sono risultati</div>
        )
    }
}

export default AnniversaryEventsTable;
