import ReadMoreReact from 'read-more-react'
import { useTranslation } from 'react-i18next'

const getMonth = (month, locale) => {
    var objDate = new Date();
    objDate.setDate(15);
    objDate.setMonth(month-1);
    return objDate.toLocaleString(locale, { month: "long" });
}

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
                        <th>{t("subject")}</th>
                        <th>{t("anniversary")}</th>
                        <th>{t("year")}</th>
                        <th>{t("liturgical-memorial")} / {t("event-date")}</th>
                        <th>{t("places")}</th>
                        <th>{t("orp-sections")}</th>
                        <th>{t("notes")}</th>
                        <th>{t("patronage")}</th>
                    </tr>
                </thead>
                <tbody>
            { LitEvents.filter( el => el.anniversary.toUpperCase() === currentNavLink.toUpperCase() ).map((el,i) => {
                return (
                    <tr key={i}>
                        <td>{el.subject}</td>
                        <td className="ucase">{el.anniversaryTypeLcl}</td>
                        <td>
                            <div>{el.year}</div>
                            <div>({t('yearWithCount', {count: el.yearDiff})})</div>
                        </td>
                        <td>
                            <div>{el.memorialDay + ' ' + getMonth(el.memorialMonth, i18n.language)}</div>
                            <hr style={{height:'2px',backgroundColor:'black'}} />
                            {
                                (el.eventDay !== null && el.eventMonth !== null)
                                ? <div>{el.eventDay + ' ' + getMonth(el.eventMonth, i18n.language)}</div>
                                : <div>N/A</div>
                            }
                        </td>
                        <td>
                            <div><b className="ucase">{t("birth")}:</b> {el.placeOfBirth || ""}</div>
                            <div><b className="ucase">{t("death")}:</b> {el.placeOfDeath || ""}</div>
                            <div><b className="ucase">{t("burial")}:</b> {el.placeOfBurial || ""}</div>
                            <div><b className="ucase">{t("main-shrine")}:</b> {el.mainShrine || ""}</div>
                            <div><b className="ucase">{t("nations")}:</b> {el.places || ""}</div>
                        </td>
                        <td>{el.areaOfInterestLcl.map((aoi,i) => { return <div key={i} className="text-center">{aoi}</div>})}</td>
                        <td><ReadMoreReact key={el.idx} text={el.notes || ""} readMoreText={t("read-more")} /></td>
                        <td>{el.patronage}</td>
                    </tr>
                )
            }) }
                </tbody>
            </table>
            </div>
        );
    } else {
        return (
            <div style={{color:"DarkRed",fontWeight:"bold",padding:"20px",textAlign:"center"}}>{t('no-results')}</div>
        )
    }
}

export default AnniversaryEventsTable;
