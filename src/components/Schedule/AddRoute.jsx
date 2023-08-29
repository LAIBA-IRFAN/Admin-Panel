/* eslint-disable no-unused-vars */
import { useState } from 'react'
import "./RouteForm.css"
// import { useNavigate } from "react-router-dom";
import ArrayTextArea from './ArrayTextArea';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRouteAction } from '../../stateManagement/routeSlice';
import {toast , ToastContainer} from "react-toastify"


const AddRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mArray, setMArray] = useState([]);
  const [eArray, setEArray] = useState([]);




  const formik = useFormik({
    initialValues: {
      routeNo: '',
      mRoute: [],
      eRoute: [],
      timing: ''
    },
    onSubmit: values => {
      console.log("va", values)
      // setLoading(true)
      dispatch(createRouteAction({
        routeNo: values.routeNo,
        mRoute: mArray ? mArray : ["CLIFTON"],
        eRoute: eArray ? eArray : ["CLIFTON"],
        // notificationCategory: cat ? cat : "Student",
        timing: values.timing
      })).then((res) => {
        // console.log("resssss", res)
        if (res.meta.requestStatus == "rejected") {
          return
          // throw new Error(res.meta.payload)
        } else {
          console.log("hello")
          // window.location.reload(false)
          // setLoading(false);
          toast.success('Route added successfully'
            , {
              onClose: () => {
                navigate("/timetable")
              },
            }
            );

        }

      }).catch((e) => {
        console.log("ooops Route failed", e)
      })

      console.log(values);


    },
    // validationSchema : formSchema,
  });
  //get data from user
  const store = useSelector(state => state?.route);
  console.log(store);
  const { loading, errorStatus } = store;
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  //MORNING ARRAY ROUTE//

  const addMElement = (event) => {
    if (event.key === "Enter") {
      const elementInput = event.target;
      const element = elementInput.value.trim();
      event.preventDefault()

      if (element !== "") {
        setMArray(prevArray => [...prevArray, element]);
        elementInput.value = ""; // Clear input field
      }
    }
  };

  const removeMElement = (index) => {
    setMArray(prevArray => prevArray.filter((_, i) => i !== index));
  };


  //EVENING ARRAY ROUTE//

  const addEElement = (event) => {
    if (event.key === "Enter") {
      const elementInput = event.target;
      const element = elementInput.value.trim();
      event.preventDefault()

      if (element !== "") {
        setEArray(prevArray => [...prevArray, element]);
        elementInput.value = ""; // Clear input field
      }
    }
  };

  const removeEElement = (index) => {
    setEArray(prevArray => prevArray.filter((_, i) => i !== index));
  };

  return (
    <div style={{padding: "0px 20px 0px 0px"}}>
      <div className="header-add-route">
        <h3 className="h3">Add Route</h3> <hr />
        <form onSubmit={formik.handleSubmit}>
          {/* <div className="grid-container"> */}
            <div className="grid-item">
              <label className='label'>Route No</label>
              <input className="input" value={formik.values.routeNo}
                onChange={formik.handleChange('routeNo')}
                onBlur={formik.handleBlur("routeNo")} type="text" />
            </div>
            {/* <div className="grid-item">
              <div className="checkbox-container">
                <input type="checkbox" id="checkbox" name="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <label className="checkbox-label"> Merge</label>
              </div>
            </div> */}
          {/* </div> */}
          {/* <div>
            <fieldset className={isChecked ? "enable-Checkbox-style feildset" : "disable-checkbox-style feildset"}>
              <legend className='legend'>Optional</legend>
              <label className={isChecked ? "enable-Checkbox-style label" : "disable-checkbox-style label"}>Merging Route No</label>
              <select className='select' disabled={!isChecked}>
                <option>Select Route to be merged</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </fieldset>
          </div><br /> */}
          <div>
            <label className='label'>Timings</label>
            <input className="input" value={formik.values.timing}
              onChange={formik.handleChange('timing')}
              onBlur={formik.handleBlur("timing")} type="text" />
          </div><br />
          <div>
            <label className='label'>Morning Routes</label>
            <div className="array-container">
              {mArray.map((element, index) => (
                <div className="array-element" key={index}>
                  {element}
                  <span className="remove-icon" onClick={() => removeMElement(index)}>
                    &#10005;
                  </span>
                </div>
              ))}
            </div>
            <input type="text" id="elementInput" className='input' onKeyPress={addMElement} />
          </div><br />
          <div>
            <label className='label'>Evening Routes</label>
            <div className="array-container">
              {eArray.map((element, index) => (
                <div className="array-element" key={index}>
                  {element}
                  <span className="remove-icon" onClick={() => removeEElement(index)}>
                    &#10005;
                  </span>
                </div>
              ))}
            </div>
            <input type="text" id="elementInput" className='input' onKeyPress={addEElement} />
          </div>
          {loading ?
            <button 
            style={{backgroundColor: "#770043" , color: "white" , outline: "none" , border: "none" , padding: "10px 20px" , borderRadius: "05px"  , margin: "10px 0px"}}
            >Loading...</button> :
            <button type="submit"
            style={{backgroundColor: "#770043" , color: "white" , outline: "none" , border: "none" , padding: "10px 20px" , borderRadius: "05px" , margin: "10px 0px"}}
            >Submit</button>}
        </form>
      </div>
<ToastContainer/>
    </div>
  )
}

export default AddRoute
