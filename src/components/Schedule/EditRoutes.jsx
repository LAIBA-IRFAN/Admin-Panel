/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import close from "./cancel.png"
import "./RouteForm.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchASingleRouteAction, fetchAllRouteAction, updateRouteAction } from '../../stateManagement/routeSlice';
import { useFormik } from "formik";

const EditRoutes = () => {

  const navigate = useNavigate();
  const [isVisibale, setIsVisible] = useState(true)
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [mArray, setMArray] = useState([]);
  const [eArray, setEArray] = useState([]);
  const [routeNum, setRouteNum] = useState("");
  
  const store = useSelector(state => state?.route);
  const { loading, errorStatus, allRoutes, singleRoute } = store;
  console.log("SINGLE ROUTE",singleRoute);

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      mRoute: singleRoute?.mRoute,
      eRoute: singleRoute?.eRoute,
      timing: singleRoute?.timing  
    },
    onSubmit: values => {
      console.log("va", values)
      // setLoading(true)
      dispatch(updateRouteAction({
        routeNo: routeNum ? routeNum : 0,
        mRoute: mArray ? mArray : ["CLIFTON"],
        eRoute: eArray ? eArray : ["CLIFTON"],
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
          // navigate("/notification")
        }

      }).catch((e) => {
        console.log("ooops Route failed", e)
      })

      console.log(values);


    },
    // validationSchema : formSchema,
  });


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    dispatch(fetchAllRouteAction()).then((res) => {
      // console.log("BUS DETAILS",res.payload)
    })
      .catch((e) => {
        console.log(e)
      })

      if(singleRoute) {
        setMArray(singleRoute?.mRoute);
        setEArray(singleRoute?.eRoute);
      }

  }, [singleRoute]);
  



  const handleRouteChange = (event) => {
    const selectedRouteNum = event.target.value;
  setRouteNum(selectedRouteNum);
    dispatch(fetchASingleRouteAction({ routeNo: selectedRouteNum })).then((res) => {
      // console.log("BUS DETAILS",res.payload)
    })
      .catch((e) => {
        console.log(e)
      })
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
    <>
      {isVisibale && (
        <div>
          <div className="overlay-route"></div>
          <div className='popup-container-route'>
            <img className="close-icon" src={close} alt="close icon" onClick={() => setIsVisible(false)} />
            <h2 className='heading'><b>Edit Routes </b></h2>
            <form onSubmit={formik.handleSubmit}>

                <div className="grid-item">
                  <label className='label'>Route No</label>
                  <select className='select' name="dropdown" value={routeNum} onChange={handleRouteChange}>
                    <option value="select">select</option>
                    {allRoutes?.map((route) => (
                      <option key={route.routeNo} value={route.routeNo}>{route.routeNo}</option>
                    ))}
                  </select>
                </div>
                {/* <div className="grid-item">
                  <div className="checkbox-container">
                    <input type="checkbox" id="checkbox" name="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label className="checkbox-label"> Merge</label>
                  </div>
                </div> */}
          
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
                <input className="input" type="text"
                name="timing"
                value={formik.values.timing}
              onChange={formik.handleChange('timing')}
              onBlur={formik.handleBlur("timing")} />
              </div><br />
              <div>
                <label className='label'>Morning Routes</label>
                <div className="array-container">
              {mArray?.map((element, index) => (
                <div className="array-element" key={index}>
                  {element}
                  <span className="remove-icon" onClick={() => removeMElement(index)}>
                    &#10005;
                  </span>
                </div>
              ))}
            </div>
            <input type="text" id="elementInput" className='input' onKeyPress={addMElement} />
            {/* <textarea /> */}
              </div><br />
              <div>
                <label className='label'>Evening Routes</label>
                <div className="array-container">
              {eArray?.map((element, index) => (
                <div className="array-element" key={index}>
                  {element}
                  <span className="remove-icon" onClick={() => removeEElement(index)}>
                    &#10005;
                  </span>
                </div>
              ))}
            </div>
            <input type="text" id="elementInput" className='input' onKeyPress={addEElement} />
            {/* <textarea /> */}
              </div><br />
              {loading ? <button 
               style={{backgroundColor: "#770043" , color: "white" , outline: "none" , border: "none" , padding: "10px 20px" , borderRadius: "05px" , width: "100%"}}
              >Loading...</button>: <button type ="submit" 
              style={{backgroundColor: "#770043" , color: "white" , outline: "none" , border: "none" , padding: "10px 20px" , borderRadius: "05px" , width: "100%"}} >Save</button>} Add new Route, <span style={{ cursor: "pointer" }} onClick={() => navigate("/add-route")}>Click here</span>
            </form>

          </div>
        </div>
      )}
    </>
  )
}

export default EditRoutes
