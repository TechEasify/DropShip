import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserUploadIMG } from './actions';
import { allowedTypeIMG } from '../../constant';

export default function UploadImage() {
  const [_error, setError] = useState({});
  const history = useHistory();

  const onChangeHandler = (e) => {
    // Clear all state before do it again.
    setError({});
    const { type } = e.target.files[0];
    if (!e.target.files.length) {
      setError({
        message: 'Choose your image to upload!.',
      });
    }

    if (!allowedTypeIMG.includes(type)) {
      setError({
        message: 'Not support type.',
      });
    }

    if (allowedTypeIMG.includes(type)) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('name', e.target.files[0].name);


      UserUploadIMG(formData).then((res) => {
        history.push('/empty');
        history.goBack();
      }).catch((err) => {
        setError(err);
      });
    }
  };

  return (
    <form>
      <label htmlFor="file" className="pf-btn pf-btn-primary pf-btn-block">Upload</label>
      <input style={{ display: 'none' }} id="file" type="file" name="file" onChange={onChangeHandler} />
      {_error && _error.message && (
        <div className="alert alert-danger" style={{ fontSize: '1rem' }}>
          <strong>Error!</strong>
          {_error.message}
        </div>
      )}
    </form>
  );
}
