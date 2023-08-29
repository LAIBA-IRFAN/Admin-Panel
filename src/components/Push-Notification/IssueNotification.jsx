/* eslint-disable no-unused-vars */
import { useState } from "react"
import "./css/PushForm.css"
import close from "./icons/cancel.png";


//IMPLMEMNTATION ROUTES//
import { postNotificationAction } from "../../stateManagement/notficationSlice"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//IMPLMEMNTATION ROUTES//

const IssueNotification = () => {

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate()
  // const [loading,setLoading]=useState(false)
  const [cat, setCat] = useState("");
  var cate = cat;

  const handlePushBtn = () => {
    setIsVisible(false)
  }

  //IMPLEMENTATION DETAILS
  //Form Schema
  const formSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
    notificationCategory: Yup.string().required("Category is required"),
  })

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
      notificationCategory: ''
    },
    onSubmit : values => {
      console.log("va",values)
      // setLoading(true)
      dispatch(postNotificationAction({
        title: values.title,
        message: values.message,
        notificationCategory: cat ? cat : "Student"
      })).then((res) => {
        // console.log("resssss", res)
        if (res.meta.requestStatus == "rejected") {
            return
            // throw new Error(res.meta.payload)
        } else {
            console.log("hello")
            // window.location.reload(false)
            // setLoading(false);
            // navigate("/notification")
        }

    }).catch((e) => {
        console.log("ooops Notifcation failed", e)
    })

      console.log(values);
      
      
    },
    // validationSchema : formSchema,
  });
  //get data from user
  const store = useSelector(state => state?.notification);
  console.log(store);
  const { loading,errorStatus } = store;
  //IMPLEMENTATION DETAILS
  


  return (
    <>
      {isVisible && (
        <div>
          <div className="overlayy"></div>
          <div className='popup-containerr'>
            <img className="close-icon" src={close} alt="close icon" onClick={() => setIsVisible(false)} />
            <h4 className='heading'><b> Issue Notification </b></h4>
            {/* IMPLEMENTATION DETAILS */}
            <form onSubmit={formik.handleSubmit}>
              {errorStatus ? <h1>{errorStatus}</h1> : null}
              <div>
                <div>
                  <label className="label">Title</label>
                  <input
                  className="input"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur("title")} type="text"
                  ></input>
                   {/* err msg */}
                {/* {formik.touched.title && formik.errors.title} */}
                </div>
                <div>
                  <label className="label"> Message</label>
                  <textarea
                  className="textarea"
                    value={formik.values.message}
                    onChange={formik.handleChange('message')}
                    onBlur={formik.handleBlur("message")} type="text"
                  ></textarea>
                   {/* err msg */}
                {/* {formik.touched.message && formik.errors.message} */}
                </div>
                <div>
                  <label className="label" >Category</label>
                  <select
                  className="select"
                   name="dropdown"
                  value={cat}
                   onChange={e => setCat(e.target.value)}
                  >
                    <option value="Student">Bus Passengers</option>
                    <option value="Driver">Bus Personnel</option>
                  </select>
                </div>
                 {/* err msg */}
                 {/* {formik.touched.notificationCategory && formik.errors.notificationCategory} */}
                <br />
                {/* <div>
                  <label>Notification Type</label>
                  <select name="dropdown">
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option3">3</option>
                  </select>
                </div> */}
               {loading ?  <button className="button" disabled>Loading...</button> :  <button className="button"  type="submit">Push</button>}
              </div>
            </form>
            {/*   //IMPLEMENTATION DETAILS */}
          </div>
        </div>
      )}
    </>
  )
}

export default IssueNotification