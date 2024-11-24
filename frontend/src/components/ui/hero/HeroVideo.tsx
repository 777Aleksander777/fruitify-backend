import { HeroVideoProps } from  "../../../types/home"
import { StrapiVideo } from "../video"

export function HeroVideo({ data }: {readonly data : HeroVideoProps}) {

    const { url } = data.video;

    console.log('Home page video src: ' + url);

    return (
        <div className="max-w-[1536px] w-fit mx-auto my-16 ">
            <StrapiVideo src={"https://cswuhyugfqkxtbycmfev.supabase.co/storage/v1/object/public/fruitify/uploads/LogoAnimation3.mov-b703287612602331d7a18626223e9d76.mov"}/>
        </div>
    )
}