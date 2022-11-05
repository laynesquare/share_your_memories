import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

const Playground = () => {
  const [imgContainer, setImgContainer] = useState(null);
  const formElem = useRef();
  const filePerSe = useRef();

  const transform = (filePerSe) => {};

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const nice = new FormData(formElem.current);

    console.log(nice.entries());

    for (let [name, value] of nice) {
      console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }

    console.log(filePerSe.current.files[0] instanceof Blob, 'acutual file');

    const arrBuff = await filePerSe.current.files[0].arrayBuffer();

    console.log(arrBuff, 'arrayBuff');

    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: nice,
    })
      .then(
        (data) => {
          console.log(data, 'fisrt');
          return data.json();
        },
        (bad) => {
          console.log(bad);
        }
      )
      .then((realshit) => {
        console.log(realshit?.img.data);

        // const source = URL.createObjectURL(
        //   new Blob(realshit?.img.data.data, { type: 'image/png' })
        // );
        // const source = URL.createObjectURL(
        //   new Blob([new Uint8Array(realshit?.img.data.data)], {
        //     type: 'image/png',
        //   })
        // );

        const source = URL.createObjectURL(
          new Blob([realshit?.img.data.data], {
            type: 'image/png',
          })
        );

        console.log(new Uint8Array(realshit?.img.data.data));
        // const source = URL.createObjectURL(
        //   new Blob(realshit?.img.data.data, { type: 'image/jpeg' })
        // );

        console.log(source);
        // setImgContainer(
        //   `data:image/jpeg;base64,${realshit?.img.data.data.toString('base64')}`
        // );
        setImgContainer(source);
      });
  };

  useEffect(() => {
    const obj = { France: 'Paris', England: 'London' };

    console.log(imgContainer);

    console.log(Object.entries(obj));
  });

  return (
    <>
      {/* <form onSubmit={handleSubmit} autoComplete="off" id="nice">
        <label>First Name</label>
        <input required type="text" id="lname" name="lname" />
        <br />
        <label>Password</label>
        <input type="password" id="lname" name="password" />
        <br />
        <input type="file" name="picture" accept="image/*" />
        <br />
        <input type="submit" />
      </form>
      <br />
      <br /> */}

      <div>
        <form id="formElem" onSubmit={handleSubmit2} ref={formElem}>
          <label htmlFor="vehicle1">vehicle1</label>
          <input type="text" name="vehicle1" id="vehicle1" />
          <br />

          <label htmlFor="vehicle2">vehicle2</label>
          <input type="text" name="vehicle2" id="vehicle2" />
          <br />

          <input type="file" name="picture" ref={filePerSe} />
          <br />

          <input type="submit" />
        </form>
      </div>

      <Box component={'img'} src={imgContainer}></Box>
    </>
  );
};

export default Playground;
