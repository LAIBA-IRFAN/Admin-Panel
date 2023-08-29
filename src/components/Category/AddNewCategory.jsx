import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import styles from "../Form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { addCategory } from '../../stateManagement/CategorySlice';

const AddNewCategory = ({closeModal}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    
    const initialValues = {
        categoryId: '',
        categoryDescription: '',
        categoryAmount: '',
      };


      const validationSchema = Yup.object().shape({
        categoryId: Yup.string().required('Required'),
        categoryDescription: Yup.string().required('Required'),
        categoryAmount: Yup.string().required('Required'),
      });


      const handleSubmit = async (values, { resetForm }) => {
        try {
          setIsLoading(true);
          const response = await dispatch(addCategory(values));
          if (response.error) {
            toast.error('Error Adding Category');
          } else {
            toast.success('Category added successfully', {
              onClose: () => {
                resetForm();
                closeModal()
              },
            });
          }
        } catch (error) {
          toast.error('Failed to add Category');
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
      <h3 style={{ color: "#770043", textAlign: "center" }}>Add New Category</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <label className={styles.label} >
            Category ID
          </label>
          <input
            className={styles.input}
            name="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
          ></input>
          {formik.touched.categoryId && formik.errors.categoryId && (
            <div className={styles.error}>{formik.errors.categoryId}</div>
          )}
        </div>

        <div>
          <label className={styles.label} >
            Category Description
          </label>
          <input
            className={styles.input}
            name="categoryDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryDescription}
          ></input>
          {formik.touched.categoryDescription && formik.errors.categoryDescription&& (
            <div className={styles.error}>{formik.errors.categoryDescription}</div>
          )}
        </div>

        <div>
          <label className={styles.label} >
            Category Amount
          </label>
          <input
            className={styles.input}
            name="categoryAmount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryAmount}
          ></input>
          {formik.touched.categoryAmount && formik.errors.categoryAmount && (
            <div className={styles.error}>{formik.errors.categoryAmount}</div>
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

export default AddNewCategory