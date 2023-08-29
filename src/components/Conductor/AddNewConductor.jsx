import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import styles from '../Form.module.css';
import { addConductor } from '../../stateManagement/conductorSlice';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

const AddNewConductor = ({closeModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    phoneNo: '',
    password: '',
    conductorId: '',
    code: '',
    address: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNo: Yup.string().required('Phone is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    conductorId: Yup.string().required('Conductor ID is required'),
    code: Yup.string().required('Code is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const response = await dispatch(addConductor(values));
      if (response.error) {
        toast.error('Error Adding Conductor');
      } else {
        toast.success('Conductor added successfully', {
          onClose: () => {
            resetForm();
            closeModal()
          },
        });
      }
    } catch (error) {
      toast.error('Failed to add conductor');
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Add Conductor</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>
        </div>
        <br />
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Phone</label>
            <input
              type="text"
              name="phoneNo"
              className={styles.input}
              value={formik.values.phoneNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNo && formik.errors.phoneNo && (
              <div className={styles.error}>{formik.errors.phoneNo}</div>
            )}
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>
        </div>
        <br />
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>ConductorID</label>
            <input
              type="text"
              name="conductorId"
              className={styles.input}
              value={formik.values.conductorId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.conductorId && formik.errors.conductorId && (
              <div className={styles.error}>{formik.errors.conductorId}</div>
            )}
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label}>Code</label>
            <input
              type="text"
              name="code"
              className={styles.input}
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && (
              <div className={styles.error}>{formik.errors.code}</div>
            )}
          </div>
        </div>
        <br />
        <div>
          <label className={styles.label}>Address</label>
          <textarea
            type="text"
            name="address"
            className={styles.textarea}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <div className={styles.error}>{formik.errors.address}</div>
          )}
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader color="#ffffff" loading={isLoading} css={override} size={20} />
          ) : (
            'Submit'
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddNewConductor;
