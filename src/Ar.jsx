// import { useEffect, useState } from "react";

// export default function Ar() {
//   const [unlocked, setUnlocked] = useState(false);

//   useEffect(() => {
//     const video = document.querySelector("#myVideo");
//     const target = document.querySelector("[mindar-image-target]");
//     if (!video || !target || !unlocked) return;

//     const onFound = () => video.play().catch(() => {});
//     const onLost = () => {
//       video.pause();
//       video.currentTime = 0;
//     };

//     target.addEventListener("targetFound", onFound);
//     target.addEventListener("targetLost", onLost);

//     return () => {
//       target.removeEventListener("targetFound", onFound);
//       target.removeEventListener("targetLost", onLost);
//     };
//   }, [unlocked]);

//   const unlockAudio = async () => {
//     const video = document.querySelector("#myVideo");
//     try {
//       await video.play(); // user gesture → audio unlocked
//       video.pause();
//       setUnlocked(true);
//     } catch {}
//   };

//   return (
//     <>
//       {!unlocked && (
//         <div
//           onClick={unlockAudio}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "black",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//           }}
//         >
//           Tap to start AR
//         </div>
//       )}

//       <a-scene
//         mindar-image="imageTargetSrc: /targets.mind"
//         vr-mode-ui="enabled:false"
//         device-orientation-permission-ui="enabled:false"
//       >
//         <a-assets>
//           <video
//             id="myVideo"
//             src="/videoplayback.mp4"
//             preload="auto"
//             loop
//             playsInline
//             webkit-playsinline="true"
//             crossOrigin="anonymous"
//           />
//         </a-assets>

//         <a-camera position="0 0 0" look-controls="enabled:false" />

//         <a-entity mindar-image-target="targetIndex: 0">
//           <a-video width="1" height="0.56" />
//         </a-entity>
//       </a-scene>
//     </>
//   );
// }


import { useEffect, useState } from "react";

export default function Ar() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const video = document.querySelector("#myVideo");
    const target = document.querySelector("[mindar-image-target]");
    const plane = document.querySelector("#videoPlane");

    if (!video || !target || !plane || !unlocked) return;

    const onFound = async () => {
      plane.setAttribute("visible", true);
      try {
        await video.play();
      } catch {}
    };

    const onLost = () => {
      video.pause();
      video.currentTime = 0;
      plane.setAttribute("visible", false);
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
      video.muted = true;      // REQUIRED first
      await video.play();
      video.pause();
      video.muted = false;     // unmute after unlock
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
        renderer="colorManagement: true; physicallyCorrectLights: false"
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

        <a-camera look-controls="enabled:false" />

        <a-entity mindar-image-target="targetIndex: 0">
          <a-video
            id="videoPlane"
            src="#myVideo"
            width="1"
            height="0.56"
            visible="false"
            material="shader: flat"
            position="0 0 0"
          />
        </a-entity>
      </a-scene>
    </>
  );
}
