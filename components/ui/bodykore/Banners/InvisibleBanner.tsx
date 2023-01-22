
interface InvisibleBannerProps {
    height: string
    id?: string
}

export default function InvisibleBanner({ height, id } : InvisibleBannerProps) {
  
return (
    <>
        <div className={`${height}`} id={id}></div>
    </>
  );
}
