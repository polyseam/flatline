import React, {useCallback, useState} from 'react'
import copy from 'copy-to-clipboard';
import {useDropzone} from 'react-dropzone'
import Head from '../components/head';

const Home = () => {
    const [fileText, setFileText] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = _ => {
        const minified = reader.result.replace(/\s+/g, '');
        setFileText(minified);
      };
      reader.readAsText(file);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
      <Head title="flatline" />
      <div id="zone" {...getRootProps()}>
        <input {...getInputProps()}/>
        {
          isDragActive ?
            <p>Drop a file to remove linebreaks from a file</p> :
            <p>Drop a file to remove linebreaks from a file, or just click here to pick a file</p>
        }
      </div>
      {fileText ?
        <div>
          <button id="copy-button" onClick={_=>{
              copy(fileText);
              setFileText(null);
          }}>
            copy to clipboard
          </button>
        </div> : null
      }

      <style jsx>{`
        #zone {
          display: flex;
          flex: 1;
          justify-content: flex;
          border: 3px solid #1A535C;
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export default Home;
