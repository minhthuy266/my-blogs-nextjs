import dynamic from 'next/dynamic'
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = dynamic(() => import('react-lite-youtube-embed'), { ssr: false })

const Youtube = ({ id, title, ...rest }) => {
  return (
    <div className="overflow-hidden rounded">
      <LiteYouTubeEmbed id={id} title={title} {...rest} />
    </div>
  );
};

export default Youtube;
