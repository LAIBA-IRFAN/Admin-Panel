import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import styles from "../Form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAdmin } from "../../stateManagement/AdminSlice"
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const AddAdmin = ({closeModal}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        adminId: '',
        password: ''
      };


      const validationSchema = Yup.object().shape({
        adminId: Yup.string().required('AdminID is required'),
        password: Yup.string().required('Password is required'),
      });


      const handleSubmit = async (values, { resetForm }) => {
        try {
          setIsLoading(true);
          const response = await dispatch(addAdmin(values));
          if (response.error) {
            toast.error('Error Adding Admin');
          } else {
            toast.success('Admin added successfully', {
              onClose: () => {
                resetForm();
                closeModal()
              },
            });
          }
        } catch (error) {
          toast.error('Failed to add Admin');
        } finally {
          setIsLoading(false);
        }
      };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
      });
    

      const override = css`
  display: block;
  margin: 0 auto;
`;

  return (
    <>
    <div className={styles.container}>
      <h3 style={{ color: "#770043", textAlign: "center" }}>Add New Admin</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <label className={styles.label}>
            Admin ID
          </label>
          <input
            className={styles.input}
            name="adminId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.adminId}
          ></input>
          {formik.touched.adminId && formik.errors.adminId && (
            <div className={styles.error}>{formik.errors.adminId}</div>
          )}
        </div>   
      <div>
          <label className={styles.label} >
            Password
          </label>
          <input
            className={styles.input}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          ></input>
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
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
      <ToastContainer />
    </div>
    </>
  )
}

export default AddAdmin