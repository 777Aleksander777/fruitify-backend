import { HeroVideoProps } from  "../../../types/home"
import { StrapiVideo } from "../video"

export function HeroVideo({ data }: {readonly data : HeroVideoProps}) {

    const { url } = data.video;

    console.log('Home page video src: ' + url);

    return (
        <div className="max-w-[1536px] w-fit mx-auto my-16 ">
            <StrapiVideo src={url}/>
        </div>
    )
}