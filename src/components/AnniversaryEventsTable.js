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
            <table style={{width:"90%",margin:"10px auto",border:"1px solid blue"}}>
                <thead><tr><th>IDX</th><th>SOGGETTO</th><th>RICORRENZA</th><th>ANNO</th><th>MEMORIA LITURGICA</th><th>LUOGHI</th><th>SETTORI ORP</th><th>NOTE</th></tr></thead>
                <tbody>
            { LitEvents.filter( el => el.anniversario === currentNavLink ).map((el,idx) => {
                return (
                    <tr key={idx} style={{border:"1px solid blue"}}>
                        <td>{el.idx}</td>
                        <td>{el.soggetto}</td>
                        <td>{el.ricorrenza}</td>
                        <td>{el.anno}</td>
                        <td>{el.giorno + ' ' + MONTH[el.mese]}</td>
                        <td>
                            <div>NASCITA: {el.luogoNascita}</div>
                            <div>MORTE: {el.luogoMorte}</div>
                            <div>SEPOLTURA: {el.luogoSepoltura}</div>
                            <div>SANTUARIO PRINCIPALE: {el.santuarioPrincipale}</div>
                            <div>NAZIONI: {el.luoghi}</div>
                        </td>
                        <td>{el.ambito.join(" | ") }</td>
                        <td>{el.note}</td>
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
