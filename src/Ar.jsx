// import { useEffect } from "react";

// export default function Ar() {

//   useEffect(() => {
//     const video = document.querySelector("#myVideo");
//     const target = document.querySelector("[mindar-image-target]");

//     if (!video || !target) return;

//     target.addEventListener("targetFound", () => {
//       video.play().catch(() => {});
//     });

//     target.addEventListener("targetLost", () => {
//       video.pause();
//       video.currentTime = 0;
//     });
//   }, []);

//   return (
//     <a-scene
//       mindar-image="imageTargetSrc: /targets.mind"
//       vr-mode-ui="enabled:false"
//       device-orientation-permission-ui="enabled:false">

//       <a-assets>
//         <video
//           id="myVideo"
//           src="/videoplayback.mp4"
//           preload="auto"
//           loop
//           muted={false}
//           playsInline
//           webkit-playsinline="true"
//           crossOrigin="anonymous"
//         />
//       </a-assets>

//       <a-camera position="0 0 0" look-controls="enabled:false"></a-camera>

//       <a-entity mindar-image-target="targetIndex: 0">
//         <a-video
//           src="#myVideo"
//           width="1"
//           height="0.56"
//           position="0 0 0"
//         />
//       </a-entity>

//     </a-scene>
//   );
// }


import { useEffect, useState } from "react";

export default function Ar() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const video = document.querySelector("#myVideo");
    const target = document.querySelector("[mindar-image-target]");
    if (!video || !target || !unlocked) return;

    const onFound = () => video.play().catch(() => {});
    const onLost = () => {
      video.pause();
      video.currentTime = 0;
    };

    target.addEventListener("targetFound", onFound);
    target.addEventListener("targetLost", onLost);

    return () => {
      target.removeEventListener("targetFound", onFound);
      target.removeEventListener("targetLost", onLost);
    };
  }, [unlocked]);

  const unlockAudio = async () => {
    const video = document.querySelector("#myVideo");
    try {
      await video.play(); // user gesture → audio unlocked
      video.pause();
      setUnlocked(true);
    } catch {}
  };

  return (
    <>
      {!unlocked && (
        <div
          onClick={unlockAudio}
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          Tap to start AR
        </div>
      )}

      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
        vr-mode-ui="enabled:false"
        device-orientation-permission-ui="enabled:false"
      >
        <a-assets>
          <video
            id="myVideo"
            src="/videoplayback.mp4"
            preload="auto"
            loop
            playsInline
            webkit-playsinline="true"
            crossOrigin="anonymous"
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled:false" />

        <a-entity mindar-image-target="targetIndex: 0">
          <a-video width="1" height="0.56" />
        </a-entity>
      </a-scene>
    </>
  );
}
