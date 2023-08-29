import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../Form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { addDiscipline } from '../../../stateManagement/disciplineSlice';

const AddDiscipline = ({closeModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    discipline: '',
  };

  const validationSchema = Yup.object().shape({
    discipline: Yup.string().required('Discipline is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      await dispatch(addDiscipline(values));
      toast.success('Discipline added successfully', {
        onClose: () => {
          resetForm();
          closeModal()
        },
      });
    } catch (error) {
      toast.error('Failed to add Discipline');
    }
    setIsLoading(false);
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
    <div>
      <div className={styles.container}>
        <h3 style={{ color: '#770043', textAlign: 'center' }}>Add New Discipline</h3>
        <hr />
        <br />
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <label className={styles.label} htmlFor="discipline">
              Discipline
            </label>
            <input
              className={styles.input}
              id="discipline"
              name="discipline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discipline}
            />
            {formik.touched.discipline && formik.errors.discipline && (
              <div className={styles.error}>{formik.errors.discipline}</div>
            )}
          </div>
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? (
              <ClipLoader color={'#ffffff'} loading={isLoading} css={override} size={20} />
            ) : (
              'ADD'
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddDiscipline;
