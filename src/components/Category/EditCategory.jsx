import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import styles from "../Form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { updateCategory,fetchSingleCategory } from '../../stateManagement/CategorySlice';

const EditCategory = ({id, closeModal}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const categories = useSelector((state) => state.category.categories);
    const category = categories.find((c) => c._id === id);
  
    useEffect(() => {
      dispatch(fetchSingleCategory(id));
    }, [dispatch, id]);
  
    const initialValues = {
      categoryId: category.categoryId || '',
      categoryDescription: category.categoryDescription || '',
      categoryAmount: category.categoryAmount || '',
    };
  
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: Yup.object({
        categoryId: Yup.string().required('Category ID is required'),
        categoryDescription: Yup.string().required('Category Description is required'),
        categoryAmount: Yup.number().required('Category Amount is required').min(0),
      }),
      onSubmit: (values) => {
        setIsLoading(true);
        dispatch(updateCategory({ categoryId: id, categoryData: values }))
          .then(() => {
            setIsLoading(false);
            toast.success('Category updated successfully!', {
              onClose: () => {
                formik.resetForm();
                closeModal();
              },
            });
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error('Error updating category');
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
                <h3 style={{ color: "#770043", textAlign: "center" }}>Edit Category</h3>
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
                        {formik.touched.categoryDescription && formik.errors.categoryDescription && (
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
                            "Edit"
                        )}
                    </button>
                </form>
                <ToastContainer />
            </div>

        </>
    )
}

export default EditCategory