import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { fetchSingleDiscipline, updateDiscipline } from '../../../stateManagement/disciplineSlice';
import { useFormik } from 'formik'; // Import useFormik hook
import * as Yup from 'yup';
import styles from '../../Form.module.css';

const EditDiscipline = ({id, closeModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);a
  const disciplines = useSelector((state) => state.discipline.disciplines);

  useEffect(() => {
    dispatch(fetchSingleDiscipline(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (disciplines.length > 0) {
      const discipline = disciplines.find((d) => d._id === id);
      if (discipline) {
        formik.setValues({
          discipline: discipline.discipline,
        });
      }
    }
  }, [disciplines, id]);

  const formik = useFormik({
    initialValues: {
      discipline: "",
    },
    validationSchema: Yup.object({
      discipline: Yup.string().required("Discipline is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(updateDiscipline({ id: id, discipline: values }))
        .then(() => {
          setIsLoading(false);
          toast.success("Discipline updated successfully!", {
            onClose: () => {
              formik.resetForm();
              closeModal()
            },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Error updating discipline");
        });
    },
  });

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      <div className={styles.container}>
        <h3 style={{ color: '#770043', textAlign: 'center' }}>Edit Discipline</h3>
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
              'Edit'
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default EditDiscipline;
