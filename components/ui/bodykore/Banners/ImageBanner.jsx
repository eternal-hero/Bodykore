import Image from "next/image"

export default function ImageBanner({ height, bgImage }) {
    return (
        <>
            {/*Main Image*/}
            <div className={`bg-no-repeat ${height} w-full bg-center bg-cover relative`}>
                {bgImage !== undefined ? <Image
                          src={bgImage}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        /> : null}
            </div>
        </>
    )
}