import { mediaUrl } from '@utils/baseUrls';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AmbientLight = dynamic(
  () => import('react-3d-viewer').then((mod) => mod.AmbientLight),
  { ssr: false }
);
const GLTFModel = dynamic(
  () => import('react-3d-viewer').then((mod) => mod.GLTFModel),
  { ssr: false }
);
const DirectionLight = dynamic(
  () => import('react-3d-viewer').then((mod) => mod.DirectionLight),
  { ssr: false }
);

export const Gltf = ({image}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        width: '100%',
        'justify-content': 'center',
        position: 'relative',
        marginTop: '2rem',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            tranform: 'translate(-50%)',
            zIndex: 9999,
          }}
        >
          Loading...
        </div>
      )}
      <GLTFModel
        src={mediaUrl + image}
        onLoad={() => setLoading(false)}
        width={800}
        height={800}
        enableRotate={true}
      >
        <AmbientLight color={0xffffff} />
        <DirectionLight
          color={0xffffff}
          position={{ x: 100, y: 200, z: 100 }}
        />
        <DirectionLight
          color={0xffffff}
          position={{ x: -100, y: -200, z: -100 }}
        />
      </GLTFModel>
    </div>
  );
};
