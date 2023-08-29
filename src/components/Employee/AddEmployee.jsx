import React ,{ useState ,useEffect} from 'react';
import styles from '../Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../stateManagement/CategorySlice';
import { addEmployee ,fetchAllEmployees} from '../../stateManagement/employeeSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {toast , ToastContainer} from "react-toastify"
import ClipLoader from 'react-spinners/ClipLoader';

const AddEmployee = ({closeModal}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const override = { // Define the override CSS for the loader
    display: "block",
    margin: "0 auto",
  };


  const initialValues = {
      name: '',
      email: '',
      password: '',
      phone: '',
      dateOfBirth: '',
      code: '',
      department: '',
      categoryId: '',
      gender: '',
      employeeId: '',
      profilePhoto: '',
    }

    const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      phone: Yup.string().required('Phone is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      code: Yup.string().required('Code is required'),
      department: Yup.string().required('Department is required'),
      categoryId: Yup.string().required('Category is required'),
      gender: Yup.string().required('Gender is required'),
      employeeId: Yup.string().required('Employee ID is required'),
    })

   const  handleSubmit =  async (values,{ resetForm }) => {
      console.log("submit clicked")
      try {
        setIsLoading(true);

        const response = await dispatch(addEmployee(values));
          if (response.error) {
            toast.error('Error Adding Employee');
            setIsLoading(false);
          } else {
            await dispatch(fetchAllEmployees());
            setIsLoading(false);
            toast.success('Employee added successfully'
            , {
              onClose: () => {
                resetForm();
                closeModal();
              },
            }
            );
          }
      } catch (error) {
        console.log("entered catch block")
        setIsLoading(false); 
        toast.error('Failed to add employee. Please try again.');
      }
    }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
    <div className={styles.container}>
      <h3 style={{ color: '#770043', textAlign: 'center' }}>Add Employee</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Name:</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
          </div>

          <div className={styles.gridItem}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
          </div>
        </div>

        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          <div className={styles.gridItem}>
            <label className={styles.label}>Phone:</label>
            <input
              className={styles.input}
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && <div className={styles.error}>{formik.errors.phone}</div>}
          </div>
        </div>

        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Date of Birth:</label>
            <input
              className={styles.input}
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <div className={styles.error}>{formik.errors.dateOfBirth}</div>}
          </div>

          <div className={styles.gridItem}>
            <label className={styles.label}>Code:</label>
            <input
              className={styles.input}
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && <div className={styles.error}>{formik.errors.code}</div>}
          </div>
        </div>

        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Department:</label>
            <input
              className={styles.input}
              type="text"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.department && formik.errors.department && (
              <div className={styles.error}>{formik.errors.department}</div>
            )}
          </div>

          <div className={styles.gridItem}>
            <label className={styles.label}>Category:</label>
            <select
              className={styles.select}
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id} style={{ color: 'black' }}>
                  {cat.categoryDescription}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div className={styles.error}>{formik.errors.categoryId}</div>
            )}
          </div>
        </div>

        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Gender:</label>
            <select
              className={styles.select}
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className={styles.error}>{formik.errors.gender}</div>
            )}
          </div>

          <div className={styles.gridItem}>
            <label className={styles.label}>Employee ID:</label>
            <input
              className={styles.input}
              type="text"
              name="employeeId"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.employeeId && formik.errors.employeeId && (
              <div className={styles.error}>{formik.errors.employeeId}</div>
            )}
          </div>
        </div>
        <br />
         <div className={styles.gridItem}>
          <label className={styles.label}>Profile Photo:</label>
          <input
            className={styles.input}
            type="text"
            name="profilePhoto" 
            value={formik.values.profilePhoto} 
             onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profilePhoto && formik.errors.profilePhoto && (
            <div className={styles.error}>{formik.errors.profilePhoto}</div>
          )}
        </div> 
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader color={"#ffffff"} loading={isLoading} css={override} size={20} />
          ) : (
            "ADD"
          )}
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddEmployee;
