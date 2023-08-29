import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../Form.module.css';
import { getSingleConductor, updateConductor } from '../../stateManagement/conductorSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditConductor = ({id , closeModal}) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conductor = useSelector((state) => state.conductor.selectedConductor);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchConductorDetails = async () => {
      try {
        await dispatch(getSingleConductor(id));
      } catch (error) {
        toast.error('Failed to fetch conductor details');
      }
    };

    fetchConductorDetails();
  }, [dispatch, id]);

  const [formValues, setFormValues] = useState({
    name: '',
    phoneNo: '',
    password: '',
    conductorId: '',
    code: '',
    address: '',
  });

  useEffect(() => {
    if (conductor) {
      setFormValues(conductor);
    }
  }, [conductor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await dispatch(updateConductor({ conductorId: id,conductorData:formValues }));
      if(response.error){
        toast.error('Failed to update conductor');
        setIsUpdating(false);
      }else{
        setIsUpdating(false);
        toast.success('Conductor updated successfully', {
            onClose: () =>
            closeModal()
          });;
      }
    } catch (error) {
      setIsUpdating(false);
      toast.error('Failed to update conductor');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Edit Conductor</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={formValues.name}
              onChange={handleChange}
            />
        </div>
        <br />
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>Phone</label>
            <input
              type="text"
              name="phoneNo"
              className={styles.input}
              value={formValues.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formValues.password}
              onChange={handleChange}
              disabled
            />
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
              value={formValues.conductorId}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label}>Code</label>
            <input
              type="text"
              name="code"
              className={styles.input}
              value={formValues.code}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div>
          <label className={styles.label}>Address</label>
          <textarea
            type="text"
            name="address"
            className={styles.textarea}
            value={formValues.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={styles.button} type="submit" disabled={isUpdating}>
          {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </button>
      </form>
      <ToastContainer/>
      
    </div>
  );
};

export default EditConductor;
