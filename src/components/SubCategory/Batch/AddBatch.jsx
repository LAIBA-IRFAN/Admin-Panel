import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import styles from "../../Form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { addBatch } from "../../../stateManagement/batchSlice"

const AddBatch = ({closeModal}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        batch: '',
      };


      const validationSchema = Yup.object().shape({
        batch: Yup.string().required('Batch is required'),
      });


      const handleSubmit = async (values, { resetForm }) => {
        try {
          setIsLoading(true);
          const response = await dispatch(addBatch(values));
          if (response.error) {
            toast.error('Error Adding Batch');
          } else {
            toast.success('Batch added successfully', {
              onClose: () => {
                resetForm();
                navigate('/subCategory');
                closeModal()
              },
            });
          }
        } catch (error) {
          toast.error('Failed to add Batch');
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
      <h3 style={{ color: "#770043", textAlign: "center" }}>Add New Batch</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="address">
            Batch
          </label>
          <input
            className={styles.input}
            name="batch"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.batch}
          ></input>
          {formik.touched.batch && formik.errors.batch && (
            <div className={styles.error}>{formik.errors.batch}</div>
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

export default AddBatch