import React, { useState } from "react";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// const ffmpeg = createFFmpeg({ log: true });

export default function UploadVideo({ ffmpeg }) {
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const convertToGif = async () => {
    if (video) {
      // Write the file to memory
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      // Run the FFMpeg command
      await ffmpeg.run(
        "-i",
        "test.mp4",
        "-t",
        "2.5",
        "-ss",
        "2.0",
        "-f",
        "gif",
        "out.gif"
      );

      // Read the result
      const data = ffmpeg.FS("readFile", "out.gif");

      // Create a URL
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" })
      );
      setGif(url);
    }
  };

  const downloadGif = () => {

  }

  console.log(gif)
  return (
    <div className="video-input-container">
      {video && (
        <video
          style={{ marginBottom: "10px" }}
          controls
          width="250"
          src={URL.createObjectURL(video)}
        ></video>
      )}

      {video ? (
        <button className="button cancel-button" onClick={() => setVideo("")}>Cancel</button>
      ) : (
        <label className="custom-file-input">
          <input
            type="file"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.item(0))}
          />
        </label>
      )}

      <h3>Result</h3>

      {gif ? (
        <a className="button download-button" href={gif} download="gif">Download</a>
      ) : (
        <>{video && <button className="button convert-button" onClick={convertToGif}>Convert</button>}</>
      )}

      {gif && <img style={{ marginTop: "10px" }} src={gif} width="250" />}
    </div>
  );
}
