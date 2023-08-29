import { useState, useEffect } from "react"
import "./css/Notification.css"
import notificationIcon from "./icons/Notification.png"
import IssueNotification from "./IssueNotification";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllNotifications } from '../../stateManagement/notficationSlice'

const NotificationInfo = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notification.notification)


  useEffect(() => {
    dispatch(fetchAllNotifications())
  }, [dispatch]);

  const handlebtn = () => {
    if (isFormVisible) {
      setIsFormVisible(false)
    } else {
      setIsFormVisible(true)
    }
  }

  return (
    <>
      <div className="notification-section">
        <div className="header-container">
          <div className="header">
            <h3> Issued Notification</h3>
            <div className="btn-container">
              <button className="btn" onClick={handlebtn}> +Issue a Notification</button>
              {isFormVisible && <IssueNotification />}
            </div>
          </div>
        </div><hr />
        <div style={{maxHeight: "400px" , overflowY: "scroll"}}> 
        {notifications.map(info => (
          <div key={info._id} className="notification-detail">
            <div className="left-section">
              <img className="notification-icon" src={notificationIcon} alt="noti" />
            </div>
            <div className="middle-section">
              {/* <p>{info.title}</p><br/> */}
              <p><span style={{ color: "#770043", fontWeight: "600" }}>{info.title}</span><br />{info.message}</p>
            </div>
            <div className="right-section">
              <p>{info.notificationCategory} <br /> {info.date}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default NotificationInfo

