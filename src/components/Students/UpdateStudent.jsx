
import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { fetchAStudentAction, updateStudentAction } from '../../redux/slices/studentSlices';
import { fetchAllCategoriesAction, fetchCatByDesAction } from '../../redux/slices/categorySlices';
import { Button } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';






function UpdateStudent() {
  const { id } = useParams();
  console.log(id)

  const dispatch = useDispatch();

  const [des, setDes] = useState("UG");
  const [button, setButton] = useState(false)

  const categories = useSelector(state => state.category)
  const { categoriesList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
    categoryId
  } = categories;
  console.log(categoriesList, categoryId);



  //fect single studenty -put fetch actions in useEffect 
  useEffect(() => {
    dispatch(fetchAStudentAction(id));
  }, [dispatch])

  //get data from store
  const state = useSelector(state => state?.student);
  const { student, loading, serverErr, appErr, isEdited } = state;
  console.log(student)

  // To push categoryId to updateStudentFunction
  var catId = button ? categoryId : student?.categoryId?._id
  console.log("VAR", catId)

  //formik
  const formik = useFormik({
    enableReinitialize: true,// this step is important for formik to render the title otherwise formik will render the form before the title is rendered from the store
    initialValues:
    {
      name: student?.name,
      studentId: student?.studentId,

    }
    ,
    onSubmit: values => {
      //build up the data for update-in order to update the data we need both the values i.e. title in this case and id of the category so we need to combine the data in this scenario
      //dispatch the action
      dispatch(updateStudentAction({
        name: values.name,
        studentId: values.studentId,
        categoryId: catId, id
      }));
    },
    //validationSchema : formSchema,
  });


  //fetch category
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);



  //redirect
  if (isEdited) return <Navigate to="/students" />

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>UPDATE A STUDENT</h2>
        {/* Display Error*/}
        {serverErr || appErr ? <h2 >{serverErr} {appErr}</h2> : null}
        <label>name</label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur("name")} />
        <label>Student Id</label>
        <input value={formik.values.studentId}
          onChange={formik.handleChange('studentId')}
          onBlur={formik.handleBlur("studentId")} />
        <div style={{ marginTop: "5%" }}>
          <label>Categories</label>
          {catLoading ? null :
            catAppErr || catServerErr ? (
              <h2>{catAppErr} {catServerErr}</h2>
            ) :
              categoriesList?.length <= 0 ? (
                <option>No Category Found</option>
              ) : (
                <select value={des} onChange={e => setDes(e.target.value)} >
                  {categoriesList?.map(category => (
                    <>
                      <option >{category?.categoryDescription}</option>
                    </>
                  ))}
                </select>
              )
          }
          {button ? <Button style={{ backgroundColor: 'transparent',}} onClick={() => {
            dispatch(fetchCatByDesAction(des))
            //setButton(true)
          }
          } ><CheckCircleRoundedIcon style={{ color: '#770043'}} /></Button> : 
          <Button style={{ backgroundColor: 'transparent',}} onClick={() => {
            dispatch(fetchCatByDesAction(des))
            setButton(true)
          }
          }><CheckCircleOutlinedIcon style={{ color: '#770043'}} /></Button>}
        </div>
        {loading ? (
          <Button variant="contained"
            disabled
            sx={{ color: '#770043', backgroundColor: 'white', marginTop: '3%', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}>
            Loading...
          </Button>
        ) : (
          <Button variant="contained"
            type="submit"
            sx={{ color: '#770043', backgroundColor: 'white', marginTop: '10%', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}>
            Submit
          </Button>
        )}

      </form>
    </div>
  )
}

export default UpdateStudent

