import React from 'react';
import ConfirmDialog from '../ConfirmDialog';
import { UserDeleteIMG } from './actions';
import { useHistory } from 'react-router-dom';

export default function ConfirmDelete(props) {
  const { id, cancelDelImgModal } = props;
  const history = useHistory();

  const callAPIDeleteFile = (id) => {
    UserDeleteIMG(id)
      .then((res) => {
        history.push('/#');
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnclickConfirm = (id) => {
    callAPIDeleteFile(id);
  };

  return (
    <>
      <ConfirmDialog
        id={id}
        handleOnclickCancel={cancelDelImgModal}
        handleOnclickConfirm={handleOnclickConfirm}
        title1="Really delete this image from your library?"
        title2="This cannot be undone!"
        action="Delete file"
      />
    </>
  );
}
