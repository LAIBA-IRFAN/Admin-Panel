import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createStudentAction, fetchAStudentAction, updateStudentAction } from '../../redux/slices/studentSlices';
import Button from '@mui/material/Button';
import { Navigate, useParams } from 'react-router-dom';
import { fetchAllCategoriesAction, fetchCatByDesAction } from '../../redux/slices/categorySlices';
import { fetchAllBatchesAction, fetchAllDisciplinesAction, fetchBatchByYearAction, fetchDisciplineByDesAction } from '../../redux/slices/subCategorySlices';
import * as Yup from "yup";
import { Add } from '@mui/icons-material';
// //Form Schema
// const formSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//   })




const UpdateStudent1 = (props) => {

    const { id } = useParams();
    //console.log("ID", id)


    //CSS Styles
    const btnStyle = {
        color: "white",
        backgroundColor: "#770043",
        border: "none",
        padding: "10px 20px",
        borderRadius: 2,
        margin: "10px"
    }
    const labelStyle = {
        fontFamily: 'Outfit',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 18,
        color: "#770043",

    }

    const dispatch = useDispatch();

    //----------------------------
    //FETCH A STUDENT BY ID
    //----------------------------
    useEffect(() => {
        dispatch(fetchAStudentAction(id));
    }, [dispatch])

    //get data from store
    const state = useSelector(state => state?.student);
    const { student, loading, serverErr, appErr, isEdited } = state;
    //console.log("STUDENT", student)


    //----------------------------
    //MANGE STATE CHANGES OF CATEGORY
    //----------------------------

    const [catButton, setCatButton] = useState(false)

    //fetch category
    useEffect(() => {
        dispatch(fetchAllCategoriesAction());
    }, [dispatch]);

    const [des, setDes] = useState("");

    const categories = useSelector(state => state.category)
    const { categoriesList,
        loading: catLoading,
        appErr: catAppErr,
        serverErr: catServerErr,
        categoryId
    } = categories;
    //console.log(categoriesList, categoryId);
    // To push categoryId to createStudentFunction save the value in this variable and then push this variable to the func
    var catId = catButton ? categoryId : student?.categoryId?._id
    console.log("CAT", catId, catButton)



    //---------------------------------------------------------
    //MANAGE STATE CHANGES OF SUBCATEGORY BATCH AND DISCIPLINE
    //----------------------------------------------------------

    const [batchButton, setBatchButton] = useState(false)
    const [disButton, setDisButton] = useState(false)

    //fetch batches
    useEffect(() => {
        dispatch(fetchAllBatchesAction());
    }, [dispatch]);

    //fetch disciplines
    useEffect(() => {
        dispatch(fetchAllDisciplinesAction());
    }, [dispatch]);

    const [year, setYear] = useState("2019");
    const [disDes, setDisDes] = useState("Software Engineering");

    const subCategories = useSelector(state => state.subCategory)
    const { batchesList, batchId, disciplinesList, disciplineId,
        loading: subCatLoading,
        appErr: subCatAppErr,
        serverErr: subCatServerErr,

    } = subCategories;
    //console.log(batchesList, batchId, disciplinesList, disciplineId);

    // To push batchId and disciplineId to createStudentFunction save the value in this variable and then push this variable to the func
    var batId = batchButton ? batchId : student?.batch?._id
    console.log("BATCH", batId, batchButton)
    var disId = disButton ? disciplineId : student?.discipline?._id
    console.log("DIS", disId, disButton)

    var studId = "123000";
    console.log("STUDENTID", studId)

    //ADD NEW STUDENT
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: student?.name,
            rollNo: student?.rollNo,
            gender: student?.gender,
            dateOfBirth: student?.dateOfBirth,
            phone: student?.phone,
            password: student?.password,
            categoryId: student?.categoryId?.categoryDescription,
            batch : student?.batch?.batch,
            discipline: student?.discipline?.discipline
        },
        onSubmit: values => {

            //dispatch the action
            dispatch(updateStudentAction({
                name: values.name,
                studentId: studId,
                rollNo: values.rollNo,
                batch: batId,
                gender: values.gender,
                discipline: disId,
                categoryId: catId,
                dateOfBirth: values.dateOfBirth,
                phone: values.phone,
                password: values.password, id

            }));

            //console.log(values)
        },
        //validationSchema : formSchema,
    });








    //redirect
    if (isEdited) return <Navigate to="/students" />
    return (
        <div className="container">
            <br /><br /><h3 style={{ color: "#770043" }}>Update Student</h3><br />
            {loading ? null :
                appErr || serverErr ? <h1>{appErr}</h1> : null}
            <form onSubmit={formik.handleSubmit}>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input value={formik.values.name}
                                onChange={formik.handleChange('name')}
                                onBlur={formik.handleBlur("name")} type="text" className="form-control" id="floatingInputGrid" />
                            <label style={labelStyle} for="floatingInputGrid">Name</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input value={formik.values.rollNo}
                                onChange={formik.handleChange('rollNo')}
                                onBlur={formik.handleBlur("rollNo")} type="text" className="form-control" id="floatingInputGrid" placeholder="Enter Your Roll no." />
                            <label style={labelStyle} for="floatingInputGrid">Roll No</label>
                        </div>
                    </div>
                </div><br />
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            {/*------------------------------------
                                                BATCH
                           ----------------------------------------  */}
                            {
                                !batchButton ? <input value={formik.values.batch}
                                    onChange={formik.handleChange('batch')}
                                    onBlur={formik.handleBlur("batch")} onClick={() => {
                                    setBatchButton(true)
                                }}  type="text" className="form-control" id="floatingInputGrid" /> :
                                    subCatLoading ? null :
                                        subCatAppErr || subCatServerErr ? (
                                            <p>{subCatAppErr} {subCatServerErr}</p>
                                        ) :
                                            batchesList?.length <= 0 ? (
                                                <p>No Batches Found</p>
                                            ) : (
                                                <select className="form-select" id="floatingSelectGrid" value={year} onChange={e => setYear(e.target.value)} >
                                                    {batchesList?.map(batch => (
                                                        <>
                                                            <option >{batch?.batch}</option>
                                                        </>
                                                    ))}
                                                </select>
                                            )
                            }
                            <label style={labelStyle} for="floatingSelectGrid">Batch</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select value={formik.values.gender}
                                onChange={formik.handleChange('gender')}
                                onBlur={formik.handleBlur("gender")} className="form-select" id="floatingSelectGrid">
                                <option selected>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <label style={labelStyle} for="floatingSelectGrid">Gender</label>
                        </div>
                    </div>
                </div> <br />
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        {/*------------------------------------
                                                DISCIPLINE
                           ----------------------------------------  */}
                            {!disButton ? <input value={formik.values.discipline}
                                    onChange={formik.handleChange('discipline')}
                                    onBlur={formik.handleBlur("discipline")} onClick={() => {
                                    setDisButton(true)
                                }}  type="text" className="form-control" id="floatingInputGrid" /> : subCatLoading ? null :
                                subCatAppErr || subCatServerErr ? (
                                    <p>{subCatAppErr} {subCatServerErr}</p>
                                ) :
                                    disciplinesList?.length <= 0 ? (
                                        <p>No Disciplines Found</p>
                                    ) : (
                                        <select className="form-select" id="floatingSelectGrid" value={disDes} onChange={e => setDisDes(e.target.value)} >
                                            {disciplinesList?.map(discipline => (
                                                <>
                                                    <option >{discipline?.discipline}</option>
                                                </>
                                            ))}
                                        </select>
                                    )
                            }
                            <label style={labelStyle} for="floatingSelectGrid">Discipline</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">

                            {/*------------------------------------
                                                CATEGORY
                           ----------------------------------------  */}
                            {
                                !catButton ? <input onClick={() => {
                                    setCatButton(true)
                                }} value={formik.values.categoryId}
                                    onChange={formik.handleChange('categoryId')}
                                    onBlur={formik.handleBlur("categoryId")} type="text" className="form-control" id="floatingInputGrid" /> :
                                    (catLoading ? null :
                                        catAppErr || catServerErr ? (
                                            <p>{catAppErr} {catServerErr}</p>
                                        ) :
                                            categoriesList?.length <= 0 ? (
                                                <p>No Category Found</p>
                                            ) : (
                                                <select className="form-select" id="floatingSelectGrid" value={des} onChange={e => setDes(e.target.value)} >
                                                    {categoriesList?.map(category => (
                                                        <>
                                                            <option >{category?.categoryDescription}</option>
                                                        </>
                                                    ))}
                                                </select>
                                            ))
                            }
                            <label style={labelStyle} for="floatingSelectGrid">Category ID</label>
                        </div>
                    </div>
                </div><br />
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input value={formik.values.dateOfBirth}
                                onChange={formik.handleChange('dateOfBirth')}
                                onBlur={formik.handleBlur("dateOfBirth")} type="date" className="form-control" id="floatingInputGrid" placeholder="Enter Your Date of Birth" />

                            <label style={labelStyle} for="floatingInputGrid">Date Of Birth</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input value={formik.values.phone}
                                onChange={formik.handleChange('phone')}
                                onBlur={formik.handleBlur("phone")} type="number" className="form-control" id="floatingInputGrid" placeholder="Enter Your Phone Number." />
                            <label style={labelStyle} for="floatingInputGrid">Phone</label>
                        </div>
                    </div>
                </div><br />
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur("password")} type="password" className="form-control" id="floatingInputGrid" placeholder="Enter Your Password" />
                            <label style={labelStyle} for="floatingInputGrid">Password</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            <label style={labelStyle} for="floatingInputGrid">Choose Profile Photo</label>
                        </div>
                    </div>
                </div><br />
                {/* <button type="button" style={btnStyle} aria-disabled>Confirm</button> */}
                <div >
                <Button   type="button" variant="contained" sx={{ color: 'white', backgroundColor: '#770043', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}
                onClick={() => {
                    dispatch(fetchCatByDesAction(des))
                    dispatch(fetchBatchByYearAction(year))
                    dispatch(fetchDisciplineByDesAction(disDes))}}>Confirm</Button>
                {loading ? (
                    <Button   variant="contained"
                        disabled
                        sx={{ color: '#770043', backgroundColor: 'white', marginLeft: '3%', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}>
                        Loading...
                    </Button>
                ) : (
                    <Button   variant="contained"
                        type="submit"
                        sx={{ color: '#770043', backgroundColor: 'white', marginLeft: '3%', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}>
                        Submit
                    </Button>
                )}
                </div>
            </form>
        </div>
    )
}

export default UpdateStudent1