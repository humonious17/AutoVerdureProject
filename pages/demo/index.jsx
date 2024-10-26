/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
      </Head>
      <main>
        <h1>3D Model Viewer</h1>
        <model-viewer alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="https://res.cloudinary.com/dgzqokaju/image/upload/v1721140844/op3_mnxc5v.glb" ar environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr" poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
      </main>
    </div>
  );
}
