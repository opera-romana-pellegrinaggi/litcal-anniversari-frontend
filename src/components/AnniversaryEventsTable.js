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
                        <th>{t("subject").toUpperCase()}</th>
                        <th>{t("anniversary").toUpperCase()}</th>
                        <th>{t("year").toUpperCase()}</th>
                        <th>{t("liturgical-memorial").toUpperCase()} / {t("event-date").toUpperCase()}</th>
                        <th>{t("places").toUpperCase()}</th>
                        <th>{t("orp-sections").toUpperCase()}</th>
                        <th>{t("notes").toUpperCase()}</th>
                        <th>{t("patronage").toUpperCase()}</th>
                    </tr>
                </thead>
                <tbody>
            { LitEvents.filter( el => el.anniversary.toUpperCase() === currentNavLink.toUpperCase() ).map((el,i) => {
                return (
                    <tr key={i}>
                        <td>{el.subject}</td>
                        <td>{el.anniversaryTypeLcl}</td>
                        <td>
                            <div>{el.year}</div>
                            <div>{t('yearWithCount', {count: el.yearDiff})}</div>
                        </td>
                        <td>
                            <div>{el.memorialDay + ' ' + getMonth(el.memorialMonth, i18n.language)}</div>
                            {
                                (el.eventDay !== null && el.eventMonth !== null)
                                && <div>{el.eventDay + ' ' + getMonth(el.eventMonth, i18n.language)}</div>
                            }
                        </td>
                        <td>
                            <div><b>{t("birth").toUpperCase()}:</b> {el.placeOfBirth || ""}</div>
                            <div><b>{t("death").toUpperCase()}:</b> {el.placeOfDeath || ""}</div>
                            <div><b>{t("burial").toUpperCase()}:</b> {el.placeOfBurial || ""}</div>
                            <div><b>{t("main-shrine").toUpperCase()}:</b> {el.mainShrine || ""}</div>
                            <div><b>{t("nations").toUpperCase()}:</b> {el.places || ""}</div>
                        </td>
                        <td>{el.areaOfInterestLcl.map((aoi,i) => { return <div key={i} className="text-center">{aoi}</div>})}</td>
                        <td><ReadMoreReact key={el.idx} text={el.notes || ""} readMoreText={t("read more")} /></td>
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
