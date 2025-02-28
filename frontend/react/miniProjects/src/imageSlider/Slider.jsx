import Image from './Image'
function Slider() {
    return (
        <>
            <Image url={"https://picsum.photos/v2/list?"} page={1} limit={5} />
        </>
    )
}

export default Slider