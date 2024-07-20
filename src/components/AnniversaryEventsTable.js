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
    const { anniversary_events } = responseObj;
    if( anniversary_events !== undefined ) {
        console.log("currentNavLink = " + currentNavLink);
        console.log(anniversary_events);
        return(
            <div className="eventsTblWrapper">
            <table className="eventsTbl position-relative">
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
            { anniversary_events.filter( el => el.anniversary.toUpperCase() === currentNavLink.toUpperCase() ).map((el,i) => {
                return (
                    <tr key={i}>
                        <td>{el.subject}</td>
                        <td className="ucase">{el.anniversary_type_lcl}</td>
                        <td>
                            <div>{el.year}</div>
                            <div>({t('yearWithCount', {count: el.year_diff})})</div>
                        </td>
                        <td>
                            <div>{el.memorial_day + ' ' + getMonth(el.memorial_month, i18n.language)}</div>
                            <hr style={{height:'2px',backgroundColor:'black'}} />
                            {
                                (el.event_day !== null && el.event_month !== null)
                                ? <div>{el.event_day + ' ' + getMonth(el.event_month, i18n.language)}</div>
                                : <div>N/A</div>
                            }
                        </td>
                        <td>
                            <div><b className="ucase">{t("birth")}:</b> {el.place_of_birth || ""}</div>
                            <div><b className="ucase">{t("death")}:</b> {el.place_of_death || ""}</div>
                            <div><b className="ucase">{t("burial")}:</b> {el.place_of_burial || ""}</div>
                            <div><b className="ucase">{t("main-shrine")}:</b> {el.main_shrine || ""}</div>
                            <div><b className="ucase">{t("nations")}:</b> {el.places || ""}</div>
                        </td>
                        <td>{el.area_of_interest_lcl.map((aoi,i) => { return <div key={i} className="text-center">{aoi}</div>})}</td>
                        <td><ReadMoreReact key={el.event_idx} text={el.notes || ""} readMoreText={t("read-more")} /></td>
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
