import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../Form.module.css';
import { useFormik } from 'formik'; // Import useFormik hook
import * as Yup from 'yup';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { fetchSingleBatch, updateBatch,fetchAllBatches } from '../../../stateManagement/batchSlice';

const EditBatch = ({id , closeModal}) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const batches = useSelector((state) => state.batch.batches);

  useEffect(() => {
    dispatch(fetchSingleBatch(id));
}, [dispatch, id]);

useEffect(() => {
    if (batches.length > 0) {
        const batch = batches.find((b) => b._id === id);
        if (batch) {
            formik.setValues({
                batch: batch.batch,
            });
        }
    }
}, [batches, id]);

const formik = useFormik({
    initialValues: {
      batch: "",
    },
    validationSchema: Yup.object({
        batch: Yup.string().required("Batch is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(updateBatch({ id: id, batchData: values }))
        .then(() => {
          setIsLoading(false);
          toast.success("Batch updated successfully!", {
            onClose: () => {
              formik.resetForm();
              navigate("/subcategory");
              closeModal()
            },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Error updating batch");
        });
    },
    
});

  return (
    <>
      <div className={styles.container}>
        <h3 style={{ color: '#770043', textAlign: 'center' }}>Edit Batch</h3>
        <hr />
        <br />
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <label className={styles.label} htmlFor="batch">
              Batch
            </label>
            <input
              className={styles.input}
              id="batch"
              name="batch"
              type="text"
              value={formik.values.batch}
              onChange={formik.handleChange}
            />
            {formik.touched.batch && formik.errors.batch ? (
              <div className="error">{formik.errors.batch}</div>
            ) : null}
          </div>
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? (
              <ClipLoader color={'#ffffff'} loading={isLoading} size={20} css="display: block; margin: 0 auto;" />
            ) : (
              'Edit'
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default EditBatch;
