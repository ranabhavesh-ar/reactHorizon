import { useEffect } from "react";

export default function Ar() {

  useEffect(() => {
    const video = document.querySelector("#myVideo");
    const target = document.querySelector("[mindar-image-target]");

    if (!video || !target) return;

    target.addEventListener("targetFound", () => {
      video.play().catch(() => {});
    });

    target.addEventListener("targetLost", () => {
      video.pause();
      video.currentTime = 0;
    });
  }, []);

  return (
    <a-scene
      mindar-image="imageTargetSrc: /targets.mind"
      vr-mode-ui="enabled:false"
      device-orientation-permission-ui="enabled:false">

      <a-assets>
        <video
          id="myVideo"
          src="/videoplayback.mp4"
          preload="auto"
          loop
          muted
          playsInline
          webkit-playsinline="true"
          crossOrigin="anonymous"
        />
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled:false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-video
          src="#myVideo"
          width="1"
          height="0.56"
          position="0 0 0"
        />
      </a-entity>

    </a-scene>
  );
}
