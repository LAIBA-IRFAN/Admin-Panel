import React, { useEffect, useState } from 'react';
import styles from '../Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleAdmin, updateAdmin } from '../../stateManagement/AdminSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast, ToastContainer } from 'react-toastify';

const EditAdmin = ({ id, closeModal }) => {
    // console.log(id)
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admins.find((a) => a._id === id));
  console.log(admin)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleAdmin(id))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // Handle error if needed
      });
  }, [dispatch, id]);

  const initialValues = {
    adminId: admin?.adminId || '',
    adminPassword: admin?.adminPassword || '',
  };

  console.log(initialValues)

  const validationSchema = Yup.object({
    adminId: Yup.string().required('Admin ID is required'),
    adminPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const response = await dispatch(updateAdmin({ id: id, adminData: values }));
      if (response.error) {
        toast.error('Error Updating Admin');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.success('Admin updated successfully', {
          onClose: () => {
            closeModal();
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to update admin. Please try again.');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const override = {
    display: 'block',
    margin: '0 auto',
  };

  return (
    <div className={styles.container}>
      <h3 style={{ color: '#770043', textAlign: 'center' }}>Edit Admin</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <label className={styles.label}>Admin ID:</label>
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
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            name="adminPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.adminPassword}
          ></input>
          {formik.touched.adminPassword && formik.errors.adminPassword && (
            <div className={styles.error}>{formik.errors.adminPassword}</div>
          )}
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader color={'#ffffff'} loading={isLoading} css={override} size={20} /> : 'Edit'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditAdmin;
