import React, { useRef, useState } from 'react';

import { Container, Preview, Avatar, CameraIcon } from './styles';

function AvatarUpload({ imageUrl, handleFile }) {
  const fileRef = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);

      setFileUrl(objectUrl);
      handleFile(file);
    } else {
      setFileUrl(null);
      handleFile(null);
    }
  };

  return (
    <Container>
      <Preview onClick={handleClick}>
        {imageUrl && !fileUrl && <Avatar src={imageUrl} />}
        {fileUrl && <Avatar src={fileUrl} />}
        <CameraIcon />
      </Preview>
      <input
        ref={fileRef}
        type="file"
        onChange={handleChange}
        accept=".jpg,.jpeg,.png"
      />
    </Container>
  );
}

export default AvatarUpload;
